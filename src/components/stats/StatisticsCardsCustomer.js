import React, { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import { People, Business, Person, Euro, Warning } from '@mui/icons-material';
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

export default function StatisticsCardsCustomer() {
  const location = useLocation();
  const [statistics, setStatistics] = useState({});
  const [loading, setLoading] = useState(true);

  // Χρήση του custom hook για error snackbar
  const { showErrorToast, errorMessage, handleCloseErrorToast } = useErrorSnackbar(
    statistics,
    safeStatValue,
  );

  const getStatsConfig = () => {
    const customerTrend = calculateTrend(safeDataArray(statistics.trends?.monthlyTrends));
    const individualTrend = calculateTrend(
      safeDataArray(statistics.trends?.monthlyIndividualTrends),
    );
    const factoryTrend = calculateTrend(safeDataArray(statistics.trends?.monthlyFactoryTrends));

    // Παίρνουμε τον καλύτερο πελάτη - ελέγχουμε πρώτα για error
    const topCustomersResult = safeStatValue(statistics.topCustomersByRevenue);
    const topCustomer =
      !topCustomersResult.isError && Array.isArray(statistics.topCustomersByRevenue)
        ? statistics.topCustomersByRevenue[0]
        : null;

    const totalCustomersData = safeStatValue(statistics.totalCustomers);
    const individualData = safeStatValue(statistics.customerTypes?.individual);
    const factoryData = safeStatValue(statistics.customerTypes?.factory);

    // Για topCustomer, ελέγχουμε πρώτα αν τα topCustomersByRevenue είχαν error
    const topCustomerData = topCustomersResult.isError
      ? {
          value: 'Μη διαθέσιμο',
          isError: true,
          errorMessage: topCustomersResult.errorMessage,
          errorDetails: topCustomersResult.errorDetails,
        }
      : topCustomer
      ? safeStatValue(topCustomer.totalRevenue, '€0')
      : { value: '€0', isError: false, errorMessage: null };

    return [
      {
        title: 'Συνολικοί Πελάτες',
        value: totalCustomersData.isError
          ? totalCustomersData.value
          : formatValue(totalCustomersData.value),
        trend: totalCustomersData.isError ? null : customerTrend,
        color: totalCustomersData.isError ? 'error' : 'indigo',
        icon: totalCustomersData.isError ? (
          <Warning fontSize="small" />
        ) : (
          <People fontSize="small" />
        ),
        data: safeDataArray(statistics.trends?.monthlyTrends),
        isError: totalCustomersData.isError,
        errorMessage: totalCustomersData.errorMessage,
        errorDetails: totalCustomersData.errorDetails,
      },
      {
        title: 'Ιδιώτες Πελάτες',
        value: individualData.isError ? individualData.value : formatValue(individualData.value),
        trend: individualData.isError ? null : individualTrend,
        color: individualData.isError ? 'error' : 'indigo',
        icon: individualData.isError ? <Warning fontSize="small" /> : <Person fontSize="small" />,
        data: safeDataArray(statistics.trends?.monthlyIndividualTrends),
        isError: individualData.isError,
        errorMessage: individualData.errorMessage,
        errorDetails: individualData.errorDetails,
      },
      {
        title: 'Εργοστάσια',
        value: factoryData.isError ? factoryData.value : formatValue(factoryData.value),
        trend: factoryData.isError ? null : factoryTrend,
        color: factoryData.isError ? 'error' : 'indigo',
        icon: factoryData.isError ? <Warning fontSize="small" /> : <Business fontSize="small" />,
        data: safeDataArray(statistics.trends?.monthlyFactoryTrends),
        isError: factoryData.isError,
        errorMessage: factoryData.errorMessage,
        errorDetails: factoryData.errorDetails,
      },
      {
        title: 'Καλύτερος Πελάτης',
        value: topCustomerData.isError
          ? topCustomerData.value
          : formatValue(topCustomerData.value, 'currency'),
        trend: null,
        color: topCustomerData.isError ? 'error' : 'indigo',
        icon: topCustomerData.isError ? <Warning fontSize="small" /> : <Euro fontSize="small" />,
        data: [
          topCustomer && typeof topCustomer.totalRevenue === 'number'
            ? topCustomer.totalRevenue
            : 0,
        ],
        customTitle: topCustomer ? `${topCustomer.name}` : 'Δεν υπάρχουν δεδομένα',
        isError: topCustomerData.isError,
        errorMessage: topCustomerData.errorMessage,
        errorDetails: topCustomerData.errorDetails,
      },
    ];
  };

  useEffect(() => {
    loadStatistics();
  }, [location]);

  const loadStatistics = async () => {
    setLoading(true);
    try {
      const response = await StatisticRepository.getCustomerStatistics();

      // Διόρθωση: το StatisticRepository επιστρέφει ήδη τα δεδομένα, όχι response.data
      setStatistics(response || {});
    } catch (err) {
      console.error(getStandardErrorMessage('πελατών', err));
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
