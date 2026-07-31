import { Box, InputLabel, Select, MenuItem } from '@mui/material';
import { typeOfStep, typeOfStep_translated } from '../../../Models/Motor';
import { StyledFormControl } from '../../../common/StyledFormComponents';
import { useWindingFieldReset } from '../../../../hooks/useWindingFieldReset';
import { InfoTooltip } from '../../../common/InfoTooltip';
import type { RepairFormBagProps, FormFieldEvent } from '../../../../types/repairForm';

const TYPE_OF_STEP_GUIDANCE =
  'Ολόκληρο: όλο το πηνίο τυλίγεται με ένα βήμα. Μισό-Μισό: το πηνίο χωρίζεται σε δύο μισά, καθένα με δικό του βήμα. Μισό/Ολόκληρο (συνδυασμός): υπάρχουν και τα δύο μαζί, π.χ. "6-8" όπου το 6 είναι το μισό και το 8 το ολόκληρο.';

type TypeOfStepFieldProps = Pick<RepairFormBagProps, 'repair' | 'handleInputChange'>;

function TypeOfStepField(props: TypeOfStepFieldProps) {
  const { resetWindingFields } = useWindingFieldReset(props.handleInputChange);

  const handleOnChange = (event: FormFieldEvent) => {
    resetWindingFields(props.repair.motor);
    props.handleInputChange(event);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      <StyledFormControl fullWidth>
        <InputLabel id="type-of-step-select-label">Τύπος Βήματος</InputLabel>
        <Select
          labelId="type-of-step-select-label"
          id="type-of-step-select"
          name="motor.typeOfStep"
          value={props.repair.motor?.typeOfStep || ''}
          label="Τύπος Βήματος"
          onChange={handleOnChange}
        >
          {typeOfStep.map((type, index) => {
            return (
              <MenuItem key={type} value={type}>
                {typeOfStep_translated[index]}
              </MenuItem>
            );
          })}
        </Select>
      </StyledFormControl>
      <InfoTooltip title={TYPE_OF_STEP_GUIDANCE} />
    </Box>
  );
}

export default TypeOfStepField;
