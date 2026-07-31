import type { RepairJSON } from '../components/Models/Repair';
import type { ImageJSON } from '../components/Models/Image';

// Στο read-only detail view οι εικόνες έρχονται σαν JSON από τον server, αλλά ο τύπος
// επιτρέπει προαιρετικά `preview` (dead-code-safe fallback, βλ. CardPhotos/Photos).
export type DetailImage = ImageJSON & { preview?: string };

// Το `notes` δεν υπάρχει (ακόμα) στο Repair model/backend - προαιρετικό πεδίο που ελέγχεται
// αμυντικά στο CardDescription.
export interface RepairDetailData extends Omit<RepairJSON, 'images'> {
  notes?: string;
  images: DetailImage[];
}
