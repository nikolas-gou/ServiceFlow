// repositories/CustomerRepository.js
import config from '../../config';
import { Customer } from '../Models/Customer';
import apiCall from '../../utils/apiCall';

export class CustomerRepository {
  static async getAll() {
    const response = await apiCall(config.server, '/api/customers', 'GET');
    // Το backend επιστρέφει ήδη formatted data
    const data = response.data || [];
    return data;
  }

  static async getStats() {
    const response = await apiCall(config.server, '/api/statsOfCustomer', 'GET');
    return response.data || {};
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

  static async getStatisticsOverview() {
    const response = await apiCall(config.server, '/api/statistics/overview', 'GET');
    return response.data || {};
  }

  //   static async getById(id) {
  //     const response = await apiCall(config.server, `/customers/${id}`, "GET");
  //     const data = response.data || {};
  //     return new Customer(data);
  //   }

  //   static async create(customer) {
  //     const response = await apiCall(
  //       config.server,
  //       "/customers",
  //       "POST",
  //       customer.toJSON()
  //     );
  //     const data = response.data || {};
  //     return new Customer(data);
  //   }

  //   static async update(customer) {
  //     const response = await apiCall(
  //       config.server,
  //       `/customers/${customer.id}`,
  //       "PUT",
  //       customer.toJSON()
  //     );
  //     const data = response.data || {};
  //     return new Customer(data);
  //   }

  //   static async delete(id) {
  //     await apiCall(config.server, `/customers/${id}`, "DELETE");
  //     return true;
  //   }

  //   // Επιπλέον μέθοδοι
  //   static async search(query) {
  //     const response = await apiCall(
  //       config.server,
  //       `/customers/search?q=${encodeURIComponent(query)}`,
  //       "GET"
  //     );
  //     const data = response.data || [];
  //     return data.map((customer) => new Customer(customer));
  //   }
}
