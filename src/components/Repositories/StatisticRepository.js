import api from '../../utils/api';

export class StatisticRepository {
  static async getDashboard() {
    const { data: response } = await api.get('/api/statistics/dashboard');
    return response.data || {};
  }

  static async getCustomerStatistics() {
    const { data: response } = await api.get('/api/statistics/customers');
    return response.data || {};
  }

  static async getConnectionismStatistics() {
    const { data: response } = await api.get('/api/statistics/connectionism');
    return response.data || {};
  }
}
