import React from 'react';
import { Grid } from '@mui/material';
import { StyledTextField } from '../../../common/StyledFormComponents';

export const CostAndDelivery = (props) => {
  return (
    <Grid container spacing={2.5}>
      <Grid item xs={12} sm={6}>
        <StyledTextField
          fullWidth
          required
          label="Εκτιμώμενο Κόστος (€)"
          name="cost"
          type="number"
          variant="outlined"
          value={props.repair.cost || ''}
          onChange={props.handleInputChange}
          error={props.hasError('cost')}
          helperText={props.getErrorMessage('cost')}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <StyledTextField
          fullWidth
          label="Εκτιμώμενη Ημερομηνία Παράδοσης"
          name="estimatedIsComplete"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={props.repair?.estimatedIsComplete || ''}
          onChange={props.handleInputChange}
        />
      </Grid>
    </Grid>
  );
};
