import React from 'react';
import { MotorCrossSectionLinks } from './MotorCrossSectionLinks';

export class Motor {
  constructor(data = {}) {
    this.id = data.id || null;
    this.serialNumber = data.serialNumber || null;
    this.description = data.description || null;
    this.manufacturer = data.manufacturer || '-';
    this.kw = data.kw || null;
    this.hp = data.hp || null;
    this.rpm = data.rpm || 'other';
    this.step = data.step || null;
    this.halfStep = data.halfStep || null;
    this.helperStep = data.helperStep || null;
    this.helperHalfStep = data.helperHalfStep || null;
    this.spiral = data.spiral || null;
    this.halfSpiral = data.halfSpiral || null;
    this.helperSpiral = data.helperSpiral || null;
    this.helperHalfSpiral = data.helperHalfSpiral || null;
    this.connectionism = data.connectionism || 'other';
    this.volt = data.volt || '380VY';
    this.amps = data.amps || null;
    this.poles = data.poles || 'other';
    this.coilsCount = data.coilsCount || 1;
    this.halfCoilsCount = data.halfCoilsCount || 1;
    this.helperCoilsCount = data.helperCoilsCount || 1;
    this.helperHalfCoilsCount = data.helperHalfCoilsCount || 1;
    this.typeOfStep = data.typeOfStep || 'standard';
    this.typeOfMotor = data.typeOfMotor || 'el_motor';
    this.typeOfVolt = data.typeOfVolt || '3-phase';
    this.createdAt = data.createdAt || null;
    this.customerID = data.customerID || null;
    this.motorCrossSectionLinks = Array.isArray(data.motorCrossSectionLinks)
      ? data.motorCrossSectionLinks.map((item) => new MotorCrossSectionLinks(item))
      : [];
  }

  isValid() {
    return this.manufacturer.trim() !== '' && this.manufacturer.trim() !== '';
  }

  toJSON() {
    return {
      id: this.id,
      serialNumber: this.serialNumber,
      description: this.description,
      manufacturer: this.manufacturer,
      kw: this.kw,
      hp: this.hp,
      rpm: this.rpm,
      step: this.step,
      halfStep: this.halfStep,
      helperStep: this.helperStep,
      helperHalfStep: this.helperHalfStep,
      spiral: this.spiral,
      halfSpiral: this.halfSpiral,
      helperSpiral: this.helperSpiral,
      helperHalfSpiral: this.helperHalfSpiral,
      connectionism: this.connectionism,
      volt: this.volt,
      amps: this.amps,
      poles: this.poles,
      coilsCount: this.coilsCount,
      halfCoilsCount: this.halfCoilsCount,
      helperCoilsCount: this.helperCoilsCount,
      helperHalfCoilsCount: this.helperHalfCoilsCount,
      typeOfStep: this.typeOfStep,
      typeOfMotor: this.typeOfMotor,
      typeOfVolt: this.typeOfVolt,
      createdAt: this.createdAt,
      customerID: this.customerID,
      motorCrossSectionLinks: this.motorCrossSectionLinks
        ? this.motorCrossSectionLinks.map((item) => item.toJSON())
        : [],
    };
  }
}

export const connectionism_types = ['simple', '1-parallel', '2-parallel', '3-parallel', 'other'];

export const connectionism_types_translated = [
  'Απλή',
  '1 φορά παράλληλη',
  '2 φορές παράλληλη',
  '3 φορές παράλληλη',
  'Άλλο',
];

export const connectionism_types_mapping = {
  simple: 'Απλή',
  '1-parallel': '1 φορά παράλληλη',
  '2-parallel': '2 φορές παράλληλη',
  '3-parallel': '3 φορές παράλληλη',
  '4-parallel': '4 φορές παράλληλη',
  other: 'Άλλο',
};

export const rpm_types = ['750', '900', '1490', '2900', 'other'];
export const rpm_types_translated = ['750', '900', '1490', '2900', 'Αλλο'];
// πιθανο ελεγχο στις τιμες 750 || "750"κτλ..
export const rpm_types_mapping = {
  750: '750',
  900: '900',
  1490: '1490',
  2900: '2900',
  other: 'Άλλο',
};
export const rpm_types_mapping_to_poles = {
  750: 8,
  900: 6,
  1490: 4,
  2900: 2,
  other: 'other',
};

export const poles_types = ['2', '4', '6', '8', 'other'];
export const poles_types_translated = ['2', '4', '6', '8', 'Άλλο'];
export const poles_types_mapping = {
  2: '2',
  4: '4',
  6: '6',
  8: '8',
  other: 'Άλλο',
};
export const poles_types_mapping_to_rpm = {
  2: 2900,
  4: 1490,
  6: 900,
  8: 750,
  other: 'other',
};

export const volt_types = [
  '230V',
  '230VY',
  '230VYY',
  '380V',
  '380VY',
  '380VYY',
  '500V',
  '500VY',
  '500VYY',
  'other',
];

export const volt_types_translated = [
  '230V',
  '230VY',
  '230VΔ',
  '380V',
  '380VY',
  '380VΔ',
  '500V',
  '500VY',
  '500VΔ',
  'Άλλο',
];

export const volt_types_mapping = {
  '230V': '230V',
  '230VY': '230VY',
  '230VYY': '230VΔ',
  '380V': '380V',
  '380VY': '380VY',
  '380VYY': '380VΔ',
  '500V': '500V',
  '500VY': '500VY',
  '500VYY': '500VΔ',
  other: 'Αλλο',
};

export const typeOfVolt = ['1-phase', '3-phase'];
export const typeOfVolt_translated = ['Μονοφασικός', 'Τριφασικός'];
export const typeOfVolt_mapping = { '1-phase': 'Μονοφασικός', '3-phase': 'Τριφασικός' };

export const typeOfMotor = ['el_motor', 'pump', 'generator'];
export const typeOfMotor_translated = ['Μοτέρ', 'Αντλία', 'Γεννήτρια'];
export const typeOfMotor_mapping = {
  el_motor: 'Μοτέρ',
  pump: 'Αντλία',
  generator: 'Γεννήτρια',
};

export const typeOfStep = ['standard', 'half', 'combined'];
export const typeOfStep_translated = ['Ολόκληρο', 'Μισό-Μισό', 'Μισό-Μισό και Ολόκληρο'];
export const typeOfStep_mapping = {
  standard: 'Ολόκληρο',
  half: 'Μισό-Μισό',
  combined: 'Μισό/Ολόκληρο',
};

export const repairStatus_mapping = {
  'in-progress': 'Σε εξέλιξη',
  completed: 'Ολοκληρώθηκε',
  delivered: 'Παραδώθηκε',
  cancelled: 'Ακυρώθηκε',
};

/**
 * @param {οbject} motor - Motor object
 * @returns {string} A string like '1-phase-standard', '3-phase-half', etc.
 * @notes Based on the typeOfVolt and typeOfStep of the motor.
 */
export function getMotorTypeString(motor) {
  if (!motor) return '';
  const volt = motor.typeOfVolt || '';
  const step = motor.typeOfStep || '';
  if (!volt || !step) return '';
  return `${volt}-${step}`;
}

// Helper function για cross sections
export const getMotorCrossSectionsByType = (motor, types) => {
  if (!motor || !motor.motorCrossSectionLinks) {
    return [];
  }

  return motor.motorCrossSectionLinks
    .filter((link) => types.includes(link.type))
    .map((link) => link.crossSection)
    .filter((crossSection) => crossSection !== null && crossSection !== undefined);
};

// Helper function για σωστή εμφάνιση διατομών
export const getDisplayCrossSectionsValue = (crossSections, type = 'standard') => {
  const links = crossSections || [];
  if (links.length === 0) return '';
  let color = type.includes('helper') ? '#c62828' : '#ff9800';

  // Φιλτράρουμε μόνο τα links που ανήκουν στον συγκεκριμένο τύπο
  const filteredLinks = links.filter((link) => link.type === type);

  if (filteredLinks.length === 0) return '';

  const grouped = filteredLinks.reduce((acc, link) => {
    const section = link.crossSection;
    acc[section] = (acc[section] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(grouped)
    .map(([section, count], index) => {
      if (count > 1) {
        return (
          <span key={`${section}-${count}`}>
            <span style={{ color: color, fontWeight: 'bold', fontSize: '1.1em' }}>{count}x</span>{' '}
            {section}
          </span>
        );
      }
      return <span key={section}>{section}</span>;
    })
    .reduce((acc, element, index, array) => {
      if (index === 0) return [element];
      return [...acc, ' + ', element];
    }, []);
};

export const cleanDetailsWindingOnVoltStepChange = (motor) => {
  if (!motor) return;
  const fieldsToClear = {
    ['motor.step']: null,
    ['motor.halfStep']: null,
    ['motor.helperStep']: null,
    ['motor.helperHalfStep']: null,
    ['motor.spiral']: null,
    ['motor.halfSpiral']: null,
    ['motor.helperSpiral']: null,
    ['motor.helperHalfSpiral']: null,
    ['motor.coilsCount']: 1,
    ['motor.halfCoilsCount']: 1,
    ['motor.helperCoilsCount']: 1,
  };
  return fieldsToClear;
};
