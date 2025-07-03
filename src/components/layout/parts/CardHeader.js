import React from 'react';
import { Box, Typography, Chip, Card, Avatar, styled } from '@mui/material';
import { Engineering } from '@mui/icons-material';

import {
  volt_types_mapping,
  typeOfMotor_mapping,
  typeOfVolt_mapping,
  repairStatus_mapping,
  poles_types_mapping,
  rpm_types_mapping,
} from '../../Models/Motor';

// Styled Components
const HeaderCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
  color: 'white',
  borderRadius: theme.spacing(3),
  position: 'relative',
  overflow: 'visible',
  elevation: 6,
}));

const HeaderAvatar = styled(Avatar)({
  width: 50,
  height: 50,
  backgroundColor: 'rgba(255,255,255,0.15)',
  border: '2px solid rgba(255,255,255,0.25)',
});

const HeaderChip = styled(Chip)({
  backgroundColor: 'rgba(255,255,255,0.2)',
  color: 'white',
  fontWeight: 'bold',
  fontSize: '0.7rem',
  height: 20,
});

const FloatingStatusChip = styled(Chip)(({ status }) => ({
  backgroundColor: status === 'completed' ? '#4caf50' : '#ff9800',
  color: 'white',
  fontWeight: 'bold',
  fontSize: '0.75rem',
  height: 24,
  position: 'absolute',
  top: -8,
  right: 16,
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

export const CardHeader = (props) => {
  const renderHeaderChips = () => {
    const chipData = [
      { label: `${props.repair.motor.kw || 0}kW` },
      { label: `${props.repair.motor.hp || 0}HP` },
      { label: `${rpm_types_mapping[props.repair.motor.rpm] || 1490}RPM` },
      { label: `${poles_types_mapping[props.repair.motor.poles]}P` || 0 },
      { label: volt_types_mapping[props.repair.motor.volt] || props.repair.motor.volt || '-' },
      {
        label:
          typeOfVolt_mapping[props.repair.motor.typeOfVolt] || props.repair.motor.typeOfVolt || '-',
      },
    ];

    return (
      <Box sx={commonStyles.flexWrap}>
        {chipData.map((chip, index) => (
          <HeaderChip key={index} label={chip.label} size="small" />
        ))}
      </Box>
    );
  };
  return (
    <HeaderCard>
      <Box sx={commonStyles.headerContainer}>
        <HeaderAvatar>
          <Engineering sx={{ fontSize: 24 }} />
        </HeaderAvatar>

        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 0.5 }}>
            {props.repair.motor.manufacturer || 'Κινητήρας'}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
            {props.repair.customer?.name || 'Πελάτης'}
          </Typography>
          {renderHeaderChips()}
        </Box>

        <Box sx={{ textAlign: 'right' }}>
          <Typography variant="caption" sx={{ opacity: 0.8 }}>
            S/N
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            {props.repair.motor.serialNumber || '-'}
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.8 }}>
            {typeOfMotor_mapping[props.repair.motor.typeOfMotor] ||
              props.repair.motor.typeOfMotor ||
              '-'}
          </Typography>
        </Box>
      </Box>

      <FloatingStatusChip
        label={
          repairStatus_mapping[props.repair.repairStatus] || props.repair.repairStatus || 'Άγνωστο'
        }
        size="small"
        status={props.repair.repairStatus}
      />
    </HeaderCard>
  );
};
