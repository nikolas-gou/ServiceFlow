import React, { useState, useEffect } from 'react';
import { Grid, Box, Autocomplete, InputAdornment } from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import CrossSectionFieldV2 from './CrossSectionFieldV2';
import { InfoTooltip } from '../../../../../common/InfoTooltip';
import {
  DesignTextField,
  SectionLabel,
  HelperText,
  StatusPill,
  NumberBadge,
  SegmentedToggle,
  FullBleedHairline,
  Hairline,
  formTokens,
} from '../../../../../common/styled/FormDesignSystem';

const BUILDER_GUIDANCE =
  'Γράψε ολόκληρη την ακολουθία του βήματος (π.χ. "8-10-12"). Για κάθε αριθμό, σημείωσε αν είναι Μισό ή Ολόκληρο και πόσες σπείρες έχει - η διατομή είναι κοινή για όλο το πηνίο. Ειδική περίπτωση: βήμα τύπου "1-Ν" (π.χ. "1-6") σημαίνει ίδια απόσταση Ν σε πολλά υποπηνία - εκεί συμπληρώνεις "Πόσες μαζί" αντί να σπάει σε ξεχωριστούς αριθμούς.';

// Ίδιο pattern με το StepField.js: αριθμοί με παύλες (π.χ. "8-10-12"), προαιρετικά
// συνδυασμός με " / " (π.χ. "4-6 / 1-6"). Απαιτεί τουλάχιστον μία παύλα (όχι μόνος αριθμός).
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

// Πλέγμα καρτών βήματος. Σε πλήρες πλάτος (τριφασικό) έως 6 ανά γραμμή· σε half πλάτος
// (μονοφασικό side-by-side) έως 3, ώστε οι κάρτες να μη στριμώχνονται στη μισή στήλη.
const CARD_GRID_FULL = { xs: 12, sm: 6, md: 4, lg: 2 };
const CARD_GRID_HALF = { xs: 12, sm: 6, md: 4 };

const COILS_COUNT_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

/** Μικρό label πάνω από πεδίο μέσα στην κάρτα βήματος. */
function FieldLabel({ children }) {
  return (
    <SectionLabel sx={{ fontSize: '0.7rem', textTransform: 'none', letterSpacing: 0, mb: 0.75 }}>
      {children}
    </SectionLabel>
  );
}

/**
 * Μία κάρτα ανά αριθμό βήματος (ή για το ζεύγος "1-Ν"). Ουδέτερη λευκή κάρτα του design·
 * ο τύπος (Μισό/Ολόκληρο) φαίνεται από το χρώμα του badge και του επιλεγμένου segment.
 */
function StepCard({ label, isHalf, onToggleHalf, spiralField, extra }) {
  const theme = useTheme();
  const accentColor = isHalf ? theme.palette.secondary.main : theme.palette.primary.main;

  return (
    <Box
      sx={{
        border: `1px solid ${formTokens.border}`,
        borderRadius: theme.custom.radius.md,
        background: formTokens.cardBg,
        padding: theme.spacing(2, 2, 2.25),
        transition: 'border-color .2s ease, box-shadow .2s ease',
        '&:hover': {
          borderColor: alpha(accentColor, 0.35),
          boxShadow: `0 2px 8px ${alpha(accentColor, 0.1)}`,
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.6 }}>
        <NumberBadge color={accentColor}>{label}</NumberBadge>
        <Box
          component="span"
          sx={{ fontSize: '0.9rem', fontWeight: 600, color: formTokens.textPrimary }}
        >
          Βήμα {label}
        </Box>
      </Box>

      {/* Το Μισό αριστερά, το Ολόκληρο δεξιά */}
      <SegmentedToggle
        value={isHalf ? 'half' : 'whole'}
        onChange={(next) => onToggleHalf(next === 'half')}
        sx={{ mb: 2 }}
        options={[
          { value: 'half', label: 'ΜΙΣΟ', color: theme.palette.secondary.main },
          { value: 'whole', label: 'ΟΛΟΚΛΗΡΟ', color: theme.palette.primary.main },
        ]}
      />

      {spiralField}
      {extra}
    </Box>
  );
}

// Προεπιλογή: τα πεδία του τριφασικού (ένα πηνίο). Το μονοφασικό περνάει άλλα ονόματα
// για το κυρίως (step/halfStep/spiral/coilsCount) και το βοηθητικό (helper*).
const DEFAULT_FIELDS = {
  step: 'step',
  halfStep: 'halfStep',
  spiral: 'spiral',
  coilsCount: 'coilsCount',
};

/**
 * Είσοδος για πηνίο με βήμα "μισό-μισό και ολόκληρο"
 * (π.χ. βήμα "8-10-12" όπου το 8 είναι μισό και τα 10, 12 ολόκληρα).
 * Σε αντίθεση με το παλιό μοντέλο (δύο ξεχωριστά μπλοκ half/standard), εδώ οι σπείρες
 * ορίζονται ανά αριθμό βήματος, ενώ η διατομή είναι μία, κοινή για όλο το πηνίο.
 *
 * Χρησιμοποιείται:
 *  - στον τριφασικό συνδυασμένο: ΕΝΑ πηνίο (πεδία step/halfStep/spiral/coilsCount),
 *  - στον μονοφασικό συνδυασμένο: ΔΥΟ φορές (κυρίως + βοηθητικό), το καθένα με δικά του πεδία.
 *
 * Αποθηκεύει στα ήδη υπάρχοντα πεδία χωρίς αλλαγές στο backend:
 * - <step>: η πλήρης ακολουθία (π.χ. "8-10-12")
 * - <spiral>: οι σπείρες στην ίδια σειρά (π.χ. "50-100-100")
 * - <halfStep>: ποιοι αριθμοί του βήματος είναι το μισό (π.χ. "8")
 *
 * @param {Object} [fields] - ονόματα πεδίων του motor (βλ. DEFAULT_FIELDS)
 * @param {string} [crossSectionType] - τύπος διατομής (π.χ. "standard", "main_standard")
 * @param {string} [title] - προαιρετική κεφαλίδα (π.χ. "Κυρίως Περιέλιξη")
 * @param {React.ReactNode} [titleIcon] - εικονίδιο δίπλα στην κεφαλίδα
 * @param {boolean} [half] - true όταν εμφανίζεται σε μισό πλάτος (μονοφασικό side-by-side):
 *   στενότερο πλέγμα καρτών και απλές (όχι full-bleed) διαχωριστικές γραμμές.
 */
function CombinedStepBuilder({
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
  const F = fields || DEFAULT_FIELDS;
  // Σε half πλάτος οι full-bleed γραμμές θα ξεχείλιζαν στο κενό της διπλανής στήλης.
  const Divider = half ? Hairline : FullBleedHairline;
  const cardGridProps = half ? CARD_GRID_HALF : CARD_GRID_FULL;
  const fieldName = (key) => `motor.${F[key]}`;
  const stepValue = motor[F.step] || '';
  const tokens = parseTokens(stepValue);

  useEffect(() => {
    if (validateStepPattern(stepValue)) {
      setStepError('');
    } else {
      setStepError('Μη έγκυρη μορφή. Χρησιμοποιήστε αριθμούς με παύλες (π.χ. 8-10-12)');
    }
  }, [stepValue]);
  const spirals = parseTokens(motor[F.spiral] || '');
  const halfSet = new Set(parseTokens(motor[F.halfStep] || ''));

  // Ειδική περίπτωση "1-Ν" (π.χ. "1-6", "1-11"): δεν είναι δύο ξεχωριστοί αριθμοί βήματος,
  // είναι ΕΝΑ βήμα με ίδια απόσταση Ν σε πολλά υποπηνία - εκεί χρειάζεται "Πόσες μαζί"
  // αντί να σπάσει σε ξεχωριστές κάρτες ανά αριθμό.
  const isOneToNPair = tokens.length === 2 && tokens[0] === '1';
  const isHalfPair = stepValue.trim() !== '' && halfSet.has(stepValue.trim());
  const activeStepsCount = isOneToNPair ? 1 : tokens.length;

  const updateSpiralAt = (index, value) => {
    const next = [...spirals];
    while (next.length < tokens.length) next.push('');
    next[index] = value;
    handleInputChange({ target: { name: fieldName('spiral'), value: next.join('-') } });
  };

  const setHalfFlag = (token, isHalf) => {
    const next = new Set(halfSet);
    if (isHalf) {
      next.add(token);
    } else {
      next.delete(token);
    }
    // Κρατάμε τη σειρά εμφάνισης του βήματος, όχι τυχαία σειρά από το Set
    const ordered = tokens.filter((t) => next.has(t));
    handleInputChange({ target: { name: fieldName('halfStep'), value: ordered.join('-') } });
  };

  const setPairHalfFlag = (isHalf) => {
    handleInputChange({ target: { name: fieldName('halfStep'), value: isHalf ? stepValue : '' } });
  };

  const spiralField = (value, onChange) => (
    <>
      <FieldLabel>Σπείρες</FieldLabel>
      <DesignTextField
        fullWidth
        size="small"
        mono
        value={value}
        onChange={onChange}
        placeholder="π.χ. 100"
      />
    </>
  );

  return (
    <Box>
      {/* Προαιρετική κεφαλίδα πηνίου (Κυρίως / Βοηθητική) - μόνο στον μονοφασικό */}
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

      {/* Ενότητα: το βήμα ως ακολουθία */}
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
        {activeStepsCount > 0 && (
          <StatusPill>
            {activeStepsCount} {activeStepsCount === 1 ? 'βήμα ενεργό' : 'βήματα ενεργά'}
          </StatusPill>
        )}
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
              <InfoTooltip title={BUILDER_GUIDANCE} />
            </InputAdornment>
          ),
        }}
      />
      <HelperText error={!!stepError}>
        {stepError || 'Διαχωρίστε τους αριθμούς με παύλα, π.χ. 8-10-12.'}
      </HelperText>

      {/* Ενότητα: ρυθμίσεις ανά αριθμό βήματος - μόνο όταν το βήμα είναι έγκυρο */}
      {tokens.length > 0 && !stepError && (
        <>
          <Divider sx={{ my: 3 }} />
          <SectionLabel sx={{ mb: 1.5 }}>
            {isOneToNPair ? 'Ρυθμίσεις βήματος' : 'Ανά αριθμό βήματος'}
          </SectionLabel>
          <Grid container spacing={1.75}>
            {isOneToNPair ? (
              // "1-Ν": ένα βήμα, με "Πόσες μαζί" αντί για σπάσιμο σε 2 αριθμούς
              <Grid item {...cardGridProps}>
                <StepCard
                  label={stepValue}
                  isHalf={isHalfPair}
                  onToggleHalf={setPairHalfFlag}
                  spiralField={spiralField(motor[F.spiral] || '', (e) =>
                    handleInputChange({ target: { name: fieldName('spiral'), value: e.target.value } }),
                  )}
                  extra={
                    <Box sx={{ mt: 1.75 }}>
                      <FieldLabel>Πόσες μαζί</FieldLabel>
                      <Autocomplete
                        freeSolo
                        options={COILS_COUNT_OPTIONS}
                        value={motor[F.coilsCount] || ''}
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
                            placeholder="π.χ. 6"
                            onChange={handleInputChange}
                          />
                        )}
                      />
                    </Box>
                  }
                />
              </Grid>
            ) : (
              tokens.map((token, index) => (
                <Grid item {...cardGridProps} key={`${token}-${index}`}>
                  <StepCard
                    label={token}
                    isHalf={halfSet.has(token)}
                    onToggleHalf={(nextIsHalf) => setHalfFlag(token, nextIsHalf)}
                    spiralField={spiralField(spirals[index] || '', (e) =>
                      updateSpiralAt(index, e.target.value),
                    )}
                  />
                </Grid>
              ))
            )}
          </Grid>
        </>
      )}

      {/* Ενότητα: διατομή (κοινή για όλο το πηνίο) */}
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

export default CombinedStepBuilder;
