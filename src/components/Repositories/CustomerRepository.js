// repositories/CustomerRepository.js
import config from '../../config';
import apiCall from '../../utils/apiCall';

export class CustomerRepository {
  static async getAll() {
    const response = await apiCall(config.server, '/api/customers', 'GET');
    // Το backend επιστρέφει ήδη formatted data
    const data = response.data || [];
    return data;
  }

  static async createNewCustomer(customer) {
    const response = await apiCall(config.server, '/api/customers', 'POST', customer);
    return response.data || {};
  }

  static async listOfNames() {
    const response = await apiCall(config.server, '/api/customers', 'GET');
    const data = response.data || [];
    return data.map((customer) => customer.name);
  }
}
