import logo from './logo.svg';
import './App.css';
import { ThemeProvider, CssBaseline, Typography } from '@mui/material';

import theme from './styles/Themes';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import StatisticsCards from './components/stats/StatisticsCards';
import Repairs from './components/layout/repairs/Repairs';
import StatisticsCardsCustomer from './components/stats/StatisticsCardsCustomer';
import Customers from './components/layout/customers/Customers';
import { SearchProvider } from './context/SearchContext';
import { RepairsProvider } from './context/RepairsContext';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RepairsProvider>
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
                      <StatisticsCards />
                      <Repairs />
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
      </RepairsProvider>
    </ThemeProvider>
  );
}

export default App;
