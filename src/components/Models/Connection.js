export class Connection {
  // to-do: in progress
  constructor(data = {}) {
    this.id = data.id || null;
    this.caves = data.caves || null;
    this.poles = data.poles || null;
    this.coils = data.coils || null;
    this.step = data.step || null;
    this.halfStep = data.halfStep || null;
    this.typeOfStep = data.typeOfStep || 'standard';
    // fields in future - type(standard, half, combined), phase(single, three), step, type
    this.typeOfVolt = data.typeOfVolt || null;
    this.description = data.description || '';
    this.createdAt = data.createdAt || new Date();
  }

  toJSON() {
    return {
      id: this.id,
      caves: this.caves,
      poles: this.poles,
      coils: this.coils,
      step: this.step,
      halfStep: this.halfStep,
      typeOfStep: this.typeOfStep,
      typeOfVolt: this.typeOfVolt,
      description: this.description,
      createdAt: this.createdAt,
    };
  }
}
