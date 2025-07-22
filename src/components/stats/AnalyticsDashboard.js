import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, styled, CircularProgress, Tabs, Tab } from '@mui/material';
import { AllInclusive, Build, Memory, People, Warning } from '@mui/icons-material';
import { StatisticRepository } from '../Repositories/StatisticRepository';
import { CustomerStatisticsModal } from './CustomerStatisticsModal';
import { MotorStatisticsModal } from './MotorStatisticsModal';
import LoadingCard from '../common/LoadingCard';
import ErrorSnackbar from '../common/ErrorSnackbar';
import { useErrorSnackbar } from '../../hooks/useErrorSnackbar';
import { getStandardErrorMessage, safeStatValue } from '../../utils/errorHandling';
import { AnalyticsCard } from './parts/AnalyticsCard';
import { AllCategoryCards } from './cards/AllCategoryCards';
import { MotorCardsData } from './cards/MotorCardsData';
import { CustomerCardsData } from './cards/CustomerCardsData';
import { RepairCardsData } from './cards/RepairCardsData';

// Styled Components
const StyledTabs = styled(Tabs)(({ theme }) => ({
  background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
  borderRadius: '16px 16px 0 0',
  minHeight: '64px',
  '& .MuiTabs-indicator': {
    backgroundColor: '#ffb74d',
    height: '4px',
    borderRadius: '4px 4px 0 0',
    boxShadow: '0 0 8px rgba(255, 183, 77, 0.6)',
  },
  '& .MuiTabs-flexContainer': {
    height: '64px',
  },
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  color: 'rgba(255, 255, 255, 0.7)',
  fontWeight: 600,
  fontSize: '0.95rem',
  textTransform: 'none',
  minHeight: '64px',
  padding: '12px 24px',
  transition: 'all 0.3s ease',
  '&.Mui-selected': {
    color: '#ffb74d',
    fontWeight: 700,
    textShadow: '0 0 8px rgba(255, 183, 77, 0.3)',
    '& .MuiSvgIcon-root': {
      color: '#ffb74d',
      filter: 'drop-shadow(0 0 4px rgba(255, 183, 77, 0.4))',
    },
  },
  '&:hover': {
    color: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    '& .MuiSvgIcon-root': {
      transform: 'scale(1.1)',
    },
  },
  '& .MuiSvgIcon-root': {
    marginRight: '8px',
    fontSize: '20px',
    transition: 'all 0.3s ease',
  },
}));

const TabContent = styled(Box)(({ theme }) => ({
  backgroundColor: '#F8FAFC',
  minHeight: 'calc(100vh - 200px)',
  padding: theme.spacing(3),
}));

/**
 * Main Analytics Dashboard Component
 */
export default function AnalyticsDashboard() {
  const [loading, setLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState({});
  const [activeTab, setActiveTab] = useState(0);
  const [customerModalOpen, setCustomerModalOpen] = useState(false);
  const [motorModalOpen, setMotorModalOpen] = useState(false);

  // Χρήση του custom hook για error snackbar
  const { showErrorToast, errorMessage, handleCloseErrorToast } = useErrorSnackbar(
    analyticsData,
    safeStatValue,
  );

  // Tab configuration
  const tabs = [
    { label: 'Όλα', icon: <AllInclusive />, value: 0 },
    { label: 'Επισκευές', icon: <Build />, value: 1 },
    { label: 'Κινητήρες', icon: <Memory />, value: 2 },
    { label: 'Πελάτες', icon: <People />, value: 3 },
  ];

  // Load analytics data
  useEffect(() => {
    loadAnalyticsData();
  }, []);

  const loadAnalyticsData = async () => {
    setLoading(true);
    try {
      const data = await StatisticRepository.getDashboard();
      setAnalyticsData(data || {});
    } catch (err) {
      console.error(getStandardErrorMessage('dashboard', err));
      setAnalyticsData({});
    } finally {
      setLoading(false);
    }
  };

  // Get filtered cards based on category
  const getFilteredCards = (category) => {
    switch (category) {
      case 'main':
        return AllCategoryCards.getMainCards(analyticsData);
      case 'motors':
        return MotorCardsData.getMotorCards(analyticsData);
      case 'customers':
        return CustomerCardsData.getCustomerCards(analyticsData);
      case 'repairs':
        return RepairCardsData.getRepairCards(analyticsData);
      default:
        return [];
    }
  };

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Get cards based on active tab
  const getCardsForActiveTab = () => {
    switch (activeTab) {
      case 0: // Όλα
        return getFilteredCards('main');
      case 1: // Επισκευές
        return getFilteredCards('repairs');
      case 2: // Κινητήρες
        return getFilteredCards('motors');
      case 3: // Πελάτες
        return getFilteredCards('customers');
      default:
        return [];
    }
  };

  // Render content based on active tab
  const renderTabContent = () => {
    if (loading) {
      return (
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
      );
    }

    const filteredCards = getCardsForActiveTab();
    const gridSize = activeTab === 0 ? 3 : 3;

    return (
      <>
        <Grid container spacing={3}>
          {filteredCards.map((card, index) => (
            <Grid item xs={12} sm={6} lg={gridSize} key={index} sx={{ display: 'flex' }}>
              <Box sx={{ width: '100%' }}>
                <AnalyticsCard
                  {...card}
                  onClick={
                    card.title === 'Συνολικοί Κινητήρες'
                      ? () => setMotorModalOpen(true)
                      : card.title === 'Συνολικοί Πελάτες'
                      ? () => setCustomerModalOpen(true)
                      : undefined
                  }
                />
              </Box>
            </Grid>
          ))}
        </Grid>
        <CustomerStatisticsModal
          open={customerModalOpen}
          statistics={analyticsData}
          onClose={() => setCustomerModalOpen(false)}
        />
        <MotorStatisticsModal
          open={motorModalOpen}
          statistics={analyticsData}
          onClose={() => setMotorModalOpen(false)}
        />
      </>
    );
  };

  return (
    <Box sx={{ bgcolor: '#F8FAFC' }}>
      {/* Tabs Header */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
          borderRadius: '16px 16px 0 0',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          mb: 0,
        }}
      >
        <StyledTabs
          value={activeTab}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{ background: 'transparent' }}
        >
          {tabs.map((tab) => (
            <StyledTab key={tab.value} label={tab.label} icon={tab.icon} iconPosition="start" />
          ))}
        </StyledTabs>
      </Box>

      {/* Tab Content */}
      <TabContent>{renderTabContent()}</TabContent>

      {/* Error Snackbar */}
      <ErrorSnackbar open={showErrorToast} message={errorMessage} onClose={handleCloseErrorToast} />
    </Box>
  );
}
