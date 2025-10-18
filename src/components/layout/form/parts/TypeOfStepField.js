import React from 'react';
import { InputLabel, Select, MenuItem } from '@mui/material';
import { typeOfStep, typeOfStep_translated } from '../../../Models/Motor';
import { StyledFormControl } from '../../../common/StyledFormComponents';
import { useWindingFieldReset } from '../../../../hooks/useWindingFieldReset';

function TypeOfStepField(props) {
  const { resetWindingFields } = useWindingFieldReset(props.handleInputChange);

  const handleOnChange = (event) => {
    resetWindingFields(props.repair.motor);
    props.handleInputChange(event);
  };

  return (
    <StyledFormControl fullWidth>
      <InputLabel id="type-of-step-select-label">Τύπος Βήματος</InputLabel>
      <Select
        labelId="type-of-step-select-label"
        id="type-of-step-select"
        name="motor.typeOfStep"
        value={props.repair.motor?.typeOfStep || ''}
        label="Τύπος Βήματος"
        onChange={handleOnChange}
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
