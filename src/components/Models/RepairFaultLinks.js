export class RepairFaultLinks {
  constructor(data = {}) {
    this.repairID = data.repairID || '';
    this.commonFaultID = data.commonFaultID || '';
  }

  toJSON() {
    return {
      repairID: this.repairID,
      commonFaultID: this.commonFaultID,
    };
  }
}
