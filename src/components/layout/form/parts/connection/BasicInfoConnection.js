import React from 'react';
import { Grid, InputLabel, Select, MenuItem } from '@mui/material';
import { StyledTextField, StyledFormControl } from '../../../../common/StyledFormComponents';
import {
  typeOfVolt,
  typeOfVolt_translated,
  connectionism_types,
  connectionism_types_translated,
  rpm_types,
  rpm_types_translated,
  poles_types,
  poles_types_translated,
} from '../../../../Models/Motor';

export const BasicInfoConnection = (props) => {
  return (
    <Grid container spacing={2.5}>
      <Grid item xs={12} sm={6}>
        <StyledFormControl fullWidth>
          <InputLabel id="connection-type-label">Τύπος Σύνδεσης</InputLabel>
          <Select
            labelId="connection-type-label"
            name="connectionType"
            value={props.connection?.connectionType || ''}
            label="Τύπος Σύνδεσης"
            onChange={props.handleInputChange}
          >
            {connectionism_types.map((type, index) => (
              <MenuItem key={type} value={type}>
                {connectionism_types_translated[index]}
              </MenuItem>
            ))}
          </Select>
        </StyledFormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <StyledFormControl fullWidth>
          <InputLabel id="typeOfVolt-label">Φάσεις Κινητήρα</InputLabel>
          <Select
            labelId="typeOfVolt-label"
            name="typeOfVolt"
            value={props.connection?.typeOfVolt || ''}
            label="Φάσεις Κινητήρα"
            onChange={props.handleInputChange}
          >
            {typeOfVolt.map((type, index) => (
              <MenuItem key={type} value={type}>
                {typeOfVolt_translated[index]}
              </MenuItem>
            ))}
          </Select>
        </StyledFormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <StyledFormControl fullWidth>
          <InputLabel id="poles-label">Πόλοι</InputLabel>
          <Select
            labelId="poles-label"
            name="poles"
            value={props.connection?.poles || ''}
            label="Πόλοι"
            onChange={props.handleInputChange}
          >
            {poles_types.map((type, index) => (
              <MenuItem key={type} value={type}>
                {poles_types_translated[index]}
              </MenuItem>
            ))}
          </Select>
        </StyledFormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <StyledFormControl fullWidth>
          <InputLabel id="rpm-label">Στροφές (RPM)</InputLabel>
          <Select
            labelId="rpm-label"
            name="rpm"
            value={props.connection?.rpm || ''}
            label="Στροφές (RPM)"
            onChange={props.handleInputChange}
          >
            {rpm_types.map((type, index) => (
              <MenuItem key={type} value={type}>
                {rpm_types_translated[index]}
              </MenuItem>
            ))}
          </Select>
        </StyledFormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <StyledTextField
          fullWidth
          label="Βήμα"
          name="step"
          variant="outlined"
          type="number"
          value={props.connection?.step || ''}
          onChange={props.handleInputChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <StyledTextField
          fullWidth
          label="Λούκια"
          name="caves"
          variant="outlined"
          type="number"
          value={props.connection?.caves || ''}
          onChange={props.handleInputChange}
        />
      </Grid>
    </Grid>
  );
};
