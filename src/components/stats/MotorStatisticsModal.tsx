import { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Modal,
  Backdrop,
  Fade,
  styled,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  Paper,
  LinearProgress,
  Tabs,
  Tab,
} from '@mui/material';
import {
  Close as CloseIcon,
  Memory,
  ElectricalServices,
  Settings,
  Power,
  TrendingUp,
  Speed,
  Engineering,
  AutoAwesome,
  ElectricBolt,
  WaterDrop,
  FlashOn,
  Assessment,
} from '@mui/icons-material';
import { Pie, Line, Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip as ChartTooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  BarElement,
  type TooltipItem,
} from 'chart.js';
import { formatValue } from '../../utils/statistics';
import { useTheme, alpha } from '@mui/material/styles';
import type { DashboardStatsData } from '../../types/statistics';

ChartJS.register(
  ArcElement,
  ChartTooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  BarElement,
);

const ModalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '95vw',
  maxWidth: '1400px',
  maxHeight: '95vh',
  bgcolor: 'background.paper',
  borderRadius: 4,
  boxShadow: '0 24px 48px rgba(0,0,0,0.15)',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
} as const;

const ModalHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2, 3),
  borderBottom: '1px solid #e0e0e0',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#f8f9fa',
  minHeight: '60px',
}));

const ModalContent = styled(Box)({
  flex: 1,
  overflow: 'auto',
  padding: 0,
  background: 'linear-gradient(145deg, #f8fafc 0%, #e2e8f0 100%)',
});

const HeroCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  margin: theme.spacing(2),
  background: theme.custom.gradients.primary,
  color: 'white',
  borderRadius: theme.spacing(3),
  position: 'relative',
  overflow: 'visible',
  boxShadow: `0 8px 32px ${alpha(theme.palette.primary.dark, 0.3)}`,
  minHeight: 120,
  display: 'flex',
  alignItems: 'center',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
    borderRadius: theme.spacing(3),
    zIndex: -1,
    filter: 'blur(6px)',
    opacity: 0.6,
  },
}));

const HeroAvatar = styled(Avatar)({
  width: 60,
  height: 60,
  backgroundColor: 'rgba(255,255,255,0.2)',
  border: '3px solid rgba(255,255,255,0.3)',
  marginRight: 20,
  backdropFilter: 'blur(10px)',
  boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
});

const StatsChipsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1.5),
  marginTop: theme.spacing(1.5),
  flexWrap: 'wrap',
}));

const StatsChip = styled(Chip)(({ theme }) => ({
  backgroundColor: 'rgba(255,255,255,0.9)',
  color: theme.palette.primary.dark,
  fontWeight: 700,
  fontSize: '0.95rem',
  height: 32,
  borderRadius: 16,
  boxShadow: `0 4px 12px ${alpha(theme.palette.primary.dark, 0.15)}`,
  letterSpacing: '0.5px',
  border: '1px solid rgba(255,255,255,0.5)',
  backdropFilter: 'blur(10px)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: `0 6px 20px ${alpha(theme.palette.primary.dark, 0.2)}`,
  },
}));

const EnhancedCard = styled(Card)(() => ({
  borderRadius: 24,
  overflow: 'visible',
  position: 'relative',
  background: 'rgba(255,255,255,0.95)',
  border: '1px solid rgba(255,255,255,0.2)',
  backdropFilter: 'blur(20px)',
  boxShadow: '0 8px 32px rgba(31, 38, 135, 0.15)',
  minHeight: 220,
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 40px rgba(31, 38, 135, 0.25)',
  },
}));

interface FloatingIconProps {
  bgcolor: string;
  iconColor?: string;
}

const FloatingIcon = styled(Box)<FloatingIconProps>(({ bgcolor, iconColor }) => ({
  position: 'absolute',
  top: -20,
  left: 20,
  width: 40,
  height: 40,
  borderRadius: '50%',
  background: `linear-gradient(135deg, ${bgcolor}DD, ${bgcolor})`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: iconColor || 'white',
  boxShadow: `0 8px 24px ${bgcolor}40`,
  border: '3px solid rgba(255,255,255,0.9)',
  backdropFilter: 'blur(10px)',
  zIndex: 2,
}));

const MetricCard = styled(Paper)(() => ({
  padding: 16,
  borderRadius: 16,
  background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7))',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255,255,255,0.3)',
  boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
  textAlign: 'center',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
  },
}));

const ChartContainer = styled(Box)({
  height: '200px',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '10px',
});

const ProgressContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(1),
}));

const TabsContainer = styled(Box)(() => ({
  borderBottom: '1px solid #e0e0e0',
  backgroundColor: '#f8f9fa',
  paddingX: 3,
}));

const TabPanel = styled(Box)(() => ({
  padding: 24,
  height: 'calc(95vh - 160px)',
  overflow: 'auto',
}));

interface MotorStatisticsModalProps {
  open: boolean;
  statistics?: DashboardStatsData | null;
  onClose: () => void;
}

export const MotorStatisticsModal = ({ open, statistics, onClose }: MotorStatisticsModalProps) => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);

  if (!statistics || !statistics.motor) return null;

  const motor = statistics.motor;
  const trends = motor.trends || {};
  const types = motor.motorTypes || {};
  const stepTypes = motor.stepTypes || {};
  const topBrands = motor.topBrands || [];

  // Pie chart για τύπους κινητήρων
  const motorTypeData = {
    labels: ['Ηλεκτρικά Μοτέρ', 'Αντλίες', 'Γεννήτριες'],
    datasets: [
      {
        data: [
          types.totalElMotorMotors || 0,
          types.totalPumpMotors || 0,
          types.totalGeneratorMotors || 0,
        ],
        backgroundColor: [theme.palette.primary.dark, '#00bcd4', '#ffc107'],
        borderColor: [theme.palette.primary.dark, '#00bcd4', '#ffc107'],
        borderWidth: 3,
        hoverOffset: 8,
        borderRadius: 8,
      },
    ],
  };

  // Pie chart για φάσεις
  const phaseData = {
    labels: ['Μονοφασικά', 'Τριφασικά'],
    datasets: [
      {
        data: [types.totalOnePhaseMotors || 0, types.totalThreePhaseMotors || 0],
        backgroundColor: [theme.palette.primary.dark, '#4caf50'],
        borderColor: [theme.palette.primary.dark, '#4caf50'],
        borderWidth: 3,
        hoverOffset: 8,
        borderRadius: 8,
      },
    ],
  };

  // Pie chart για step types
  const stepData = {
    labels: ['Ολοκληρο', 'Μισο-μισο', 'Συνδιασμός'],
    datasets: [
      {
        data: [
          stepTypes.totalStandardStep || 0,
          stepTypes.totalHalfStep || 0,
          stepTypes.totalCombinedStep || 0,
        ],
        backgroundColor: ['#673ab7', '#ff9800', '#f44336'],
        borderColor: ['#673ab7', '#ff9800', '#f44336'],
        borderWidth: 3,
        hoverOffset: 8,
        borderRadius: 8,
      },
    ],
  };

  // Line chart για monthly trends
  const months = statistics?.chartData?.labels || [
    'Ιαν',
    'Φεβ',
    'Μαρ',
    'Απρ',
    'Μάι',
    'Ιουν',
    'Ιουλ',
  ];
  const trendData = {
    labels: months.slice(0, (trends.monthlyElMotorTrends || []).length),
    datasets: [
      {
        label: 'Ηλεκτρικά Μοτέρ',
        data: trends.monthlyElMotorTrends || [],
        borderColor: theme.palette.primary.dark,
        backgroundColor: alpha(theme.palette.primary.dark, 0.1),
        borderWidth: 4,
        fill: true,
        pointBackgroundColor: theme.palette.primary.dark,
        pointBorderColor: '#fff',
        pointBorderWidth: 3,
        pointRadius: 6,
        tension: 0.4,
      },
      {
        label: 'Αντλίες',
        data: trends.monthlyPumpTrends || [],
        borderColor: '#00bcd4',
        backgroundColor: 'rgba(0, 188, 212, 0.1)',
        borderWidth: 4,
        fill: true,
        pointBackgroundColor: '#00bcd4',
        pointBorderColor: '#fff',
        pointBorderWidth: 3,
        pointRadius: 6,
        tension: 0.4,
      },
      {
        label: 'Γεννήτριες',
        data: trends.monthlyGeneratorTrends || [],
        borderColor: '#ffc107',
        backgroundColor: 'rgba(255, 193, 7, 0.1)',
        borderWidth: 4,
        fill: true,
        pointBackgroundColor: '#ffc107',
        pointBorderColor: '#fff',
        pointBorderWidth: 3,
        pointRadius: 6,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          usePointStyle: true,
          font: { size: 13, weight: 600 },
          color: '#4a5568',
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(255,255,255,0.2)',
        borderWidth: 1,
        cornerRadius: 8,
      },
    },
  };

  const lineOptions = {
    ...chartOptions,
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(0, 0, 0, 0.05)' },
        ticks: { color: '#4a5568', font: { weight: 500 } },
      },
      x: {
        grid: { display: false },
        ticks: { color: '#4a5568', font: { weight: 500 } },
      },
    },
  };

  // Calculate percentages for progress bars
  const totalMotors = Number(motor.totalMotors) || 1;
  const elMotorPercentage = ((types.totalElMotorMotors || 0) / totalMotors) * 100;
  const pumpPercentage = ((types.totalPumpMotors || 0) / totalMotors) * 100;
  const generatorPercentage = ((types.totalGeneratorMotors || 0) / totalMotors) * 100;

  // Step types percentages
  const standardStepPercentage = ((stepTypes.totalStandardStep || 0) / totalMotors) * 100;
  const halfStepPercentage = ((stepTypes.totalHalfStep || 0) / totalMotors) * 100;
  const combinedStepPercentage = ((stepTypes.totalCombinedStep || 0) / totalMotors) * 100;

  // Top brands bar chart data
  const topBrandsData = {
    labels: topBrands.slice(0, 8).map((brand) => brand.manufacturer),
    datasets: [
      {
        label: 'Κινητήρες',
        data: topBrands.slice(0, 8).map((brand) => brand.count),
        backgroundColor: [
          '#ff6b6b',
          '#4ecdc4',
          '#45b7d1',
          '#96ceb4',
          '#ffeaa7',
          '#fd79a8',
          '#74b9ff',
          '#6c5ce7',
        ],
        borderColor: [
          '#ff6b6b',
          '#4ecdc4',
          '#45b7d1',
          '#96ceb4',
          '#ffeaa7',
          '#fd79a8',
          '#74b9ff',
          '#6c5ce7',
        ],
        borderWidth: 2,
        borderRadius: 6,
        borderSkipped: false,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(255,255,255,0.2)',
        borderWidth: 1,
        cornerRadius: 8,
        callbacks: {
          label: function (context: TooltipItem<'bar'>) {
            return `${context.parsed.y} κινητήρες`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(0, 0, 0, 0.05)' },
        ticks: {
          color: '#4a5568',
          font: { weight: 500 },
          stepSize: 1,
        },
        title: {
          display: true,
          text: 'Αριθμός Κινητήρων',
          color: '#4a5568',
          font: { weight: 600 },
        },
      },
      x: {
        grid: { display: false },
        ticks: {
          color: '#4a5568',
          font: { weight: 500 },
          maxRotation: 45,
        },
      },
    },
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
        sx: {
          backdropFilter: 'blur(8px)',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
        },
      }}
    >
      <Fade in={open} timeout={500}>
        <Box sx={ModalStyle}>
          <ModalHeader>
            <Box sx={{ zIndex: 1 }}>
              <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
                Αναλυτικά Στατιστικά Κινητήρων
              </Typography>
            </Box>
            <IconButton
              onClick={onClose}
              sx={{
                color: 'text.secondary',
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: 'action.hover',
                  transform: 'rotate(90deg)',
                },
              }}
            >
              <CloseIcon />
            </IconButton>
          </ModalHeader>

          <ModalContent sx={{ p: 0 }}>
            {/* Tabs Navigation */}
            <TabsContainer>
              <Tabs
                value={activeTab}
                onChange={(e, newValue) => setActiveTab(newValue)}
                variant="fullWidth"
                sx={{
                  '& .MuiTab-root': {
                    fontWeight: 600,
                    textTransform: 'none',
                    fontSize: '1rem',
                  },
                  '& .Mui-selected': {
                    color: `${theme.palette.primary.dark} !important`,
                  },
                  '& .MuiTabs-indicator': {
                    backgroundColor: theme.palette.primary.dark,
                    height: 3,
                  },
                }}
              >
                <Tab label="📊 Επισκόπηση" />
                <Tab label="📈 Αναλυτικά" />
                <Tab label="🏆 Τάσεις & Brands" />
              </Tabs>
            </TabsContainer>

            {/* Tab Panel 1 - Επισκόπηση */}
            {activeTab === 0 && (
              <TabPanel>
                {/* Hero Section */}
                <HeroCard sx={{ m: 0, mb: 3 }}>
                  <HeroAvatar>
                    <Memory sx={{ fontSize: 28 }} />
                  </HeroAvatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 0.5 }}>
                      Επισκόπηση Κινητήρων
                    </Typography>
                    <StatsChipsContainer>
                      <StatsChip
                        label={`Συνολικοί: ${formatValue(Number(motor.totalMotors) || 0)}`}
                        icon={<Assessment />}
                      />
                      <StatsChip
                        label={`Μονοφασικοί: ${formatValue(types.totalOnePhaseMotors || 0)}`}
                        icon={<ElectricBolt />}
                      />
                      <StatsChip
                        label={`Τριφασικοί: ${formatValue(types.totalThreePhaseMotors || 0)}`}
                        icon={<Power />}
                      />
                    </StatsChipsContainer>
                  </Box>

                  {/* Top Brand Highlight */}
                  {topBrands[0] && (
                    <Box
                      sx={{
                        textAlign: 'right',
                        background: 'rgba(255,255,255,0.15)',
                        borderRadius: 3,
                        p: 2,
                        border: '1px solid rgba(255,255,255,0.2)',
                        backdropFilter: 'blur(10px)',
                      }}
                    >
                      <Typography variant="caption" sx={{ opacity: 0.9, fontSize: '0.75rem' }}>
                        🏆 Top Brand
                      </Typography>
                      <Typography variant="h6" fontWeight="bold" sx={{ fontSize: '1rem' }}>
                        {topBrands[0].manufacturer}
                      </Typography>
                      <Typography variant="caption" sx={{ opacity: 0.9, fontSize: '0.75rem' }}>
                        {topBrands[0].count} κινητήρες
                      </Typography>
                    </Box>
                  )}
                </HeroCard>

                {/* Quick Stats Row */}
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <MetricCard>
                      <ElectricalServices sx={{ fontSize: 32, color: 'primary.dark', mb: 1 }} />
                      <Typography variant="h6" fontWeight="bold" color="#1a365d">
                        {formatValue(types.totalElMotorMotors || 0)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Ηλεκτρικά Μοτέρ
                      </Typography>
                      <ProgressContainer>
                        <LinearProgress
                          variant="determinate"
                          value={elMotorPercentage}
                          sx={{
                            flex: 1,
                            height: 8,
                            borderRadius: 4,
                            backgroundColor: alpha(theme.palette.primary.dark, 0.2),
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: 'primary.dark',
                              borderRadius: 4,
                            },
                          }}
                        />
                        <Typography variant="caption" fontWeight="bold">
                          {elMotorPercentage.toFixed(1)}%
                        </Typography>
                      </ProgressContainer>
                    </MetricCard>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <MetricCard>
                      <WaterDrop sx={{ fontSize: 32, color: '#00bcd4', mb: 1 }} />
                      <Typography variant="h6" fontWeight="bold" color="#1a365d">
                        {formatValue(types.totalPumpMotors || 0)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Αντλίες
                      </Typography>
                      <ProgressContainer>
                        <LinearProgress
                          variant="determinate"
                          value={pumpPercentage}
                          sx={{
                            flex: 1,
                            height: 8,
                            borderRadius: 4,
                            backgroundColor: 'rgba(0, 188, 212, 0.2)',
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: '#00bcd4',
                              borderRadius: 4,
                            },
                          }}
                        />
                        <Typography variant="caption" fontWeight="bold">
                          {pumpPercentage.toFixed(1)}%
                        </Typography>
                      </ProgressContainer>
                    </MetricCard>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <MetricCard>
                      <FlashOn sx={{ fontSize: 32, color: '#ffc107', mb: 1 }} />
                      <Typography variant="h6" fontWeight="bold" color="#1a365d">
                        {formatValue(types.totalGeneratorMotors || 0)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Γεννήτριες
                      </Typography>
                      <ProgressContainer>
                        <LinearProgress
                          variant="determinate"
                          value={generatorPercentage}
                          sx={{
                            flex: 1,
                            height: 8,
                            borderRadius: 4,
                            backgroundColor: 'rgba(255, 193, 7, 0.2)',
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: '#ffc107',
                              borderRadius: 4,
                            },
                          }}
                        />
                        <Typography variant="caption" fontWeight="bold">
                          {generatorPercentage.toFixed(1)}%
                        </Typography>
                      </ProgressContainer>
                    </MetricCard>
                  </Grid>
                </Grid>

                {/* Step Types Row */}
                <Grid container spacing={2} sx={{ mt: 2 }}>
                  <Grid item xs={12}>
                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, color: '#1a365d' }}>
                      Κατανομή Τύπου Βήματος
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <MetricCard>
                      <Settings sx={{ fontSize: 32, color: '#673ab7', mb: 1 }} />
                      <Typography variant="h6" fontWeight="bold" color="#1a365d">
                        {formatValue(stepTypes.totalStandardStep || 0)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Ολοκληρο
                      </Typography>
                      <ProgressContainer>
                        <LinearProgress
                          variant="determinate"
                          value={standardStepPercentage}
                          sx={{
                            flex: 1,
                            height: 8,
                            borderRadius: 4,
                            backgroundColor: 'rgba(103, 58, 183, 0.2)',
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: '#673ab7',
                              borderRadius: 4,
                            },
                          }}
                        />
                        <Typography variant="caption" fontWeight="bold">
                          {standardStepPercentage.toFixed(1)}%
                        </Typography>
                      </ProgressContainer>
                    </MetricCard>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <MetricCard>
                      <Speed sx={{ fontSize: 32, color: '#ff9800', mb: 1 }} />
                      <Typography variant="h6" fontWeight="bold" color="#1a365d">
                        {formatValue(stepTypes.totalHalfStep || 0)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Μισο-μισο
                      </Typography>
                      <ProgressContainer>
                        <LinearProgress
                          variant="determinate"
                          value={halfStepPercentage}
                          sx={{
                            flex: 1,
                            height: 8,
                            borderRadius: 4,
                            backgroundColor: 'rgba(255, 152, 0, 0.2)',
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: '#ff9800',
                              borderRadius: 4,
                            },
                          }}
                        />
                        <Typography variant="caption" fontWeight="bold">
                          {halfStepPercentage.toFixed(1)}%
                        </Typography>
                      </ProgressContainer>
                    </MetricCard>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <MetricCard>
                      <AutoAwesome sx={{ fontSize: 32, color: '#f44336', mb: 1 }} />
                      <Typography variant="h6" fontWeight="bold" color="#1a365d">
                        {formatValue(stepTypes.totalCombinedStep || 0)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Συνδιασμός
                      </Typography>
                      <ProgressContainer>
                        <LinearProgress
                          variant="determinate"
                          value={combinedStepPercentage}
                          sx={{
                            flex: 1,
                            height: 8,
                            borderRadius: 4,
                            backgroundColor: 'rgba(244, 67, 54, 0.2)',
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: '#f44336',
                              borderRadius: 4,
                            },
                          }}
                        />
                        <Typography variant="caption" fontWeight="bold">
                          {combinedStepPercentage.toFixed(1)}%
                        </Typography>
                      </ProgressContainer>
                    </MetricCard>
                  </Grid>
                </Grid>
              </TabPanel>
            )}

            {/* Tab Panel 2 - Αναλυτικά Charts */}
            {activeTab === 1 && (
              <TabPanel>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <EnhancedCard>
                      <FloatingIcon bgcolor={theme.palette.primary.dark}>
                        <Engineering />
                      </FloatingIcon>
                      <CardContent sx={{ pt: 4, pb: 2 }}>
                        <Typography
                          variant="h6"
                          fontWeight="bold"
                          textAlign="center"
                          sx={{ mb: 2, color: '#1a365d' }}
                        >
                          Κατανομή Κατά Τύπο
                        </Typography>
                        <ChartContainer sx={{ height: '250px' }}>
                          <Doughnut
                            data={motorTypeData}
                            options={{
                              ...chartOptions,
                              cutout: '60%',
                              plugins: {
                                ...chartOptions.plugins,
                                legend: {
                                  ...chartOptions.plugins.legend,
                                  position: 'bottom',
                                },
                              },
                            }}
                          />
                        </ChartContainer>
                      </CardContent>
                    </EnhancedCard>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <EnhancedCard>
                      <FloatingIcon bgcolor="#00bcd4">
                        <ElectricBolt />
                      </FloatingIcon>
                      <CardContent sx={{ pt: 4, pb: 2 }}>
                        <Typography
                          variant="h6"
                          fontWeight="bold"
                          textAlign="center"
                          sx={{ mb: 2, color: '#1a365d' }}
                        >
                          Κατανομή Φάσεων
                        </Typography>
                        <ChartContainer sx={{ height: '250px' }}>
                          <Pie data={phaseData} options={chartOptions} />
                        </ChartContainer>
                      </CardContent>
                    </EnhancedCard>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <EnhancedCard>
                      <FloatingIcon bgcolor="#673ab7">
                        <Settings />
                      </FloatingIcon>
                      <CardContent sx={{ pt: 4, pb: 2 }}>
                        <Typography
                          variant="h6"
                          fontWeight="bold"
                          textAlign="center"
                          sx={{ mb: 2, color: '#1a365d' }}
                        >
                          Κατανομή Τύπου Βήματος
                        </Typography>
                        <ChartContainer sx={{ height: '250px' }}>
                          <Pie data={stepData} options={chartOptions} />
                        </ChartContainer>
                      </CardContent>
                    </EnhancedCard>
                  </Grid>
                </Grid>
              </TabPanel>
            )}

            {/* Tab Panel 3 - Τάσεις & Brands */}
            {activeTab === 2 && (
              <TabPanel>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <EnhancedCard>
                      <FloatingIcon bgcolor="#ffc107">
                        <TrendingUp />
                      </FloatingIcon>
                      <CardContent sx={{ pt: 4, pb: 2 }}>
                        <Typography
                          variant="h6"
                          fontWeight="bold"
                          textAlign="center"
                          sx={{ mb: 2, color: '#1a365d' }}
                        >
                          Top Brands
                        </Typography>
                        <ChartContainer sx={{ height: '300px' }}>
                          <Bar data={topBrandsData} options={barOptions} />
                        </ChartContainer>
                      </CardContent>
                    </EnhancedCard>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <EnhancedCard>
                      <FloatingIcon bgcolor={theme.palette.primary.dark}>
                        <Assessment />
                      </FloatingIcon>
                      <CardContent sx={{ pt: 4, pb: 2 }}>
                        <Typography
                          variant="h6"
                          fontWeight="bold"
                          textAlign="center"
                          sx={{ mb: 3, color: '#1a365d' }}
                        >
                          📈 Εξέλιξη Κινητήρων Ανά Μήνα
                        </Typography>
                        <ChartContainer sx={{ height: '300px' }}>
                          <Line data={trendData} options={lineOptions} />
                        </ChartContainer>
                      </CardContent>
                    </EnhancedCard>
                  </Grid>
                </Grid>
              </TabPanel>
            )}
          </ModalContent>
        </Box>
      </Fade>
    </Modal>
  );
};
