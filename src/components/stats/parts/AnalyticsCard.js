import React from 'react';
import { Box, Typography, CardContent, Card, styled } from '@mui/material';

import { Line } from 'react-chartjs-2';

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  height: '180px',
  position: 'relative',
  overflow: 'visible',
  transition: 'all 0.3s ease-in-out',
  background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
  border: '1px solid rgba(0,0,0,0.08)',
  elevation: 4,
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[6],
  },
}));

const GradientCard = styled(StyledCard)(({ gradient }) => ({
  background: gradient,
  color: 'white',
  border: 'none',
  '& .MuiTypography-root': {
    color: 'white',
  },
}));

const CategoryIcon = styled(Box)(({ theme, bgcolor }) => ({
  position: 'absolute',
  top: 8,
  right: 8,
  width: 40,
  height: 40,
  borderRadius: '50%',
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
}));

// Chart Options
const lineChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
  },
  scales: {
    x: { display: false },
    y: { display: false },
  },
  elements: {
    point: { radius: 3, hoverRadius: 6 },
    line: { tension: 0.4, borderWidth: 3 },
  },
};

export const AnalyticsCard = ({
  title,
  value,
  subtitle,
  icon,
  type,
  data,
  gradient,
  onClick,
  isError,
}) => {
  const renderContent = () => {
    if (isError) {
      return (
        <Box sx={{ textAlign: 'center', padding: '8px 0' }}>
          <Typography variant="h4" fontWeight="bold" color="white" sx={{ opacity: 0.9 }}>
            {value}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              opacity: 0.8,
              fontSize: '0.75rem',
              fontWeight: 500,
              color: 'white',
            }}
          >
            Σφάλμα φόρτωσης
          </Typography>
        </Box>
      );
    }

    if (type === 'line') {
      return (
        <Box>
          <Box sx={{ textAlign: 'center', mb: 0.5 }}>
            <Typography variant="h4" fontWeight="bold">
              {value}
            </Typography>
            {subtitle && (
              <Typography
                variant="body2"
                sx={{
                  opacity: 0.9,
                  fontSize: '0.8rem',
                  fontWeight: 500,
                }}
              >
                {subtitle}
              </Typography>
            )}
          </Box>

          <Box sx={{ height: '50px', position: 'relative' }}>
            <Line
              data={{
                labels: data?.labels || [],
                datasets: [
                  {
                    data: data?.values || [],
                    borderColor: '#fff',
                    backgroundColor: '#fff30',
                    borderWidth: 2,
                    fill: true,
                    pointBackgroundColor: '#fff',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 1,
                  },
                ],
              }}
              options={lineChartOptions}
            />
          </Box>
        </Box>
      );
    }

    return (
      <Box sx={{ textAlign: 'center', padding: '4px 0', marginTop: '4px' }}>
        <Typography variant="h4" fontWeight="bold">
          {value}
        </Typography>
      </Box>
    );
  };

  const CardComponent = gradient ? GradientCard : StyledCard;

  return (
    <CardComponent
      gradient={gradient}
      onClick={onClick}
      sx={{
        cursor: onClick ? 'pointer' : 'default',
        transition: 'box-shadow 0.2s',
        '&:hover': onClick ? { boxShadow: 6, filter: 'brightness(0.97)' } : {},
      }}
    >
      <CategoryIcon>
        {React.cloneElement(icon, {
          sx: {
            color: 'white',
            fontSize: 20,
          },
        })}
      </CategoryIcon>

      <CardContent sx={{ pt: 2.5, pb: 1.5, height: '100%', position: 'relative' }}>
        <Typography
          variant="subtitle1"
          fontWeight="600"
          sx={{
            mb: 0.5,
            opacity: gradient ? 0.95 : 1,
            fontSize: '0.9rem',
          }}
        >
          {title}
        </Typography>
        {renderContent()}
      </CardContent>
    </CardComponent>
  );
};
