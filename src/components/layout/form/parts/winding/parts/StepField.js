import React, { useState, useEffect, useMemo } from 'react';
import { Grid, Box } from '@mui/material';
import { StyledTextField, StyledAutocomplete } from '../../../../../common/StyledFormComponents';
import { useSuggestedFormValues } from '../../../../../../context/SuggestedFormValuesContext';
import { InfoTooltip } from '../../../../../common/InfoTooltip';

const STEP_GUIDANCE =
  'Το βήμα γράφεται ως αλληλουχία αριθμών (π.χ. "8-10-12"). Η μορφή "1-Ν" (π.χ. "1-10") σημαίνει ίδιο βήμα Ν σε όλα τα υποπηνία — συμπλήρωσε στο "Πόσες μαζί" πόσα υποπηνία είναι (π.χ. 6).';

// Πιο συχνοί συνδυασμοί βήματος - χρησιμεύουν σαν fallback μέχρι να φορτωθούν οι προτάσεις από τη βάση
const staticStepSuggestions = [
  '8-10-12',
  '10-12',
  '14-16-18',
  '16-18-20',
  '6-8-10',
  '8-12-16',
  '10-14-18',
  '4-6 / 1-6',
];

function StepField(props) {
  const [stepError, setStepError] = useState('');
  const { suggested } = useSuggestedFormValues();

  // Οι τιμές βήματος που έχουν καταχωρηθεί ξανά (από τη βάση) μπαίνουν πρώτες στις προτάσεις,
  // μαζί με τους πιο συχνούς συνδυασμούς σαν σταθερό fallback.
  const stepSuggestions = useMemo(() => {
    const dbStepSuggestions = suggested?.motor?.step?.data || [];
    return Array.from(new Set([...dbStepSuggestions, ...staticStepSuggestions]));
  }, [suggested?.motor?.step?.data]);

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
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 0.5 }}>
          <StyledAutocomplete
            fullWidth
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
          <InfoTooltip title={STEP_GUIDANCE} sx={{ mt: 1 }} />
        </Box>
      </Grid>
    </Grid>
  );
}

export default StepField;
