// repositories/MotorRepository.js
import config from '../../config';
import { Motor } from '../Models/Motor';
import apiCall from '../../utils/apiCall';

export class MotorRepository {
  static async getAll() {
    const response = await apiCall(config.server, '/api/motors', 'GET');
    // Το backend επιστρέφει ήδη formatted data
    const data = response.data || [];
    return data;
  }

  static async createNewMotor(motor) {
    const response = await apiCall(config.server, '/api/motors', 'POST', motor);
    return response.data || {};
  }

  static async getById(id) {
    const response = await apiCall(config.server, `/api/motors/${id}`, 'GET');
    const data = response.data || {};
    return new Motor(data);
  }
}
