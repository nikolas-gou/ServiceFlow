import config from '../../config';
import apiCall from '../../utils/apiCall';
import { CommonFault } from '../Models/CommonFault';

export class CommonFaultRepository {
  static async getAll() {
    const data = await apiCall(config.server, '/api/common_faults', 'GET');
    return data.map((commonFault) => new CommonFault(commonFault));
  }
}
