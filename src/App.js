import logo from "./logo.svg";
import "./App.css";
import { ThemeProvider, CssBaseline, Typography } from "@mui/material";

import theme from "./styles/Themes";
import SideBar from "./components/layout/SideBar";
import TopAppBar from "./components/layout/TopAppBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline /> {/* Resets styles for consistency */}
        <Layout sideBar={<SideBar />}>
          <SideBar />
          <Routes>
            <Route
              exact
              path="/dashboard/overview"
              element={<Typography>overview</Typography>}
            />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
