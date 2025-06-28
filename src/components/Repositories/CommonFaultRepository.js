import config from '../../config';
import apiCall from '../../utils/apiCall';
import { CommonFault } from '../Models/CommonFault';

export class CommonFaultRepository {
  static async getAll() {
    const response = await apiCall(config.server, '/api/common_faults', 'GET');
    const data = response.data || [];
    return data;
  }
}
