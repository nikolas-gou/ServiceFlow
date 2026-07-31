import api from '../../utils/api';
import type { CommonFaultJSON } from '../Models/CommonFault';

export class CommonFaultRepository {
  static async getAll(): Promise<CommonFaultJSON[]> {
    const { data: response } = await api.get('/api/common_faults');
    return response.data || [];
  }
}
