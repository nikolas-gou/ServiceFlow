// repositories/CustomerRepository.js
import config from "../../config";
import { Motor } from "../Models/Motor";
import apiCall from "../../utils/apiCall";

export class MotorRepository {
  static async getAll() {
    const data = await apiCall(config.server, "/api/motors", "GET");
    return data.map((motor) => new Motor(motor));
  }

  static async getById(id) {
    const data = await apiCall(config.server, `/api/motors/${id}`, "GET");
    return new Motor(data);
  }

  static async getAllBrands() {
    const data = await apiCall(config.server, `/api/motors/brands`, "GET");
    return data;
  }
}
