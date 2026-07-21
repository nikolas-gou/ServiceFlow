import React from 'react';
import { Box, Grid } from '@mui/material';
import {
  Memory,
  ElectricalServices,
  SettingsInputComponent,
  Power,
  Warning,
} from '@mui/icons-material';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale } from 'chart.js';
import LoadingCard from '../common/LoadingCard';
import { useDashboardStats } from '../../hooks/useStatistics';
import { StatisticCard } from './parts/StatisticCard';
import { useErrorSnackbar } from '../../hooks/useErrorSnackbar';
import { safeStatValue, safeDataArray } from '../../utils/errorHandling';
import { calculateTrend, formatValue } from '../../utils/statistics';
import StyledSnackbar from '../common/StyledSnackbar';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale);

export default function StatisticsCardsMotor() {
  const { data: statistics = {}, isLoading } = useDashboardStats();

  const { showErrorToast, errorMessage, handleCloseErrorToast } = useErrorSnackbar(
    statistics,
    safeStatValue,
  );

  const getStatsConfig = () => {
    const totalData = safeStatValue(statistics.motor?.totalMotors);
    const onePhaseData = safeStatValue(statistics.motor?.motorTypes?.totalOnePhaseMotors);
    const threePhaseData = safeStatValue(statistics.motor?.motorTypes?.totalThreePhaseMotors);
    const generatorData = safeStatValue(statistics.motor?.motorTypes?.totalGeneratorMotors);

    const totalTrend = calculateTrend(safeDataArray(statistics.motor?.trends?.monthlyTrends));
    const onePhaseTrend = calculateTrend(
      safeDataArray(statistics.motor?.trends?.monthlyOnePhaseTrends),
    );
    const threePhaseTrend = calculateTrend(
      safeDataArray(statistics.motor?.trends?.monthlyThreePhaseTrends),
    );
    const generatorTrend = calculateTrend(
      safeDataArray(statistics.motor?.trends?.monthlyGeneratorTrends),
    );

    return [
      {
        title: 'Συνολικοί Κινητήρες',
        value: totalData.isError ? totalData.value : formatValue(totalData.value),
        trend: totalData.isError ? null : totalTrend,
        color: totalData.isError ? 'error' : 'indigo',
        icon: totalData.isError ? <Warning fontSize="small" /> : <Memory fontSize="small" />,
        data: safeDataArray(statistics.motor?.trends?.monthlyTrends),
        isError: totalData.isError,
        errorMessage: totalData.errorMessage,
        errorDetails: totalData.errorDetails,
      },
      {
        title: 'Μονοφασικοί',
        value: onePhaseData.isError ? onePhaseData.value : formatValue(onePhaseData.value),
        trend: onePhaseData.isError ? null : onePhaseTrend,
        color: onePhaseData.isError ? 'error' : 'indigo',
        icon: onePhaseData.isError ? (
          <Warning fontSize="small" />
        ) : (
          <ElectricalServices fontSize="small" />
        ),
        data: safeDataArray(statistics.motor?.trends?.monthlyOnePhaseTrends),
        isError: onePhaseData.isError,
        errorMessage: onePhaseData.errorMessage,
        errorDetails: onePhaseData.errorDetails,
      },
      {
        title: 'Τριφασικοί',
        value: threePhaseData.isError ? threePhaseData.value : formatValue(threePhaseData.value),
        trend: threePhaseData.isError ? null : threePhaseTrend,
        color: threePhaseData.isError ? 'error' : 'indigo',
        icon: threePhaseData.isError ? (
          <Warning fontSize="small" />
        ) : (
          <SettingsInputComponent fontSize="small" />
        ),
        data: safeDataArray(statistics.motor?.trends?.monthlyThreePhaseTrends),
        isError: threePhaseData.isError,
        errorMessage: threePhaseData.errorMessage,
        errorDetails: threePhaseData.errorDetails,
      },
      {
        title: 'Γεννήτριες',
        value: generatorData.isError ? generatorData.value : formatValue(generatorData.value),
        trend: generatorData.isError ? null : generatorTrend,
        color: generatorData.isError ? 'error' : 'indigo',
        icon: generatorData.isError ? <Warning fontSize="small" /> : <Power fontSize="small" />,
        data: safeDataArray(statistics.motor?.trends?.monthlyGeneratorTrends),
        isError: generatorData.isError,
        errorMessage: generatorData.errorMessage,
        errorDetails: generatorData.errorDetails,
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
