import { Box, Grid } from '@mui/material';
import { People, Business, Person, Euro, Warning } from '@mui/icons-material';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale } from 'chart.js';
import LoadingCard from '../common/LoadingCard';
import { useCustomerStats } from '../../hooks/useStatistics';
import { StatisticCard } from './parts/StatisticCard';
import { useErrorSnackbar } from '../../hooks/useErrorSnackbar';
import { safeStatValue, safeDataArray } from '../../utils/errorHandling';
import { calculateTrend, formatValue } from '../../utils/statistics';
import StyledSnackbar from '../common/StyledSnackbar';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale);

export default function StatisticsCardsCustomer() {
  const { data: statistics, isLoading } = useCustomerStats();
  const stats = statistics || {};

  const { showErrorToast, errorMessage, handleCloseErrorToast } = useErrorSnackbar(
    stats as Record<string, unknown>,
    safeStatValue,
  );

  const getStatsConfig = () => {
    const customerTrend = calculateTrend(safeDataArray(stats.trends?.monthlyTrends));
    const individualTrend = calculateTrend(
      safeDataArray(stats.trends?.monthlyIndividualTrends),
    );
    const factoryTrend = calculateTrend(safeDataArray(stats.trends?.monthlyFactoryTrends));

    const topCustomersResult = safeStatValue(stats.topCustomersByRevenue);
    const topCustomer =
      !topCustomersResult.isError && Array.isArray(stats.topCustomersByRevenue)
        ? stats.topCustomersByRevenue[0]
        : null;

    const totalCustomersData = safeStatValue(stats.totalCustomers);
    const individualData = safeStatValue(stats.customerTypes?.individual);
    const factoryData = safeStatValue(stats.customerTypes?.factory);

    const topCustomerData = topCustomersResult.isError
      ? {
          value: 'Μη διαθέσιμο',
          isError: true,
          errorMessage: topCustomersResult.errorMessage,
          errorDetails: topCustomersResult.errorDetails,
        }
      : topCustomer
      ? safeStatValue(topCustomer.totalRevenue, '€0')
      : { value: '€0', isError: false, errorMessage: null, errorDetails: undefined };

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
        data: safeDataArray(stats.trends?.monthlyTrends),
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
        data: safeDataArray(stats.trends?.monthlyIndividualTrends),
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
        data: safeDataArray(stats.trends?.monthlyFactoryTrends),
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
