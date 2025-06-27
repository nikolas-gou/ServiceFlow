// repositories/StatisticRepository.js
import config from '../../config';
import apiCall from '../../utils/apiCall';

/**
 * Repository για όλες τις στατιστικές κλήσεις API
 */
export class StatisticRepository {
  /**
   * Γενικά στατιστικά για dashboard overview
   * @returns {Promise<Object>} Overview statistics data
   */
  static async getOverview() {
    const data = await apiCall(config.server, '/api/statistics/overview', 'GET');
    return data;
  }

  /**
   * Μηνιαία στατιστικά για charts
   * @param {string} year - Έτος (προαιρετικό, default: τρέχον έτος)
   * @returns {Promise<Array>} Monthly statistics data
   */
  static async getMonthly(year = null) {
    const url = year ? `/api/statistics/monthly?year=${year}` : '/api/statistics/monthly';

    const data = await apiCall(config.server, url, 'GET');
    return data;
  }

  /**
   * Στατιστικά πελατών ανά τύπο
   * @returns {Promise<Object>} Customer types statistics
   */
  static async getCustomerTypes() {
    const data = await apiCall(config.server, '/api/statistics/customer-types', 'GET');
    return data;
  }

  /**
   * Top μάρκες μοτέρ
   * @param {number} limit - Όριο αποτελεσμάτων (προαιρετικό, default: 10)
   * @returns {Promise<Array>} Top motor brands data
   */
  static async getTopBrands(limit = 10) {
    const url = `/api/statistics/top-brands?limit=${limit}`;
    const data = await apiCall(config.server, url, 'GET');
    return data;
  }

  /**
   * Ανάλυση εσόδων ανά μήνα
   * @param {string} year - Έτος (προαιρετικό, default: τρέχον έτος)
   * @returns {Promise<Object>} Revenue breakdown data
   */
  static async getRevenue(year = null) {
    const url = year ? `/api/statistics/revenue?year=${year}` : '/api/statistics/revenue';

    const data = await apiCall(config.server, url, 'GET');
    return data;
  }

  /**
   * Στατιστικά επισκευών ανά κατάσταση
   * @returns {Promise<Array>} Repair status statistics
   */
  static async getRepairStatus() {
    const data = await apiCall(config.server, '/api/statistics/repair-status', 'GET');
    return data;
  }

  /**
   * Ολοκληρωμένα δεδομένα dashboard (όλα μαζί)
   * @returns {Promise<Object>} Complete dashboard data
   */
  static async getDashboard() {
    const data = await apiCall(config.server, '/api/statistics/dashboard', 'GET');
    return data;
  }

  /**
   * Legacy method - Στατιστικά πελατών (για backward compatibility)
   * @returns {Promise<Object>} Customer statistics
   */
  static async getCustomerStats() {
    const data = await apiCall(config.server, '/api/statsOfCustomers', 'GET');
    return data;
  }

  /**
   * Legacy method - Στατιστικά επισκευών (για backward compatibility)
   * @returns {Promise<Object>} Repair statistics
   */
  static async getRepairStats() {
    const data = await apiCall(config.server, '/api/statsOfRepair', 'GET');
    return data;
  }

  /**
   * Batch load για multiple endpoints (για το Analytics Dashboard)
   * @param {Array<string>} endpoints - Array με τα endpoints που θέλουμε
   * @returns {Promise<Object>} Object με όλα τα δεδομένα
   */
  static async loadMultiple(endpoints = []) {
    try {
      const promises = endpoints.map((endpoint) =>
        apiCall(config.server, `/api/statistics/${endpoint}`, 'GET'),
      );

      const results = await Promise.allSettled(promises);

      // Create object with results
      const data = {};
      endpoints.forEach((endpoint, index) => {
        const result = results[index];
        if (result.status === 'fulfilled') {
          data[endpoint] = result.value;
        } else {
          console.error(`Failed to load ${endpoint}:`, result.reason);
          data[endpoint] = null;
        }
      });

      return data;
    } catch (error) {
      console.error('Error loading multiple statistics:', error);
      throw error;
    }
  }

  /**
   * Convenience method για το Analytics Dashboard
   * Φορτώνει όλα τα δεδομένα που χρειάζεται το Analytics Dashboard
   * @returns {Promise<Object>} All analytics data
   */
  static async loadAnalytics() {
    const endpoints = [
      'overview',
      'monthly',
      'customer-types',
      'top-brands',
      'revenue',
      'repair-status',
    ];

    return await this.loadMultiple(endpoints);
  }

  /**
   * Get specific statistic by key
   * @param {string} statKey - The statistic key to retrieve
   * @param {Object} params - Additional parameters
   * @returns {Promise<any>} Specific statistic data
   */
  static async getStat(statKey, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString
      ? `/api/statistics/${statKey}?${queryString}`
      : `/api/statistics/${statKey}`;

    const data = await apiCall(config.server, url, 'GET');
    return data;
  }
}
