export interface MotorCrossSectionLinksInput {
  id?: number | string | null;
  motorID?: number | string | null;
  crossSection?: string | number | null;
  type?: string;
}

export interface MotorCrossSectionLinksJSON {
  id: number | string | null;
  motorID: number | string | null;
  crossSection: string | number | null;
  type: string;
}

// Δομικό (structural) σχήμα - μόνο τα πεδία που διαβάζουν τα helpers εμφάνισης/config
// (getDisplayCrossSectionsValue, getWindingConfigMap κτλ). Ικανοποιείται τόσο από
// MotorCrossSectionLinks instances όσο και από απλά MotorCrossSectionLinksJSON objects.
export interface MotorCrossSectionLinkLike {
  crossSection: string | number | null;
  type: string;
}

export class MotorCrossSectionLinks {
  id: number | string | null;
  motorID: number | string | null;
  crossSection: string | number | null;
  type: string;

  constructor(data: MotorCrossSectionLinksInput = {}) {
    this.id = data.id ?? null;
    this.motorID = data.motorID ?? null;
    this.crossSection = data.crossSection ?? null;
    this.type = data.type || 'standard';
  }

  toJSON(): MotorCrossSectionLinksJSON {
    return {
      id: this.id,
      motorID: this.motorID,
      crossSection: this.crossSection,
      type: this.type,
    };
  }
}
