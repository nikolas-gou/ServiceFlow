import React from 'react';
import {
  MotorCrossSectionLinks,
  type MotorCrossSectionLinksInput,
  type MotorCrossSectionLinkLike,
} from './MotorCrossSectionLinks';
import { brand } from '../../styles/colors';

export interface MotorInput {
  id?: number | string | null;
  serialNumber?: string | null;
  description?: string | null;
  manufacturer?: string;
  kw?: number | string | null;
  hp?: number | string | null;
  rpm?: string | number;
  step?: number | string | null;
  halfStep?: number | string | null;
  helperStep?: number | string | null;
  helperHalfStep?: number | string | null;
  spiral?: number | string | null;
  halfSpiral?: number | string | null;
  helperSpiral?: number | string | null;
  helperHalfSpiral?: number | string | null;
  connectionism?: string;
  volt?: string;
  amps?: number | string | null;
  poles?: string | number;
  coilsCount?: number;
  halfCoilsCount?: number;
  helperCoilsCount?: number;
  helperHalfCoilsCount?: number;
  typeOfStep?: string;
  typeOfMotor?: string;
  typeOfVolt?: string;
  createdAt?: string | null;
  customerID?: number | string | null;
  motorCrossSectionLinks?: MotorCrossSectionLinksInput[];
}

export interface MotorJSON {
  id: number | string | null;
  serialNumber: string | null;
  description: string | null;
  manufacturer: string;
  kw: number | string | null;
  hp: number | string | null;
  rpm: string | number;
  step: number | string | null;
  halfStep: number | string | null;
  helperStep: number | string | null;
  helperHalfStep: number | string | null;
  spiral: number | string | null;
  halfSpiral: number | string | null;
  helperSpiral: number | string | null;
  helperHalfSpiral: number | string | null;
  connectionism: string;
  volt: string;
  amps: number | string | null;
  poles: string | number;
  coilsCount: number;
  halfCoilsCount: number;
  helperCoilsCount: number;
  helperHalfCoilsCount: number;
  typeOfStep: string;
  typeOfMotor: string;
  typeOfVolt: string;
  createdAt: string | null;
  customerID: number | string | null;
  motorCrossSectionLinks: ReturnType<MotorCrossSectionLinks['toJSON']>[];
}

export class Motor {
  id: number | string | null;
  serialNumber: string | null;
  description: string | null;
  manufacturer: string;
  kw: number | string | null;
  hp: number | string | null;
  rpm: string | number;
  step: number | string | null;
  halfStep: number | string | null;
  helperStep: number | string | null;
  helperHalfStep: number | string | null;
  spiral: number | string | null;
  halfSpiral: number | string | null;
  helperSpiral: number | string | null;
  helperHalfSpiral: number | string | null;
  connectionism: string;
  volt: string;
  amps: number | string | null;
  poles: string | number;
  coilsCount: number;
  halfCoilsCount: number;
  helperCoilsCount: number;
  helperHalfCoilsCount: number;
  typeOfStep: string;
  typeOfMotor: string;
  typeOfVolt: string;
  createdAt: string | null;
  customerID: number | string | null;
  motorCrossSectionLinks: MotorCrossSectionLinks[];

  constructor(data: MotorInput = {}) {
    this.id = data.id ?? null;
    this.serialNumber = data.serialNumber ?? null;
    this.description = data.description ?? null;
    this.manufacturer = data.manufacturer || '-';
    this.kw = data.kw ?? null;
    this.hp = data.hp ?? null;
    this.rpm = data.rpm || 'other';
    this.step = data.step ?? null;
    this.halfStep = data.halfStep ?? null;
    this.helperStep = data.helperStep ?? null;
    this.helperHalfStep = data.helperHalfStep ?? null;
    this.spiral = data.spiral ?? null;
    this.halfSpiral = data.halfSpiral ?? null;
    this.helperSpiral = data.helperSpiral ?? null;
    this.helperHalfSpiral = data.helperHalfSpiral ?? null;
    this.connectionism = data.connectionism || 'other';
    this.volt = data.volt || '380VY';
    this.amps = data.amps ?? null;
    this.poles = data.poles || 'other';
    this.coilsCount = data.coilsCount ?? 1;
    this.halfCoilsCount = data.halfCoilsCount ?? 1;
    this.helperCoilsCount = data.helperCoilsCount ?? 1;
    this.helperHalfCoilsCount = data.helperHalfCoilsCount ?? 1;
    this.typeOfStep = data.typeOfStep || 'standard';
    this.typeOfMotor = data.typeOfMotor || 'el_motor';
    this.typeOfVolt = data.typeOfVolt || '3-phase';
    this.createdAt = data.createdAt ?? null;
    this.customerID = data.customerID ?? null;
    this.motorCrossSectionLinks = Array.isArray(data.motorCrossSectionLinks)
      ? data.motorCrossSectionLinks.map((item) => new MotorCrossSectionLinks(item))
      : [];
  }

  isValid(): boolean {
    return this.manufacturer.trim() !== '';
  }

  toJSON(): MotorJSON {
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

export const connectionism_types: string[] = ['simple', '1-parallel', '2-parallel', '3-parallel', 'other'];

export const connectionism_types_translated: string[] = [
  'Απλή',
  '1 φορά παράλληλη',
  '2 φορές παράλληλη',
  '3 φορές παράλληλη',
  'Άλλο',
];

export const connectionism_types_mapping: Record<string, string> = {
  simple: 'Απλή',
  '1-parallel': '1 φορά παράλληλη',
  '2-parallel': '2 φορές παράλληλη',
  '3-parallel': '3 φορές παράλληλη',
  '4-parallel': '4 φορές παράλληλη',
  other: 'Άλλο',
};

export const rpm_types: string[] = ['750', '900', '1490', '2900', 'other'];
export const rpm_types_translated: string[] = ['750', '900', '1490', '2900', 'Αλλο'];
// πιθανο ελεγχο στις τιμες 750 || "750"κτλ..
export const rpm_types_mapping: Record<string, string> = {
  750: '750',
  900: '900',
  1490: '1490',
  2900: '2900',
  other: 'Άλλο',
};
export const rpm_types_mapping_to_poles: Record<string, number | string> = {
  750: 8,
  900: 6,
  1490: 4,
  2900: 2,
  other: 'other',
};

export const poles_types: string[] = ['2', '4', '6', '8', 'other'];
export const poles_types_translated: string[] = ['2', '4', '6', '8', 'Άλλο'];
export const poles_types_mapping: Record<string, string> = {
  2: '2',
  4: '4',
  6: '6',
  8: '8',
  other: 'Άλλο',
};
export const poles_types_mapping_to_rpm: Record<string, number | string> = {
  2: 2900,
  4: 1490,
  6: 900,
  8: 750,
  other: 'other',
};

export const volt_types: string[] = [
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

export const volt_types_translated: string[] = [
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

export const volt_types_mapping: Record<string, string> = {
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

export const typeOfVolt: string[] = ['1-phase', '3-phase'];
export const typeOfVolt_translated: string[] = ['Μονοφασικός', 'Τριφασικός'];
export const typeOfVolt_mapping: Record<string, string> = { '1-phase': 'Μονοφασικός', '3-phase': 'Τριφασικός' };

export const typeOfMotor: string[] = ['el_motor', 'pump', 'generator'];
export const typeOfMotor_translated: string[] = ['Μοτέρ', 'Αντλία', 'Γεννήτρια'];
export const typeOfMotor_mapping: Record<string, string> = {
  el_motor: 'Μοτέρ',
  pump: 'Αντλία',
  generator: 'Γεννήτρια',
};

export const typeOfStep: string[] = ['standard', 'half', 'combined'];
export const typeOfStep_translated: string[] = ['Ολόκληρο', 'Μισό-Μισό', 'Μισό-Μισό και Ολόκληρο'];
export const typeOfStep_mapping: Record<string, string> = {
  standard: 'Ολόκληρο',
  half: 'Μισό-Μισό',
  combined: 'Μισό/Ολόκληρο',
};

export const repairStatus_types: string[] = ['in-progress', 'completed', 'delivered', 'cancelled'];

export const repairStatus_mapping: Record<string, string> = {
  'in-progress': 'Σε εξέλιξη',
  completed: 'Ολοκληρώθηκε',
  delivered: 'Παραδώθηκε',
  cancelled: 'Ακυρώθηκε',
};

export const repairStatus_colors: Record<string, string> = {
  'in-progress': '#ff9800',
  completed: '#4caf50',
  delivered: brand.main,
  cancelled: '#f44336',
};

export interface MotorTypeStringInput {
  typeOfVolt?: string;
  typeOfStep?: string;
}

/**
 * @param motor - Motor object
 * @returns A string like '1-phase-standard', '3-phase-half', etc.
 * @notes Based on the typeOfVolt and typeOfStep of the motor.
 */
export function getMotorTypeString(motor: MotorTypeStringInput | null | undefined): string {
  if (!motor) return '';
  const volt = motor.typeOfVolt || '';
  const step = motor.typeOfStep || '';
  if (!volt || !step) return '';
  return `${volt}-${step}`;
}

export interface MotorWithCrossSectionLinks {
  motorCrossSectionLinks?: MotorCrossSectionLinkLike[];
}

// Helper function για cross sections
export const getMotorCrossSectionsByType = (
  motor: MotorWithCrossSectionLinks | null | undefined,
  types: string[],
): Array<string | number | null> => {
  if (!motor || !motor.motorCrossSectionLinks) {
    return [];
  }

  return motor.motorCrossSectionLinks
    .filter((link) => types.includes(link.type))
    .map((link) => link.crossSection)
    .filter((crossSection) => crossSection !== null && crossSection !== undefined);
};

// Στυλ για κάθε ομάδα συρμάτων (πάνω στα χρωματιστά boxes του detail view).
// Ίδιο μέγεθος με τις υπόλοιπες τιμές (Βήμα/Σπείρες) - μόνο το "σύρμ." μένει μικρότερο.
const crossSectionPillStyle: React.CSSProperties = {
  fontSize: '1em',
  whiteSpace: 'nowrap',
};

// Helper function για σωστή εμφάνιση διατομών
// Κάθε ομάδα συρμάτων σε δικό της "πλακίδιο", με ρητή ένδειξη πλήθους: "12 σύρμ. × 2.5/10"
export const getDisplayCrossSectionsValue = (
  crossSections: MotorCrossSectionLinkLike[] | null | undefined,
  type: string = 'standard',
): React.ReactNode => {
  const links = crossSections || [];
  if (links.length === 0) return '';
  let color = type.includes('helper') ? '#ffcdd2' : '#FAC775';

  // Φιλτράρουμε μόνο τα links που ανήκουν στον συγκεκριμένο τύπο
  const filteredLinks = links.filter((link) => link.type === type);

  if (filteredLinks.length === 0) return '';

  const grouped = filteredLinks.reduce<Record<string, number>>((acc, link) => {
    const section = String(link.crossSection);
    acc[section] = (acc[section] || 0) + 1;
    return acc;
  }, {});

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexWrap: 'wrap',
        gap: '6px',
      }}
    >
      {Object.entries(grouped).map(([section, count], index) => (
        <React.Fragment key={`${section}-${count}`}>
          {index > 0 && <span style={{ opacity: 0.7 }}>+</span>}
          <span style={crossSectionPillStyle}>
            {count > 1 && (
              <>
                <span style={{ color: color, fontWeight: 'bold' }}>{count}</span>
                <span style={{ fontSize: '0.75em', opacity: 0.85 }}> σύρμ. </span>×{' '}
              </>
            )}
            {section}
          </span>
        </React.Fragment>
      ))}
    </span>
  );
};

export const cleanDetailsWindingOnVoltStepChange = (
  motor: unknown,
): Record<string, number | null> | undefined => {
  if (!motor) return;
  const fieldsToClear: Record<string, number | null> = {
    'motor.step': null,
    'motor.halfStep': null,
    'motor.helperStep': null,
    'motor.helperHalfStep': null,
    'motor.spiral': null,
    'motor.halfSpiral': null,
    'motor.helperSpiral': null,
    'motor.helperHalfSpiral': null,
    'motor.coilsCount': 1,
    'motor.halfCoilsCount': 1,
    'motor.helperCoilsCount': 1,
    'motor.helperHalfCoilsCount': 1,
  };
  return fieldsToClear;
};
