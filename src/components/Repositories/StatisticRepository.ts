import api from '../../utils/api';
import type {
  DashboardStatsData,
  CustomerStatisticsData,
  ConnectionismStatisticsData,
} from '../../types/statistics';

export class StatisticRepository {
  static async getDashboard(): Promise<DashboardStatsData> {
    const { data: response } = await api.get('/api/statistics/dashboard');
    return response.data || {};
  }

  static async getCustomerStatistics(): Promise<CustomerStatisticsData> {
    const { data: response } = await api.get('/api/statistics/customers');
    return response.data || {};
  }

  static async getConnectionismStatistics(): Promise<ConnectionismStatisticsData> {
    const { data: response } = await api.get('/api/statistics/connectionism');
    return response.data || {};
  }
}
