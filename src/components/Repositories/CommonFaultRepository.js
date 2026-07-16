import api from '../../utils/api';

export class CommonFaultRepository {
  static async getAll() {
    const { data: response } = await api.get('/api/common_faults');
    return response.data || [];
  }
}
