// repositories/RepairRepository.js
import config from '../../config';
import { Repair } from '../Models/Repair';
import apiCall from '../../utils/apiCall';

export class RepairRepository {
  static async getAll() {
    const response = await apiCall(config.server, '/api/repairs', 'GET');
    const data = response.data || [];
    return data;
  }

  /**
   * Get paginated repairs with filters
   * @param {Object} params - Pagination and filter parameters
   * @param {number} params.page - Page number
   * @param {number} params.perPage - Items per page
   * @param {string} params.search - Search query
   * @param {string} params.manufacturer - Manufacturer filter
   * @param {string} params.status - Status filter
   * @param {string} params.voltType - Volt type filter
   * @param {number} params.kwMin - Min kW filter
   * @param {number} params.kwMax - Max kW filter
   * @returns {Promise<{data: Array, pagination: Object}>}
   */
  static async getPaginated(params = {}) {
    // Build query string from params
    const queryParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        queryParams.append(key, value);
      }
    });

    const queryString = queryParams.toString();
    const url = `/api/repairs${queryString ? `?${queryString}` : ''}`;

    const response = await apiCall(config.server, url, 'GET');

    return {
      data: response.data || [],
      pagination: response.pagination || {
        currentPage: 1,
        perPage: 20,
        totalItems: 0,
        totalPages: 0,
        hasNextPage: false,
        hasPrevPage: false,
      },
    };
  }

  static async getRepairById(repairId) {
    const response = await apiCall(config.server, `/api/repairs/${repairId}`, 'GET');
    return response.data || {};
  }

  static async getStats() {
    const response = await apiCall(config.server, '/api/statsOfRepair', 'GET');
    return response.data || {};
  }

  static async createNewRepair(repair) {
    const response = await apiCall(config.server, '/api/repairs', 'POST', repair);
    return response.data || {};
  }

  static async softDelete(repairId) {
    const response = await apiCall(config.server, `/api/repairs/${repairId}/soft-delete`, 'PATCH');
    return response.data || {};
  }

  static async updateRepair(repairId, data) {
    const response = await apiCall(config.server, `/api/repairs/${repairId}`, 'PUT', data);
    return response.data || {};
  }
}
