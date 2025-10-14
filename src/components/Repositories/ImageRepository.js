import { Image } from '../Models/Image';
import apiCall from '../../utils/apiCall';
import config from '../../config';

export class ImageRepository {
  static async uploadImages(files, repairID) {
    try {
      const formData = new FormData();

      // Προσθήκη πολλαπλών αρχείων
      files.forEach((file) => {
        formData.append('files[]', file);
      });

      // Το endpoint θα αποθηκεύσει τις φωτογραφίες στο /public/uploads/repairs/[repairId]/
      const response = await apiCall(
        config.server,
        `/api/images/batch/${repairID}`,
        'POST',
        formData,
      );

      return response.data.map((imageData) => new Image(imageData));
    } catch (error) {
      console.error('Σφάλμα κατά το ανέβασμα των εικόνων:', error);
      throw error;
    }
  }

  static async deleteImage(imageId) {
    try {
      await apiCall('', `/api/images/${imageId}`, 'DELETE');
    } catch (error) {
      console.error('Σφάλμα κατά τη διαγραφή της εικόνας:', error);
      throw error;
    }
  }
}
