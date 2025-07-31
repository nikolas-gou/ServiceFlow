import React, { useState } from 'react';
import { Grid, Typography, Box, Button } from '@mui/material';
import { common_faults, common_faults_translated } from '../../../Models/CommonFault';
import { StyledTextField } from '../../../common/StyledFormComponents';

export const Issues = (props) => {
  const [selectedFault, setSelectedFault] = useState([]);

  // Προσθήκη συνηθισμένων θεμάτων στην περιγραφή
  const handleAddCommonIssue = (common_fault) => {
    const updatedDescription = props.repair.description
      ? `${props.repair.description}\n- ${common_faults_translated[common_fault.id - 1].name}`
      : `- ${common_faults_translated[common_fault.id - 1].name}`;

    // Δημιουργία νέας λίστας repairFaultLinks με το νέο link αν δεν υπάρχει ήδη
    const newFaultLink = { repairID: props.repair.id, commonFaultID: common_fault.id };

    // Αποφυγή διπλοεγγραφών
    const alreadyExists = props.repair.repairFaultLinks.some(
      (link) => link.commonFaultID === common_fault.id,
    );

    props.setRepair((prev) => ({
      ...prev,
      description: updatedDescription,
      repairFaultLinks: alreadyExists
        ? prev.repairFaultLinks
        : [...prev.repairFaultLinks, newFaultLink],
    }));

    // Προσθήκη του ID της βλάβης στον πίνακα, αν δεν υπάρχει ήδη
    setSelectedFault((prev) => {
      if (!prev.includes(common_fault.id)) {
        return [...prev, common_fault.id];
      }
      return prev;
    });

    // Καθαρισμός τυχόν σφαλμάτων
    if (props.errors.description) {
      props.setErrors((prev) => ({
        ...prev,
        description: null,
      }));
    }
  };
  return (
    <Grid container spacing={2.5}>
      <Grid item xs={12}>
        <Typography variant="subtitle2" gutterBottom>
          Συχνές βλάβες:
        </Typography>
        <Box sx={{ mb: 2 }}>
          {common_faults.map((common_fault) => (
            <Button
              key={common_fault.id}
              variant="outlined"
              size="small"
              sx={{ mr: 1, mb: 1 }}
              onClick={() => handleAddCommonIssue(common_fault)}
            >
              {common_faults_translated[common_fault?.id - 1]?.name}
            </Button>
          ))}
        </Box>
      </Grid>
      <Grid item xs={12}>
        <StyledTextField
          fullWidth
          label="Περιγραφή Βλάβης"
          name="description"
          multiline={true}
          isMultiline={true}
          rows={4}
          variant="outlined"
          value={props.repair.description || ''}
          onChange={props.handleInputChange}
          error={props.hasError('description')}
          helperText={props.getErrorMessage('description')}
        />
      </Grid>
    </Grid>
  );
};
