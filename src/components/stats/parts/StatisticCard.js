import React from 'react';
import { Box, Card, Typography, Chip, Avatar } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale } from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale);

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: { display: false },
    y: { display: false },
  },
  elements: { point: { radius: 0 } },
  plugins: {
    legend: { display: false },
  },
};

// Συνάρτηση για μετατροπή Material-UI colors σε πραγματικά χρώματα
const getChartColor = (colorName) => {
  const colors = {
    success: '#4caf50',
    error: '#f44336',
    primary: '#1976d2',
    warning: '#ff9800',
    info: '#2196f3',
  };
  return colors[colorName] || colors.primary;
};

export const StatisticCard = (props) => {
  const chartColor = getChartColor(props.color);

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
        <Avatar sx={{ bgcolor: props.color + '.main', mr: 2, width: 36, height: 36 }}>
          {props.icon}
        </Avatar>
        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
            {props.title}
          </Typography>
          <Typography variant="h5" fontWeight="bold" sx={{ lineHeight: 1.2 }}>
            {props.value}
          </Typography>
        </Box>
        {props.trend && (
          <Chip
            label={props.trend}
            size="small"
            sx={{
              color: props.color + '.main',
              fontWeight: 'bold',
              height: 24,
              fontSize: '0.7rem',
            }}
          />
        )}
      </Box>
      <Box sx={{ height: 35 }}>
        {props.customTitle ? (
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pt: 1,
            }}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{
                color: 'text.primary',
                fontSize: '1rem',
                textAlign: 'center',
                letterSpacing: '0.5px',
              }}
            >
              {props.customTitle}
            </Typography>
          </Box>
        ) : (
          <Line
            data={{
              labels: props.data.map((_, i) => i),
              datasets: [
                {
                  data: props.data,
                  borderColor: chartColor,
                  backgroundColor: `${chartColor}33`,
                  fill: true,
                  borderWidth: 2,
                },
              ],
            }}
            options={chartOptions}
          />
        )}
      </Box>
    </Card>
  );
};
