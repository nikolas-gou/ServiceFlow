import { useCallback } from 'react';
import { cleanDetailsWindingOnVoltStepChange } from '../components/Models/Motor';

type InputChangeHandler = (event: { target: { name: string; value: unknown } }) => void;

/**
 * Custom hook για τη διαχείριση καθαρισμού πεδίων περιελίξεων
 * όταν αλλάζει ο τύπος τάσης ή βήματος
 */
export const useWindingFieldReset = (handleInputChange: InputChangeHandler) => {
  const resetWindingFields = useCallback(
    (motor: unknown) => {
      // Καθαρισμός πεδίων περιελίξεων
      const fieldsToClear = cleanDetailsWindingOnVoltStepChange(motor) || {};

      // Εφαρμογή καθαρισμού με batch update
      Object.entries(fieldsToClear).forEach(([fieldName, value]) => {
        handleInputChange({
          target: {
            name: fieldName,
            value: value,
          },
        });
      });

      // Καθαρισμός cross-section links
      handleInputChange({
        target: {
          name: 'motor.motorCrossSectionLinks',
          value: [],
        },
      });
    },
    [handleInputChange],
  );

  return { resetWindingFields };
};
