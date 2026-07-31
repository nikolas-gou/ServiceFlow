import { Navigate, type RouteObject } from 'react-router-dom';
import AnalyticsDashboard from '../components/stats/AnalyticsDashboard';
import Overview from '../pages/Overview';
import CustomersPage from '../pages/CustomersPage';
import MotorsPage from '../pages/MotorsPage';
import MotorDetail from '../components/layout/motors/MotorDetail';
import { ConnectionismPage } from '../pages/ConnectionismPage';
import RepairsPage from '../pages/RepairsPage';
import RepairsTrashPage from '../pages/RepairsTrashPage';
import RepairDetail from '../components/layout/repairs/RepairDetail';
import RepairFormV2Page from '../pages/RepairFormV2Page';

export const routes: RouteObject[] = [
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
    path: '/dashboard/motors',
    element: <MotorsPage />,
  },
  {
    path: '/dashboard/motors/:id',
    element: <MotorDetail />,
  },
  {
    path: '/dashboard/services',
    element: <RepairsPage />,
  },
  {
    path: '/dashboard/services/trash',
    element: <RepairsTrashPage />,
  },
  {
    // Φόρμα καταχώρησης νέας επισκευής (stepper) - βλ. MIGRATION_V2.md
    path: '/dashboard/services/new-v2',
    element: <RepairFormV2Page />,
  },
  {
    path: '/dashboard/services/:id',
    element: <RepairDetail />,
  },
  { path: '/dashboard/connections', element: <ConnectionismPage /> },
];
