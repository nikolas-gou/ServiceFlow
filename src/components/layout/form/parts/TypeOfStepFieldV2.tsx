import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { typeOfStep } from '../../../Models/Motor';
import { SectionLabel, SegmentedToggle, type SegmentedToggleOption } from '../../../common/styled/FormDesignSystem';
import { useWindingFieldReset } from '../../../../hooks/useWindingFieldReset';
import { InfoTooltip } from '../../../common/InfoTooltip';
import type { RepairFormBagProps } from '../../../../types/repairForm';

const TYPE_OF_STEP_GUIDANCE =
  'Ολόκληρο: όλο το πηνίο τυλίγεται με ένα βήμα. Μισό-Μισό: το πηνίο χωρίζεται σε δύο μισά, καθένα με δικό του βήμα. Συνδυασμός: υπάρχουν και τα δύο μαζί, π.χ. "6-8" όπου το 6 είναι το μισό και το 8 το ολόκληρο.';

const LABELS: Record<string, string> = {
  standard: 'ΟΛΟΚΛΗΡΟ',
  half: 'ΜΙΣΟ-ΜΙΣΟ',
  combined: 'ΣΥΝΔΥΑΣΜΟΣ',
};

type TypeOfStepFieldV2Props = Pick<RepairFormBagProps, 'repair' | 'handleInputChange'>;

/**
 * Επιλογή Τύπου Βήματος με το ίδιο segmented-toggle στυλ του υπόλοιπου design system
 * της v2 φόρμας (βλ. ΜΙΣΟ/ΟΛΟΚΛΗΡΟ στο CombinedStepBuilder), αντί για dropdown.
 */
function TypeOfStepFieldV2({ repair, handleInputChange }: TypeOfStepFieldV2Props) {
  const theme = useTheme();
  const { resetWindingFields } = useWindingFieldReset(handleInputChange);
  const value = repair.motor?.typeOfStep || '';

  const handleChange = (next: string) => {
    if (next === value) return;
    resetWindingFields(repair.motor);
    handleInputChange({ target: { name: 'motor.typeOfStep', value: next } });
  };

  const options: SegmentedToggleOption[] = typeOfStep.map((type, index) => ({
    value: type,
    label: LABELS[type],
    color: [theme.palette.primary.main, theme.palette.secondary.main, theme.palette.info.main][
      index
    ],
  }));

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
        <SectionLabel sx={{ mb: 0 }}>Τύπος Βήματος</SectionLabel>
        <InfoTooltip title={TYPE_OF_STEP_GUIDANCE} />
      </Box>
      <SegmentedToggle value={value} onChange={handleChange} options={options} />
    </Box>
  );
}

export default TypeOfStepFieldV2;
