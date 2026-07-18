import { Navigate } from 'react-router-dom';
import AnalyticsDashboard from '../components/stats/AnalyticsDashboard';
import Overview from '../pages/Overview';
import CustomersPage from '../pages/CustomersPage';
import { ConnectionismPage } from '../pages/ConnectionismPage';
import RepairsPage from '../pages/RepairsPage';
import RepairsTrashPage from '../pages/RepairsTrashPage';

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
    element: <RepairsPage />,
  },
  {
    path: '/dashboard/services/trash',
    element: <RepairsTrashPage />,
  },
  { path: '/dashboard/connections', element: <ConnectionismPage /> },
];
