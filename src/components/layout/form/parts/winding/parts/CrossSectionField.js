import React, { useState } from 'react';
import { Autocomplete, TextField, Chip, Box, Typography, Grid } from '@mui/material';

export const CrossSectionField = (props) => {
  const crossSections = [
    '5/10',
    '5.3/10',
    '5.6/10',
    '6/10',
    '6.3/10',
    '6.5/10',
    '6.7/10',
    '7/10',
    '7.5/10',
    '8/10',
    '8.5/10',
    '9/10',
    '9.5/10',
    '10/10',
    '12/10',
    '12.5/10',
    '15/10',
    '16/10',
    '20/10',
    '25/10',
  ];

  // Regex για validation - μόνο το format: Χ/ΧΧ ή Χ.Χ/ΧΧ
  const validateCrossSectionPattern = (value) => {
    // Patterns που δεχόμαστε:
    // 1. Χ/ΧΧ (π.χ. 5/10, 12/10)
    // 2. Χ.Χ/ΧΧ (π.χ. 5.3/10, 12.5/10)
    const patterns = [
      /^\d+\/\d{1,2}$/, // 5/10, 12/10
      /^\d+\.\d+\/\d{1,2}$/, // 5.3/10, 12.5/10
    ];

    return patterns.some((pattern) => pattern.test(value));
  };

  const getValidationMessage = (value) => {
    // να μην παιρνει /20
    if (!value) return '';
    if (validateCrossSectionPattern(value)) return '';

    return 'Μη έγκυρη μορφή! Χρησιμοποιήστε: 5/10, 5.3/10, 12/10 ή 12.5/10';
  };

  const handleAddCrossSection = (event, newValue) => {
    if (newValue && validateCrossSectionPattern(newValue)) {
      props.setRepair((prev) => {
        const currentLinks = Array.isArray(prev.motor.motorCrossSectionLinks)
          ? prev.motor.motorCrossSectionLinks
          : [];

        const newLink = {
          motorID: null,
          id: null,
          crossSection: newValue,
          type: props.cross_section_type,
        };

        return {
          ...prev,
          motor: {
            ...prev.motor,
            motorCrossSectionLinks: [...currentLinks, newLink],
          },
        };
      });
    }
  };

  const handleDeleteChip = (sectionToDelete) => {
    props.setRepair((prev) => {
      const currentLinks = Array.isArray(prev.motor.motorCrossSectionLinks)
        ? prev.motor.motorCrossSectionLinks
        : [];

      // Βρίσκουμε το index της πρώτης εμφάνισης με τον σωστό τύπο
      const indexToRemove = currentLinks.findIndex(
        (link) => link.crossSection === sectionToDelete && link.type === props.cross_section_type,
      );

      // Αν δεν υπάρχει, επιστρέφουμε όπως είναι
      if (indexToRemove === -1) return prev;

      // Κάνουμε shallow copy και αφαιρούμε 1 στοιχείο
      const updatedLinks = [...currentLinks];
      updatedLinks.splice(indexToRemove, 1);

      return {
        ...prev,
        motor: {
          ...prev.motor,
          motorCrossSectionLinks: updatedLinks,
        },
      };
    });
  };

  const getDisplayValue = () => {
    const links = props.repair?.motor?.motorCrossSectionLinks || [];
    if (links.length === 0) return '';

    // Φιλτράρουμε μόνο τα links που ανήκουν στον συγκεκριμένο τύπο
    const filteredLinks = links.filter((link) => link.type === props.cross_section_type);

    if (filteredLinks.length === 0) return '';

    const grouped = filteredLinks.reduce((acc, link) => {
      const section = link.crossSection;
      acc[section] = (acc[section] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(grouped)
      .map(([section, count]) => (count > 1 ? `${count}x ${section}` : section))
      .join(' + ');
  };

  // Φιλτράρουμε τα links ανάλογα με τον τύπο
  const selectedLinks = (props.repair?.motor?.motorCrossSectionLinks || []).filter(
    (link) => link.type === props.cross_section_type,
  );

  return (
    <Grid container spacing={2} sx={props.sx && props.sx}>
      <Grid item xs={12} sm={12}>
        <Autocomplete
          freeSolo
          key={selectedLinks.length} // Force re-render to clear input
          options={crossSections}
          value="" // Πάντα άδειο για να μπορούν να προστίθενται νέα
          onChange={handleAddCrossSection}
          renderInput={(params) => {
            const currentInput = params.inputProps.value || '';
            const isValid = !currentInput || validateCrossSectionPattern(currentInput);
            const validationMessage = getValidationMessage(currentInput);

            return (
              <TextField
                {...params}
                fullWidth
                name={props.cross_section_name}
                label={props.cross_section_label}
                variant="outlined"
                placeholder="π.χ. 5/10, 5.3/10, 12.5/10"
                helperText={
                  validationMessage || 'Επιλέξτε ή πληκτρολογήστε διατομή και πατήστε Enter'
                }
                error={!isValid}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-error': {
                      '& fieldset': {
                        borderColor: 'error.main',
                      },
                    },
                  },
                }}
              />
            );
          }}
          filterOptions={(options, { inputValue }) => {
            // Φιλτράρισμα προτάσεων
            const filtered = options.filter((option) =>
              option.toLowerCase().includes(inputValue.toLowerCase()),
            );

            // Προσθήκη του input σαν επιλογή αν είναι έγκυρο και δεν υπάρχει
            if (
              inputValue &&
              validateCrossSectionPattern(inputValue) &&
              !options.includes(inputValue)
            ) {
              filtered.push(inputValue);
            }

            return filtered;
          }}
        />
        {selectedLinks.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Επιλεγμένες διατομές:
            </Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {Object.entries(
                selectedLinks.reduce((acc, link) => {
                  const section = link.crossSection;
                  acc[section] = (acc[section] || 0) + 1;
                  return acc;
                }, {}),
              ).map(([section, count]) => (
                <Chip
                  key={section}
                  label={count > 1 ? `${count}x ${section}` : section}
                  onDelete={() => handleDeleteChip(section)}
                  color="primary"
                  variant="outlined"
                  size="small"
                />
              ))}
            </Box>

            <Typography variant="body2" sx={{ mt: 1, fontWeight: 'medium' }}>
              Σύνολο: {getDisplayValue()}
            </Typography>
          </Box>
        )}
      </Grid>
    </Grid>
  );
};
