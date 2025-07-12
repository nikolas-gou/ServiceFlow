// repositories/StatisticRepository.js
import config from '../../config';
import apiCall from '../../utils/apiCall';

/**
 * Repository για όλες τις στατιστικές κλήσεις API
 */
export class StatisticRepository {
  /**
   * Ολοκληρωμένα δεδομένα dashboard (όλα μαζί)
   * @returns {Promise<Object>} Complete dashboard data
   */
  static async getDashboard() {
    const response = await apiCall(config.server, '/api/statistics/dashboard', 'GET');
    return response.data || {};
  }

  /**
   * Στατιστικά πελατών - ολοκληρωμένα δεδομένα
   * @returns {Promise<Object>} Customer statistics data
   */
  static async getCustomerStatistics() {
    const response = await apiCall(config.server, '/api/statistics/customers', 'GET');
    return response.data || {};
  }

  static async getConnectionismStatistics() {
    const response = await apiCall(config.server, '/api/statistics/connectionism', 'GET');
    return response.data || {};
  }
}
