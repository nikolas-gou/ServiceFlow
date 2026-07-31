import api from '../../utils/api';
import {
  cleanQueryParams,
  DEFAULT_PAGINATION,
  type PaginatedResult,
  type QueryParams,
} from '../../types/api';
import type { ConnectionJSON } from '../Models/Connection';

export class ConnectionRepository {
  static async getAll(): Promise<ConnectionJSON[]> {
    const { data: response } = await api.get('/api/connections');
    return response.data || [];
  }

  static async getPaginated(params: QueryParams = {}): Promise<PaginatedResult<ConnectionJSON>> {
    const cleanParams = cleanQueryParams(params);

    const { data: response } = await api.get('/api/connections', { params: cleanParams });
    return {
      data: response.data || [],
      pagination: response.pagination || DEFAULT_PAGINATION,
    };
  }

  static async getConnectionById(connectionId: number | string): Promise<ConnectionJSON> {
    const { data: response } = await api.get(`/api/connections/${connectionId}`);
    return response.data || {};
  }

  static async createConnection(connection: Partial<ConnectionJSON>): Promise<ConnectionJSON> {
    const { data: response } = await api.post('/api/connections', connection);
    return response.data || {};
  }

  static async updateConnection(
    connectionId: number | string,
    data: Partial<ConnectionJSON>,
  ): Promise<ConnectionJSON> {
    const { data: response } = await api.put(`/api/connections/${connectionId}`, data);
    return response.data || {};
  }

  static async deleteConnection(connectionId: number | string): Promise<ConnectionJSON> {
    const { data: response } = await api.delete(`/api/connections/${connectionId}`);
    return response.data || {};
  }
}
