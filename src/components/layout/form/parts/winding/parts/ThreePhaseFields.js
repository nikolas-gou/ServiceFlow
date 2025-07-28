import React, { useState, useEffect } from 'react';
import { Grid, Autocomplete } from '@mui/material';
import { CrossSectionField } from './CrossSectionField';
import StepField from './StepField';
import CoilsCount from './CoilsCount'; // Ενημερωμένο import
import { StyledTextField } from '../../../../../common/StyledFormComponents';

function ThreePhaseFields(props) {
  return (
    // sx pb  3 mono se sundiasmo
    <Grid container spacing={2.5} sx={props.sx && props.sx}>
      <Grid item xs={12} sm={6}>
        <StepField
          step_label={props.step_label}
          step_name={props.step_name}
          step_value={props.step_value}
          handleInputChange={props.handleInputChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CoilsCount
          label={props.coils_count_label}
          name={props.coils_count_name}
          value={props.coils_count_value}
          placeholder="π.χ. 5"
          handleInputChange={props.handleInputChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        {/* spiral */}
        <StyledTextField
          fullWidth
          label={props.spiral_label}
          name={props.spiral_name}
          variant="outlined"
          value={props.spiral_value}
          onChange={props.handleInputChange}
          placeholder="π.χ. 66"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CrossSectionField
          cross_section_label={props.cross_section_label}
          cross_section_name={props.cross_section_name}
          cross_section_value={props.cross_section_value}
          cross_section_type={props.cross_section_type}
          repair={props.repair}
          setRepair={props.setRepair}
          handleInputChange={props.handleInputChange}
        />
      </Grid>
    </Grid>
  );
}

export default ThreePhaseFields;
