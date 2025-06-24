import React, { useEffect, useState } from 'react';
import { Box, Grid, Card, CardContent, Typography, Chip, Avatar } from '@mui/material';
import { TrendingUp, TrendingDown, ShowChart, People, Build, Euro } from '@mui/icons-material';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale } from 'chart.js';
import { CustomerRepository } from '../Repositories/CustomerRepository';
import { useLocation } from 'react-router-dom';
import LoadingCard from '../common/LoadingCard';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale);

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: { display: false },
    y: { display: false },
  },
  elements: { point: { radius: 0 } },
};

const StatCard = ({ title, value, trend, color, icon, data }) => {
  return (
    <Card
      elevation={5}
      sx={{
        p: 2,
        borderRadius: 4,
        background: 'linear-gradient(135deg, #e0e7ff, #c7d2fe)',
        position: 'relative',
        overflow: 'visible',
        transition: 'transform 0.2s, box-shadow 0.2s',
        minHeight: 130,
        '&:hover': {
          transform: 'translateY(-3px)',
          boxShadow: 8,
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Avatar sx={{ bgcolor: color + '.main', mr: 2, width: 36, height: 36 }}>{icon}</Avatar>
        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
            {title}
          </Typography>
          <Typography variant="h5" fontWeight="bold" sx={{ lineHeight: 1.2 }}>
            {value}
          </Typography>
        </Box>
        <Chip
          label={trend}
          size="small"
          sx={{
            color: color + '.main',
            fontWeight: 'bold',
            height: 24,
            fontSize: '0.7rem',
          }}
        />
      </Box>
      <Box sx={{ height: 35 }}>
        <Line
          data={{
            labels: data.map((_, i) => i),
            datasets: [
              {
                data,
                borderColor: color,
                backgroundColor: `${color}20`,
                fill: true,
                borderWidth: 2,
              },
            ],
          }}
          options={chartOptions}
        />
      </Box>
    </Card>
  );
};

export default function StatisticsCards2() {
  const location = useLocation();
  const [statistics, setStatistics] = useState({});
  const [loading, setLoading] = useState(true);

  // Helper functions for calculations
  const calculateTrend = (data) => {
    if (!data || !Array.isArray(data) || data.length < 2) return '+0%';

    const current = data[data.length - 1] || 0;
    const previous = data[data.length - 2] || 0;

    if (previous === 0) return current > 0 ? '+100%' : '+0%';

    const change = ((current - previous) / previous) * 100;
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(0)}%`;
  };

  const getTrendColor = (trend) => {
    if (!trend) return 'primary';
    return trend.startsWith('+') ? 'success' : 'error';
  };

  const getTrendIcon = (trend) => {
    if (!trend) return <ShowChart fontSize="small" />;
    return trend.startsWith('+') ? (
      <TrendingUp fontSize="small" />
    ) : (
      <TrendingDown fontSize="small" />
    );
  };

  const formatValue = (value, type = 'number') => {
    if (value === undefined || value === null) return '0';

    switch (type) {
      case 'currency':
        return `€${Number(value).toLocaleString()}`;
      case 'number':
        if (value >= 1000) {
          return `${(value / 1000).toFixed(1)}k`;
        }
        return value.toString();
      default:
        return value.toString();
    }
  };

  // Ensure data arrays have proper fallbacks
  const getSafeDataArray = (data, fallback = [0, 0, 0, 0, 0]) => {
    if (!data || !Array.isArray(data) || data.length === 0) {
      return fallback;
    }
    return data;
  };

  // Dynamic stats configuration based on location and data
  const getStatsConfig = () => {
    if (location.pathname === '/dashboard/overview') {
      const repairTrend = calculateTrend(statistics.monthlyRepairTrends);
      const customerTrend = calculateTrend(statistics.monthlyCustomerTrends);
      const motorTrend = calculateTrend(statistics.monthlyMotorTrends);
      const revenueTrend = calculateTrend(statistics.monthlyRevenueTrends);

      return [
        {
          title: 'Συνολικές Επισκευές',
          value: formatValue(statistics.totalRepairs),
          trend: repairTrend,
          color: getTrendColor(repairTrend),
          icon: <Build fontSize="small" />,
          data: getSafeDataArray(statistics.monthlyRepairTrends),
        },
        {
          title: 'Συνολικοί Πελάτες',
          value: formatValue(statistics.totalCustomers),
          trend: customerTrend,
          color: getTrendColor(customerTrend),
          icon: <People fontSize="small" />,
          data: getSafeDataArray(statistics.monthlyCustomerTrends),
        },
        {
          title: 'Συνολικά Μοτέρ',
          value: formatValue(statistics.totalMotors),
          trend: motorTrend,
          color: getTrendColor(motorTrend),
          icon: <ShowChart fontSize="small" />,
          data: getSafeDataArray(statistics.monthlyMotorTrends),
        },
        {
          title: 'Ετήσια Έσοδα',
          value: formatValue(statistics.yearlyRevenue, 'currency'),
          trend: revenueTrend,
          color: getTrendColor(revenueTrend),
          icon: <Euro fontSize="small" />,
          data: getSafeDataArray(statistics.monthlyRevenueTrends),
        },
      ];
    }

    // Default fallback for other pages
    return [
      {
        title: 'Δεδομένα',
        value: '0',
        trend: '+0%',
        color: 'primary',
        icon: <ShowChart fontSize="small" />,
        data: [0, 0, 0, 0, 0],
      },
    ];
  };

  useEffect(() => {
    loadStatistics();
  }, [location]);

  const loadStatistics = async () => {
    console.log(location);
    setLoading(true);
    try {
      switch (location.pathname) {
        case '/dashboard/overview':
          try {
            const response = await CustomerRepository.getStatisticsOverview();
            setStatistics(response.data);
          } catch (err) {
            console.error('Σφάλμα φόρτωσης πελατών:', err);
          }
          break;
        case '/dashboard/analytics':
          // endpoint = '/api/statistics/monthly';
          break;
        case '/dashboard/customers':
          // endpoint = '/api/statistics/customer-types';
          break;
        case '/dashboard/services':
          // endpoint = '/api/statistics/repair-status';
          break;
        default:
          // endpoint = '/api/statistics/overview';
          break;
      }
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
            <StatCard {...stat} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
