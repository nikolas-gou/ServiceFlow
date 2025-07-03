import React from 'react';
import { Box, Grid, Typography, Chip, Card, CardContent, Stack, styled } from '@mui/material';
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

import { connectionism_types_mapping, getMotorTypeString } from '../../Models/Motor';
import { CardCustomer } from './CardCustomer';
import { CardRepair } from './CardRepair';
import { CardDescription } from './CardDescription';
import { CardHeader } from './CardHeader';
import { CardConnectionism } from './CardConnectionism';

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

// Helper component for winding specs
function WindingSpecBox({ title, values, color = 'primary', icon = null }) {
  return (
    <ColoredBox color={color}>
      <Typography sx={{ mb: 1.5, ...commonStyles.whiteText, ...commonStyles.flexBetween }}>
        {icon}
        {title}
      </Typography>
      <Stack spacing={1.5}>
        {values.map(({ label, value }) => (
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
  );
}

// Helper function για σωστή εμφάνιση διατομών
const formatCrossSections = (arr) => {
  if (!arr || arr.length === 0) return '-';
  return arr.join(' + ');
};

function SplitWindingBox({ leftTitle, leftValues, rightTitle, rightValues, color, icon }) {
  return (
    <ColoredBox color={color}>
      <Typography sx={{ mb: 1.5, ...commonStyles.whiteText, ...commonStyles.flexBetween }}>
        {icon}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'stretch' }}>
        {/* Left (Half) */}
        <Box sx={{ flex: 1, pr: 2, borderRight: '2px solid #fff' }}>
          <Typography variant="subtitle2" sx={{ color: '#fff', mb: 1, textAlign: 'center' }}>
            {leftTitle}
          </Typography>
          <Stack spacing={1.5}>
            {leftValues.map(({ label, value }) => (
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
        </Box>
        {/* Right (Standard) */}
        <Box sx={{ flex: 1, pl: 2 }}>
          <Typography variant="subtitle2" sx={{ color: '#fff', mb: 1, textAlign: 'center' }}>
            {rightTitle}
          </Typography>
          <Stack spacing={1.5}>
            {rightValues.map(({ label, value }) => (
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
        </Box>
      </Box>
    </ColoredBox>
  );
}

function OnePhaseCombinedWindingSpecs({ motor, crossSections }) {
  return (
    <>
      {/* Κυρίως */}
      <Grid item xs={12} md={6}>
        <SplitWindingBox
          color="primary"
          icon={<Settings sx={{ fontSize: 16 }} />}
          leftTitle="Μισό Κυρίως"
          rightTitle="Ολόκληρο Κυρίως"
          leftValues={[
            { label: 'Βήμα:', value: motor.halfStep },
            { label: 'Σπείρες:', value: motor.halfSpiral },
            { label: 'Διατομή:', value: crossSections(['main_half']) },
          ]}
          rightValues={[
            { label: 'Βήμα:', value: motor.step },
            { label: 'Σπείρες:', value: motor.spiral },
            { label: 'Διατομή:', value: crossSections(['main_standard']) },
          ]}
        />
      </Grid>
      {/* Βοηθητικό */}
      <Grid item xs={12} md={6}>
        <SplitWindingBox
          color="warning"
          icon={<Tune sx={{ fontSize: 16 }} />}
          leftTitle="Μισό Βοηθητικό"
          rightTitle="Ολόκληρο Βοηθητικό"
          leftValues={[
            { label: 'Βήμα:', value: motor.helperHalfStep },
            { label: 'Σπείρες:', value: motor.helperHalfSpiral },
            { label: 'Διατομή:', value: crossSections(['helper_half']) },
          ]}
          rightValues={[
            { label: 'Βήμα:', value: motor.helperStep },
            { label: 'Σπείρες:', value: motor.helperSpiral },
            { label: 'Διατομή:', value: crossSections(['helper_standard']) },
          ]}
        />
      </Grid>
    </>
  );
}

// Single render function for all winding types except 1-phase-combined
function renderWindingSpecs(repair) {
  const typeString = getMotorTypeString(repair.motor);
  const m = repair.motor;
  const crossSections = (types) =>
    formatCrossSections(
      m.motorCrossSectionLinks
        .filter((item) => types.includes(item.type))
        .map((item) => item.crossSection),
    );
  // 1-phase-combined: use the dedicated split layout
  if (typeString === '1-phase-combined') {
    return <OnePhaseCombinedWindingSpecs motor={m} crossSections={crossSections} />;
  }
  // Map typeString to display config
  const configMap = {
    '3-phase-standard': {
      title: 'Ολόκληρο',
      color: 'primary',
      icon: <Settings sx={{ fontSize: 16 }} />,
      values: [
        { label: 'Βήμα:', value: m.step },
        { label: 'Σπείρες:', value: m.spiral },
        { label: 'Διατομή:', value: crossSections(['standard']) },
      ],
    },
    '3-phase-half': {
      title: 'Μισό - Μισό',
      color: 'secondary',
      icon: <Tune sx={{ fontSize: 16 }} />,
      values: [
        { label: 'Βήμα:', value: m.halfStep },
        { label: 'Σπείρες:', value: m.halfSpiral },
        { label: 'Διατομή:', value: crossSections(['half']) },
      ],
    },
    '3-phase-combined': {
      // split layout: half + standard
      split: true,
      left: {
        title: 'Μισό - Μισό',
        color: 'secondary',
        icon: <Tune sx={{ fontSize: 16 }} />,
        values: [
          { label: 'Βήμα:', value: m.halfStep },
          { label: 'Σπείρες:', value: m.halfSpiral },
          { label: 'Διατομή:', value: crossSections(['half']) },
        ],
      },
      right: {
        title: 'Ολόκληρο',
        color: 'primary',
        icon: <Settings sx={{ fontSize: 16 }} />,
        values: [
          { label: 'Βήμα:', value: m.step },
          { label: 'Σπείρες:', value: m.spiral },
          { label: 'Διατομή:', value: crossSections(['standard']) },
        ],
      },
    },
    '1-phase-standard': {
      // split: main + helper
      split: true,
      left: {
        title: 'Κυρίως Ολόκληρο',
        color: 'primary',
        icon: <Settings sx={{ fontSize: 16 }} />,
        values: [
          { label: 'Βήμα:', value: m.step },
          { label: 'Σπείρες:', value: m.spiral },
          { label: 'Διατομή:', value: crossSections(['main_standard']) },
        ],
      },
      right: {
        title: 'Βοηθητικό Ολόκληρο',
        color: 'warning',
        icon: <Tune sx={{ fontSize: 16 }} />,
        values: [
          { label: 'Βήμα:', value: m.helperStep },
          { label: 'Σπείρες:', value: m.helperSpiral },
          { label: 'Διατομή:', value: crossSections(['helper_standard']) },
        ],
      },
    },
    '1-phase-half': {
      // split: main half + helper half
      split: true,
      left: {
        title: 'Κυρίως Μισό',
        color: 'primary',
        icon: <Settings sx={{ fontSize: 16 }} />,
        values: [
          { label: 'Βήμα:', value: m.halfStep },
          { label: 'Σπείρες:', value: m.halfSpiral },
          { label: 'Διατομή:', value: crossSections(['main_half']) },
        ],
      },
      right: {
        title: 'Βοηθητικό Μισό',
        color: 'warning',
        icon: <Tune sx={{ fontSize: 16 }} />,
        values: [
          { label: 'Βήμα:', value: m.helperHalfStep },
          { label: 'Σπείρες:', value: m.helperHalfSpiral },
          { label: 'Διατομή:', value: crossSections(['helper_half']) },
        ],
      },
    },
  };
  const config = configMap[typeString];
  if (!config) return null;
  if (config.split) {
    return (
      <>
        <Grid item xs={12} md={6}>
          <WindingSpecBox {...config.left} />
        </Grid>
        <Grid item xs={12} md={6}>
          <WindingSpecBox {...config.right} />
        </Grid>
      </>
    );
  }
  return (
    <Grid item xs={12}>
      <WindingSpecBox {...config} />
    </Grid>
  );
}

function EnhancedMotorRepairDisplay({ repair }) {
  if (!repair || !repair.motor) {
    return (
      <Box sx={{ p: 3, ...commonStyles.centeredText }}>
        <Typography variant="h6" color="text.secondary">
          Δεν υπάρχουν δεδομένα επισκευής
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ margin: 1 }}>
      {/* Header Card */}
      <CardHeader repair={repair} />

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
                {/* Render all winding specs with one function */}
                {renderWindingSpecs(repair)}
              </Grid>

              {/* Connectionism Απλή  */}
              <CardConnectionism connectionism={repair.motor.connectionism} />
            </CardContent>
          </MainCard>

          {/* Description Card */}
          {repair.description && <CardDescription repair={repair} />}
        </Grid>

        {/* Sidebar Cards */}
        <Grid item xs={12} lg={4} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* customer card */}
          {repair.customer && <CardCustomer repair={repair} />}

          {/* Repair Info Card */}
          <CardRepair repair={repair} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default EnhancedMotorRepairDisplay;
