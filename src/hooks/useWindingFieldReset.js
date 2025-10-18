import { useCallback } from 'react';
import { cleanDetailsWindingOnVoltStepChange } from '../components/Models/Motor';

/**
 * Custom hook για τη διαχείριση καθαρισμού πεδίων περιελίξεων
 * όταν αλλάζει ο τύπος τάσης ή βήματος
 */
export const useWindingFieldReset = (handleInputChange) => {
  const resetWindingFields = useCallback(
    (motor) => {
      // Καθαρισμός πεδίων περιελίξεων
      const fieldsToClear = cleanDetailsWindingOnVoltStepChange(motor);

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
