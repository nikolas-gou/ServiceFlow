/**
 * Συμπίεση εικόνας πριν το upload
 */
export const compressImage = async (
  file: File,
  maxWidth: number = 1920,
  maxHeight: number = 1920,
  quality: number = 0.8,
  maxSizeMB: number = 2,
): Promise<File> => {
  return new Promise((resolve, reject) => {
    // Αν το αρχείο είναι ήδη μικρότερο από maxSizeMB, επέστρεψέ το όπως είναι
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size <= maxSizeBytes) {
      resolve(file);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        // Υπολογισμός νέων διαστάσεων
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = width * ratio;
          height = height * ratio;
        }

        // Δημιουργία canvas
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Δεν ήταν δυνατή η δημιουργία canvas context.'));
          return;
        }

        // Σχεδίαση της εικόνας στο canvas (με smoothing για καλύτερη ποιότητα)
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Μετατροπή σε blob με compression
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(
                new Error(
                  'Δεν ήταν δυνατή η συμπίεση της εικόνας. Παρακαλώ δοκιμάστε άλλη φωτογραφία.',
                ),
              );
              return;
            }

            // Αν το blob είναι ακόμα μεγάλο, μειώσε περισσότερο το quality
            if (blob.size > maxSizeBytes) {
              // Επανάληψη με χαμηλότερο quality
              canvas.toBlob(
                (smallerBlob) => {
                  if (!smallerBlob) {
                    reject(
                      new Error(
                        'Δεν ήταν δυνατή η συμπίεση της εικόνας. Παρακαλώ δοκιμάστε άλλη φωτογραφία.',
                      ),
                    );
                    return;
                  }
                  const compressedFile = new File([smallerBlob], file.name, {
                    type: 'image/jpeg',
                    lastModified: Date.now(),
                  });
                  resolve(compressedFile);
                },
                'image/jpeg',
                quality * 0.7, // Ακόμα χαμηλότερο quality
              );
            } else {
              const compressedFile = new File([blob], file.name, {
                type: 'image/jpeg',
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            }
          },
          'image/jpeg',
          quality,
        );
      };
      img.onerror = () =>
        reject(
          new Error(
            'Δεν ήταν δυνατή η φόρτωση της εικόνας. Παρακαλώ ελέγξτε ότι το αρχείο είναι έγκυρη εικόνα.',
          ),
        );
      img.src = e.target?.result as string;
    };
    reader.onerror = () =>
      reject(new Error('Δεν ήταν δυνατή η ανάγνωση του αρχείου. Παρακαλώ δοκιμάστε ξανά.'));
    reader.readAsDataURL(file);
  });
};

export interface CompressImagesOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  maxSizeMB?: number;
}

/**
 * Συμπίεση πολλαπλών εικόνων
 */
export const compressImages = async (
  files: File[],
  options: CompressImagesOptions = {},
): Promise<File[]> => {
  const { maxWidth = 1920, maxHeight = 1920, quality = 0.8, maxSizeMB = 2 } = options;

  const compressedFiles: File[] = [];
  for (const file of files) {
    try {
      const compressed = await compressImage(file, maxWidth, maxHeight, quality, maxSizeMB);
      compressedFiles.push(compressed);
    } catch (error) {
      console.error(`Σφάλμα συμπίεσης ${file.name}:`, error);
      // Αν αποτύχει η συμπίεση, πετάμε το error προς τα πάνω για να το δει ο χρήστης
      // (Το Photos component θα το χειριστεί)
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(`Σφάλμα συμπίεσης της εικόνας "${file.name}": ${message}`);
    }
  }
  return compressedFiles;
};
