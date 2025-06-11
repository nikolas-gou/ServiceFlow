export class MotorCrossSectionLinks {
  constructor(data = {}) {
    this.id = data.id || null;
    this.motorID = data.motorID || null;
    this.crossSection = data.crossSection || null;
    this.type = data.type || 'standard';
  }

  static fromApiFormat(apiData) {
    const transformedData = {
      id: apiData.id,
      motorID: apiData.motor_id,
      crossSection: apiData.cross_section,
      type: apiData.type,
    };
    return new MotorCrossSectionLinks(transformedData);
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
