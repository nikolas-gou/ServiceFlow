import React from 'react';
import { TextField, Grid, Autocomplete } from '@mui/material';

function HowManyCoilsWith(props) {
  // default v1 - θα το αλλαξω μαζι με stepSuggestions
  const howManyCoilsWith = [1, 2, 3, 4, 5, 6];

  const handleHowManyCoilsWithChange = (event, newValue) => {
    if (newValue && typeof newValue === 'number') {
      const fakeEvent = {
        target: {
          name: props.how_many_coils_with_name,
          value: newValue,
        },
      };
      props.handleInputChange(fakeEvent);
    }
  };

  return (
    // sx pb  3 mono se sundiasmo
    <Grid container spacing={2} sx={props.sx && props.sx}>
      <Grid item xs={12} sm={12}>
        {/* step */}
        <Autocomplete
          freeSolo
          options={howManyCoilsWith || []}
          value={props.how_many_coils_with_value}
          getOptionLabel={(option) => option.toString()}
          onChange={handleHowManyCoilsWithChange}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              label={props.how_many_coils_with_label}
              name={props.how_many_coils_with_name}
              type="number"
              variant="outlined"
              placeholder="π.χ. 3 - Μαζί"
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

export default HowManyCoilsWith;
