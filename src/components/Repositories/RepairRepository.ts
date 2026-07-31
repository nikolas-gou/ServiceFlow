import api from '../../utils/api';
import {
  cleanQueryParams,
  DEFAULT_PAGINATION,
  type PaginatedResult,
  type QueryParams,
} from '../../types/api';
import type { Repair, RepairJSON } from '../Models/Repair';

interface RepairMutationPayload {
  repair: Repair | Partial<RepairJSON>;
}

export class RepairRepository {
  static async getAll(): Promise<RepairJSON[]> {
    const { data: response } = await api.get('/api/repairs');
    return response.data || [];
  }

  static async getPaginated(params: QueryParams = {}): Promise<PaginatedResult<RepairJSON>> {
    const cleanParams = cleanQueryParams(params);

    const { data: response } = await api.get('/api/repairs', { params: cleanParams });
    return {
      data: response.data || [],
      pagination: response.pagination || DEFAULT_PAGINATION,
    };
  }

  static async getRepairById(repairId: number | string): Promise<RepairJSON> {
    const { data: response } = await api.get(`/api/repairs/${repairId}`);
    return response.data || {};
  }

  static async getStats(): Promise<Record<string, unknown>> {
    const { data: response } = await api.get('/api/statsOfRepair');
    return response.data || {};
  }

  static async createNewRepair(payload: RepairMutationPayload): Promise<RepairJSON> {
    const { data: response } = await api.post('/api/repairs', payload);
    return response.data || {};
  }

  static async softDelete(repairId: number | string): Promise<RepairJSON> {
    const { data: response } = await api.patch(`/api/repairs/${repairId}/soft-delete`);
    return response.data || {};
  }

  static async getTrashPaginated(params: QueryParams = {}): Promise<PaginatedResult<RepairJSON>> {
    const cleanParams = cleanQueryParams(params);

    const { data: response } = await api.get('/api/repairs/trash', { params: cleanParams });
    return {
      data: response.data || [],
      pagination: response.pagination || DEFAULT_PAGINATION,
    };
  }

  static async restore(repairId: number | string): Promise<RepairJSON> {
    const { data: response } = await api.patch(`/api/repairs/${repairId}/restore`);
    return response.data || {};
  }

  static async updateRepair(
    repairId: number | string,
    data: RepairMutationPayload,
  ): Promise<RepairJSON> {
    const { data: response } = await api.put(`/api/repairs/${repairId}`, data);
    return response.data || {};
  }
}
