export class RepairFaultLinks {
  constructor(data = {}) {
    this.repairID = data.repairID || null;
    this.commonFaultID = data.commonFaultID || null;
  }

  toJSON() {
    return {
      repairID: this.repairID,
      commonFaultID: this.commonFaultID,
    };
  }
}
