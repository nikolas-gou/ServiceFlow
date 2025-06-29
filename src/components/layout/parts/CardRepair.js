import React from 'react';
import { Box, Typography, Chip, Card, CardContent, Stack, styled } from '@mui/material';
import { Build } from '@mui/icons-material';

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

const CenteredCostBox = styled(Box)({
  textAlign: 'center',
  padding: '12px',
  backgroundColor: 'rgba(255,255,255,0.2)',
  borderRadius: '12px',
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

export const CardRepair = (props) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('el-GR');
  };
  return (
    <MainCard sx={{ flex: 1 }}>
      <CategoryIcon bgcolor="success">
        <Build sx={{ fontSize: 18 }} />
      </CategoryIcon>

      <CardContent
        sx={{
          ...commonStyles.cardContent,
          ...commonStyles.fullHeight,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography color="success.main" sx={commonStyles.sectionTitle}>
          Στοιχεία Επισκευής
        </Typography>

        <ColoredBox color="success" sx={{ flex: 1 }}>
          <Stack spacing={1.5} sx={commonStyles.fullHeight}>
            <CenteredCostBox>
              <Typography variant="h6" sx={{ ...commonStyles.whiteText, fontWeight: 'bold' }}>
                €{props.repair.cost || '0.00'}
              </Typography>
              <Typography variant="caption" sx={commonStyles.whiteTextSemi}>
                Κόστος
              </Typography>
            </CenteredCostBox>

            <Box sx={{ ...commonStyles.flexBetween, flex: 1 }}>
              <Box>
                <Typography variant="caption" sx={commonStyles.whiteTextSemi}>
                  Παραλαβή:
                </Typography>
                <Typography variant="body2" sx={{ ...commonStyles.whiteText, fontWeight: 'bold' }}>
                  {props.repair.isArrived ? formatDate(props.repair.isArrived) : '-'}
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="caption" sx={commonStyles.whiteTextSemi}>
                  Εκτίμηση:
                </Typography>
                <Typography variant="body2" sx={{ ...commonStyles.whiteText, fontWeight: 'bold' }}>
                  {props.repair.estimatedIsComplete
                    ? formatDate(props.repair.estimatedIsComplete)
                    : '-'}
                </Typography>
              </Box>
            </Box>
          </Stack>
        </ColoredBox>
      </CardContent>
    </MainCard>
  );
};
