// repositories/CustomerRepository.js
import config from "../../config";
import { Customer } from "../Models/Customer";
import apiCall from "../../utils/apiCall";

export class CustomerRepository {
  static async getAll() {
    const data = await apiCall(config.server, "/api/customers", "GET");
    return data.map((customer) => new Customer(customer));
  }

  //   static async getById(id) {
  //     const data = await apiCall(config.server, `/customers/${id}`, "GET");
  //     return new Customer(data);
  //   }

  //   static async create(customer) {
  //     const data = await apiCall(
  //       config.server,
  //       "/customers",
  //       "POST",
  //       customer.toJSON()
  //     );
  //     return new Customer(data);
  //   }

  //   static async update(customer) {
  //     const data = await apiCall(
  //       config.server,
  //       `/customers/${customer.id}`,
  //       "PUT",
  //       customer.toJSON()
  //     );
  //     return new Customer(data);
  //   }

  //   static async delete(id) {
  //     await apiCall(config.server, `/customers/${id}`, "DELETE");
  //     return true;
  //   }

  //   // Επιπλέον μέθοδοι
  //   static async search(query) {
  //     const data = await apiCall(
  //       config.server,
  //       `/customers/search?q=${encodeURIComponent(query)}`,
  //       "GET"
  //     );
  //     return data.map((customer) => new Customer(customer));
  //   }
}
