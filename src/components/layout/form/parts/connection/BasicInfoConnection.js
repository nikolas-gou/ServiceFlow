import React, { useState, useEffect } from 'react';
import { Grid, InputLabel, Select, MenuItem } from '@mui/material';
import {
  StyledTextField,
  StyledAutocomplete,
  StyledFormControl,
} from '../../../../common/StyledFormComponents';
import { typeOfVolt, typeOfVolt_translated } from '../../../../Models/Motor';

export const BasicInfoConnection = (props) => {
  return (
    <Grid container spacing={2.5}>
      <Grid item xs={12} sm={6}>
        {/* <StyledAutocomplete
          freeSolo
          options={[]}
          value={props.repair.customer?.name || ''}
          onChange={handleCustomerChange}
          renderInput={(params) => (
            <StyledTextField
              {...params}
              required
              label="Πελάτης"
              name="customer.name"
              variant="outlined"
              onChange={(e) => props.handleInputChange(e)}
              error={props.hasError('customer.name')}
              helperText={props.getErrorMessage('customer.name')}
            />
          )}
        /> */}
      </Grid>
      <Grid item xs={12} sm={6}>
        <StyledFormControl fullWidth>
          <InputLabel>Φάσεις Κινητήρα</InputLabel>
          <Select
            name="typeOfVolt"
            value={props.connection?.typeOfVolt || ''}
            label="Φάσεις Κινητήρα"
            onChange={props.handleInputChange}
          >
            {typeOfVolt.map((type, index) => {
              // * ενα converter για translated
              return (
                <MenuItem key={type} value={type}>
                  {typeOfVolt_translated[index]}
                </MenuItem>
              );
            })}
          </Select>
        </StyledFormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <StyledFormControl fullWidth>
          <InputLabel id="type-select-label">Πόλοι</InputLabel>
          <Select
            labelId="type-select-label"
            id="type-select"
            name="poles"
            value={props.connection?.poles || ''}
            label="Πόλοι"
            onChange={props.handleInputChange}
          >
            <MenuItem value="2">2</MenuItem>
            <MenuItem value="4">4</MenuItem>
            <MenuItem value="6">6</MenuItem>
            <MenuItem value="8">8</MenuItem>
          </Select>
        </StyledFormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <StyledTextField
          fullWidth
          label="Λούκια"
          name="caves"
          variant="outlined"
          value={props.connection?.caves || ''}
          onChange={props.handleInputChange}
          //   error={props.hasError('customer.phone')}
          //   helperText={props.getErrorMessage('customer.phone')}
        />
      </Grid>
    </Grid>
  );
};
