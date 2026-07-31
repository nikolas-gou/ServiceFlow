import { Box, Grid } from '@mui/material';
import { ShowChart, People, Build, Euro, Warning } from '@mui/icons-material';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale } from 'chart.js';
import LoadingCard from '../common/LoadingCard';
import { useDashboardStats } from '../../hooks/useStatistics';
import { StatisticCard } from './parts/StatisticCard';
import { useErrorSnackbar } from '../../hooks/useErrorSnackbar';
import { safeStatValue, safeDataArray } from '../../utils/errorHandling';
import { calculateTrend, formatValue } from '../../utils/statistics';
import StyledSnackbar from '../common/StyledSnackbar';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale);

export default function StatisticsCardsRepair() {
  const { data: statistics, isLoading } = useDashboardStats();
  const stats = statistics || {};

  const { showErrorToast, errorMessage, handleCloseErrorToast } = useErrorSnackbar(
    stats as Record<string, unknown>,
    safeStatValue,
  );

  const getStatsConfig = () => {
    const repairData = safeStatValue(stats.repair?.totalRepairs);
    const customerData = safeStatValue(stats.customer?.totalCustomers);
    const motorData = safeStatValue(stats.motor?.totalMotors);
    const revenueData = safeStatValue(stats.revenue?.yearlyRevenue);

    const repairTrend = calculateTrend(safeDataArray(stats.repair?.trends?.monthlyTrends));
    const customerTrend = calculateTrend(safeDataArray(stats.customer?.trends?.monthlyTrends));
    const motorTrend = calculateTrend(safeDataArray(stats.motor?.trends?.monthlyTrends));
    const revenueTrend = calculateTrend(safeDataArray(stats.revenue?.trends?.monthlyTrends));

    return [
      {
        title: 'Συνολικές Επισκευές',
        value: repairData.isError ? repairData.value : formatValue(repairData.value),
        trend: repairData.isError ? null : repairTrend,
        color: repairData.isError ? 'error' : 'indigo',
        icon: repairData.isError ? <Warning fontSize="small" /> : <Build fontSize="small" />,
        data: safeDataArray(stats.repair?.trends?.monthlyTrends),
        isError: repairData.isError,
        errorMessage: repairData.errorMessage,
        errorDetails: repairData.errorDetails,
      },
      {
        title: 'Συνολικοί Πελάτες',
        value: customerData.isError ? customerData.value : formatValue(customerData.value),
        trend: customerData.isError ? null : customerTrend,
        color: customerData.isError ? 'error' : 'indigo',
        icon: customerData.isError ? <Warning fontSize="small" /> : <People fontSize="small" />,
        data: safeDataArray(stats.customer?.trends?.monthlyTrends),
        isError: customerData.isError,
        errorMessage: customerData.errorMessage,
        errorDetails: customerData.errorDetails,
      },
      {
        title: 'Συνολικά Μοτέρ',
        value: motorData.isError ? motorData.value : formatValue(motorData.value),
        trend: motorData.isError ? null : motorTrend,
        color: motorData.isError ? 'error' : 'indigo',
        icon: motorData.isError ? <Warning fontSize="small" /> : <ShowChart fontSize="small" />,
        data: safeDataArray(stats.motor?.trends?.monthlyTrends),
        isError: motorData.isError,
        errorMessage: motorData.errorMessage,
        errorDetails: motorData.errorDetails,
      },
      {
        title: 'Ετήσια Έσοδα',
        value: revenueData.isError ? revenueData.value : formatValue(revenueData.value, 'currency'),
        trend: revenueData.isError ? null : revenueTrend,
        color: revenueData.isError ? 'error' : 'indigo',
        icon: revenueData.isError ? <Warning fontSize="small" /> : <Euro fontSize="small" />,
        data: safeDataArray(stats.revenue?.trends?.monthlyTrends),
        isError: revenueData.isError,
        errorMessage: revenueData.errorMessage,
        errorDetails: revenueData.errorDetails,
      },
    ];
  };

  if (isLoading) {
    return (
      <Box sx={{ p: 1.5, mb: 1.5 }}>
        <Grid container spacing={2.5}>
          {[1, 2, 3, 4].map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item}>
              <LoadingCard />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  const statsConfig = getStatsConfig();

  return (
    <>
      <Box sx={{ p: 1.5, mb: 1.5 }}>
        <Grid container spacing={2.5}>
          {statsConfig.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <StatisticCard {...stat} />
            </Grid>
          ))}
        </Grid>
      </Box>

      <StyledSnackbar
        open={showErrorToast}
        onClose={handleCloseErrorToast}
        severity="error"
        title="Σφάλμα"
        message={errorMessage}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </>
  );
}
