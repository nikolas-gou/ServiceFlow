export interface RepairFaultLinksInput {
  repairID?: number | string | null;
  commonFaultID?: number | string | null;
}

export interface RepairFaultLinksJSON {
  repairID: number | string | null;
  commonFaultID: number | string | null;
}

export class RepairFaultLinks {
  repairID: number | string | null;
  commonFaultID: number | string | null;

  constructor(data: RepairFaultLinksInput = {}) {
    this.repairID = data.repairID ?? null;
    this.commonFaultID = data.commonFaultID ?? null;
  }

  toJSON(): RepairFaultLinksJSON {
    return {
      repairID: this.repairID,
      commonFaultID: this.commonFaultID,
    };
  }
}
