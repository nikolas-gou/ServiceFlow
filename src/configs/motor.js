import React from 'react';
import { Settings, Tune, Layers } from '@mui/icons-material';
import { getDisplayCrossSectionsValue, connectionism_types_mapping } from '../components/Models/Motor';

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
    includesConnection: true, // Η Σύνδεση εμφανίζεται μέσα στο box - όχι σαν ξεχωριστό chip
    values: [
      { label: 'Βήμα:', value: getStepDisplay(motor, 'standard') },
      { label: 'Σπείρες:', value: motor.spiral },
      {
        label: 'Διατομή:',
        value: getDisplayCrossSectionsValue(motor.motorCrossSectionLinks || [], 'standard'),
      },
      { label: 'Σύνδεση:', value: getConnectionLabel(motor) },
    ],
  },
  // in progress to new function
  // Τριφασικός κινητήρας - μισή περιέλιξη
  '3-phase-half': {
    title: 'Μισό - Μισό',
    color: 'secondary',
    icon: <Tune sx={{ fontSize: 16 }} />,
    includesConnection: true, // Η Σύνδεση εμφανίζεται μέσα στο box - όχι σαν ξεχωριστό chip
    values: [
      { label: 'Βήμα:', value: getStepDisplay(motor, 'half') },
      { label: 'Σπείρες:', value: motor.halfSpiral },
      {
        label: 'Διατομή:',
        value: getDisplayCrossSectionsValue(motor.motorCrossSectionLinks || [], 'half'),
      },
      { label: 'Σύνδεση:', value: getConnectionLabel(motor) },
    ],
  },
  // Τριφασικός κινητήρας - συνδυασμένη περιέλιξη (μισό + ολόκληρο).
  // Ένα πηνίο -> ΕΝΑ box, με τον τύπο (ΜΙΣΟ/ΟΛΟΚΛΗΡΟ) πάνω από κάθε αριθμό του βήματος.
  '3-phase-combined': getCombinedConfig(motor),
  // Μονοφασικός κινητήρας - κανονική περιέλιξη (κυρίως + βοηθητικό)
  '1-phase-standard': {
    split: true, // Εμφάνιση σε δύο ξεχωριστά boxes
    left: {
      title: 'Κυρίως Ολόκληρο',
      color: 'primary',
      icon: <Settings sx={{ fontSize: 16 }} />,
      values: [
        { label: 'Βήμα:', value: stepWithCoils(motor.step, motor.coilsCount) },
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
        { label: 'Βήμα:', value: stepWithCoils(motor.helperStep, motor.helperCoilsCount) },
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
        { label: 'Βήμα:', value: stepWithCoils(motor.halfStep, motor.halfCoilsCount) },
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
        {
          label: 'Βήμα:',
          value: stepWithCoils(motor.helperHalfStep, motor.helperHalfCoilsCount),
        },
        { label: 'Σπείρες:', value: motor.helperHalfSpiral },
        {
          label: 'Διατομή:',
          value: getDisplayCrossSectionsValue(motor.motorCrossSectionLinks || [], 'helper_half'),
        },
      ],
    },
  },
  // Μονοφασικός κινητήρας - συνδυασμένη περιέλιξη.
  // Δύο boxes (κυρίως + βοηθητικό), το καθένα ένα πηνίο με βήμα "μισό-μισό και ολόκληρο".
  // Νέο μοντέλο: <step>/<halfStep>/<spiral> ανά πηνίο, κοινή διατομή. Παλιό: ξεχωριστά half/standard.
  '1-phase-combined': {
    splitCombined: true, // Δύο boxes, το καθένα με στήλες ανά τύπο (CombinedBoxInfoDisplay)
    left: getCoilConfig(motor, MAIN_COIL_FIELDS, {
      title: 'Κυρίως Περιέλιξη',
      color: 'primary',
      icon: <Settings sx={{ fontSize: 16 }} />,
    }),
    right: getCoilConfig(motor, HELPER_COIL_FIELDS, {
      title: 'Βοηθητική Περιέλιξη',
      color: 'warning',
      icon: <Tune sx={{ fontSize: 16 }} />,
    }),
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

// Μετάφραση του τρόπου σύνδεσης (π.χ. "2-parallel" -> "2 φορές παράλληλη")
const getConnectionLabel = (motor) =>
  connectionism_types_mapping[motor?.connectionism] || motor?.connectionism || '-';

/**
 * Εμφάνιση βήματος για τα boxes του detail view: το "(Ν μαζί)" χρωματίζεται
 * ώστε να ξεχωρίζει από τους αριθμούς του βήματος (π.χ. "8-10-12-14 (6 μαζί)").
 */
const stepWithCoils = (step, coilsCount) => {
  if (step && coilsCount && coilsCount > 1) {
    return (
      <span style={{ whiteSpace: 'nowrap' }}>
        {step} <span style={{ color: '#FAC775' }}>({coilsCount} μαζί)</span>
      </span>
    );
  }
  return step;
};

const getStepDisplay = (motor, type = 'standard') => {
  if (!motor) return '-';
  return type === 'half'
    ? stepWithCoils(motor.halfStep, motor.halfCoilsCount)
    : stepWithCoils(motor.step, motor.coilsCount);
};

const parseTokens = (value) =>
  String(value ?? '')
    .split('-')
    .map((token) => token.trim())
    .filter(Boolean);

// Ονόματα πεδίων ανά πηνίο. Το τριφασικό έχει ένα πηνίο (default). Το μονοφασικό έχει
// δύο: κυρίως (main_*) και βοηθητικό (helper_*).
const DEFAULT_COIL_FIELDS = {
  step: 'step',
  halfStep: 'halfStep',
  spiral: 'spiral',
  coilsCount: 'coilsCount',
  halfSpiral: 'halfSpiral',
  halfCoilsCount: 'halfCoilsCount',
  crossHalf: 'half',
  crossStandard: 'standard',
};

const MAIN_COIL_FIELDS = {
  step: 'step',
  halfStep: 'halfStep',
  spiral: 'spiral',
  coilsCount: 'coilsCount',
  halfSpiral: 'halfSpiral',
  halfCoilsCount: 'halfCoilsCount',
  crossHalf: 'main_half',
  crossStandard: 'main_standard',
};

const HELPER_COIL_FIELDS = {
  step: 'helperStep',
  halfStep: 'helperHalfStep',
  spiral: 'helperSpiral',
  coilsCount: 'helperCoilsCount',
  halfSpiral: 'helperHalfSpiral',
  halfCoilsCount: 'helperHalfCoilsCount',
  crossHalf: 'helper_half',
  crossStandard: 'helper_standard',
};

/**
 * Ομάδες (μισό/ολόκληρο) για ΕΝΑ πηνίο συνδυασμένης περιέλιξης.
 * Υποστηρίζονται δύο μοντέλα δεδομένων:
 *  - νέο (v2 φόρμα): ένα πηνίο. <step> = όλη η ακολουθία (π.χ. "4-6-8"),
 *    <halfStep> = ποιοι από αυτούς τους αριθμούς είναι μισοί (π.χ. "4"),
 *    <spiral> = οι σπείρες στην ίδια σειρά (π.χ. "50-100-100"), μία κοινή διατομή.
 *  - παλιό: δύο ξεχωριστές περιελίξεις (halfStep/halfSpiral + step/spiral, ξεχωριστές διατομές).
 * Ξεχωρίζουν από το αν το <halfStep> είναι υποσύνολο του <step>.
 *
 * @param {Object} fields - ονόματα πεδίων του πηνίου (βλ. DEFAULT_COIL_FIELDS)
 */
const getCombinedGroups = (motor, fields = DEFAULT_COIL_FIELDS) => {
  const stepTokens = parseTokens(motor[fields.step]);
  const halfTokens = parseTokens(motor[fields.halfStep]);
  const spiralTokens = parseTokens(motor[fields.spiral]);
  // Το νέο μοντέλο (v2 φόρμα) γράφει σπείρες ανά αριθμό στο <spiral> και ΔΕΝ χρησιμοποιεί
  // ποτέ το <halfSpiral>. Αν το <halfSpiral> έχει τιμή, είναι το παλιό μοντέλο (δύο ξεχωριστές
  // περιελίξεις με δικές τους σπείρες) - ακόμη κι αν το <halfStep> τυχαίνει να είναι υποσύνολο
  // του <step> (π.χ. ίδιο βήμα "8-10-12" με άλλες σπείρες μισό/ολόκληρο).
  const hasHalfSpiral = parseTokens(motor[fields.halfSpiral]).length > 0;
  const isGranular =
    stepTokens.length > 0 && !hasHalfSpiral && halfTokens.every((t) => stepTokens.includes(t));

  if (!isGranular) {
    return {
      granular: false,
      groups: [
        {
          isHalf: true,
          step: stepWithCoils(motor[fields.halfStep], motor[fields.halfCoilsCount]),
          spiral: motor[fields.halfSpiral],
          crossSection: getDisplayCrossSectionsValue(
            motor.motorCrossSectionLinks || [],
            fields.crossHalf,
          ),
        },
        {
          isHalf: false,
          step: stepWithCoils(motor[fields.step], motor[fields.coilsCount]),
          spiral: motor[fields.spiral],
          crossSection: getDisplayCrossSectionsValue(
            motor.motorCrossSectionLinks || [],
            fields.crossStandard,
          ),
        },
      ],
    };
  }

  // Ειδική περίπτωση "1-Ν" (π.χ. "1-6"): ένα βήμα με πολλά υποπηνία, όχι δύο αριθμοί
  const isOneToNPair = stepTokens.length === 2 && stepTokens[0] === '1';
  if (isOneToNPair) {
    return {
      granular: true,
      groups: [
        {
          isHalf: halfTokens.length > 0,
          step: stepWithCoils(motor[fields.step], motor[fields.coilsCount]),
          spiral: motor[fields.spiral],
        },
      ],
    };
  }

  const halfSet = new Set(halfTokens);
  return {
    granular: true,
    groups: stepTokens.map((token, index) => ({
      isHalf: halfSet.has(token),
      step: token,
      spiral: spiralTokens[index],
    })),
  };
};

/**
 * Config για ΕΝΑ πηνίο συνδυασμένης περιέλιξης (χρησιμοποιείται στα δύο boxes του μονοφασικού).
 * Αν όλες οι σπείρες είναι ίδιες, εμφανίζονται μία φορά ως κοινή γραμμή αντί σε κάθε στήλη.
 * Στο νέο μοντέλο η διατομή είναι κοινή για όλο το πηνίο (κάτω από τις στήλες).
 */
const getCoilConfig = (motor, fields, meta) => {
  const { granular, groups } = getCombinedGroups(motor, fields);
  const spiralValues = groups.map((group) => group.spiral).filter(Boolean);
  const hasSameSpirals =
    granular && spiralValues.length === groups.length && new Set(spiralValues).size === 1;

  return {
    title: meta.title,
    color: meta.color,
    icon: meta.icon,
    groups: hasSameSpirals ? groups.map((group) => ({ ...group, spiral: null })) : groups,
    values: [
      ...(hasSameSpirals ? [{ label: 'Σπείρες:', value: spiralValues[0] }] : []),
      ...(granular
        ? [
            {
              label: 'Διατομή:',
              value: getDisplayCrossSectionsValue(
                motor.motorCrossSectionLinks || [],
                fields.crossStandard,
              ),
            },
          ]
        : []),
    ],
  };
};

/**
 * Config για τη συνδυασμένη περιέλιξη τριφασικού: ένα box με στήλες ανά αριθμό βήματος.
 * Αν όλες οι σπείρες είναι ίδιες, εμφανίζονται μία φορά ως κοινή γραμμή αντί σε κάθε στήλη.
 */
const getCombinedConfig = (motor) => {
  const { granular, groups } = getCombinedGroups(motor);
  const spiralValues = groups.map((group) => group.spiral).filter(Boolean);
  const hasSameSpirals =
    granular && spiralValues.length === groups.length && new Set(spiralValues).size === 1;

  return {
    combined: true, // Εμφάνιση σε ΕΝΑ box (CombinedBoxInfoDisplay)
    title: 'Μισό-Μισό και Ολόκληρο',
    titleTooltip:
      'Ένα πηνίο: κάθε αριθμός του βήματος είναι είτε μισό είτε ολόκληρο (π.χ. στο "4-6-8" το 4 μισό και τα 6, 8 ολόκληρα).',
    color: 'primary',
    icon: <Layers sx={{ fontSize: 16 }} />,
    includesConnection: true, // Η Σύνδεση εμφανίζεται μέσα στο box - όχι σαν ξεχωριστό chip
    groups: hasSameSpirals ? groups.map((group) => ({ ...group, spiral: null })) : groups,
    values: [
      ...(hasSameSpirals ? [{ label: 'Σπείρες:', value: spiralValues[0] }] : []),
      // Στο νέο μοντέλο η διατομή είναι κοινή για όλο το πηνίο· στο παλιό ανά ομάδα (πάνω)
      ...(granular
        ? [
            {
              label: 'Διατομή:',
              value: getDisplayCrossSectionsValue(motor.motorCrossSectionLinks || [], 'standard'),
            },
          ]
        : []),
      { label: 'Σύνδεση:', value: getConnectionLabel(motor) },
    ],
  };
};
