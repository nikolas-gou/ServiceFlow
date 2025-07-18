import React from 'react';
import { Box, Card, Typography, Chip, Avatar, Tooltip } from '@mui/material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  ArcElement,
  Tooltip as ChartTooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  ArcElement,
  ChartTooltip,
  Legend,
);

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
    success: '#10B981', // Vibrant Emerald
    error: '#E11D48', // Deep Rose
    primary: '#2563EB', // Royal Blue
    warning: '#FBBF24', // Bright Yellow
    info: '#7C3AED', // Deep Purple
    violet: '#8B5CF6', // Bright Violet
    fuchsia: '#D946EF', // Electric Fuchsia
    orange: '#F97316', // Vivid Orange
    teal: '#0D9488', // Deep Teal
    indigo: '#4F46E5', // Electric Indigo
  };
  return colors[colorName] || colors.primary;
};

// Συνάρτηση για δημιουργία gradient background βάσει χρώματος
const getGradientBackground = (colorName) => {
  const baseColors = {
    success: ['#059669', '#10B981'], // Emerald gradient
    error: ['#BE123C', '#E11D48'], // Rose gradient
    primary: ['#1E40AF', '#2563EB'], // Royal Blue gradient
    warning: ['#D97706', '#FBBF24'], // Yellow gradient
    info: ['#6D28D9', '#7C3AED'], // Purple gradient
    violet: ['#7C3AED', '#8B5CF6'], // Violet gradient
    fuchsia: ['#C026D3', '#D946EF'], // Fuchsia gradient
    orange: ['#EA580C', '#F97316'], // Orange gradient
    teal: ['#0F766E', '#0D9488'], // Teal gradient
    indigo: ['#3730A3', '#4F46E5'], // Indigo gradient
  };
  return baseColors[colorName] || baseColors.primary;
};

export const StatisticCard = (props) => {
  const [gradientStart, gradientEnd] = getGradientBackground(props.color);

  const handleClick = () => {
    if (props.onClick) {
      props.onClick();
    }
  };

  // Δημιουργία tooltip message για errors
  const getTooltipMessage = () => {
    if (!props.isError) return '';

    let message = props.errorMessage || 'Σφάλμα φόρτωσης δεδομένων';

    return message;
  };

  const cardContent = (
    <Card
      elevation={0}
      onClick={handleClick}
      sx={{
        height: '100%',
        maxHeight: '140px',
        display: 'flex',
        flexDirection: 'column',
        p: 2.5,
        borderRadius: 3,
        background: `linear-gradient(135deg, ${gradientStart}, ${gradientEnd})`,
        position: 'relative',
        overflow: 'visible',
        transition: 'all 0.2s ease-in-out',
        border: '1px solid',
        borderColor: props.isError ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
        boxShadow: props.isError
          ? '0 4px 20px rgba(190, 18, 60, 0.25)'
          : '0 4px 20px rgba(0, 0, 0, 0.15)',
        cursor: props.onClick ? 'pointer' : props.isError ? 'help' : 'default',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: props.isError
            ? '0 6px 24px rgba(190, 18, 60, 0.35)'
            : '0 6px 24px rgba(0, 0, 0, 0.2)',
        },
        // Subtle animation για error cards
        ...(props.isError && {
          animation: 'pulse 2s ease-in-out infinite',
          '@keyframes pulse': {
            '0%, 100%': {
              opacity: 1,
            },
            '50%': {
              opacity: 0.95,
            },
          },
        }),
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Avatar
          sx={{
            bgcolor: props.isError ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.15)',
            mr: 1.5,
            width: 32,
            height: 32,
            color: 'white',
            // Subtle shake animation για error icon
            ...(props.isError && {
              animation: 'shake 0.5s ease-in-out',
              '@keyframes shake': {
                '0%, 100%': { transform: 'translateX(0)' },
                '25%': { transform: 'translateX(-2px)' },
                '75%': { transform: 'translateX(2px)' },
              },
            }),
          }}
        >
          {props.icon}
        </Avatar>
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="subtitle2"
            sx={{
              fontSize: '0.8rem',
              color: 'rgba(255, 255, 255, 0.7)',
              mb: 0.25,
              fontWeight: 500,
            }}
          >
            {props.title}
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              lineHeight: 1.1,
              color: 'white',
              fontSize: '1.25rem',
              opacity: props.isError ? 0.9 : 1,
            }}
          >
            {props.value}
          </Typography>
        </Box>
        {props.trend && !props.isError && (
          <Chip
            label={props.trend}
            size="small"
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              color: 'white',
              fontWeight: 600,
              height: 20,
              fontSize: '0.7rem',
              px: 0.5,
              '& .MuiChip-label': {
                px: 1,
              },
            }}
          />
        )}
        {props.isError && (
          <Chip
            label="ERROR"
            size="small"
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              fontWeight: 600,
              height: 20,
              fontSize: '0.6rem',
              px: 0.5,
              border: '1px solid rgba(255, 255, 255, 0.3)',
              '& .MuiChip-label': {
                px: 1,
              },
            }}
          />
        )}
      </Box>
      <Box sx={{ flex: 1, minHeight: 25, mt: 0.5 }}>
        {props.customTitle ? (
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: 'white',
                fontSize: '0.9rem',
                fontWeight: 600,
                textAlign: 'center',
                letterSpacing: '0.5px',
                opacity: props.isError ? 0.8 : 1,
              }}
            >
              {props.customTitle}
            </Typography>
          </Box>
        ) : props.isError ? (
          // Error state - δεν εμφανίζουμε chart
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: 0.6,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '0.75rem',
                fontStyle: 'italic',
                textAlign: 'center',
              }}
            >
              Δεδομένα μη διαθέσιμα
            </Typography>
          </Box>
        ) : (
          <Line
            data={{
              labels: props.data.map((_, i) => i),
              datasets: [
                {
                  data: props.data,
                  borderColor: 'rgba(255, 255, 255, 0.8)',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  fill: true,
                  borderWidth: 1.5,
                  tension: 0.4,
                },
              ],
            }}
            options={chartOptions}
          />
        )}
      </Box>
    </Card>
  );

  // Αν είναι error, τυλίγουμε με Tooltip
  if (props.isError && getTooltipMessage()) {
    return (
      <Tooltip
        title={getTooltipMessage()}
        arrow
        placement="top"
        sx={{
          '& .MuiTooltip-tooltip': {
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            color: 'white',
            fontSize: '0.75rem',
            maxWidth: 300,
            whiteSpace: 'pre-line',
          },
        }}
      >
        {cardContent}
      </Tooltip>
    );
  }

  return cardContent;
};
