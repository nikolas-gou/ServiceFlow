export class Motor {
  constructor(data = {}) {
    this.id = data.id || null;
    this.serial_number = data.serial_number || "";
    this.manufacturer = data.manufacturer || "";
    this.kw = data.kw || "";
    this.hp = data.hp || "";
    this.rpm = data.rpm || "";
    this.step = data.step || "";
    this.spiral = data.spiral || "";
    this.cross_section = data.cross_section || "";
    this.connectionism = data.connectionism || "";
    this.volt = data.volt || "";
    this.poles = data.poles || "";
    this.created_at = data.created_at || "";
    this.customerID = data.customerID || "";
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
      spiral: this.spiral,
      cross_section: this.cross_section,
      connectionism: this.connectionism,
      volt: this.volt,
      poles: this.poles,
      created_at: this.created_at,
      customerID: this.customerID,
    };
  }
}
