import logo from "./logo.svg";
import "./App.css";
import { ThemeProvider, CssBaseline } from "@mui/material";

import theme from "./styles/Themes";
import SideBar from "./components/layout/SideBar";
import TopAppBar from "./components/layout/TopAppBar";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Resets styles for consistency */}
      <SideBar />
    </ThemeProvider>
  );
}

export default App;
