import React from 'react';
import { Grid, InputLabel, Select, MenuItem } from '@mui/material';
import {
  connectionism_types,
  connectionism_types_translated,
  volt_types,
  volt_types_translated,
  rpm_types,
  rpm_types_translated,
  poles_types,
  poles_types_translated,
} from '../../../Models/Motor';
import { StyledTextField, StyledFormControl } from '../../../common/StyledFormComponents';

export const TechnicalCharacteristics = (props) => {
  return (
    <Grid container spacing={2.5}>
      <Grid item xs={12} sm={6}>
        <StyledTextField
          fullWidth
          label="Serial Number"
          name="motor.serialNumber"
          variant="outlined"
          value={props.repair.motor?.serialNumber || ''}
          onChange={props.handleInputChange}
          placeholder="π.χ. 3568"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <StyledFormControl fullWidth>
          <InputLabel>Τάση (volt)</InputLabel>
          <Select
            name="motor.volt"
            value={props.repair.motor?.volt || ''}
            label="Τάση (volt)"
            onChange={props.handleInputChange}
          >
            {volt_types.map((type, index) => {
              // * ενα converter για translated
              return (
                <MenuItem key={type} value={type}>
                  {volt_types_translated[index]}
                </MenuItem>
              );
            })}
          </Select>
        </StyledFormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <StyledTextField
          fullWidth
          label="Ισχύς (kW)"
          name="motor.kw"
          type="number"
          variant="outlined"
          value={props.repair.motor?.kw || ''}
          onChange={props.handleInputChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <StyledTextField
          fullWidth
          label="Ισχύς (HP)"
          name="motor.hp"
          type="number"
          variant="outlined"
          value={props.repair.motor?.hp || ''}
          onChange={props.handleInputChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <StyledFormControl fullWidth>
          <InputLabel>Σύνδεση</InputLabel>
          <Select
            name="motor.connectionism"
            value={props.repair.motor?.connectionism || ''}
            label="Σύνδεση"
            onChange={props.handleInputChange}
          >
            {connectionism_types.map((type, index) => {
              // * ενα converter για translated
              return (
                <MenuItem key={type} value={type.toLowerCase()}>
                  {connectionism_types_translated[index]}
                </MenuItem>
              );
            })}
          </Select>
        </StyledFormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <StyledFormControl fullWidth>
          <InputLabel>Στροφές (rpm)</InputLabel>
          <Select
            name="motor.rpm"
            value={props.repair.motor?.rpm || ''}
            label="Στροφές (rpm)"
            onChange={props.handleInputChange}
          >
            {rpm_types.map((type, index) => {
              // * ενα converter για translated
              return (
                <MenuItem key={type} value={type}>
                  {rpm_types_translated[index]}
                </MenuItem>
              );
            })}
          </Select>
        </StyledFormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <StyledFormControl fullWidth>
          <InputLabel>Πόλοι</InputLabel>
          <Select
            name="motor.poles"
            value={props.repair.motor?.poles || ''}
            label="Πόλοι"
            onChange={props.handleInputChange}
          >
            {poles_types.map((type, index) => {
              // * ενα converter για translated
              return (
                <MenuItem key={type} value={type}>
                  {poles_types_translated[index]}
                </MenuItem>
              );
            })}
          </Select>
        </StyledFormControl>
      </Grid>
    </Grid>
  );
};
