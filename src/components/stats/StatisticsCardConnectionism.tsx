import { Box, Grid } from '@mui/material';
import { Cable, Link, DeviceHub, Hub } from '@mui/icons-material';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale } from 'chart.js';
import LoadingCard from '../common/LoadingCard';
import { useConnectionismStats } from '../../hooks/useStatistics';
import { StatisticCard } from './parts/StatisticCard';
import { calculateTrend, formatValue, getSafeDataArray } from '../../utils/statistics';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale);

export default function StatisticsCardConnectionism() {
  const { data: statistics, isLoading } = useConnectionismStats();
  const stats = statistics || {};

  const getStatsConfig = () => {
    const simpleTrend = calculateTrend(stats.monthlySimpleTrends);
    const oneTimeParallelTrend = calculateTrend(stats.monthlyOneTimeParallelTrends);
    const twoTimesParallelTrend = calculateTrend(stats.monthlyTwoTimesParallelTrends);
    const threeTimesParallelTrend = calculateTrend(stats.monthlyThreeTimesParallelTrends);

    return [
      {
        title: 'Απλή',
        value: formatValue(stats.totalSimple || 0),
        trend: simpleTrend,
        color: 'indigo',
        icon: <Cable fontSize="small" />,
        data: getSafeDataArray(stats.monthlySimpleTrends),
      },
      {
        title: '1 φορά παράλληλη',
        value: formatValue(stats.totalOneTimeParallel || 0),
        trend: oneTimeParallelTrend,
        color: 'indigo',
        icon: <Link fontSize="small" />,
        data: getSafeDataArray(stats.monthlyOneTimeParallelTrends),
      },
      {
        title: '2 φορές παράλληλη',
        value: formatValue(stats.totalTwoTimesParallel || 0),
        trend: twoTimesParallelTrend,
        color: 'indigo',
        icon: <DeviceHub fontSize="small" />,
        data: getSafeDataArray(stats.monthlyTwoTimesParallelTrends),
      },
      {
        title: '3 φορές παράλληλη',
        value: formatValue(stats.totalThreeTimesParallel || 0),
        trend: threeTimesParallelTrend,
        color: 'indigo',
        icon: <Hub fontSize="small" />,
        data: getSafeDataArray(stats.monthlyThreeTimesParallelTrends),
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
    <Box sx={{ p: 1.5, mb: 1.5 }}>
      <Grid container spacing={2.5}>
        {statsConfig.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatisticCard {...stat} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
