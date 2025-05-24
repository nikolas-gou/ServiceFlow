export class Motor {
  constructor(data = {}) {
    this.id = data.id || null;
    this.serial_number = data.serial_number || null;
    this.manufacturer = data.manufacturer || null;
    this.kw = data.kw || null;
    this.hp = data.hp || null;
    this.rpm = data.rpm || "1490";
    this.step = data.step || null;
    this.halfStep = data.halfStep || null;
    this.helperStep = data.helperStep || null;
    this.helperHalfStep = data.helperHalfStep || null;
    this.spiral = data.spiral || null;
    this.halfSpiral = data.halfSpiral || null;
    this.helperSpiral = data.helperSpiral || null;
    this.helperHalfSpiral = data.helperHalfSpiral || null;
    this.cross_section = data.cross_section || null;
    this.halfCross_section = data.halfCross_section || null;
    this.helperCross_section = data.helperCross_section || null;
    this.helperHalfCross_section = data.helperHalfCross_section || null;
    this.connectionism = data.connectionism || "simple";
    this.volt = data.volt || "380VY";
    this.poles = data.poles || null;
    this.typeOfStep = data.typeOfStep || "standard";
    this.typeOfMotor = data.typeOfMotor || "el_motor";
    this.typeOfVolt = data.typeOfVolt || "3-phase";
    this.created_at = data.created_at || new Date().toISOString().split("T")[0];
    this.customerID = data.customerID || null;
  }

  isValid() {
    return this.manufacturer.trim() !== "" && this.manufacturer.trim() !== "";
  }

  toJSON() {
    return {
      id: this.id,
      serial_number: this.serial_number,
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
      cross_section: this.cross_section,
      halfCross_section: this.halfCross_section,
      helperCross_section: this.helperCross_section,
      helperHalfCross_section: this.helperHalfCross_section,
      connectionism: this.connectionism,
      volt: this.volt,
      poles: this.poles,
      typeOfStep: this.typeOfStep,
      typeOfMotor: this.typeOfMotor,
      typeOfVolt: this.typeOfVolt,
      created_at: this.created_at,
      customerID: this.customerID,
    };
  }
}

export const connectionism_types = [
  "simple",
  "1-parallel",
  "2-parallel",
  "3-parallel",
  "other",
];

export const connectionism_types_translated = [
  "Απλή",
  "1 φορά παράλληλη",
  "2 φορές παράλληλη",
  "3 φορές παράλληλη",
  "Άλλο",
];

export const rpm_types = ["900", "1490", "2900", "other"];
export const rpm_types_translated = ["900", "1490", "2900", "Αλλο"];

export const poles_types = ["2", "4", "6", "8", "12", "other"];
export const poles_types_translated = ["2", "4", "6", "8", "12", "Άλλο"];

export const volt_types = ["230VY", "230VYY", "380VY", "380VYY", "other"];

export const volt_types_translated = [
  "230VY",
  "230VΔ",
  "380VY",
  "380VΔ",
  "Άλλο",
];

export const volt_types_mapping = {
  "230VY": "230VY",
  "230VYY": "230VΔ",
  "380VY": "380VY",
  "380VYY": "380VΔ",
  other: "Αλλο",
};

export const typeOfVolt = ["1-phase", "3-phase"];
export const typeOfVolt_translated = ["Μονοφασικός", "Τριφασικός"];

export const typeOfMotor = ["el_motor", "pump", "generator"];
export const typeOfMotor_translated = ["Μοτέρ", "Αντλία", "Γεννήτρια"];

export const typeOfStep = ["standard", "half", "combined"];
export const typeOfStep_translated = [
  "Ολόκληρο",
  "Μισό-Μισό",
  "Μισό-Μισό και Ολόκληρο",
];
