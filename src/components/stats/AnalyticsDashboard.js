import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  Typography,
  Chip,
  Avatar,
  styled,
  CircularProgress,
  LinearProgress,
  CardContent,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  People,
  Build,
  Euro,
  Business,
  Person,
  Assessment,
  Speed,
  CheckCircle,
  Schedule,
  Cancel,
  Star,
} from '@mui/icons-material';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from 'chart.js';
import { StatisticRepository } from '../Repositories/StatisticRepository';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
);

// Enhanced Styled Components
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
  top: -12,
  left: 12,
  width: 32,
  height: 32,
  borderRadius: '50%',
  backgroundColor: bgcolor || theme.palette.primary.main,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  boxShadow: `0 4px 12px ${bgcolor}40`,
  border: '2px solid white',
}));

const FloatingChip = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  top: -6,
  right: 12,
  backgroundColor: 'rgba(255,255,255,0.2)',
  color: 'white',
  fontWeight: 'bold',
  fontSize: '0.7rem',
  height: 20,
  backdropFilter: 'blur(10px)',
}));

const ChartContainer = styled(Box)({
  height: '70px',
  position: 'relative',
  marginTop: '4px',
});

const NumberDisplay = styled(Box)({
  textAlign: 'center',
  padding: '4px 0',
  marginTop: '4px',
});

const ProgressContainer = styled(Box)({
  padding: '12px 0',
  textAlign: 'center',
});

// Chart Options with enhanced styling
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

const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        fontSize: 11,
        usePointStyle: true,
        padding: 8,
      },
    },
  },
  cutout: '60%',
};

const barOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
  },
  scales: {
    y: { beginAtZero: true, display: false },
    x: { display: false },
  },
  borderRadius: 6,
};

/**
 * Enhanced Analytics Card Component
 */
const AnalyticsCard = ({ title, value, subtitle, icon, type, data, color, gradient }) => {
  const renderContent = () => {
    switch (type) {
      case 'number':
        return (
          <NumberDisplay>
            <Typography variant="h4" fontWeight="bold" sx={{ mb: 0.5 }}>
              {value}
            </Typography>
            {subtitle && (
              <Typography
                variant="body2"
                sx={{
                  opacity: gradient ? 0.9 : 0.7,
                  fontSize: '0.8rem',
                  fontWeight: 500,
                }}
              >
                {subtitle}
              </Typography>
            )}
          </NumberDisplay>
        );

      case 'line':
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
                      borderColor: color || '#fff',
                      backgroundColor: `${color || '#fff'}30`,
                      borderWidth: 2,
                      fill: true,
                      pointBackgroundColor: color || '#fff',
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

      case 'doughnut':
        return (
          <Box sx={{ mt: 1 }}>
            <ChartContainer>
              <Doughnut
                data={{
                  labels: data?.labels || [],
                  datasets: [
                    {
                      data: data?.values || [],
                      backgroundColor: data?.colors || ['#FF6384', '#36A2EB', '#FFCE56'],
                      borderWidth: 3,
                      borderColor: '#fff',
                    },
                  ],
                }}
                options={doughnutOptions}
              />
            </ChartContainer>
          </Box>
        );

      case 'bar':
        return (
          <Box sx={{ mt: 1 }}>
            <ChartContainer>
              <Bar
                data={{
                  labels: data?.labels || [],
                  datasets: [
                    {
                      data: data?.values || [],
                      backgroundColor: color || '#36A2EB',
                      borderRadius: 6,
                      borderSkipped: false,
                    },
                  ],
                }}
                options={barOptions}
              />
            </ChartContainer>
          </Box>
        );

      case 'progress':
        return (
          <ProgressContainer>
            <Typography variant="h4" fontWeight="bold" sx={{ mb: 1.5 }}>
              {value}%
            </Typography>
            <LinearProgress
              variant="determinate"
              value={value}
              sx={{
                height: 6,
                borderRadius: 3,
                backgroundColor: 'rgba(255,255,255,0.3)',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: '#fff',
                  borderRadius: 3,
                },
              }}
            />
            {subtitle && (
              <Typography
                variant="body2"
                sx={{
                  mt: 1.5,
                  opacity: 0.9,
                  fontSize: '0.8rem',
                  fontWeight: 500,
                }}
              >
                {subtitle}
              </Typography>
            )}
          </ProgressContainer>
        );

      default:
        return (
          <NumberDisplay>
            <Typography variant="h4" fontWeight="bold">
              {value}
            </Typography>
          </NumberDisplay>
        );
    }
  };

  const CardComponent = gradient ? GradientCard : StyledCard;
  const iconColor = gradient ? 'rgba(255,255,255,0.95)' : color;

  return (
    <CardComponent gradient={gradient}>
      <CategoryIcon bgcolor={iconColor}>{icon}</CategoryIcon>

      {gradient && <FloatingChip label="Live" size="small" />}

      <CardContent sx={{ pt: 2.5, pb: 1.5, height: '100%' }}>
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

/**
 * Main Enhanced Analytics Dashboard Component
 */
export default function AnalyticsDashboard() {
  const [loading, setLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState({});

  // Load analytics data
  useEffect(() => {
    loadAnalyticsData();
  }, []);

  const loadAnalyticsData = async () => {
    setLoading(true);
    try {
      const analyticsData = await StatisticRepository.loadAnalytics();

      setAnalyticsData({
        overview: analyticsData.overview || {},
        monthly: analyticsData.dashboard?.monthlyTrends || [],
        customerTypes: analyticsData?.dashboard?.customerTypes || {},
        topBrands: analyticsData?.dashboard?.topBrands || [],
        revenue: analyticsData?.overview?.yearlyRevenue || {},
        repairStatus: analyticsData?.dashboard?.repairStatus || [],
      });
    } catch (error) {
      console.error('Error loading analytics data:', error);
      setAnalyticsData({
        overview: {},
        monthly: [],
        customerTypes: {},
        topBrands: [],
        revenue: {},
        repairStatus: [],
      });
    } finally {
      setLoading(false);
    }
  };

  // Helper function to calculate percentage
  const calculatePercentage = (value, total) => {
    return total > 0 ? Math.round((value / total) * 100) : 0;
  };

  // Generate monthly data for charts
  const generateMonthlyData = (data) => ({
    labels: ['Ιαν', 'Φεβ', 'Μαρ', 'Απρ', 'Μάι', 'Ιουν'],
    values: data || [10, 15, 12, 18, 20, 25],
  });

  // Enhanced analytics cards configuration
  const getAnalyticsCards = () => [
    {
      title: 'Συνολικοί Πελάτες',
      value: analyticsData.overview?.totalCustomers || '0',
      subtitle: 'Όλοι οι πελάτες',
      icon: <People />,
      type: 'number',
      color: '#1976d2',
      gradient: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
    },
    {
      title: 'Μηνιαίες Επισκευές',
      value: analyticsData.overview?.currentMonthRepairs || '0',
      subtitle: 'Τρέχων μήνας',
      icon: <Build />,
      type: 'line',
      data: generateMonthlyData(analyticsData.overview?.monthlyRepairTrends),
      color: '#fff',
      gradient: 'linear-gradient(135deg, #4caf50 0%, #388e3c 100%)',
    },
    {
      title: 'Τύποι Πελατών',
      icon: <Assessment />,
      type: 'doughnut',
      data: {
        labels: ['Ιδιώτες', 'Εργοστάσια'],
        values: [
          analyticsData.customerTypes?.individual || 0,
          analyticsData.customerTypes?.factory || 0,
        ],
        colors: ['#2196f3', '#ff9800'],
      },
      color: '#2196f3',
    },
    {
      title: 'Ετήσια Έσοδα',
      value: `€${(analyticsData.overview?.yearlyRevenue || 0).toLocaleString()}`,
      subtitle: 'Συνολικά 2025',
      icon: <Euro />,
      type: 'number',
      color: '#9c27b0',
      gradient: 'linear-gradient(135deg, #9c27b0 0%, #7b1fa2 100%)',
    },
    {
      title: 'Ιδιώτες Πελάτες',
      value: analyticsData.customerTypes?.individual || '0',
      subtitle: `${
        (
          (analyticsData.customerTypes?.individual /
            (analyticsData.customerTypes?.individual + analyticsData.customerTypes?.factory)) *
          100
        ).toFixed(2) || 0
      }% του συνόλου`,
      icon: <Person />,
      type: 'number',
      color: '#ff9800',
    },
    {
      title: 'Top Μάρκες',
      icon: <Star />,
      type: 'bar',
      data: {
        labels: analyticsData?.topBrands?.slice(0, 5).map((b) => b.manufacturer) || [],
        values: analyticsData?.topBrands?.slice(0, 5).map((b) => b.count) || [],
      },
      color: '#ff5722',
    },
    {
      title: 'Ολοκληρωμένες',
      value: analyticsData.repairStatus?.find((s) => s.status === 'completed')?.count || '0',
      subtitle: 'Επισκευές',
      icon: <CheckCircle />,
      type: 'number',
      color: '#4caf50',
      gradient: 'linear-gradient(135deg, #66bb6a 0%, #4caf50 100%)',
    },
    {
      title: 'Μηνιαία Έσοδα',
      value: `€${(analyticsData.overview?.currentMonthRevenue || 0).toLocaleString()}`,
      subtitle: 'Τρέχων μήνας',
      icon: <TrendingUp />,
      type: 'line',
      data: generateMonthlyData(analyticsData.overview?.monthlyRevenueTrends),
      color: '#fff',
      gradient: 'linear-gradient(135deg, #ff9800 0%, #f57c00 100%)',
    },
    {
      title: 'Εργοστάσια',
      value: analyticsData.customerTypes?.factory || '0',
      subtitle: `${
        (
          (analyticsData.customerTypes?.factory /
            (analyticsData.customerTypes?.individual + analyticsData.customerTypes?.factory)) *
          100
        ).toFixed(2) || 0
      }% του συνόλου`,
      icon: <Business />,
      type: 'number',
      color: '#607d8b',
    },
    {
      title: 'Επιτυχία Επισκευών',
      value: calculatePercentage(
        analyticsData.repairStatus?.find((s) => s.status === 'completed')?.count || 0,
        analyticsData.overview?.totalRepairs || 1,
      ),
      subtitle: 'Ποσοστό ολοκλήρωσης',
      icon: <Speed />,
      type: 'progress',
      color: '#2196f3',
      gradient: 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)',
    },
    {
      title: 'Εκκρεμείς',
      value:
        analyticsData.repairStatus?.find((s) => s.repairStatus === 'In-progress')?.count || '0',
      subtitle: 'Επισκευές',
      icon: <Schedule />,
      type: 'number',
      color: '#ff9800',
    },
    {
      title: 'Ακυρωμένες',
      value: analyticsData.repairStatus?.find((s) => s.status === 'cancelled')?.count || '0',
      subtitle: 'Επισκευές',
      icon: <Cancel />,
      type: 'number',
      color: '#f44336',
    },
  ];

  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        <Box
          sx={{
            textAlign: 'center',
            py: 8,
            background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
            borderRadius: 4,
            border: '1px solid rgba(0,0,0,0.08)',
          }}
        >
          <CircularProgress size={60} thickness={4} />
          <Typography variant="h6" sx={{ mt: 2, color: 'text.secondary' }}>
            Φόρτωση αναλυτικών στοιχείων...
          </Typography>
        </Box>
      </Box>
    );
  }

  const cards = getAnalyticsCards();

  return (
    <Box sx={{ p: 2, bgcolor: '#F8FAFC' }}>
      <Box
        sx={{
          mb: 4,
          p: 3,
          background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
          borderRadius: 3,
          color: 'white',
        }}
      >
        <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
          Αναλυτικά Στοιχεία
        </Typography>
        <Typography variant="body1" sx={{ opacity: 0.9 }}>
          Επισκόπηση των βασικών μετρήσεων και στατιστικών του συστήματος
        </Typography>
      </Box>

      <Grid container spacing={2.5}>
        {cards.map((card, index) => (
          <Grid item xs={12} sm={6} lg={3} key={index} sx={{ display: 'flex' }}>
            <Box sx={{ width: '100%' }}>
              <AnalyticsCard {...card} />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
