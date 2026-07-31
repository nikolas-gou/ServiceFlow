export interface ConnectionInput {
  id?: number | string | null;
  caves?: number | string | null;
  poles?: number | string | null;
  coils?: number | string | null;
  rpm?: number | string | null;
  step?: number | string | null;
  halfStep?: number | string | null;
  typeOfStep?: string;
  typeOfVolt?: string | null;
  connectionType?: string | null;
  description?: string;
  createdAt?: string | Date;
}

export interface ConnectionJSON {
  id: number | string | null;
  caves: number | string | null;
  poles: number | string | null;
  coils: number | string | null;
  rpm: number | string | null;
  step: number | string | null;
  halfStep: number | string | null;
  typeOfStep: string;
  typeOfVolt: string | null;
  connectionType: string | null;
  description: string;
  createdAt: string | Date;
}

export class Connection {
  id: number | string | null;
  caves: number | string | null;
  poles: number | string | null;
  coils: number | string | null;
  rpm: number | string | null;
  step: number | string | null;
  halfStep: number | string | null;
  typeOfStep: string;
  typeOfVolt: string | null;
  connectionType: string | null;
  description: string;
  createdAt: string | Date;

  constructor(data: ConnectionInput = {}) {
    this.id = data.id ?? null;
    this.caves = data.caves ?? null;
    this.poles = data.poles ?? null;
    this.coils = data.coils ?? null;
    this.rpm = data.rpm ?? null;
    this.step = data.step ?? null;
    this.halfStep = data.halfStep ?? null;
    this.typeOfStep = data.typeOfStep || 'standard';
    this.typeOfVolt = data.typeOfVolt ?? null;
    this.connectionType = data.connectionType ?? null;
    this.description = data.description || '';
    this.createdAt = data.createdAt || new Date();
  }

  toJSON(): ConnectionJSON {
    return {
      id: this.id,
      caves: this.caves,
      poles: this.poles,
      coils: this.coils,
      rpm: this.rpm,
      step: this.step,
      halfStep: this.halfStep,
      typeOfStep: this.typeOfStep,
      typeOfVolt: this.typeOfVolt,
      connectionType: this.connectionType,
      description: this.description,
      createdAt: this.createdAt,
    };
  }
}
