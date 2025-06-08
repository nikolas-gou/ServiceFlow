import React, { useState, useEffect } from 'react';
import { TextField, Grid, Autocomplete } from '@mui/material';

function StepField(props) {
  const [stepError, setStepError] = useState('');

  // Προτεινόμενα βήματα για autocomplete
  const stepSuggestions = [
    '8-10',
    '8-10-12',
    '10-12',
    '10-12-14',
    '12-14',
    '12-14-16',
    '14-16',
    '14-16-18',
    '16-18',
    '16-18-20',
    '6-8-10',
    '8-12-16',
    '10-14-18',
  ];

  // Regex για validation του step field - μόνο αριθμοί με παύλες
  const validateStepPattern = (input) => {
    if (!input) return true; // Άδειο είναι ok
    const pattern = /^\d+(-\d+)+$/;
    return pattern.test(input.trim());
  };

  // Custom handler για το step field με validation
  const handleStepChange = (event, newValue) => {
    // Έλεγχος validation
    if (newValue && !validateStepPattern(newValue)) {
      setStepError('Μη έγκυρη μορφή. Χρησιμοποιήστε μόνο αριθμούς με παύλες (π.χ. 8-10-12)');
    } else {
      setStepError('');
    }

    // Κλήση του γονικού onChange
    // Δημιουργία "εικονικού" event με name και value
    const fakeEvent = {
      target: {
        name: props.step_name,
        value: newValue,
      },
    };
    props.handleInputChange(fakeEvent);
  };

  // Καθαρισμός σφάλματος όταν αλλάζει η τιμή από έξω
  useEffect(() => {
    if ((props.step_value && validateStepPattern(props.step_value)) || props.step_value == '') {
      setStepError('');
    } else {
      setStepError('Μη έγκυρη μορφή. Χρησιμοποιήστε μόνο αριθμούς με παύλες (π.χ. 8-10-12)');
    }
  }, [props.step_value]);

  return (
    // sx pb  3 mono se sundiasmo
    <Grid container spacing={2} sx={props.sx && props.sx}>
      <Grid item xs={12} sm={6}>
        <Autocomplete
          freeSolo
          options={stepSuggestions || []}
          name={props.step_name}
          value={props.step_value || ''}
          onChange={handleStepChange}
          renderInput={(params) => (
            <TextField
              {...params}
              label={props.step_label}
              name={props.step_name}
              variant="outlined"
              placeholder="π.χ. 8-10-12"
              onChange={props.handleInputChange}
              error={!!stepError}
              helperText={stepError}
            />
          )}
          filterOptions={(options, { inputValue }) => {
            // Φιλτράρισμα που δείχνει επιλογές που περιέχουν το input
            return options.filter((option) =>
              option.toLowerCase().includes(inputValue.toLowerCase()),
            );
          }}
        />
      </Grid>
    </Grid>
  );
}

export default StepField;
