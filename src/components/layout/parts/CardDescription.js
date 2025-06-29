import React from 'react';
import { Box, Typography, Card, CardContent, Avatar, Divider, styled } from '@mui/material';
import { Info } from '@mui/icons-material';

// Styled Components

const MainCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.spacing(3),
  overflow: 'visible',
  position: 'relative',
  background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
  border: '1px solid rgba(0,0,0,0.08)',
  elevation: 4,
}));

// Common styles object
const commonStyles = {
  headerContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
  },
  flexBetween: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flexWrap: {
    display: 'flex',
    gap: 0.5,
    flexWrap: 'wrap',
  },
  sectionTitle: {
    variant: 'h6',
    fontWeight: 'bold',
    mb: 2,
  },
  whiteText: {
    color: 'white',
  },
  whiteTextSemi: {
    color: 'white',
    opacity: 0.9,
  },
  cardContent: {
    pt: 3,
    pb: 3,
  },
  fullHeight: {
    height: '100%',
  },
  centeredText: {
    textAlign: 'center',
  },
};

export const CardDescription = (props) => {
  return (
    <MainCard sx={{ mt: 2, background: 'linear-gradient(145deg, #e3f2fd 0%, #bbdefb 100%)' }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ ...commonStyles.headerContainer, mb: 2 }}>
          <Avatar sx={{ bgcolor: 'info.main', width: 40, height: 40 }}>
            <Info sx={{ fontSize: 20 }} />
          </Avatar>
          <Typography variant="h6" color="info.main" fontWeight="bold">
            Περιγραφή Επισκευής
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ lineHeight: 1.6, color: 'text.primary' }}>
          {props.repair.description}
        </Typography>
        {props.repair.notes && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body1" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
              <strong>Σημειώσεις:</strong> {props.repair.notes}
            </Typography>
          </>
        )}
      </CardContent>
    </MainCard>
  );
};
