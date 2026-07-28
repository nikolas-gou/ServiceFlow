import React, { useState } from 'react';
import { Autocomplete, Box } from '@mui/material';
import { useSuggestedFormValues } from '../../../../../../context/SuggestedFormValuesContext';
import {
  DesignTextField,
  DesignChip,
  SectionLabel,
  SelectedPanel,
  MonoValue,
  Hairline,
  formTokens,
} from '../../../../../common/styled/FormDesignSystem';

/**
 * Πεδίο διατομής για τη νέα (v2) φόρμα - ίδια λογική με το CrossSectionField,
 * αλλά με το styling του design (uppercase label, "Enter ↵" hint, γκρι πάνελ με chips).
 * Το παλιό CrossSectionField μένει ως έχει, γιατί το χρησιμοποιεί η παλιά φόρμα.
 */
export const CrossSectionFieldV2 = (props) => {
  const { suggested } = useSuggestedFormValues();
  const { motor } = suggested;
  const [crossSections, setCrossSections] = useState(motor.crossSection.data);

  /**
   * Αποδεκτές μορφές: Χ/10, Χ.Χ/10, X.XX/10 (ίδιο με το CrossSectionField).
   */
  const validateCrossSectionPattern = (value) => {
    const patterns = [
      /^\d+\/10$/, // 5/10, 12/10
      /^\d+\.\d+\/10$/, // 5.3/10, 12.5/10
    ];

    return patterns.some((pattern) => pattern.test(value));
  };

  const getValidationMessage = (value) => {
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

        const isNew = !crossSections.includes(newValue);
        if (isNew) {
          setCrossSections([...crossSections, newValue]);
        }

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

      if (indexToRemove === -1) return prev;

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

  // Φιλτράρουμε τα links ανάλογα με τον τύπο
  const selectedLinks = (props.repair?.motor?.motorCrossSectionLinks || []).filter(
    (link) => link.type === props.cross_section_type,
  );

  // Ομαδοποίηση ίδιων διατομών (π.χ. 2 φορές το 7/10 -> "2x 7/10")
  const groupedSections = Object.entries(
    selectedLinks.reduce((acc, link) => {
      acc[link.crossSection] = (acc[link.crossSection] || 0) + 1;
      return acc;
    }, {}),
  );

  const totalDisplay = groupedSections
    .map(([section, count]) => (count > 1 ? `${count}x ${section}` : section))
    .join(' + ');

  return (
    <Box sx={props.sx}>
      <SectionLabel>{props.cross_section_label}</SectionLabel>
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
            <DesignTextField
              {...params}
              fullWidth
              mono
              name={props.cross_section_name}
              placeholder="Επιλέξτε ή πληκτρολογήστε διατομή…"
              error={!isValid}
              helperText={
                validationMessage || 'Πατήστε Enter για να προσθέσετε τη διατομή στη λίστα.'
              }
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <Box
                    component="span"
                    sx={{
                      fontSize: '0.69rem',
                      fontWeight: 600,
                      color: formTokens.textMuted,
                      border: `1px solid ${formTokens.hintBorder}`,
                      borderRadius: '5px',
                      padding: '3px 7px',
                      background: '#fff',
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                    }}
                  >
                    Enter ↵
                  </Box>
                ),
              }}
            />
          );
        }}
        filterOptions={(options, { inputValue }) => {
          const filtered = options.filter((option) =>
            option.toLowerCase().includes(inputValue.toLowerCase()),
          );

          // Προσθήκη του input σαν επιλογή αν είναι έγκυρο και δεν υπάρχει
          if (inputValue && validateCrossSectionPattern(inputValue) && !options.includes(inputValue)) {
            filtered.push(inputValue);
          }

          return filtered;
        }}
      />

      {selectedLinks.length > 0 && (
        <SelectedPanel sx={{ mt: 2.25 }}>
          <SectionLabel sx={{ fontSize: '0.72rem', color: formTokens.textMuted, mb: 1.4 }}>
            Επιλεγμένες διατομές
          </SectionLabel>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {groupedSections.map(([section, count]) => (
              <DesignChip
                key={section}
                label={count > 1 ? `${count}x ${section}` : section}
                onDelete={() => handleDeleteChip(section)}
              />
            ))}
          </Box>
          <Hairline sx={{ my: 1.75 }} />
          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.25 }}>
            <Box
              component="span"
              sx={{ fontSize: '0.82rem', color: formTokens.textSecondary }}
            >
              Σύνολο
            </Box>
            <MonoValue>{totalDisplay}</MonoValue>
          </Box>
        </SelectedPanel>
      )}
    </Box>
  );
};

export default CrossSectionFieldV2;
