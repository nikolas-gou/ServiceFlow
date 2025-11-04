@echo off
setlocal

REM =============================
REM Stop ServiceFlow
REM - Kills listeners on ports 3000 (frontend) and 8000 (PHP)
REM - Kills WAMP processes
REM - Kills all cmd.exe, node.exe, npm.exe, php.exe related processes
REM =============================

echo Stopping ServiceFlow...
echo.

REM 1) Kill any process listening on :3000
echo [1/8] Checking port 3000...
for /f "usebackq tokens=5" %%P in (`netstat -ano -p TCP ^| find ":3000" ^| find "LISTENING"`) do (
  echo   Stopping PID %%P...
  taskkill /PID %%P /F >nul 2>&1
)

REM 2) Kill any process listening on :8000
echo [2/8] Checking port 8000...
for /f "usebackq tokens=5" %%P in (`netstat -ano -p TCP ^| find ":8000" ^| find "LISTENING"`) do (
  echo   Stopping PID %%P...
  taskkill /PID %%P /F >nul 2>&1
)

REM 3) Kill WAMP processes
echo [3/8] Stopping WAMP...
taskkill /IM wampmanager.exe /F >nul 2>&1 && echo   WAMP Manager stopped.
taskkill /IM wampapache64.exe /F >nul 2>&1 && echo   WAMP Apache stopped.
taskkill /IM wampmysqld64.exe /F >nul 2>&1 && echo   WAMP MySQL stopped.

REM 4) Kill all node.exe processes
echo [4/8] Stopping Node.js processes...
taskkill /IM node.exe /F >nul 2>&1 && echo   Node.js processes stopped.

REM 5) Kill all npm.exe processes
echo [5/8] Stopping npm processes...
taskkill /IM npm.exe /F >nul 2>&1 && echo   npm processes stopped.

REM 6) Kill php.exe processes running the server
echo [6/8] Stopping PHP server processes...
powershell -NoLogo -NoProfile -Command ^
  "$procs = Get-CimInstance Win32_Process | Where-Object { " ^
  "  ($_.Name -eq 'php.exe') -and " ^
  "  ($_.CommandLine -match '-S.*8000') " ^
  "};" ^
  "foreach($p in $procs){ " ^
  "  try { " ^
  "    Stop-Process -Id $p.ProcessId -Force -ErrorAction SilentlyContinue; " ^
  "    Write-Host \"  Stopped PHP PID $($p.ProcessId)\" " ^
  "  } catch {} " ^
  "}"

REM 7) Kill ALL cmd.exe processes (they will be recreated if needed)
echo [7/8] Stopping cmd.exe terminals...
powershell -NoLogo -NoProfile -Command ^
  "$projectPath='C:\Users\nikol\Desktop\ServiceFlow';" ^
  "$allCmdProcs = Get-CimInstance Win32_Process | Where-Object { $_.Name -eq 'cmd.exe' };" ^
  "$stopped = 0;" ^
  "foreach($p in $allCmdProcs){ " ^
  "  try { " ^
  "    $cmdLine = $p.CommandLine;" ^
  "    $execPath = $p.ExecutablePath;" ^
  "    $parent = Get-CimInstance Win32_Process -Filter \"ProcessId = $($p.ParentProcessId)\" -ErrorAction SilentlyContinue;" ^
  "    $shouldKill = $false;" ^
  "    if($cmdLine -match 'npm start|ServiceFlow|wampmanager'){ $shouldKill = $true; }" ^
  "    if($parent -and ($parent.Name -eq 'powershell.exe' -or $parent.Name -eq 'cmd.exe')){ $shouldKill = $true; }" ^
  "    if($shouldKill){ " ^
  "      Stop-Process -Id $p.ProcessId -Force -ErrorAction SilentlyContinue; " ^
  "      Write-Host \"  Stopped CMD PID $($p.ProcessId)\"; " ^
  "      $stopped++ " ^
  "    } " ^
  "  } catch {} " ^
  "};" ^
  "if($stopped -eq 0){ Write-Host \"  No related cmd.exe found.\" }"

REM 8) Final cleanup - kill any cmd.exe that has wampmanager as child
echo [8/8] Final cleanup...
powershell -NoLogo -NoProfile -Command ^
  "$wampProcs = Get-CimInstance Win32_Process | Where-Object { $_.Name -eq 'wampmanager.exe' };" ^
  "foreach($wamp in $wampProcs){ " ^
  "  try { " ^
  "    $parent = Get-CimInstance Win32_Process -Filter \"ProcessId = $($wamp.ParentProcessId)\" -ErrorAction SilentlyContinue; " ^
  "    if($parent -and $parent.Name -eq 'cmd.exe'){ " ^
  "      Stop-Process -Id $parent.ProcessId -Force -ErrorAction SilentlyContinue; " ^
  "      Write-Host \"  Stopped CMD parent of WAMP (PID $($parent.ProcessId))\"; " ^
  "    } " ^
  "  } catch {} " ^
  "}"

echo.
echo ServiceFlow stopped.
echo.
timeout /t 2 /nobreak >nul
endlocal
exit /b 0
