import './App.css';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './styles/Themes';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from './components/layout/Layout';
import { SearchProvider } from './context/SearchContext';
import { RepairsProvider } from './context/RepairsContext';
import { ConnectionsProvider } from './context/ConnectionsContext';
import { routes } from './routes';
import { SuggestedFormValuesProvider } from './context/SuggestedFormValuesContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 30 * 1000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <RepairsProvider>
          <ConnectionsProvider>
            <SearchProvider>
            <BrowserRouter>
              <CssBaseline />
              <SuggestedFormValuesProvider>
                <Layout>
                  <Routes>
                    {routes.map((route) => (
                      <Route key={route.path} path={route.path} element={route.element} />
                    ))}
                  </Routes>
                </Layout>
              </SuggestedFormValuesProvider>
            </BrowserRouter>
            </SearchProvider>
          </ConnectionsProvider>
        </RepairsProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
