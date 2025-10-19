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
        `/api/images/upload/${repairID}`,
        'POST',
        formData,
      );

      return response.data.map((imageData) => new Image(imageData));
    } catch (error) {
      console.error('Σφάλμα κατά το ανέβασμα των εικόνων:', error);
      throw error;
    }
  }

  /**
   * Deletes a list of images
   * @param {Array} filesToDelete - The files to delete
   * @returns {Promise<void>} The response from the API
   */
  static async deleteImages(filesToDelete) {
    try {
      await apiCall(config.server, `/api/images/delete`, 'DELETE', filesToDelete);
    } catch (error) {
      console.error('Σφάλμα κατά τη διαγραφή της εικόνας:', error);
      throw error;
    }
  }
}
