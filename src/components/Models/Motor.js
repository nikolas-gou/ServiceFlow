import { MotorCrossSectionLinks } from './MotorCrossSectionLinks';

export class Motor {
  constructor(data = {}) {
    this.id = data.id || null;
    this.serialNumber = data.serialNumber || null;
    this.manufacturer = data.manufacturer || '';
    this.kw = data.kw || null;
    this.hp = data.hp || null;
    this.rpm = data.rpm || '1490';
    this.step = data.step || null;
    this.halfStep = data.halfStep || null;
    this.helperStep = data.helperStep || null;
    this.helperHalfStep = data.helperHalfStep || null;
    this.spiral = data.spiral || null;
    this.halfSpiral = data.halfSpiral || null;
    this.helperSpiral = data.helperSpiral || null;
    this.helperHalfSpiral = data.helperHalfSpiral || null;
    this.crossSection = data.crossSection || null;
    this.halfCrossSection = data.halfCrossSection || null;
    this.helperCrossSection = data.helperCrossSection || null;
    this.helperHalfCrossSection = data.helperHalfCrossSection || null;
    this.connectionism = data.connectionism || 'simple';
    this.volt = data.volt || '380VY';
    this.poles = data.poles || '6';
    this.coilsCount = data.coilsCount || 1;
    this.halfCoilsCount = data.halfCoilsCount || 1;
    this.helperCoilsCount = data.helperCoilsCount || 1;
    this.helperHalfCoilsCount = data.helperHalfCoilsCount || 1;
    this.typeOfStep = data.typeOfStep || 'standard';
    this.typeOfMotor = data.typeOfMotor || 'el_motor';
    this.typeOfVolt = data.typeOfVolt || '3-phase';
    this.createdAt = data.createdAt || new Date();
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
      crossSection: this.crossSection,
      halfCrossSection: this.halfCrossSection,
      helperCrossSection: this.helperCrossSection,
      helperHalfCrossSection: this.helperHalfCrossSection,
      connectionism: this.connectionism,
      volt: this.volt,
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

export const rpm_types = ['900', '1490', '2900', 'other'];
export const rpm_types_translated = ['900', '1490', '2900', 'Αλλο'];
export const rpm_types_mapping = { 900: '900', 1490: '1490', 2900: '2900', other: 'Αλλο' };

export const poles_types = ['2', '4', '6', '8', '10', '12', 'other'];
export const poles_types_translated = ['2', '4', '6', '8', '10', '12', 'Άλλο'];
export const poles_types_mapping = {
  2: '2',
  4: '4',
  6: '6',
  8: '8',
  10: '10',
  12: '12',
  other: 'Άλλο',
};

export const volt_types = ['230VY', '230VYY', '380VY', '380VYY', 'other'];

export const volt_types_translated = ['230VY', '230VΔ', '380VY', '380VΔ', 'Άλλο'];

export const volt_types_mapping = {
  '230VY': '230VY',
  '230VYY': '230VΔ',
  '380VY': '380VY',
  '380VYY': '380VΔ',
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

// Returns a string like '1-phase-standard', '3-phase-half', etc. based on the motor object
export function getMotorTypeString(motor) {
  if (!motor) return '';
  const volt = motor.typeOfVolt || '';
  const step = motor.typeOfStep || '';
  if (!volt || !step) return '';
  return `${volt}-${step}`;
}
