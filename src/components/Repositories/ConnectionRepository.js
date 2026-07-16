import config from '../../config';
import apiCall from '../../utils/apiCall';

export class ConnectionRepository {
  static async getAll() {
    const response = await apiCall(config.server, '/api/connections', 'GET');
    return response.data || [];
  }

  static async getPaginated(params = {}) {
    const queryParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        queryParams.append(key, value);
      }
    });

    const queryString = queryParams.toString();
    const url = `/api/connections${queryString ? `?${queryString}` : ''}`;

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

  static async getConnectionById(connectionId) {
    const response = await apiCall(config.server, `/api/connections/${connectionId}`, 'GET');
    return response.data || {};
  }

  static async createConnection(connection) {
    const response = await apiCall(config.server, '/api/connections', 'POST', connection);
    return response.data || {};
  }

  static async updateConnection(connectionId, data) {
    const response = await apiCall(config.server, `/api/connections/${connectionId}`, 'PUT', data);
    return response.data || {};
  }

  static async deleteConnection(connectionId) {
    const response = await apiCall(config.server, `/api/connections/${connectionId}`, 'DELETE');
    return response.data || {};
  }
}
