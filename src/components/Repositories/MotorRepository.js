import api from '../../utils/api';
import { Motor } from '../Models/Motor';

export class MotorRepository {
  static async getAll() {
    const { data: response } = await api.get('/api/motors');
    return response.data || [];
  }

  static async getById(id) {
    const { data: response } = await api.get(`/api/motors/${id}`);
    return new Motor(response.data || {});
  }

  static async getRepairsByMotorId(motorId) {
    const { data: response } = await api.get(`/api/motors/${motorId}/repairs`);
    return response.data || [];
  }
}
