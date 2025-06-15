// repositories/CustomerRepository.js
import config from '../../config';
import { Repair } from '../Models/Repair';
import apiCall from '../../utils/apiCall';

export class RepairRepository {
  static async getAll() {
    const data = await apiCall(config.server, '/api/repairs', 'GET');
    return data.map((repair) => new Repair(repair));
  }

  static async getStats() {
    const data = await apiCall(config.server, '/api/statsOfRepair', 'GET');
    return data;
  }
  static async createNewRepair(repair) {
    const data = await apiCall(config.server, '/api/repairs', 'POST', repair);
    return data;
  }
}
