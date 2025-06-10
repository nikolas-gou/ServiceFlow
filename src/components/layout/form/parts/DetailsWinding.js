import React from 'react';
import { Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import WindingsContentFields from './WindingsContentFields';
import TypeOfStepField from './TypeOfStepField';
import { typeOfVolt, typeOfVolt_translated } from '../../../Models/Motor';

export const DetailsWinding = (props) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel>Φάσεις Κινητήρα</InputLabel>
          <Select
            name="motor.typeOfVolt"
            value={props.repair.motor?.typeOfVolt || ''}
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
        </FormControl>
      </Grid>
      {/* template motor fields (step, spiral, crossSection) */}
      <Grid item xs={12} sm={6}>
        <TypeOfStepField repair={props.repair} handleInputChange={props.handleInputChange} />
      </Grid>
      {/* parts: Βοηθητικο component γαι μισο-μισο/ολ, Κ, Β */}
      <Grid item xs={12} sm={12} fullWidth>
        <WindingsContentFields
          repair={props.repair}
          setRepair={props.setRepair}
          handleInputChange={props.handleInputChange}
        />
      </Grid>
    </Grid>
  );
};
