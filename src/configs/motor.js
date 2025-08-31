import React from 'react';
import { Settings, Tune } from '@mui/icons-material';
import { getMotorCrossSectionsByType, formatCrossSections } from '../components/Models/Motor';

/**
 * Περιέχει πληροφορίες για την εμφάνιση των στοιχείων περιέλιξης του κινητήρα
 * ανάλογα με τον τύπο του κινητήρα (τριφασικός, μονοφασικός, κλπ.)
 *
 * @param {Object} motor - Το αντικείμενο κινητήρα με όλα τα τεχνικά χαρακτηριστικά
 * @returns {Object} - Χάρτης διαμόρφωσης για κάθε τύπο κινητήρα
 */
export const getWindingConfigMap = (motor) => ({
  // Τριφασικός κινητήρας - κανονική περιέλιξη (ολόκληρο)
  '3-phase-standard': {
    title: 'Ολόκληρο',
    color: 'primary',
    icon: <Settings sx={{ fontSize: 16 }} />,
    values: [
      { label: 'Βήμα:', value: motor.step },
      { label: 'Σπείρες:', value: motor.spiral },
      {
        label: 'Διατομή:',
        value: formatCrossSections(getMotorCrossSectionsByType(motor, ['standard'])),
      },
    ],
  },

  // Τριφασικός κινητήρας - μισή περιέλιξη
  '3-phase-half': {
    title: 'Μισό - Μισό',
    color: 'secondary',
    icon: <Tune sx={{ fontSize: 16 }} />,
    values: [
      { label: 'Βήμα:', value: motor.halfStep },
      { label: 'Σπείρες:', value: motor.halfSpiral },
      {
        label: 'Διατομή:',
        value: formatCrossSections(getMotorCrossSectionsByType(motor, ['half'])),
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
        { label: 'Βήμα:', value: motor.halfStep },
        { label: 'Σπείρες:', value: motor.halfSpiral },
        {
          label: 'Διατομή:',
          value: formatCrossSections(getMotorCrossSectionsByType(motor, ['half'])),
        },
      ],
    },
    right: {
      title: 'Ολόκληρο',
      color: 'primary',
      icon: <Settings sx={{ fontSize: 16 }} />,
      values: [
        { label: 'Βήμα:', value: motor.step },
        { label: 'Σπείρες:', value: motor.spiral },
        {
          label: 'Διατομή:',
          value: formatCrossSections(getMotorCrossSectionsByType(motor, ['standard'])),
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
          value: formatCrossSections(getMotorCrossSectionsByType(motor, ['main_standard'])),
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
          value: formatCrossSections(getMotorCrossSectionsByType(motor, ['helper_standard'])),
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
          value: formatCrossSections(getMotorCrossSectionsByType(motor, ['main_half'])),
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
          value: formatCrossSections(getMotorCrossSectionsByType(motor, ['helper_half'])),
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
          value: formatCrossSections(getMotorCrossSectionsByType(motor, ['main_half'])),
        },
      ],
      rightValues: [
        { label: 'Βήμα:', value: motor.step },
        { label: 'Σπείρες:', value: motor.spiral },
        {
          label: 'Διατομή:',
          value: formatCrossSections(getMotorCrossSectionsByType(motor, ['main_standard'])),
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
          value: formatCrossSections(getMotorCrossSectionsByType(motor, ['helper_half'])),
        },
      ],
      rightValues: [
        { label: 'Βήμα:', value: motor.helperStep },
        { label: 'Σπείρες:', value: motor.helperSpiral },
        {
          label: 'Διατομή:',
          value: formatCrossSections(getMotorCrossSectionsByType(motor, ['helper_standard'])),
        },
      ],
    },
  },
});
