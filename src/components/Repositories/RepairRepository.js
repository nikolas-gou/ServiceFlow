import api from '../../utils/api';

export class RepairRepository {
  static async getAll() {
    const { data: response } = await api.get('/api/repairs');
    return response.data || [];
  }

  static async getPaginated(params = {}) {
    const cleanParams = {};
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        cleanParams[key] = value;
      }
    });

    const { data: response } = await api.get('/api/repairs', { params: cleanParams });
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
    const { data: response } = await api.get(`/api/repairs/${repairId}`);
    return response.data || {};
  }

  static async getStats() {
    const { data: response } = await api.get('/api/statsOfRepair');
    return response.data || {};
  }

  static async createNewRepair(repair) {
    const { data: response } = await api.post('/api/repairs', repair);
    return response.data || {};
  }

  static async softDelete(repairId) {
    const { data: response } = await api.patch(`/api/repairs/${repairId}/soft-delete`);
    return response.data || {};
  }

  static async updateRepair(repairId, data) {
    const { data: response } = await api.put(`/api/repairs/${repairId}`, data);
    return response.data || {};
  }
}
