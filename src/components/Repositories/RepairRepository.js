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
