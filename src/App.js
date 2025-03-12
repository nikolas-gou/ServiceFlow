import logo from "./logo.svg";
import "./App.css";
import { ThemeProvider, CssBaseline, Typography } from "@mui/material";

import theme from "./styles/Themes";
import SideBar from "./components/layout/SideBar";
import TopAppBar from "./components/layout/TopAppBar";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import Layout from "./components/layout/Layout";
import StatisticsCards from "./components/stats/StatisticsCards";
import Repairs from "./components/layout/repairs/Repairs";
import StatisticsCardsCustomer from "./components/stats/StatisticsCardsCustomer";
import Customers from "./components/layout/customers/Customers";
import { SearchProvider } from "./context/SearchContext";
import CreateRepairForm from "./components/layout/form/CreateRepairForm";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SearchProvider>
        <BrowserRouter>
          <CssBaseline /> {/* Resets styles for consistency */}
          <Layout>
            <Routes>
              {/* default route */}
              <Route path="/" element={<Navigate to="/dashboard/overview" />} />

              <Route
                exact
                path="/dashboard/overview"
                element={
                  <>
                    <Typography variant="h6">Αρχική</Typography>
                    {/* <StatisticsCards />
                    <Repairs /> */}
                    <CreateRepairForm />
                  </>
                }
              />
              <Route
                exact
                path="/dashboard/analytics"
                element={<Typography>analytics</Typography>}
              />
              <Route
                exact
                path="/dashboard/customers"
                element={
                  <>
                    <Typography variant="h6">Πελάτες</Typography>
                    <StatisticsCardsCustomer />
                    <Customers />
                  </>
                }
              />
              <Route
                exact
                path="/dashboard/services"
                element={<Typography>services</Typography>}
              />
            </Routes>
          </Layout>
        </BrowserRouter>
      </SearchProvider>
    </ThemeProvider>
  );
}

export default App;
