export class Image {
  constructor(data = {}) {
    this.id = data.id || null;
    this.repairID = data.repairID || null;
    this.path = data.path || null;
    this.type = data.type || null;
    this.size = data.size || null;
    this.createdAt = data.createdAt || null;
    this.file = data.file || null;
    this.preview = data.preview || null;
  }

  toJSON() {
    return {
      id: this.id,
      repairID: this.repairID,
      path: this.path,
      type: this.type,
      size: this.size,
      createdAt: this.createdAt,
    };
  }
}
