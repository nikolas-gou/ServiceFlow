import api from '../../utils/api';

export class ConnectionRepository {
  static async getAll() {
    const { data: response } = await api.get('/api/connections');
    return response.data || [];
  }

  static async getPaginated(params = {}) {
    const cleanParams = {};
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        cleanParams[key] = value;
      }
    });

    const { data: response } = await api.get('/api/connections', { params: cleanParams });
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
    const { data: response } = await api.get(`/api/connections/${connectionId}`);
    return response.data || {};
  }

  static async createConnection(connection) {
    const { data: response } = await api.post('/api/connections', connection);
    return response.data || {};
  }

  static async updateConnection(connectionId, data) {
    const { data: response } = await api.put(`/api/connections/${connectionId}`, data);
    return response.data || {};
  }

  static async deleteConnection(connectionId) {
    const { data: response } = await api.delete(`/api/connections/${connectionId}`);
    return response.data || {};
  }
}
