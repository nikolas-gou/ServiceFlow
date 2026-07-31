export interface ImageInput {
  id?: number | string | null;
  repairID?: number | string | null;
  path?: string | null;
  type?: string | null;
  size?: number | null;
  createdAt?: string | null;
  file?: File | null;
  preview?: string | null;
  isNew?: boolean;
}

export interface ImageJSON {
  id: number | string | null;
  repairID: number | string | null;
  path: string | null;
  type: string | null;
  size: number | null;
  createdAt: string | null;
}

export class Image {
  id: number | string | null;
  repairID: number | string | null;
  path: string | null;
  type: string | null;
  size: number | null;
  createdAt: string | null;
  file: File | null;
  preview: string | null;
  isNew?: boolean;

  constructor(data: ImageInput = {}) {
    this.id = data.id ?? null;
    this.repairID = data.repairID ?? null;
    this.path = data.path ?? null;
    this.type = data.type ?? null;
    this.size = data.size ?? null;
    this.createdAt = data.createdAt ?? null;
    this.file = data.file ?? null;
    this.preview = data.preview ?? null;
    this.isNew = data.isNew;
  }

  toJSON(): ImageJSON {
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

export interface UploadCandidate {
  id?: number | string | null;
  file?: { size: number } | null;
}

/**
 * Calculates the size of the new files to upload
 */
export const uploadSize = (files?: UploadCandidate[] | null): number => {
  // Undefined, null
  if (!files) return 0;

  // Array empty or length > 0
  // We should check if the images are new(to upload) or existing
  if (Array.isArray(files)) {
    const newFiles = files.filter((file) => file.id == null);
    return newFiles.reduce((acc, file) => acc + (file.file?.size ?? 0), 0);
  }
  return 0;
};
