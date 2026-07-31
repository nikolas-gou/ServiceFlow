import { Grid, type SxProps, type Theme } from '@mui/material';
import StepField from './StepField';
import { CrossSectionField } from './CrossSectionField';
import { StyledTextField } from '../../../../../common/StyledFormComponents';
import type { RepairFormState, RepairFormSetter, InputChangeHandler } from '../../../../../../types/repairForm';

interface OnePhaseFieldsProps {
  step_label?: string;
  step_name: string;
  step_value?: string | number | null;
  spiral_label?: string;
  spiral_name: string;
  spiral_value?: string | number | null;
  cross_section_label?: string;
  cross_section_name?: string;
  cross_section_value?: string;
  cross_section_type: string;
  repair: RepairFormState;
  setRepair: RepairFormSetter;
  handleInputChange: InputChangeHandler;
  sx?: SxProps<Theme>;
}

export const OnePhaseFields = (props: OnePhaseFieldsProps) => {
  return (
    // sx pb  3 mono se sundiasmo
    <Grid container spacing={2} sx={props.sx && props.sx}>
      <Grid item xs={12} sm={4}>
        <StepField
          step_label={props.step_label}
          step_name={props.step_name}
          step_value={props.step_value}
          handleInputChange={props.handleInputChange}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        {/* spiral */}
        <StyledTextField
          fullWidth
          label={props.spiral_label}
          name={props.spiral_name}
          variant="outlined"
          value={props.spiral_value}
          onChange={props.handleInputChange}
          placeholder="π.χ. 66"
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <CrossSectionField
          cross_section_label={props.cross_section_label}
          cross_section_name={props.cross_section_name}
          cross_section_value={props.cross_section_value}
          cross_section_type={props.cross_section_type}
          repair={props.repair}
          setRepair={props.setRepair}
          handleInputChange={props.handleInputChange}
        />
      </Grid>
    </Grid>
  );
};
