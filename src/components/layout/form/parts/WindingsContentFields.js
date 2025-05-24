import React from "react";
import ThreePhaseFields from "./winding/parts/ThreePhaseFields";

function WindingsContentFields(props) {
  return (
    <>
      {props.repair.motor?.typeOfVolt == "3-phase" && (
        <>
          {props.repair.motor?.typeOfStep == "standard" && (
            // ολοκληρο βημα
            <ThreePhaseFields
              step_label="Βήμα (Ολόκληρο)"
              step_name="motor.step"
              step_value={props.repair.motor?.step || ""}
              spiral_label="Σπείρες (Ολόκληρο)"
              spiral_name="motor.spiral"
              spiral_value={props.repair.motor?.spiral || ""}
              cross_section_label="Διατομή (Ολόκληρο)"
              cross_section_name="motor.cross_section"
              cross_section_value={props.repair.motor?.cross_section || ""}
              onChange={props.handleInputChange}
            />
          )}
          {props.repair.motor?.typeOfStep == "half" && (
            // Μισό βήμα
            <ThreePhaseFields
              step_label="Βήμα (Μισό - Μισό)"
              step_name="motor.halfStep"
              step_value={props.repair.motor?.halfStep || ""}
              spiral_label="Σπείρες (Μισό - Μισό)"
              spiral_name="motor.halfSpiral"
              spiral_value={props.repair.motor?.halfSpiral || ""}
              cross_section_label="Διατομή (Μισό - Μισό)"
              cross_section_name="motor.halfCross_section"
              cross_section_value={props.repair.motor?.halfCross_section || ""}
              onChange={props.handleInputChange}
            />
          )}
          {props.repair.motor?.typeOfStep == "combined" && (
            // συνδιασμος
            <>
              {/* Μισό */}
              <ThreePhaseFields
                sx={{ pb: 3 }}
                step_label="Βήμα (Μισό - Μισό)"
                step_name="motor.halfStep"
                step_value={props.repair.motor?.halfStep || ""}
                spiral_label="Σπείρες (Μισό - Μισό)"
                spiral_name="motor.halfSpiral"
                spiral_value={props.repair.motor?.halfSpiral || ""}
                cross_section_label="Διατομή (Μισό - Μισό)"
                cross_section_name="motor.halfCross_section"
                cross_section_value={
                  props.repair.motor?.halfCross_section || ""
                }
                onChange={props.handleInputChange}
              />
              {/* ολόκληρο */}
              <ThreePhaseFields
                step_label="Βήμα (Ολόκληρο)"
                step_name="motor.step"
                step_value={props.repair.motor?.step || ""}
                spiral_label="Σπείρες (Ολόκληρο)"
                spiral_name="motor.spiral"
                spiral_value={props.repair.motor?.spiral || ""}
                cross_section_label="Διατομή (Ολόκληρο)"
                cross_section_name="motor.cross_section"
                cross_section_value={props.repair.motor?.cross_section || ""}
                onChange={props.handleInputChange}
              />
            </>
          )}
        </>
      )}
      {props.repair.motor?.typeOfVolt == "1-phase" && (
        <>
          {props.repair.motor?.typeOfStep == "standard" && (
            <>
              {/* ολόκληρο - Κυρίως */}
              <ThreePhaseFields
                sx={{ pb: 3 }}
                step_label="Κυρίως Βήμα (Ολόκληρο)"
                step_name="motor.step"
                step_value={props.repair.motor?.step || ""}
                spiral_label="Κυρίως Σπείρες (Ολόκληρο)"
                spiral_name="motor.spiral"
                spiral_value={props.repair.motor?.spiral || ""}
                cross_section_label="Κυρίως Διατομή (Ολόκληρο)"
                cross_section_name="motor.cross_section"
                cross_section_value={props.repair.motor?.cross_section || ""}
                onChange={props.handleInputChange}
              />
              {/* ολόκληρο - Βοηθητικό */}
              <ThreePhaseFields
                step_label="Βοηθητικό Βήμα (Ολόκληρο)"
                step_name="motor.helperStep"
                step_value={props.repair.motor?.helperStep || ""}
                spiral_label="Βοηθητικό Σπείρες (Ολόκληρο)"
                spiral_name="motor.helperSpiral"
                spiral_value={props.repair.motor?.helperSpiral || ""}
                cross_section_label="Βοηθητικό Διατομή (Ολόκληρο)"
                cross_section_name="motor.helperCross_section"
                cross_section_value={
                  props.repair.motor?.helperCross_section || ""
                }
                onChange={props.handleInputChange}
              />
            </>
          )}
          {props.repair.motor?.typeOfStep == "half" && (
            <>
              {/* Μισό - Μισό - Κυρίως */}
              <ThreePhaseFields
                sx={{ pb: 3 }}
                step_label="Κυρίως Βήμα (Μισό - Μισό)"
                step_name="motor.halfStep"
                step_value={props.repair.motor?.halfStep || ""}
                spiral_label="Κυρίως Σπείρες (Μισό - Μισό)"
                spiral_name="motor.halfSpiral"
                spiral_value={props.repair.motor?.halfSpiral || ""}
                cross_section_label="Κυρίως Διατομή (Μισό - Μισό)"
                cross_section_name="motor.halfCross_section"
                cross_section_value={
                  props.repair.motor?.halfCross_section || ""
                }
                onChange={props.handleInputChange}
              />
              {/* Μισό - Μισό - Βοηθητικό */}
              <ThreePhaseFields
                step_label="Βοηθητικό Βήμα (Μισό - Μισό)"
                step_name="motor.helperHalfStep"
                step_value={props.repair.motor?.helperHalfStep || ""}
                spiral_label="Βοηθητικό Σπείρες (Μισό - Μισό)"
                spiral_name="motor.helperHalfSpiral"
                spiral_value={props.repair.motor?.helperHalfSpiral || ""}
                cross_section_label="Βοηθητικό Διατομή (Μισό - Μισό)"
                cross_section_name="motor.helperHalfCross_section"
                cross_section_value={
                  props.repair.motor?.helperHalfCross_section || ""
                }
                onChange={props.handleInputChange}
              />
            </>
          )}
          {props.repair.motor?.typeOfStep == "combined" && (
            <>
              {/* Μισό - Μισό - Κυρίως */}
              <ThreePhaseFields
                sx={{ pb: 3 }}
                step_label="Κυρίως Βήμα (Μισό - Μισό)"
                step_name="motor.halfStep"
                step_value={props.repair.motor?.halfStep || ""}
                spiral_label="Κυρίως Σπείρες (Μισό - Μισό)"
                spiral_name="motor.halfSpiral"
                spiral_value={props.repair.motor?.halfSpiral || ""}
                cross_section_label="Κυρίως Διατομή (Μισό - Μισό)"
                cross_section_name="motor.halfCross_section"
                cross_section_value={
                  props.repair.motor?.halfCross_section || ""
                }
                onChange={props.handleInputChange}
              />
              {/* ολόκληρο - Κυρίως */}
              <ThreePhaseFields
                sx={{ pb: 3 }}
                step_label="Κυρίως Βήμα (Ολόκληρο)"
                step_name="motor.step"
                step_value={props.repair.motor?.step || ""}
                spiral_label="Κυρίως Σπείρες (Ολόκληρο)"
                spiral_name="motor.spiral"
                spiral_value={props.repair.motor?.spiral || ""}
                cross_section_label="Κυρίως Διατομή (Ολόκληρο)"
                cross_section_name="motor.cross_section"
                cross_section_value={props.repair.motor?.cross_section || ""}
                onChange={props.handleInputChange}
              />
              {/* Μισό - Μισό - Βοηθητικό */}
              <ThreePhaseFields
                sx={{ pb: 3 }}
                step_label="Βοηθητικό Βήμα (Μισό - Μισό)"
                step_name="motor.helperHalfStep"
                step_value={props.repair.motor?.helperHalfStep || ""}
                spiral_label="Βοηθητικό Σπείρες (Μισό - Μισό)"
                spiral_name="motor.helperHalfSpiral"
                spiral_value={props.repair.motor?.helperHalfSpiral || ""}
                cross_section_label="Βοηθητικό Διατομή (Μισό - Μισό)"
                cross_section_name="motor.helperHalfCross_section"
                cross_section_value={
                  props.repair.motor?.helperHalfCross_section || ""
                }
                onChange={props.handleInputChange}
              />
              {/* ολόκληρο - Βοηθητικό */}
              <ThreePhaseFields
                step_label="Βοηθητικό Βήμα (Ολόκληρο)"
                step_name="motor.helperStep"
                step_value={props.repair.motor?.helperStep || ""}
                spiral_label="Βοηθητικό Σπείρες (Ολόκληρο)"
                spiral_name="motor.helperSpiral"
                spiral_value={props.repair.motor?.helperSpiral || ""}
                cross_section_label="Βοηθητικό Διατομή (Ολόκληρο)"
                cross_section_name="motor.helperCross_section"
                cross_section_value={
                  props.repair.motor?.helperCross_section || ""
                }
                onChange={props.handleInputChange}
              />
            </>
          )}
        </>
      )}
    </>
  );
}

export default WindingsContentFields;
