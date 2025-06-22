import React, { useEffect, useState } from 'react';
import { Box, Grid, Card, CardContent, Typography, Chip, Avatar } from '@mui/material';
import { TrendingUp, TrendingDown, ShowChart } from '@mui/icons-material';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale } from 'chart.js';
import { RepairRepository } from '../Repositories/RepairRepository';
import { CustomerRepository } from '../Repositories/CustomerRepository';

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
        p: 2, // Επαναφορά padding
        borderRadius: 4,
        background: 'linear-gradient(135deg, #e0e7ff, #c7d2fe)',
        position: 'relative',
        overflow: 'visible',
        transition: 'transform 0.2s, box-shadow 0.2s',
        minHeight: 130, // Λίγο μεγαλύτερο ύψος
        '&:hover': {
          transform: 'translateY(-3px)', // Μέτριο hover effect
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
        {' '}
        {/* Λίγο μεγαλύτερο ύψος chart */}
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
  const [countRepairs, setCountRepairs] = useState('');
  const [countCustomers, setCountCustomers] = useState('');

  const stats = [
    {
      title: 'Συνολικές Επισκευές',
      value: countRepairs,
      trend: '+25%',
      color: 'info',
      icon: <ShowChart fontSize="small" />,
      data: [5, 6, 7, 8, 7, 8, 10],
    },
    {
      title: 'Πελάτες',
      value: countCustomers,
      trend: '-25%',
      color: 'error',
      icon: <TrendingDown fontSize="small" />,
      data: [8, 7, 6, 5, 4, 3, 2],
    },
    {
      title: 'Αντικαταστάσεις',
      value: '200k',
      trend: '+5%',
      color: 'primary',
      icon: <ShowChart fontSize="small" />,
      data: [20, 19, 18, 18, 19, 20, 21],
    },
    {
      title: 'Πωλήσεις',
      value: '€50k',
      trend: '+10%',
      color: 'success',
      icon: <TrendingUp fontSize="small" />,
      data: [10, 11, 12, 13, 14, 15, 16],
    },
  ];

  useEffect(() => {
    loadStatsRepair();
    loadStatsCustomer();
  }, []);

  const loadStatsRepair = async () => {
    try {
      const data = await RepairRepository.getStats();
      setCountRepairs(data || []);
    } catch (err) {
      console.error('Σφάλμα φόρτωσης επισκευών:', err);
      setCountRepairs([]);
    }
  };

  const loadStatsCustomer = async () => {
    try {
      const data = await CustomerRepository.getStats();
      setCountCustomers(data || []);
    } catch (err) {
      console.error('Σφάλμα φόρτωσης πελατών:', err);
      setCountCustomers([]);
    }
  };

  return (
    <Box sx={{ p: 1.5, mb: 1.5 }}>
      {' '}
      {/* Μέτριο padding και margin */}
      <Grid container spacing={2.5}>
        {' '}
        {/* Μέτριο spacing */}
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatCard {...stat} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
