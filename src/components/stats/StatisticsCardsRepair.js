import React, { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  ShowChart,
  People,
  Build,
  Euro,
  Warning,
} from '@mui/icons-material';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale } from 'chart.js';
import { useLocation } from 'react-router-dom';
import LoadingCard from '../common/LoadingCard';
import ErrorSnackbar from '../common/ErrorSnackbar';
import { StatisticRepository } from '../Repositories/StatisticRepository';
import { StatisticCard } from './parts/StatisticCard';
import { useErrorSnackbar } from '../../hooks/useErrorSnackbar';
import { safeStatValue, safeDataArray, getStandardErrorMessage } from '../../utils/errorHandling';
import {
  calculateTrend,
  formatValue,
  getSafeDataArray,
  getTrendColor,
} from '../../utils/statistics';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale);

export default function StatisticsCardsRepair() {
  const location = useLocation();
  const [statistics, setStatistics] = useState({});
  const [loading, setLoading] = useState(true);

  // Χρήση του custom hook για error snackbar
  const { showErrorToast, errorMessage, handleCloseErrorToast } = useErrorSnackbar(
    statistics,
    safeStatValue,
  );

  const getStatsConfig = () => {
    // Ασφαλή εξαγωγή δεδομένων με error handling
    const repairData = safeStatValue(statistics.repair?.totalRepairs);
    const customerData = safeStatValue(statistics.customer?.totalCustomers);
    const motorData = safeStatValue(statistics.motor?.totalMotors);
    const revenueData = safeStatValue(statistics.revenue?.yearlyRevenue);

    // Ασφαλή trends με fallback σε άδεια arrays
    const repairTrend = calculateTrend(safeDataArray(statistics.repair?.trends?.monthlyTrends));
    const customerTrend = calculateTrend(safeDataArray(statistics.customer?.trends?.monthlyTrends));
    const motorTrend = calculateTrend(safeDataArray(statistics.motor?.trends?.monthlyTrends));
    const revenueTrend = calculateTrend(safeDataArray(statistics.revenue?.trends?.monthlyTrends));

    return [
      {
        title: 'Συνολικές Επισκευές',
        value: repairData.isError ? repairData.value : formatValue(repairData.value),
        trend: repairData.isError ? null : repairTrend,
        color: repairData.isError ? 'error' : 'indigo',
        icon: repairData.isError ? <Warning fontSize="small" /> : <Build fontSize="small" />,
        data: safeDataArray(statistics.repair?.trends?.monthlyTrends),
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
        data: safeDataArray(statistics.customer?.trends?.monthlyTrends),
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
        data: safeDataArray(statistics.motor?.trends?.monthlyTrends),
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
        data: safeDataArray(statistics.revenue?.trends?.monthlyTrends),
        isError: revenueData.isError,
        errorMessage: revenueData.errorMessage,
        errorDetails: revenueData.errorDetails,
      },
    ];
  };

  useEffect(() => {
    loadStatistics();
  }, [location]);

  const loadStatistics = async () => {
    setLoading(true);
    try {
      const response = await StatisticRepository.getDashboard();
      setStatistics(response || {});
    } catch (err) {
      console.error(getStandardErrorMessage('dashboard', err));
      setStatistics({});
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
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

  const stats = getStatsConfig();

  return (
    <>
      <Box sx={{ p: 1.5, mb: 1.5 }}>
        <Grid container spacing={2.5}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <StatisticCard {...stat} />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Error Snackbar */}
      <ErrorSnackbar open={showErrorToast} message={errorMessage} onClose={handleCloseErrorToast} />
    </>
  );
}
