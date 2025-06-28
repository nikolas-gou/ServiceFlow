import React, { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import { TrendingUp, TrendingDown, ShowChart, People, Build, Euro } from '@mui/icons-material';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale } from 'chart.js';
import { useLocation } from 'react-router-dom';
import LoadingCard from '../common/LoadingCard';
import { StatisticRepository } from '../Repositories/StatisticRepository';
import { StatisticCard } from './parts/StatisticCard';
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

  const getStatsConfig = () => {
    const repairTrend = calculateTrend(statistics.monthlyRepairTrends);
    const customerTrend = calculateTrend(statistics.monthlyCustomerTrends);
    const motorTrend = calculateTrend(statistics.monthlyMotorTrends);
    const revenueTrend = calculateTrend(statistics.monthlyRevenueTrends);

    return [
      {
        title: 'Συνολικές Επισκευές',
        value: formatValue(statistics.totalRepairs),
        trend: repairTrend,
        color: 'indigo',
        icon: <Build fontSize="small" />,
        data: getSafeDataArray(statistics.monthlyRepairTrends),
      },
      {
        title: 'Συνολικοί Πελάτες',
        value: formatValue(statistics.totalCustomers),
        trend: customerTrend,
        color: 'indigo',
        icon: <People fontSize="small" />,
        data: getSafeDataArray(statistics.monthlyCustomerTrends),
      },
      {
        title: 'Συνολικά Μοτέρ',
        value: formatValue(statistics.totalMotors),
        trend: motorTrend,
        color: 'indigo',
        icon: <ShowChart fontSize="small" />,
        data: getSafeDataArray(statistics.monthlyMotorTrends),
      },
      {
        title: 'Ετήσια Έσοδα',
        value: formatValue(statistics.yearlyRevenue, 'currency'),
        trend: revenueTrend,
        color: 'indigo',
        icon: <Euro fontSize="small" />,
        data: getSafeDataArray(statistics.monthlyRevenueTrends),
      },
    ];
  };

  useEffect(() => {
    loadStatistics();
  }, [location]);

  const loadStatistics = async () => {
    setLoading(true);
    try {
      const response = await StatisticRepository.getStatisticsOverview();

      setStatistics(response || {});
    } catch (err) {
      console.error('Σφάλμα φόρτωσης στατιστικών:', err);
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
