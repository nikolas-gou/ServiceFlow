import React, { useState, useEffect } from 'react';
import { Box, Autocomplete, InputAdornment } from '@mui/material';
import CrossSectionFieldV2 from './CrossSectionFieldV2';
import { InfoTooltip } from '../../../../../common/InfoTooltip';
import {
  DesignTextField,
  SectionLabel,
  HelperText,
  StatusPill,
  FullBleedHairline,
  Hairline,
  formTokens,
} from '../../../../../common/styled/FormDesignSystem';

const STEP_GUIDANCE =
  'Το βήμα γράφεται ως ακολουθία αριθμών (π.χ. "8-10-12"). Η μορφή "1-Ν" (π.χ. "1-6") σημαίνει ίδιο βήμα Ν σε πολλά υποπηνία - συμπλήρωσε στο "Πόσες μαζί" πόσα είναι.';

// Ίδιο pattern με το StepField/CombinedStepBuilder: αριθμοί με παύλες (π.χ. "8-10-12"),
// προαιρετικά συνδυασμός με " / " (π.χ. "4-6 / 1-6").
const STEP_PATTERN = /^(\d+(-\d+)+)( \/ (\d+(-\d+)+))?$/;

const validateStepPattern = (input) => {
  if (!input) return true;
  return STEP_PATTERN.test(input.trim());
};

const parseTokens = (value) =>
  (value || '')
    .split('-')
    .map((t) => t.trim())
    .filter(Boolean);

const COILS_COUNT_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

/** Μικρό label πάνω από πεδίο. */
function FieldLabel({ children }) {
  return (
    <SectionLabel sx={{ fontSize: '0.7rem', textTransform: 'none', letterSpacing: 0, mb: 0.75 }}>
      {children}
    </SectionLabel>
  );
}

/**
 * Απλό πηνίο περιέλιξης (design system) για "Ολόκληρο" ή "Μισό-Μισό": ένα βήμα, μία τιμή
 * σπειρών, "Πόσες μαζί" και μία διατομή. Ίδια οπτική γλώσσα με το CombinedStepBuilder,
 * ώστε όλα τα πεδία της v2 φόρμας να ταιριάζουν μεταξύ τους.
 *
 * @param {Object} fields - ονόματα πεδίων του motor: { step, coilsCount, spiral }
 * @param {string} [crossSectionType] - τύπος διατομής (π.χ. "standard", "main_half")
 * @param {string} [title] - προαιρετική κεφαλίδα (π.χ. "Κυρίως Περιέλιξη")
 * @param {React.ReactNode} [titleIcon] - εικονίδιο δίπλα στην κεφαλίδα
 * @param {boolean} [half] - true σε μισό πλάτος (μονοφασικό side-by-side): απλές γραμμές
 */
function SimpleWindingBuilder({
  repair,
  setRepair,
  handleInputChange,
  fields,
  crossSectionType = 'standard',
  title,
  titleIcon,
  half = false,
}) {
  const [stepError, setStepError] = useState('');
  const motor = repair.motor || {};
  const fieldName = (key) => `motor.${fields[key]}`;
  const stepValue = motor[fields.step] || '';
  // "Πόσες μαζί" έχει νόημα μόνο για βήμα τύπου "1-Ν" (π.χ. "1-6", "1-9"): ίδιο βήμα Ν σε
  // πολλά υποπηνία. Για κανονικές ακολουθίες (π.χ. "4-6", "8-10-12") δεν εμφανίζεται.
  const tokens = parseTokens(stepValue);
  const isOneToNPair = tokens.length === 2 && tokens[0] === '1';

  useEffect(() => {
    setStepError(
      validateStepPattern(stepValue)
        ? ''
        : 'Μη έγκυρη μορφή. Χρησιμοποιήστε αριθμούς με παύλες (π.χ. 8-10-12)',
    );
  }, [stepValue]);

  // Σε half πλάτος οι full-bleed γραμμές θα ξεχείλιζαν στο κενό της διπλανής στήλης.
  const Divider = half ? Hairline : FullBleedHairline;

  return (
    <Box>
      {/* Προαιρετική κεφαλίδα πηνίου (Κυρίως / Βοηθητική) - στο μονοφασικό */}
      {title && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          {titleIcon}
          <Box
            component="span"
            sx={{ fontSize: '1rem', fontWeight: 700, color: formTokens.textPrimary }}
          >
            {title}
          </Box>
        </Box>
      )}

      {/* Ενότητα: βήμα */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          gap: 2,
          flexWrap: 'wrap',
          mb: 1,
        }}
      >
        <SectionLabel sx={{ mb: 0 }}>Βήμα</SectionLabel>
        {stepValue && !stepError && <StatusPill>ενεργό</StatusPill>}
      </Box>

      <DesignTextField
        fullWidth
        mono
        name={fieldName('step')}
        value={stepValue}
        onChange={handleInputChange}
        placeholder="π.χ. 8-10-12"
        error={!!stepError}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <InfoTooltip title={STEP_GUIDANCE} />
            </InputAdornment>
          ),
        }}
      />
      <HelperText error={!!stepError}>
        {stepError || 'Διαχωρίστε τους αριθμούς με παύλα, π.χ. 8-10-12.'}
      </HelperText>

      {/* Ενότητα: πόσες μαζί (μόνο για βήμα "1-Ν") + σπείρες */}
      <Divider sx={{ my: 3 }} />
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: isOneToNPair ? { xs: '1fr', sm: '1fr 1fr' } : '1fr',
          gap: 2,
        }}
      >
        {isOneToNPair && (
          <Box>
            <FieldLabel>Πόσες μαζί</FieldLabel>
            <Autocomplete
              freeSolo
              options={COILS_COUNT_OPTIONS}
              value={motor[fields.coilsCount] || ''}
              getOptionLabel={(option) => option.toString()}
              onChange={(event, newValue) => {
                if (newValue) {
                  handleInputChange({
                    target: { name: fieldName('coilsCount'), value: newValue },
                  });
                }
              }}
              renderInput={(params) => (
                <DesignTextField
                  {...params}
                  fullWidth
                  size="small"
                  mono
                  type="number"
                  name={fieldName('coilsCount')}
                  placeholder="π.χ. 5"
                  onChange={handleInputChange}
                />
              )}
            />
          </Box>
        )}
        <Box>
          <FieldLabel>Σπείρες</FieldLabel>
          <DesignTextField
            fullWidth
            size="small"
            mono
            name={fieldName('spiral')}
            value={motor[fields.spiral] || ''}
            onChange={handleInputChange}
            placeholder="π.χ. 66"
          />
        </Box>
      </Box>

      {/* Ενότητα: διατομή */}
      <Divider sx={{ my: 3 }} />
      <CrossSectionFieldV2
        cross_section_label="Διατομή"
        cross_section_name="motor.motorCrossSectionLinks.crossSection"
        cross_section_type={crossSectionType}
        repair={repair}
        setRepair={setRepair}
        handleInputChange={handleInputChange}
      />
    </Box>
  );
}

export default SimpleWindingBuilder;
