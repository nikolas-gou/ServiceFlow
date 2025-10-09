import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { Memory, Info, Person, Build, CameraAlt } from '@mui/icons-material';

import { getMotorTypeString } from '../../Models/Motor';
import { CardCustomer } from './CardCustomer';
import { CardRepair } from './CardRepair';
import { CardDescription } from './CardDescription';
import { CardHeader } from './CardHeader';
import { CardConnectionism } from './CardConnectionism';
import { CardPhotos } from './CardPhotos';
import MainCardWrapper from '../../common/card/MainCardWrapper';
import BoxInfoDisplay from '../../common/box/main/EnhancedMotorRepairDisplay/BoxInfoDisplay';
import SplitBoxInfoDisplay from '../../common/box/main/EnhancedMotorRepairDisplay/SplitBoxInfoDisplay';
import { getWindingConfigMapByType } from '../../../configs/motor';
import { commonStyles } from '../../common/styled/CommonStyles';

/**
 * @param {Object} repair - The repair object
 * @returns {JSX.Element|null} JSX elements for winding display or null if no config found
 * @description A function to define the template for rendering the winding specs based on the motor type.
 */
function renderWindingSpecs(repair) {
  // get type of motor and map it to the config map
  const typeString = getMotorTypeString(repair.motor);
  const config = getWindingConfigMapByType(repair.motor, typeString);
  if (!config) return null;

  if (typeString === '1-phase-combined') {
    return (
      <>
        <Grid item xs={12} md={6}>
          <SplitBoxInfoDisplay {...config.left} />
        </Grid>
        <Grid item xs={12} md={6}>
          <SplitBoxInfoDisplay {...config.right} />
        </Grid>
      </>
    );
  }

  if (config.split) {
    return (
      <>
        <Grid item xs={12} md={6}>
          <BoxInfoDisplay {...config.left} />
        </Grid>
        <Grid item xs={12} md={6}>
          <BoxInfoDisplay {...config.right} />
        </Grid>
      </>
    );
  }

  return (
    <Grid item xs={12}>
      <BoxInfoDisplay {...config} />
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
          <MainCardWrapper icon={<Memory sx={{ fontSize: 18 }} />} title="Τεχνικά Χαρακτηριστικά">
            <Grid container spacing={2}>
              {renderWindingSpecs(repair)}
            </Grid>

            <CardConnectionism connectionism={repair.motor.connectionism} />
          </MainCardWrapper>

          {/* Description Card */}
          {repair.description && (
            <MainCardWrapper
              icon={<Info sx={{ fontSize: 18 }} />}
              title="Περιγραφή Επισκευής"
              mt={2}
            >
              <CardDescription repair={repair} />
            </MainCardWrapper>
          )}

          {/* Photos Card */}
          {repair.images && repair.images.length > 0 && (
            <MainCardWrapper icon={<CameraAlt sx={{ fontSize: 18 }} />} title="Φωτογραφίες" mt={2}>
              <CardPhotos repair={repair} />
            </MainCardWrapper>
          )}
        </Grid>

        {/* Sidebar Cards */}
        <Grid item xs={12} lg={4} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* customer card */}
          {repair.customer && (
            <MainCardWrapper icon={<Person sx={{ fontSize: 18 }} />} title="Στοιχεία Πελάτη">
              <CardCustomer repair={repair} />
            </MainCardWrapper>
          )}

          {/* Repair Info Card */}
          {repair && (
            <MainCardWrapper icon={<Build sx={{ fontSize: 18 }} />} title="Στοιχεία Επισκευής">
              <CardRepair repair={repair} />
            </MainCardWrapper>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

export default EnhancedMotorRepairDisplay;
