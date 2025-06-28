import { Navigate } from 'react-router-dom';
import AnalyticsDashboard from '../components/stats/AnalyticsDashboard';
import { Typography } from '@mui/material';
import Overview from '../pages/Overview';
import CustomersPage from '../pages/CustomersPage';

export const routes = [
  {
    path: '/',
    element: <Navigate to="/dashboard/overview" />,
  },
  {
    path: '/dashboard/overview',
    element: <Overview />,
  },
  {
    path: '/dashboard/analytics',
    element: <AnalyticsDashboard />,
  },
  {
    path: '/dashboard/customers',
    element: <CustomersPage />,
  },
  {
    path: '/dashboard/services',
    element: <Typography>services</Typography>,
  },
];
