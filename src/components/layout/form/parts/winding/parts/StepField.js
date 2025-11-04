import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { StyledTextField, StyledAutocomplete } from '../../../../../common/StyledFormComponents';

function StepField(props) {
  const [stepError, setStepError] = useState('');

  // v1 - πρωτη φαση το ξαναβλεπω να παιρνω ολα τα βηματα που υπαρχουν #func
  const stepSuggestions = [
    '8-10-12',
    '10-12',
    '14-16-18',
    '16-18-20',
    '6-8-10',
    '8-12-16',
    '10-14-18',
    '4-6 / 1-6',
  ];

  // Regex για validation του step field - αριθμοί με παύλες, επιπλέον μορφή με "/" (π.χ. 4-6 / 1-6)
  const validateStepPattern = (input) => {
    if (!input) return true; // Άδειο είναι ok
    const trimmed = input.trim();
    // Pattern: επιτρέπει "4-6" ή "4-6 / 1-6" (με spaces γύρω από το "/")
    const pattern = /^(\d+(-\d+)+)( \/ (\d+(-\d+)+))?$/;
    return pattern.test(trimmed);
  };

  // Custom handler για το step field με validation
  const handleStepChange = (event, newValue) => {
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
      setStepError(
        'Μη έγκυρη μορφή. Χρησιμοποιήστε αριθμούς με παύλες (π.χ. 8-10-12) ή με "/" (π.χ. 4-6 / 1-6)',
      );
    }
  }, [props.step_value]);

  return (
    // sx pb  3 mono se sundiasmo
    <Grid container spacing={2.5} sx={props.sx && props.sx}>
      <Grid item xs={12} sm={12}>
        <StyledAutocomplete
          freeSolo
          options={stepSuggestions || []}
          name={props.step_name}
          value={props.step_value || ''}
          onChange={handleStepChange}
          renderInput={(params) => (
            <StyledTextField
              {...params}
              label={props.step_label}
              name={props.step_name}
              variant="outlined"
              placeholder="π.χ. 8-10-12, 4-6 / 1-6"
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
