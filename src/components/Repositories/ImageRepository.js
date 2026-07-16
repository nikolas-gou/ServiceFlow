import api from '../../utils/api';
import { Image } from '../Models/Image';

export class ImageRepository {
  static async uploadImages(files, repairID) {
    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append('files[]', file);
      });

      const { data: response } = await api.post(`/api/images/upload/${repairID}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data.map((imageData) => new Image(imageData));
    } catch (error) {
      console.error('Σφάλμα κατά το ανέβασμα των εικόνων:', error);
      throw error;
    }
  }

  static async deleteImages(filesToDelete) {
    try {
      await api.delete('/api/images/delete', { data: filesToDelete });
    } catch (error) {
      console.error('Σφάλμα κατά τη διαγραφή της εικόνας:', error);
      throw error;
    }
  }
}
