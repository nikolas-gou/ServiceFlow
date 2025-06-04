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
    this.poles = data.poles || null;
    this.typeOfStep = data.typeOfStep || 'standard';
    this.typeOfMotor = data.typeOfMotor || 'el_motor';
    this.typeOfVolt = data.typeOfVolt || '3-phase';
    this.createdAt = data.createdAt || new Date();
    this.customerID = data.customerID || null;
  }

  isValid() {
    return this.manufacturer.trim() !== '' && this.manufacturer.trim() !== '';
  }

  static fromApiFormat(apiData) {
    // console.log(apiData)
    const transformedData = {
      id: apiData.id,
      serialNumber: apiData.serial_number,
      manufacturer: apiData.manufacturer,
      kw: apiData.kw,
      hp: apiData.hp,
      rpm: apiData.rpm,
      step: apiData.step,
      halfStep: apiData.half_step,
      helperStep: apiData.helper_step,
      helperHalfStep: apiData.helper_half_step,
      spiral: apiData.spiral,
      halfSpiral: apiData.half_spiral,
      helperSpiral: apiData.helper_spiral,
      helperHalfSpiral: apiData.helper_half_spiral,
      crossSection: apiData.cross_section,
      halfCrossSection: apiData.half_cross_section,
      helperCrossSection: apiData.helper_cross_section,
      helperHalfCrossSection: apiData.helper_half_cross_section,
      connectionism: apiData.connectionism,
      volt: apiData.volt,
      poles: apiData.poles,
      typeOfStep: apiData.type_of_step,
      typeOfMotor: apiData.type_of_motor,
      typeOfVolt: apiData.type_of_volt,
      createdAt: apiData.created_at,
      customerID: apiData.customer_id,
    };
    return new Motor(transformedData);
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
      typeOfStep: this.typeOfStep,
      typeOfMotor: this.typeOfMotor,
      typeOfVolt: this.typeOfVolt,
      createdAt: this.createdAt,
      customerID: this.customerID,
    };
  }
  toApiFormat() {
    return {
      id: this.id,
      serial_number: this.serialNumber,
      manufacturer: this.manufacturer,
      kw: this.kw,
      hp: this.hp,
      rpm: this.rpm,
      step: this.step,
      half_step: this.halfStep,
      helper_step: this.helperStep,
      helper_half_step: this.helperHalfStep,
      spiral: this.spiral,
      half_spiral: this.halfSpiral,
      helper_spiral: this.helperSpiral,
      helper_half_spiral: this.helperHalfSpiral,
      cross_section: this.crossSection,
      half_cross_section: this.halfCrossSection,
      helper_cross_section: this.helperCrossSection,
      helper_half_cross_section: this.helperHalfCrossSection,
      connectionism: this.connectionism,
      volt: this.volt,
      poles: this.poles,
      type_of_step: this.typeOfStep,
      type_of_motor: this.typeOfMotor,
      type_of_volt: this.typeOfVolt,
      created_at: this.createdAt,
      customer_id: this.customerID,
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

export const rpm_types = ['900', '1490', '2900', 'other'];
export const rpm_types_translated = ['900', '1490', '2900', 'Αλλο'];

export const poles_types = ['2', '4', '6', '8', '12', 'other'];
export const poles_types_translated = ['2', '4', '6', '8', '12', 'Άλλο'];

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

export const typeOfMotor = ['el_motor', 'pump', 'generator'];
export const typeOfMotor_translated = ['Μοτέρ', 'Αντλία', 'Γεννήτρια'];

export const typeOfStep = ['standard', 'half', 'combined'];
export const typeOfStep_translated = ['Ολόκληρο', 'Μισό-Μισό', 'Μισό-Μισό και Ολόκληρο'];
