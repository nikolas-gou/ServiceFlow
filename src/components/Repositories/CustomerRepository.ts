import api from '../../utils/api';
import type { CustomerJSON } from '../Models/Customer';

export class CustomerRepository {
  static async getAll(): Promise<CustomerJSON[]> {
    const { data: response } = await api.get('/api/customers');
    return response.data || [];
  }

  static async createNewCustomer(customer: Partial<CustomerJSON>): Promise<CustomerJSON> {
    const { data: response } = await api.post('/api/customers', customer);
    return response.data || {};
  }

  static async listOfNames(): Promise<string[]> {
    const { data: response } = await api.get('/api/customers');
    const data: CustomerJSON[] = response.data || [];
    return data.map((customer) => customer.name);
  }
}
