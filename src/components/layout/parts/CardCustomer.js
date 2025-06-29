import React from 'react';
import { Box, Typography, Chip, Card, CardContent, Avatar, Stack, styled } from '@mui/material';
import { Person } from '@mui/icons-material';

// Styled Components

const MainCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.spacing(3),
  overflow: 'visible',
  position: 'relative',
  background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
  border: '1px solid rgba(0,0,0,0.08)',
  elevation: 4,
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
}));

const ColoredBox = styled(Box)(({ theme, color }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette[color]?.light || color,
  borderRadius: theme.spacing(2),
  height: '100%',
}));

const SmallChip = styled(Chip)({
  backgroundColor: 'rgba(255,255,255,0.3)',
  color: 'white',
  fontSize: '0.7rem',
  height: 20,
});

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

export const CardCustomer = (props) => {
  return (
    <MainCard sx={{ flex: 1 }}>
      <CategoryIcon bgcolor="info">
        <Person sx={{ fontSize: 18 }} />
      </CategoryIcon>

      <CardContent sx={commonStyles.cardContent}>
        <Typography color="info.main" sx={commonStyles.sectionTitle}>
          Στοιχεία Πελάτη
        </Typography>

        <ColoredBox color="info">
          <Stack spacing={1.5}>
            {[
              { label: 'Όνομα:', value: props.repair.customer.name },
              { label: 'Τηλέφωνο:', value: props.repair.customer.phone },
            ].map(({ label, value }) => (
              <Box key={label} sx={commonStyles.flexBetween}>
                <Typography variant="body2" sx={commonStyles.whiteTextSemi}>
                  {label}
                </Typography>
                <Typography variant="body1" sx={{ ...commonStyles.whiteText, fontWeight: 'bold' }}>
                  {value || '-'}
                </Typography>
              </Box>
            ))}
            <Box sx={commonStyles.flexBetween}>
              <Typography variant="body2" sx={commonStyles.whiteTextSemi}>
                Τύπος:
              </Typography>
              <SmallChip
                label={props.repair.customer.type === 'individual' ? 'Ιδιώτης' : 'Επιχείρηση'}
                size="small"
              />
            </Box>
          </Stack>
        </ColoredBox>
      </CardContent>
    </MainCard>
  );
};
