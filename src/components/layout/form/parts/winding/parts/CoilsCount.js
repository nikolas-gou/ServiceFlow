import React from 'react';
import { Grid } from '@mui/material';
import { StyledTextField, StyledAutocomplete } from '../../../../../common/StyledFormComponents';

function CoilsCount(props) {
  // Προτεινόμενες τιμές για coils count
  const coilsCountOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const handleCoilsCountChange = (event, newValue) => {
    if (newValue && typeof newValue === 'number') {
      const fakeEvent = {
        target: {
          name: props.name,
          value: newValue,
        },
      };
      props.handleInputChange(fakeEvent);
    }
  };

  return (
    <Grid container spacing={2.5} sx={props.sx && props.sx}>
      <Grid item xs={12} sm={12}>
        <StyledAutocomplete
          freeSolo
          options={coilsCountOptions || []}
          value={props.value}
          getOptionLabel={(option) => option.toString()}
          onChange={handleCoilsCountChange}
          renderInput={(params) => (
            <StyledTextField
              {...params}
              fullWidth
              label={props.label}
              name={props.name}
              type="number"
              variant="outlined"
              placeholder={props.placeholder || 'π.χ. 3'}
              onChange={props.handleInputChange}
            />
          )}
          // Φιλτράρισμα για να δείχνει μόνο αριθμούς
          filterOptions={(options, { inputValue }) => {
            if (!inputValue) return options;
            const numInput = Number(inputValue);
            return options.filter(
              (option) => option.toString().includes(inputValue) || option === numInput,
            );
          }}
        />
      </Grid>
    </Grid>
  );
}

export default CoilsCount;
