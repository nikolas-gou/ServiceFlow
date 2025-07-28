import React from 'react';
import { InputLabel, Select, MenuItem } from '@mui/material';
import { typeOfStep, typeOfStep_translated } from '../../../Models/Motor';
import { StyledFormControl } from '../../../common/StyledFormComponents';

function TypeOfStepField(props) {
  return (
    <StyledFormControl fullWidth>
      <InputLabel id="type-select-label">Τύπος Βήματος</InputLabel>
      <Select
        labelId="type-select-label"
        id="type-select"
        name="motor.typeOfStep"
        value={props.repair.motor?.typeOfStep || ''}
        label="Τύπος Βήματος"
        onChange={props.handleInputChange}
      >
        {typeOfStep.map((type, index) => {
          return (
            <MenuItem key={type} value={type}>
              {typeOfStep_translated[index]}
            </MenuItem>
          );
        })}
      </Select>
    </StyledFormControl>
  );
}

export default TypeOfStepField;
