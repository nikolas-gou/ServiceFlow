@echo off
setlocal

REM =============================
REM Start ServiceFlow (silent via VBS)
REM - Checks if Wamp is running; starts it only if not
REM - Starts frontend (npm start) and PHP server in background if not already running (hidden)
REM - Ensures PHP binds to 0.0.0.0:8000 (restarts if bound to localhost)
REM - Waits for http://localhost:3000 only when needed, then opens browser as app window
REM =============================

REM 1) Start Wamp only if not already running (detect by process name wampmanager.exe)
for /f "tokens=1,*" %%a in ('tasklist /FI "IMAGENAME eq wampmanager.exe" ^| find /I "wampmanager.exe"') do set WAMP_RUNNING=1
if defined WAMP_RUNNING (
    REM Wamp is already running
) else (
    start "" "C:\wamp64\wampmanager.exe"
    REM Small grace period
    timeout /t 2 /nobreak >nul
)
set WAMP_RUNNING=

REM 2) Detect if frontend (port 3000) is already listening
netstat -ano -p TCP | find ":3000" | find "LISTENING" >nul
if errorlevel 1 (
    set FRONTEND_UP=
) else (
    set FRONTEND_UP=1
)

REM 3) Detect if PHP server (port 8000) is already listening and bound to 0.0.0.0
set PHP_UP=
set PHP_BOUND_CORRECT=
for /f "usebackq delims=" %%L in (`netstat -ano -p TCP ^| find ":8000" ^| find "LISTENING"`) do (
    set PHP_UP=1
    echo %%L | find "0.0.0.0:8000" >nul && set PHP_BOUND_CORRECT=1
)

REM 4) Start/Restart PHP server to ensure 0.0.0.0 binding (hidden, no terminal window)
if defined PHP_UP (
    if defined PHP_BOUND_CORRECT (
        REM PHP already running and correctly bound to 0.0.0.0:8000
    ) else (
        REM Kill existing listeners on :8000 then start with 0.0.0.0
        for /f "usebackq tokens=5" %%P in (`netstat -ano -p TCP ^| find ":8000" ^| find "LISTENING"`) do taskkill /PID %%P /F >nul 2>&1
        powershell -NoLogo -NoProfile -WindowStyle Hidden -Command ^
          "Start-Process php -WindowStyle Hidden -ArgumentList '-S 0.0.0.0:8000 -t ""C:\Users\nikol\Desktop\ServiceFlow\ServiceFlow-Backend\public""'"
    )
) else (
    powershell -NoLogo -NoProfile -WindowStyle Hidden -Command ^
      "Start-Process php -WindowStyle Hidden -ArgumentList '-S 0.0.0.0:8000 -t ""C:\Users\nikol\Desktop\ServiceFlow\ServiceFlow-Backend\public""'"
)

REM 5) Start Frontend only if not up (hidden, no terminal window)
if defined FRONTEND_UP (
    REM Frontend already running on :3000
) else (
    powershell -NoLogo -NoProfile -WindowStyle Hidden -Command ^
      "Start-Process cmd -WindowStyle Hidden -ArgumentList '/c npm start --prefix ""C:\Users\nikol\Desktop\ServiceFlow\ServiceFlow""'"
)

REM 6) Wait until http://localhost:3000 is available (only if not already up)
if defined FRONTEND_UP (
    REM Already up, skip waiting
) else (
    powershell -NoLogo -NoProfile -Command ^
      "for($i=0;$i -lt 60;$i++){try{iwr -UseBasicParsing http://localhost:3000/ -TimeoutSec 1|Out-Null;exit 0}catch{};Start-Sleep -Milliseconds 500};exit 1"
)

REM 7) Open Brave in app mode directly to dashboard
start "" "C:\Program Files\BraveSoftware\Brave-Browser\Application\brave.exe" --app=http://localhost:3000/dashboard/overview --start-maximized

endlocal
exit /b 0

