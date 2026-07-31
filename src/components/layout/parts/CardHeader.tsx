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
import type { RepairDetailData } from '../../../types/repairCards';

// Styled Components
const HeaderCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  background: theme.custom.gradients.primary,
  color: 'white',
  borderRadius: theme.spacing(3),
  position: 'relative',
  overflow: 'visible',
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

interface FloatingStatusChipProps {
  status?: string;
}

const FloatingStatusChip = styled(Chip)<FloatingStatusChipProps>(({ status }) => ({
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
  flexWrap: {
    display: 'flex',
    gap: 0.5,
    flexWrap: 'wrap',
  },
} as const;

interface CardHeaderProps {
  repair: RepairDetailData;
}

export const CardHeader = (props: CardHeaderProps) => {
  const renderHeaderChips = () => {
    const motor = props.repair.motor;
    const chipData = [
      { label: `${motor?.kw || 0}kW` },
      { label: `${motor?.hp || 0}HP` },
      { label: `${(motor?.rpm && rpm_types_mapping[motor.rpm]) || 1490}RPM` },
      { label: `${motor?.poles ? poles_types_mapping[motor.poles] : 0}P` },
      { label: (motor?.volt && volt_types_mapping[motor.volt]) || motor?.volt || '-' },
      { label: `${motor?.amps || 0} Αμπέρ` },
      {
        label: (motor?.typeOfVolt && typeOfVolt_mapping[motor.typeOfVolt]) || motor?.typeOfVolt || '-',
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
            {props.repair.motor?.manufacturer || 'Κινητήρας'}
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
            {props.repair.motor?.serialNumber || '-'}
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.8 }}>
            {(props.repair.motor?.typeOfMotor && typeOfMotor_mapping[props.repair.motor.typeOfMotor]) ||
              props.repair.motor?.typeOfMotor ||
              '-'}
          </Typography>
        </Box>
      </Box>

      <FloatingStatusChip
        label={repairStatus_mapping[props.repair.repairStatus] || props.repair.repairStatus || 'Άγνωστο'}
        size="small"
        status={props.repair.repairStatus}
      />
    </HeaderCard>
  );
};
