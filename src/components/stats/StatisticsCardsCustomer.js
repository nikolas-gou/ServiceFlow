import React, { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import { People, Business, Person, Euro } from '@mui/icons-material';
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

export default function StatisticsCardsCustomer() {
  const location = useLocation();
  const [statistics, setStatistics] = useState({});
  const [loading, setLoading] = useState(true);

  const getStatsConfig = () => {
    const customerTrend = calculateTrend(statistics.monthlyTrends);
    const individualTrend = calculateTrend(statistics.customersByTypeAndMonth?.individual);
    const factoryTrend = calculateTrend(statistics.customersByTypeAndMonth?.factory);

    // Παίρνουμε τον καλύτερο πελάτη
    const topCustomer = statistics.topCustomersByRevenue?.[0];

    return [
      {
        title: 'Συνολικοί Πελάτες',
        value: formatValue(statistics.totalCustomers),
        trend: customerTrend,
        color: 'indigo',
        icon: <People fontSize="small" />,
        data: getSafeDataArray(statistics.monthlyTrends),
      },
      {
        title: 'Ιδιώτες Πελάτες',
        value: formatValue(statistics.customerTypes?.individual),
        trend: individualTrend,
        color: 'indigo',
        icon: <Person fontSize="small" />,
        data: getSafeDataArray(statistics.customersByTypeAndMonth?.individual),
      },
      {
        title: 'Εργοστάσια',
        value: formatValue(statistics.customerTypes?.factory),
        trend: factoryTrend,
        color: 'indigo',
        icon: <Business fontSize="small" />,
        data: getSafeDataArray(statistics.customersByTypeAndMonth?.factory),
      },
      {
        title: 'Καλύτερος Πελάτης',
        value: topCustomer ? formatValue(topCustomer.totalRevenue, 'currency') : '€0',
        trend: null,
        color: 'indigo',
        icon: <Euro fontSize="small" />,
        data: [topCustomer?.totalRevenue || 0],
        customTitle: topCustomer ? `${topCustomer.name}` : 'Δεν υπάρχουν δεδομένα',
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
      console.error('Σφάλμα φόρτωσης στατιστικών πελατών:', err);
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
