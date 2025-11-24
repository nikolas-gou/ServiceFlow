import React from 'react';
import { Settings, Tune } from '@mui/icons-material';
import { getDisplayCrossSectionsValue } from '../components/Models/Motor';

/**
 * It contains specific configs that are different based on the motor type.
 *
 * @param {Object} motor - The Motor object
 * @returns {Object} - All configurations for the motor
 */
export const getWindingConfigMap = (motor) => ({
  // Τριφασικός κινητήρας - κανονική περιέλιξη (ολόκληρο)
  '3-phase-standard': {
    title: 'Ολόκληρο',
    color: 'primary',
    icon: <Settings sx={{ fontSize: 16 }} />,
    values: [
      { label: 'Βήμα:', value: getStepLabel(motor, 'standard') },
      { label: 'Σπείρες:', value: motor.spiral },
      {
        label: 'Διατομή:',
        value: getDisplayCrossSectionsValue(motor.motorCrossSectionLinks || [], 'standard'),
      },
    ],
  },
  // in progress to new function
  // Τριφασικός κινητήρας - μισή περιέλιξη
  '3-phase-half': {
    title: 'Μισό - Μισό',
    color: 'secondary',
    icon: <Tune sx={{ fontSize: 16 }} />,
    values: [
      { label: 'Βήμα:', value: getStepLabel(motor, 'half') },
      { label: 'Σπείρες:', value: motor.halfSpiral },
      {
        label: 'Διατομή:',
        value: getDisplayCrossSectionsValue(motor.motorCrossSectionLinks || [], 'half'),
      },
    ],
  },
  // Τριφασικός κινητήρας - συνδυασμένη περιέλιξη (μισό + ολόκληρο)
  '3-phase-combined': {
    split: true, // Εμφάνιση σε δύο ξεχωριστά boxes
    left: {
      title: 'Μισό - Μισό',
      color: 'secondary',
      icon: <Tune sx={{ fontSize: 16 }} />,
      values: [
        { label: 'Βήμα:', value: getStepLabel(motor, 'half') },
        { label: 'Σπείρες:', value: motor.halfSpiral },
        {
          label: 'Διατομή:',
          value: getDisplayCrossSectionsValue(motor.motorCrossSectionLinks || [], 'half'),
        },
      ],
    },
    right: {
      title: 'Ολόκληρο',
      color: 'primary',
      icon: <Settings sx={{ fontSize: 16 }} />,
      values: [
        { label: 'Βήμα:', value: getStepLabel(motor, 'standard') },
        { label: 'Σπείρες:', value: motor.spiral },
        {
          label: 'Διατομή:',
          value: getDisplayCrossSectionsValue(motor.motorCrossSectionLinks || [], 'standard'),
        },
      ],
    },
  },
  // Μονοφασικός κινητήρας - κανονική περιέλιξη (κυρίως + βοηθητικό)
  '1-phase-standard': {
    split: true, // Εμφάνιση σε δύο ξεχωριστά boxes
    left: {
      title: 'Κυρίως Ολόκληρο',
      color: 'primary',
      icon: <Settings sx={{ fontSize: 16 }} />,
      values: [
        { label: 'Βήμα:', value: motor.step },
        { label: 'Σπείρες:', value: motor.spiral },
        {
          label: 'Διατομή:',
          value: getDisplayCrossSectionsValue(motor.motorCrossSectionLinks || [], 'main_standard'),
        },
      ],
    },
    right: {
      title: 'Βοηθητικό Ολόκληρο',
      color: 'warning',
      icon: <Tune sx={{ fontSize: 16 }} />,
      values: [
        { label: 'Βήμα:', value: motor.helperStep },
        { label: 'Σπείρες:', value: motor.helperSpiral },
        {
          label: 'Διατομή:',
          value: getDisplayCrossSectionsValue(
            motor.motorCrossSectionLinks || [],
            'helper_standard',
          ),
        },
      ],
    },
  },
  // Μονοφασικός κινητήρας - μισή περιέλιξη (κυρίως μισό + βοηθητικό μισό)
  '1-phase-half': {
    split: true, // Εμφάνιση σε δύο ξεχωριστά boxes
    left: {
      title: 'Κυρίως Μισό',
      color: 'primary',
      icon: <Settings sx={{ fontSize: 16 }} />,
      values: [
        { label: 'Βήμα:', value: motor.halfStep },
        { label: 'Σπείρες:', value: motor.halfSpiral },
        {
          label: 'Διατομή:',
          value: getDisplayCrossSectionsValue(motor.motorCrossSectionLinks || [], 'main_half'),
        },
      ],
    },
    right: {
      title: 'Βοηθητικό Μισό',
      color: 'warning',
      icon: <Tune sx={{ fontSize: 16 }} />,
      values: [
        { label: 'Βήμα:', value: motor.helperHalfStep },
        { label: 'Σπείρες:', value: motor.helperHalfSpiral },
        {
          label: 'Διατομή:',
          value: getDisplayCrossSectionsValue(motor.motorCrossSectionLinks || [], 'helper_half'),
        },
      ],
    },
  },
  // Μονοφασικός κινητήρας - συνδυασμένη περιέλιξη (ειδική περίπτωση με SplitBoxInfoDisplay)
  '1-phase-combined': {
    // Αυτός ο τύπος χρησιμοποιεί το SplitBoxInfoDisplay που εμφανίζει
    // δύο στήλες μέσα σε ένα box (leftTitle/rightTitle, leftValues/rightValues)
    left: {
      // Κυρίως περιέλιξη - μισό και ολόκληρο σε ένα box
      color: 'primary',
      icon: <Settings sx={{ fontSize: 16 }} />,
      leftTitle: 'Μισό Κυρίως',
      rightTitle: 'Ολόκληρο Κυρίως',
      leftValues: [
        { label: 'Βήμα:', value: motor.halfStep },
        { label: 'Σπείρες:', value: motor.halfSpiral },
        {
          label: 'Διατομή:',
          value: getDisplayCrossSectionsValue(motor.motorCrossSectionLinks || [], 'main_half'),
        },
      ],
      rightValues: [
        { label: 'Βήμα:', value: motor.step },
        { label: 'Σπείρες:', value: motor.spiral },
        {
          label: 'Διατομή:',
          value: getDisplayCrossSectionsValue(motor.motorCrossSectionLinks || [], 'main_standard'),
        },
      ],
    },
    right: {
      // Βοηθητική περιέλιξη - μισό και ολόκληρο σε ένα box
      color: 'warning',
      icon: <Tune sx={{ fontSize: 16 }} />,
      leftTitle: 'Μισό Βοηθητικό',
      rightTitle: 'Ολόκληρο Βοηθητικό',
      leftValues: [
        { label: 'Βήμα:', value: motor.helperHalfStep },
        { label: 'Σπείρες:', value: motor.helperHalfSpiral },
        {
          label: 'Διατομή:',
          value: getDisplayCrossSectionsValue(motor.motorCrossSectionLinks || [], 'helper_half'),
        },
      ],
      rightValues: [
        { label: 'Βήμα:', value: motor.helperStep },
        { label: 'Σπείρες:', value: motor.helperSpiral },
        {
          label: 'Διατομή:',
          value: getDisplayCrossSectionsValue(
            motor.motorCrossSectionLinks || [],
            'helper_standard',
          ),
        },
      ],
    },
  },
});

/**
 * @description A function to get the configuration for the motor based on the type of motor.
 * @param {Object} motor - The Motor object
 * @param {string} typeString - The type of motor
 * @returns {Object} - The configuration for the motor. for example half||step, spiral, crossSection, color, icon, etc.
 */
export const getWindingConfigMapByType = (motor, typeString) => {
  switch (typeString) {
    case '3-phase-standard':
      return getWindingConfigMap(motor)['3-phase-standard'];
    case '3-phase-half':
      return getWindingConfigMap(motor)['3-phase-half'];
    case '3-phase-combined':
      return getWindingConfigMap(motor)['3-phase-combined'];
    case '1-phase-standard':
      return getWindingConfigMap(motor)['1-phase-standard'];
    case '1-phase-half':
      return getWindingConfigMap(motor)['1-phase-half'];
    case '1-phase-combined':
      return getWindingConfigMap(motor)['1-phase-combined'];
  }
};

const getStepLabel = (motor, type = 'standard') => {
  if (motor) {
    if (type == 'standard') {
      if (motor.coilsCount && motor.coilsCount > 1) {
        return `${motor.step} (${motor.coilsCount} μαζί)`;
      }
      return motor.step;
    } else if (type == 'half') {
      if (motor.halfCoilsCount && motor.halfCoilsCount > 1) {
        return `${motor.halfStep} (${motor.halfCoilsCount} μαζί)`;
      }
      return motor.halfStep;
    }
  }
  return '-';
};
