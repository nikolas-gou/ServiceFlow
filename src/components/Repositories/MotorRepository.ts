import api from '../../utils/api';
import { Motor } from '../Models/Motor';
import type { RepairHistoryItem } from '../../types/repair';
import type { MotorListItem } from '../../types/motor';

export class MotorRepository {
  static async getAll(): Promise<MotorListItem[]> {
    const { data: response } = await api.get('/api/motors');
    return response.data || [];
  }

  static async getById(id: number | string): Promise<Motor> {
    const { data: response } = await api.get(`/api/motors/${id}`);
    return new Motor(response.data || {});
  }

  static async getRepairsByMotorId(motorId: number | string): Promise<RepairHistoryItem[]> {
    const { data: response } = await api.get(`/api/motors/${motorId}/repairs`);
    return response.data || [];
  }
}
