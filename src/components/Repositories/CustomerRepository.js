import api from '../../utils/api';

export class CustomerRepository {
  static async getAll() {
    const { data: response } = await api.get('/api/customers');
    return response.data || [];
  }

  static async createNewCustomer(customer) {
    const { data: response } = await api.post('/api/customers', customer);
    return response.data || {};
  }

  static async listOfNames() {
    const { data: response } = await api.get('/api/customers');
    const data = response.data || [];
    return data.map((customer) => customer.name);
  }
}
