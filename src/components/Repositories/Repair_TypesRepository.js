import config from "../../config";
import apiCall from "../../utils/apiCall";
import { Repair_Types } from "../Models/Repair_Types";

export class Repair_TypesRepository {
  static async getAll() {
    const data = await apiCall(config.server, "/api/repair_types", "GET");
    return data.map((repair_types) => new Repair_Types(repair_types));
  }
}
