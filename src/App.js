import logo from './logo.svg';
import './App.css';
import { ThemeProvider, CssBaseline, Typography } from '@mui/material';

import theme from './styles/Themes';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Repairs from './components/layout/repairs/Repairs';
import StatisticsCardsCustomer from './components/stats/StatisticsCardsCustomer';
import Customers from './components/layout/customers/Customers';
import { SearchProvider } from './context/SearchContext';
import { RepairsProvider } from './context/RepairsContext';
import StatisticsCardsRepair from './components/stats/StatisticsCardsRepair';
import AnalyticsDashboard from './components/stats/AnalyticsDashboard';

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
                      <StatisticsCardsRepair />
                      <Repairs />
                    </>
                  }
                />
                <Route exact path="/dashboard/analytics" element={<AnalyticsDashboard />} />
                <Route
                  exact
                  path="/dashboard/customers"
                  element={
                    <>
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
