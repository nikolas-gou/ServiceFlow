import React from 'react';
import {
  Box,
  Grid,
  Typography,
  Chip,
  Card,
  CardContent,
  Avatar,
  Stack,
  Divider,
  styled,
} from '@mui/material';
import {
  ElectricBolt,
  Speed,
  Settings,
  Info,
  Engineering,
  Cable,
  Memory,
  Tune,
  Person,
  Build,
  Euro,
  Schedule,
} from '@mui/icons-material';

import {
  volt_types_mapping,
  typeOfMotor_mapping,
  typeOfVolt_mapping,
  connectionism_types_mapping,
  repairStatus_mapping,
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

function EnhancedMotorRepairDisplay({ repair }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('el-GR');
  };

  const hasComplexWinding = (motor) => {
    return (
      motor.halfStep ||
      motor.halfSpiral ||
      motor.halfCrossSection ||
      motor.helperStep ||
      motor.helperSpiral ||
      motor.helperCrossSection
    );
  };

  if (!repair || !repair.motor) {
    return (
      <Box sx={{ p: 3, ...commonStyles.centeredText }}>
        <Typography variant="h6" color="text.secondary">
          Δεν υπάρχουν δεδομένα επισκευής
        </Typography>
      </Box>
    );
  }

  const renderMainWindingSpecs = () => (
    <Grid item xs={12} md={6}>
      <ColoredBox color="primary">
        <Typography sx={{ mb: 1.5, ...commonStyles.whiteText, ...commonStyles.flexBetween }}>
          <Settings sx={{ fontSize: 16 }} />
          Κύρια Τυλίγματα
        </Typography>
        <Stack spacing={1.5}>
          {[
            { label: 'Βήμα:', value: repair.motor.step },
            { label: 'Σπείρες:', value: repair.motor.spiral },
            {
              label: 'Διατομή:',
              value: repair.motor.motorCrossSectionLinks
                .filter((item) => item.type == 'standard')
                .map((item) => item.crossSection + ' + '),
            },
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
        </Stack>
      </ColoredBox>
    </Grid>
  );

  const renderComplexWindingSpecs = () => (
    <Grid item xs={12} md={6}>
      <ColoredBox color="secondary">
        <Typography sx={{ mb: 1.5, ...commonStyles.whiteText, ...commonStyles.flexBetween }}>
          <Tune sx={{ fontSize: 16 }} />
          Επιπλέον Τυλίγματα
        </Typography>
        <Stack spacing={1.5}>
          {[
            {
              label: 'Βήμα:',
              values: [
                { label: 'Μισό', value: repair.motor.halfStep },
                { label: 'Βοηθητικό', value: repair.motor.helperStep },
              ],
            },
            {
              label: 'Σπείρες:',
              values: [
                { label: 'Μισές', value: repair.motor.halfSpiral },
                { label: 'Βοηθητικές', value: repair.motor.helperSpiral },
              ],
            },
            {
              label: 'Διατομή:',
              values: [
                { label: 'Μισή', value: repair.motor.halfCrossSection },
                { label: 'Βοηθητική', value: repair.motor.helperCrossSection },
              ],
            },
          ].map(({ label, values }) => {
            const hasValues = values.some((v) => v.value);
            if (!hasValues) return null;

            return (
              <Box key={label}>
                <Typography variant="caption" sx={{ ...commonStyles.whiteTextSemi, mb: 0.5 }}>
                  {label}
                </Typography>
                <Box sx={commonStyles.flexWrap}>
                  {values.map(
                    ({ label: valueLabel, value }) =>
                      value && (
                        <SmallChip
                          key={valueLabel}
                          label={`${valueLabel}: ${value}`}
                          size="small"
                        />
                      ),
                  )}
                </Box>
              </Box>
            );
          })}
        </Stack>
      </ColoredBox>
    </Grid>
  );

  const renderHeaderChips = () => {
    const chipData = [
      { label: `${repair.motor.kw || 0}kW` },
      { label: `${repair.motor.hp || 0}HP` },
      { label: `${repair.motor.rpm || 1490}RPM` },
      { label: `${repair.motor.poles || 0}P` },
      { label: volt_types_mapping[repair.motor.volt] || repair.motor.volt || '-' },
      { label: typeOfVolt_mapping[repair.motor.typeOfVolt] || repair.motor.typeOfVolt || '-' },
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
    <Box sx={{ margin: 1 }}>
      {/* Header Card */}
      <HeaderCard>
        <Box sx={commonStyles.headerContainer}>
          <HeaderAvatar>
            <Engineering sx={{ fontSize: 24 }} />
          </HeaderAvatar>

          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 0.5 }}>
              {repair.motor.manufacturer || 'Κινητήρας'}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
              {repair.customer?.name || 'Πελάτης'}
            </Typography>
            {renderHeaderChips()}
          </Box>

          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="caption" sx={{ opacity: 0.8 }}>
              S/N
            </Typography>
            <Typography variant="body1" fontWeight="bold">
              {repair.motor.serialNumber || '-'}
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.8 }}>
              {typeOfMotor_mapping[repair.motor.typeOfMotor] || repair.motor.typeOfMotor || '-'}
            </Typography>
          </Box>
        </Box>

        <FloatingStatusChip
          label={repairStatus_mapping[repair.repairStatus] || repair.repairStatus || 'Άγνωστο'}
          size="small"
          status={repair.repairStatus}
        />
      </HeaderCard>

      <Grid container spacing={2}>
        {/* Main Technical Card */}
        <Grid item xs={12} lg={8}>
          <MainCard>
            <CategoryIcon bgcolor="primary">
              <Memory sx={{ fontSize: 18 }} />
            </CategoryIcon>

            <CardContent sx={commonStyles.cardContent}>
              <Typography color="primary.main" sx={commonStyles.sectionTitle}>
                Τεχνικά Χαρακτηριστικά
              </Typography>

              <Grid container spacing={2}>
                {renderMainWindingSpecs()}
                {hasComplexWinding(repair.motor) && renderComplexWindingSpecs()}
              </Grid>

              <Box sx={{ mt: 2, ...commonStyles.centeredText }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                  Τρόπος Σύνδεσης
                </Typography>
                <Chip
                  label={
                    connectionism_types_mapping[repair.motor.connectionism] ||
                    repair.motor.connectionism ||
                    '-'
                  }
                  color="info"
                  size="small"
                  sx={{ fontWeight: 'bold' }}
                />
              </Box>
            </CardContent>
          </MainCard>

          {/* Description Card */}
          {repair.description && (
            <MainCard
              sx={{ mt: 2, background: 'linear-gradient(145deg, #e3f2fd 0%, #bbdefb 100%)' }}
            >
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
                  {repair.description}
                </Typography>
                {repair.notes && (
                  <>
                    <Divider sx={{ my: 2 }} />
                    <Typography
                      variant="body1"
                      sx={{ fontStyle: 'italic', color: 'text.secondary' }}
                    >
                      <strong>Σημειώσεις:</strong> {repair.notes}
                    </Typography>
                  </>
                )}
              </CardContent>
            </MainCard>
          )}
        </Grid>

        {/* Sidebar Cards */}
        <Grid item xs={12} lg={4} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Customer Card */}
          {repair.customer && (
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
                      { label: 'Όνομα:', value: repair.customer.name },
                      { label: 'Τηλέφωνο:', value: repair.customer.phone },
                    ].map(({ label, value }) => (
                      <Box key={label} sx={commonStyles.flexBetween}>
                        <Typography variant="body2" sx={commonStyles.whiteTextSemi}>
                          {label}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{ ...commonStyles.whiteText, fontWeight: 'bold' }}
                        >
                          {value || '-'}
                        </Typography>
                      </Box>
                    ))}
                    <Box sx={commonStyles.flexBetween}>
                      <Typography variant="body2" sx={commonStyles.whiteTextSemi}>
                        Τύπος:
                      </Typography>
                      <SmallChip
                        label={repair.customer.type === 'individual' ? 'Ιδιώτης' : 'Επιχείρηση'}
                        size="small"
                      />
                    </Box>
                  </Stack>
                </ColoredBox>
              </CardContent>
            </MainCard>
          )}

          {/* Repair Info Card */}
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
                      €{repair.cost || '0.00'}
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
                      <Typography
                        variant="body2"
                        sx={{ ...commonStyles.whiteText, fontWeight: 'bold' }}
                      >
                        {repair.isArrived ? formatDate(repair.isArrived) : '-'}
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="caption" sx={commonStyles.whiteTextSemi}>
                        Εκτίμηση:
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ ...commonStyles.whiteText, fontWeight: 'bold' }}
                      >
                        {repair.estimatedIsComplete ? formatDate(repair.estimatedIsComplete) : '-'}
                      </Typography>
                    </Box>
                  </Box>
                </Stack>
              </ColoredBox>
            </CardContent>
          </MainCard>
        </Grid>
      </Grid>
    </Box>
  );
}

export default EnhancedMotorRepairDisplay;
