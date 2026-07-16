import React from 'react';
import { Box, Grid } from '@mui/material';
import { Cable, Link, DeviceHub, Hub } from '@mui/icons-material';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale } from 'chart.js';
import LoadingCard from '../common/LoadingCard';
import { useConnectionismStats } from '../../hooks/useStatistics';
import { StatisticCard } from './parts/StatisticCard';
import { calculateTrend, formatValue, getSafeDataArray } from '../../utils/statistics';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale);

export default function StatisticsCardConnectionism() {
  const { data: statistics = {}, isLoading } = useConnectionismStats();

  const getStatsConfig = () => {
    const simpleTrend = calculateTrend(statistics.monthlySimpleTrends);
    const oneTimeParallelTrend = calculateTrend(statistics.monthlyOneTimeParallelTrends);
    const twoTimesParallelTrend = calculateTrend(statistics.monthlyTwoTimesParallelTrends);
    const threeTimesParallelTrend = calculateTrend(statistics.monthlyThreeTimesParallelTrends);

    return [
      {
        title: 'Απλή',
        value: formatValue(statistics.totalSimple),
        trend: simpleTrend,
        color: 'indigo',
        icon: <Cable fontSize="small" />,
        data: getSafeDataArray(statistics.monthlySimpleTrends),
      },
      {
        title: '1 φορά παράλληλη',
        value: formatValue(statistics.totalOneTimeParallel),
        trend: oneTimeParallelTrend,
        color: 'indigo',
        icon: <Link fontSize="small" />,
        data: getSafeDataArray(statistics.monthlyOneTimeParallelTrends),
      },
      {
        title: '2 φορές παράλληλη',
        value: formatValue(statistics.totalTwoTimesParallel),
        trend: twoTimesParallelTrend,
        color: 'indigo',
        icon: <DeviceHub fontSize="small" />,
        data: getSafeDataArray(statistics.monthlyTwoTimesParallelTrends),
      },
      {
        title: '3 φορές παράλληλη',
        value: formatValue(statistics.totalThreeTimesParallel),
        trend: threeTimesParallelTrend,
        color: 'indigo',
        icon: <Hub fontSize="small" />,
        data: getSafeDataArray(statistics.monthlyThreeTimesParallelTrends),
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
    <Box sx={{ p: 1.5, mb: 1.5 }}>
      <Grid container spacing={2.5}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatisticCard {...stat} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
