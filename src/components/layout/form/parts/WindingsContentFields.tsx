import ThreePhaseFields from './winding/parts/ThreePhaseFields';
import { OnePhaseFields } from './winding/parts/OnePhaseFields';
import CombinedStepBuilder from './winding/parts/CombinedStepBuilder';
import type { RepairFormBagProps } from '../../../../types/repairForm';

type WindingsContentFieldsProps = Pick<RepairFormBagProps, 'repair' | 'setRepair' | 'handleInputChange'> & {
  useGranularCombinedBuilder?: boolean;
};

function WindingsContentFields(props: WindingsContentFieldsProps) {
  return (
    <>
      {props.repair.motor?.typeOfVolt === '3-phase' && (
        <>
          {props.repair.motor?.typeOfStep === 'standard' && (
            // ολοκληρο βημα
            <ThreePhaseFields
              step_label="Βήμα (Ολόκληρο)"
              step_name="motor.step"
              step_value={props.repair.motor?.step || ''}
              coils_count_label="Πόσες μαζί (Ολόκληρο)"
              coils_count_name="motor.coilsCount"
              coils_count_value={props.repair.motor?.coilsCount || ''}
              spiral_label="Σπείρες (Ολόκληρο)"
              spiral_name="motor.spiral"
              spiral_value={props.repair.motor?.spiral || ''}
              cross_section_label="Διατομή (Ολόκληρο)"
              cross_section_name="motor.motorCrossSectionLinks.crossSection"
              cross_section_type="standard"
              repair={props.repair}
              setRepair={props.setRepair}
              handleInputChange={props.handleInputChange}
            />
          )}
          {props.repair.motor?.typeOfStep === 'half' && (
            // Μισό βήμα
            <ThreePhaseFields
              step_label="Βήμα (Μισό - Μισό)"
              step_name="motor.halfStep"
              step_value={props.repair.motor?.halfStep || ''}
              coils_count_label="Πόσες μαζί (Μισό - Μισό)"
              coils_count_name="motor.halfCoilsCount"
              coils_count_value={props.repair.motor?.halfCoilsCount || ''}
              spiral_label="Σπείρες (Μισό - Μισό)"
              spiral_name="motor.halfSpiral"
              spiral_value={props.repair.motor?.halfSpiral || ''}
              cross_section_label="Διατομή (Μισό - Μισό)"
              cross_section_name="motor.motorCrossSectionLinks.crossSection"
              cross_section_type="half"
              repair={props.repair}
              setRepair={props.setRepair}
              handleInputChange={props.handleInputChange}
            />
          )}
          {props.repair.motor?.typeOfStep === 'combined' &&
            (props.useGranularCombinedBuilder ? (
              // Νέο μοντέλο (μόνο v2 φόρμα, προς το παρόν): ένα πηνίο, σπείρες ανά αριθμό
              // βήματος, κοινή διατομή - βλ. σχόλιο στο CombinedStepBuilder.
              <CombinedStepBuilder
                repair={props.repair}
                setRepair={props.setRepair}
                handleInputChange={props.handleInputChange}
              />
            ) : (
              // συνδιασμος (παλιό μοντέλο: δύο ξεχωριστές περιελίξεις)
              <>
                {/* Μισό */}
                <ThreePhaseFields
                  sx={{ pb: 3 }}
                  step_label="Βήμα (Μισό - Μισό)"
                  step_name="motor.halfStep"
                  step_value={props.repair.motor?.halfStep || ''}
                  coils_count_label="Πόσες μαζί (Μισό - Μισό)"
                  coils_count_name="motor.halfCoilsCount"
                  coils_count_value={props.repair.motor?.halfCoilsCount || ''}
                  spiral_label="Σπείρες (Μισό - Μισό)"
                  spiral_name="motor.halfSpiral"
                  spiral_value={props.repair.motor?.halfSpiral || ''}
                  cross_section_label="Διατομή (Μισό - Μισό)"
                  cross_section_name="motor.motorCrossSectionLinks.crossSection"
                  cross_section_type="half"
                  repair={props.repair}
                  setRepair={props.setRepair}
                  handleInputChange={props.handleInputChange}
                />
                {/* ολόκληρο */}
                <ThreePhaseFields
                  step_label="Βήμα (Ολόκληρο)"
                  step_name="motor.step"
                  step_value={props.repair.motor?.step || ''}
                  coils_count_label="Πόσες μαζί (Ολόκληρο)"
                  coils_count_name="motor.coilsCount"
                  coils_count_value={props.repair.motor?.coilsCount || ''}
                  spiral_label="Σπείρες (Ολόκληρο)"
                  spiral_name="motor.spiral"
                  spiral_value={props.repair.motor?.spiral || ''}
                  cross_section_label="Διατομή (Ολόκληρο)"
                  cross_section_name="motor.motorCrossSectionLinks.crossSection"
                  cross_section_type="standard"
                  repair={props.repair}
                  setRepair={props.setRepair}
                  handleInputChange={props.handleInputChange}
                />
              </>
            ))}
        </>
      )}
      {props.repair.motor?.typeOfVolt === '1-phase' && (
        <>
          {props.repair.motor?.typeOfStep === 'standard' && (
            <>
              {/* ολόκληρο - Κυρίως */}
              <OnePhaseFields
                sx={{ pb: 3 }}
                step_label="Κυρίως Βήμα (Ολόκληρο)"
                step_name="motor.step"
                step_value={props.repair.motor?.step || ''}
                spiral_label="Κυρίως Σπείρες (Ολόκληρο)"
                spiral_name="motor.spiral"
                spiral_value={props.repair.motor?.spiral || ''}
                cross_section_label="Κυρίως Διατομή (Ολόκληρο)"
                cross_section_name="motor.motorCrossSectionLinks.crossSection"
                cross_section_type="main_standard"
                repair={props.repair}
                setRepair={props.setRepair}
                handleInputChange={props.handleInputChange}
              />
              {/* ολόκληρο - Βοηθητικό */}
              <OnePhaseFields
                step_label="Βοηθητικό Βήμα (Ολόκληρο)"
                step_name="motor.helperStep"
                step_value={props.repair.motor?.helperStep || ''}
                spiral_label="Βοηθητικό Σπείρες (Ολόκληρο)"
                spiral_name="motor.helperSpiral"
                spiral_value={props.repair.motor?.helperSpiral || ''}
                cross_section_label="Βοηθητικό Διατομή (Ολόκληρο)"
                cross_section_name="motor.motorCrossSectionLinks.crossSection"
                cross_section_type="helper_standard"
                repair={props.repair}
                setRepair={props.setRepair}
                handleInputChange={props.handleInputChange}
              />
            </>
          )}
          {props.repair.motor?.typeOfStep === 'half' && (
            <>
              {/* Μισό - Μισό - Κυρίως */}
              <OnePhaseFields
                sx={{ pb: 3 }}
                step_label="Κυρίως Βήμα (Μισό - Μισό)"
                step_name="motor.halfStep"
                step_value={props.repair.motor?.halfStep || ''}
                spiral_label="Κυρίως Σπείρες (Μισό - Μισό)"
                spiral_name="motor.halfSpiral"
                spiral_value={props.repair.motor?.halfSpiral || ''}
                cross_section_label="Κυρίως Διατομή (Μισό - Μισό)"
                cross_section_name="motor.motorCrossSectionLinks.crossSection"
                cross_section_type="main_half"
                repair={props.repair}
                setRepair={props.setRepair}
                handleInputChange={props.handleInputChange}
              />
              {/* Μισό - Μισό - Βοηθητικό */}
              <OnePhaseFields
                step_label="Βοηθητικό Βήμα (Μισό - Μισό)"
                step_name="motor.helperHalfStep"
                step_value={props.repair.motor?.helperHalfStep || ''}
                spiral_label="Βοηθητικό Σπείρες (Μισό - Μισό)"
                spiral_name="motor.helperHalfSpiral"
                spiral_value={props.repair.motor?.helperHalfSpiral || ''}
                cross_section_label="Βοηθητικό Διατομή (Μισό - Μισό)"
                cross_section_name="motor.motorCrossSectionLinks.crossSection"
                cross_section_type="helper_half"
                repair={props.repair}
                setRepair={props.setRepair}
                handleInputChange={props.handleInputChange}
              />
            </>
          )}
          {props.repair.motor?.typeOfStep === 'combined' && (
            <>
              {/* Μισό - Μισό - Κυρίως */}
              <OnePhaseFields
                sx={{ pb: 3 }}
                step_label="Κυρίως Βήμα (Μισό - Μισό)"
                step_name="motor.halfStep"
                step_value={props.repair.motor?.halfStep || ''}
                spiral_label="Κυρίως Σπείρες (Μισό - Μισό)"
                spiral_name="motor.halfSpiral"
                spiral_value={props.repair.motor?.halfSpiral || ''}
                cross_section_label="Κυρίως Διατομή (Μισό - Μισό)"
                cross_section_name="motor.motorCrossSectionLinks.crossSection"
                cross_section_type="main_half"
                repair={props.repair}
                setRepair={props.setRepair}
                handleInputChange={props.handleInputChange}
              />
              {/* ολόκληρο - Κυρίως */}
              <OnePhaseFields
                sx={{ pb: 3 }}
                step_label="Κυρίως Βήμα (Ολόκληρο)"
                step_name="motor.step"
                step_value={props.repair.motor?.step || ''}
                spiral_label="Κυρίως Σπείρες (Ολόκληρο)"
                spiral_name="motor.spiral"
                spiral_value={props.repair.motor?.spiral || ''}
                cross_section_label="Κυρίως Διατομή (Ολόκληρο)"
                cross_section_name="motor.motorCrossSectionLinks.crossSection"
                cross_section_type="main_standard"
                repair={props.repair}
                setRepair={props.setRepair}
                handleInputChange={props.handleInputChange}
              />
              {/* Μισό - Μισό - Βοηθητικό */}
              <OnePhaseFields
                sx={{ pb: 3 }}
                step_label="Βοηθητικό Βήμα (Μισό - Μισό)"
                step_name="motor.helperHalfStep"
                step_value={props.repair.motor?.helperHalfStep || ''}
                spiral_label="Βοηθητικό Σπείρες (Μισό - Μισό)"
                spiral_name="motor.helperHalfSpiral"
                spiral_value={props.repair.motor?.helperHalfSpiral || ''}
                cross_section_label="Βοηθητικό Διατομή (Μισό - Μισό)"
                cross_section_name="motor.motorCrossSectionLinks.crossSection"
                cross_section_type="helper_half"
                repair={props.repair}
                setRepair={props.setRepair}
                handleInputChange={props.handleInputChange}
              />
              {/* ολόκληρο - Βοηθητικό */}
              <OnePhaseFields
                step_label="Βοηθητικό Βήμα (Ολόκληρο)"
                step_name="motor.helperStep"
                step_value={props.repair.motor?.helperStep || ''}
                spiral_label="Βοηθητικό Σπείρες (Ολόκληρο)"
                spiral_name="motor.helperSpiral"
                spiral_value={props.repair.motor?.helperSpiral || ''}
                cross_section_label="Βοηθητικό Διατομή (Ολόκληρο)"
                cross_section_name="motor.motorCrossSectionLinks.crossSection"
                cross_section_type="helper_standard"
                repair={props.repair}
                setRepair={props.setRepair}
                handleInputChange={props.handleInputChange}
              />
            </>
          )}
        </>
      )}
    </>
  );
}

export default WindingsContentFields;
