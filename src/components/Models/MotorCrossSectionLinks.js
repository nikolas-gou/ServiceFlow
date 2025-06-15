export class MotorCrossSectionLinks {
  constructor(data = {}) {
    this.id = data.id || null;
    this.motorID = data.motorID || null;
    this.crossSection = data.crossSection || null;
    this.type = data.type || 'standard';
  }

  toJSON() {
    return {
      id: this.id,
      motorID: this.motorID,
      crossSection: this.crossSection,
      type: this.type,
    };
  }
}
