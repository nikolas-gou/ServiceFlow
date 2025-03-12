import { Customer } from "./Customer";
import { Motor } from "./Motor";

export class Repair {
  constructor(data = {}) {
    this.id = data.id || null;
    this.motorID = data.motorID || "";
    this.customerID = data.customerID || "";
    this.repair_status = data.repair_status || "";
    this.description = data.description || "";
    this.cost = data.cost || "";
    this.created_at = data.created_at || "";
    this.customer = data.customer ? new Customer(data.customer) : null;
    this.motor = data.motor ? new Motor(data.motor) : null;
  }

  //   isValid() {
  //     return this.name.trim() !== "" && this.phone.trim() !== "";
  //   }

  toJSON() {
    return {
      id: this.id,
      motorID: this.this.motorID,
      customerID: this.this.customerID,
      repair_status: this.repair_status,
      created_at: this.created_at,
      description: this.description,
      cost: this.cost,
      customer: this.customer ? this.customer.toJSON() : null,
      motor: this.motor ? this.motor.toJSON() : null,
    };
  }
}
