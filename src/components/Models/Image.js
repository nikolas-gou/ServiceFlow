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

/**
 * Calculates the size of the new files to upload
 * @param {Array} files - The files to upload
 * @returns {number} The size of the new files to upload
 */
export const uploadSize = (files) => {
  // Undefined, null
  if (!files) return 0;

  // Array empty or length > 0
  // We should check if the images are new(to upload) or existing
  if (Array.isArray(files)) {
    const newFiles = files.filter((file) => file.id == null);
    return newFiles.reduce((acc, file) => acc + file.file.size, 0);
  }
  return 0;
};
