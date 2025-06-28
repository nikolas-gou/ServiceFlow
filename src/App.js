import './App.css';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './styles/Themes';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { SearchProvider } from './context/SearchContext';
import { RepairsProvider } from './context/RepairsContext';
import { routes } from './routes';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RepairsProvider>
        <SearchProvider>
          <BrowserRouter>
            <CssBaseline />
            <Layout>
              <Routes>
                {routes.map((route) => (
                  <Route key={route.path} path={route.path} element={route.element} />
                ))}
              </Routes>
            </Layout>
          </BrowserRouter>
        </SearchProvider>
      </RepairsProvider>
    </ThemeProvider>
  );
}

export default App;
