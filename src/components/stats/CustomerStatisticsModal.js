import React, { useState } from 'react';
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
  Tabs,
  Tab,
} from '@mui/material';
import { Close as CloseIcon, People, Business, TrendingUp, Warning } from '@mui/icons-material';
import { Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
} from 'chart.js';

import { useErrorSnackbar } from '../../hooks/useErrorSnackbar';
import { safeStatValue, safeDataArray, getStandardErrorMessage } from '../../utils/errorHandling';
import { formatValue } from '../../utils/statistics';
import StyledSnackbar from '../common/StyledSnackbar';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
);

// Modal styling που ταιριάζει με την αισθητική του project
const ModalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '95vw',
  maxWidth: '1200px',
  maxHeight: '90vh',
  bgcolor: 'background.paper',
  borderRadius: 3,
  boxShadow: 24,
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
};

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

// Main card styling
const MainCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.spacing(3),
  overflow: 'visible',
  position: 'relative',
  background: '#fff',
  border: '1px solid #e0e0e0',
  elevation: 2,
  boxShadow: '0 2px 8px 0 rgba(30,60,114,0.07)',
  minHeight: 180, // Μικρότερο από το αρχικό 220
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}));

const CategoryIcon = styled(Box)(({ theme, bgcolor }) => ({
  position: 'absolute',
  top: -16,
  left: 16,
  width: 32,
  height: 32,
  borderRadius: '50%',
  backgroundColor: theme.palette[bgcolor]?.main || bgcolor,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  boxShadow: `0 4px 12px ${theme.palette[bgcolor]?.main}40` || `0 4px 12px ${bgcolor}40`,
  border: '2px solid #fff',
}));

const StatBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1.5), // Μικρότερο padding
  background: '#f8fafc',
  borderRadius: theme.spacing(2),
  border: '1px solid #e0e0e0',
  textAlign: 'center',
  minWidth: 100, // Μικρότερο από το αρχικό 120
  minHeight: 80, // Μικρότερο από το αρχικό 100
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}));

// Compact chart container
const ChartContainer = styled(Box)({
  height: '160px', // Μικρότερο από το αρχικό 260px
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

// Νέα styled components για tabs design
const HeroCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  margin: theme.spacing(2),
  background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
  color: 'white',
  borderRadius: theme.spacing(3),
  position: 'relative',
  overflow: 'visible',
  boxShadow: '0 8px 32px rgba(30, 60, 114, 0.3)',
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
    background: 'linear-gradient(135deg, #1e3c72, #2a5298, #1e3c72)',
    borderRadius: theme.spacing(3),
    zIndex: -1,
    filter: 'blur(6px)',
    opacity: 0.6,
  },
}));

const HeroAvatar = styled(Avatar)({
  width: 60,
  height: 60,
  backgroundColor: 'rgba(255,255,255,0.15)',
  border: '3px solid rgba(255,255,255,0.25)',
  marginRight: 20,
  '& .MuiSvgIcon-root': {
    fontSize: 28,
  },
});

const TabsContainer = styled(Box)({
  borderBottom: '1px solid #e0e0e0',
  backgroundColor: '#fff',
  position: 'sticky',
  top: 0,
  zIndex: 10,
});

const TabPanel = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: '#f8fafc',
  minHeight: 'calc(100vh - 200px)',
  overflow: 'auto',
}));

export const CustomerStatisticsModal = ({ open = false, statistics, onClose }) => {
  // State για tabs navigation
  const [activeTab, setActiveTab] = useState(0);

  // Χρήση του custom hook για error snackbar με fallback
  const { showErrorToast, errorMessage, handleCloseErrorToast } = useErrorSnackbar(
    statistics || {},
    safeStatValue,
  );

  // Early return αν δεν υπάρχουν τα απαραίτητα
  if (!open) return null;
  if (!statistics) return null;

  // Safe data processing
  const customer = statistics.customer || {};
  const safeCustomerTypes = customer.customerTypes || {};
  const safeTrends = customer.trends || {};
  const safeTopCustomers = customer.topCustomersByRevenue || [];

  // Safe data extraction with error handling
  const individualData = safeStatValue(safeCustomerTypes.individual);
  const factoryData = safeStatValue(safeCustomerTypes.factory);
  const totalCustomersData = safeStatValue(customer.totalCustomers);

  // Top customer data with error handling
  const topCustomerResult = safeStatValue(safeTopCustomers[0]?.totalRevenue);
  const topCustomer =
    !topCustomerResult.isError && safeTopCustomers[0] ? safeTopCustomers[0] : null;

  // Pie chart data με safe data και error handling
  const pieData = {
    labels: ['Ιδιώτες', 'Εργοστάσια'],
    datasets: [
      {
        data: [
          individualData.isError ? 0 : individualData.value || 0,
          factoryData.isError ? 0 : factoryData.value || 0,
        ],
        backgroundColor: ['#1976d2', '#ff9800'],
        borderColor: ['#1565c0', '#f57c00'],
        borderWidth: 2,
        hoverOffset: 4,
      },
    ],
  };

  // Safe trends data
  const monthlyTrends = safeDataArray(safeTrends.monthlyTrends);
  const monthlyIndividualTrends = safeDataArray(safeTrends.monthlyIndividualTrends);
  const monthlyFactoryTrends = safeDataArray(safeTrends.monthlyFactoryTrends);

  // Line chart data με safe data processing
  const lineData = {
    labels: statistics?.chartData?.labels || [
      'Ιαν',
      'Φεβ',
      'Μαρ',
      'Απρ',
      'Μάι',
      'Ιουν',
      'Ιουλ',
      'Αυγ',
      'Σεπ',
      'Οκτ',
      'Νοε',
      'Δεκ',
    ],
    datasets: [
      {
        label: 'Συνολικοί Πελάτες',
        data:
          monthlyTrends.length > 0
            ? monthlyTrends
            : Array(statistics?.chartData?.totalMonths || 12).fill(0),
        borderColor: '#1976d2',
        backgroundColor: 'rgba(25, 118, 210, 0.1)',
        fill: true,
        borderWidth: 3,
        tension: 0.4,
      },
      {
        label: 'Ιδιώτες',
        data:
          monthlyIndividualTrends.length > 0
            ? monthlyIndividualTrends
            : Array(statistics?.chartData?.totalMonths || 12).fill(0),
        borderColor: '#4caf50',
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        fill: false,
        borderWidth: 2,
        tension: 0.4,
      },
      {
        label: 'Εργοστάσια',
        data:
          monthlyFactoryTrends.length > 0
            ? monthlyFactoryTrends
            : Array(statistics?.chartData?.totalMonths || 12).fill(0),
        borderColor: '#ff9800',
        backgroundColor: 'rgba(255, 152, 0, 0.1)',
        fill: false,
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  // Chart options για compact εμφάνιση
  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 15,
          usePointStyle: true,
          font: {
            size: 12,
          },
        },
      },
    },
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 15,
          usePointStyle: true,
          font: {
            size: 12,
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: open ? 'flex' : 'none',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1300,
      }}
      onClick={onClose}
    >
      <Box sx={ModalStyle} onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <Box>
            <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
              Λεπτομερή Στατιστικά Πελατών
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
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
          </Box>
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
                  color: '#1e3c72 !important',
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: '#1e3c72',
                  height: 3,
                },
              }}
            >
              <Tab label="👥 Επισκόπηση" />
              <Tab label="📊 Κατανομή" />
              <Tab label="📈 Τάσεις" />
            </Tabs>
          </TabsContainer>

          {/* Tab Panel 1 - Επισκόπηση */}
          {activeTab === 0 && (
            <TabPanel>
              {/* Hero Section */}
              <HeroCard sx={{ m: 0, mb: 3 }}>
                <HeroAvatar>
                  <People sx={{ fontSize: 28 }} />
                </HeroAvatar>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
                    Πελάτες Overview
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9, mb: 2 }}>
                    Συνολικά στατιστικά και κατανομή πελατών
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                    <Chip
                      label={`Συνολικοί: ${
                        totalCustomersData.isError ? 'N/A' : formatValue(totalCustomersData.value)
                      }`}
                      sx={{
                        backgroundColor: totalCustomersData.isError
                          ? 'rgba(244, 67, 54, 0.15)'
                          : 'rgba(255,255,255,0.15)',
                        color: 'white',
                        fontWeight: 600,
                        border: '1px solid rgba(255,255,255,0.3)',
                      }}
                    />
                    <Chip
                      label={`Ιδιώτες: ${
                        individualData.isError ? 'N/A' : formatValue(individualData.value)
                      }`}
                      sx={{
                        backgroundColor: individualData.isError
                          ? 'rgba(244, 67, 54, 0.15)'
                          : 'rgba(255,255,255,0.15)',
                        color: 'white',
                        fontWeight: 600,
                        border: '1px solid rgba(255,255,255,0.3)',
                      }}
                    />
                    <Chip
                      label={`Εργοστάσια: ${
                        factoryData.isError ? 'N/A' : formatValue(factoryData.value)
                      }`}
                      sx={{
                        backgroundColor: factoryData.isError
                          ? 'rgba(244, 67, 54, 0.15)'
                          : 'rgba(255,255,255,0.15)',
                        color: 'white',
                        fontWeight: 600,
                        border: '1px solid rgba(255,255,255,0.3)',
                      }}
                    />
                  </Box>
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                  <Box
                    sx={{
                      background: 'rgba(255,255,255,0.15)',
                      borderRadius: 2,
                      p: 2,
                      border: '1px solid rgba(255,255,255,0.2)',
                    }}
                  >
                    <Typography variant="caption" sx={{ opacity: 0.9 }}>
                      {topCustomerResult.isError ? (
                        <>
                          <Warning sx={{ fontSize: 14, mr: 0.5 }} />
                          Top Πελάτης
                        </>
                      ) : (
                        'Top Πελάτης'
                      )}
                    </Typography>
                    <Typography variant="h6" fontWeight="bold" sx={{ my: 0.5 }}>
                      {topCustomer ? topCustomer.name : 'Μη διαθέσιμο'}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      {topCustomerResult.isError
                        ? 'Σφάλμα δεδομένων'
                        : formatValue(topCustomerResult.value || 0, 'currency')}
                    </Typography>
                  </Box>
                </Box>
              </HeroCard>
            </TabPanel>
          )}

          {/* Tab Panel 2 - Κατανομή */}
          {activeTab === 1 && (
            <TabPanel>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <MainCard>
                    <CategoryIcon bgcolor="success">
                      <Business />
                    </CategoryIcon>
                    <CardContent sx={{ pt: 3, pb: 2 }}>
                      <Typography
                        variant="h6"
                        sx={{ mb: 3, fontWeight: 'bold', textAlign: 'center' }}
                      >
                        Κατανομή Πελατών Κατά Τύπο
                      </Typography>
                      <Box
                        sx={{
                          height: '300px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Pie data={pieData} options={pieOptions} />
                      </Box>
                    </CardContent>
                  </MainCard>
                </Grid>
              </Grid>
            </TabPanel>
          )}

          {/* Tab Panel 3 - Τάσεις */}
          {activeTab === 2 && (
            <TabPanel>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <MainCard>
                    <CategoryIcon bgcolor="info">
                      <TrendingUp />
                    </CategoryIcon>
                    <CardContent sx={{ pt: 3, pb: 2, width: '100%' }}>
                      <Typography
                        variant="h6"
                        sx={{ mb: 3, fontWeight: 'bold', textAlign: 'center' }}
                      >
                        Μηνιαία Εξέλιξη Πελατών
                      </Typography>
                      <Box
                        sx={{
                          height: '400px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Line data={lineData} options={lineOptions} />
                      </Box>
                    </CardContent>
                  </MainCard>
                </Grid>
              </Grid>
            </TabPanel>
          )}
        </ModalContent>
      </Box>

      {/* Error Snackbar */}
      <StyledSnackbar
        open={showErrorToast}
        onClose={handleCloseErrorToast}
        severity="error"
        title="Σφάλμα"
        message={errorMessage}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Box>
  );
};
