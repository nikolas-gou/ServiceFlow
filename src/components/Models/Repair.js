import { Customer } from "./Customer";
import { Motor } from "./Motor";

export class Repair {
  constructor(data = {}) {
    this.id = data.id || null;
    this.motorID = data.motorID || null;
    this.customerID = data.customerID || null;
    this.repair_status = data.repair_status || "In-progress";
    this.description = data.description || "";
    this.cost = data.cost || "";
    this.created_at = data.created_at || new Date();
    this.isArrived = data.isArrived || new Date().toISOString().split("T")[0];
    this.estimatedIsComplete =
      data.estimatedIsComplete || new Date().toISOString().split("T")[0];
    this.customer = data.customer
      ? new Customer(data.customer)
      : new Customer();
    this.motor = data.motor ? new Motor(data.motor) : new Motor();
  }

  toJSON() {
    return {
      id: this.id,
      motorID: this.motorID,
      customerID: this.customerID,
      repair_status: this.repair_status,
      created_at: this.created_at,
      isArrived: this.isArrived,
      estimatedIsComplete: this.estimatedIsComplete,
      description: this.description,
      cost: this.cost,
      customer: this.customer ? this.customer.toJSON() : null,
      motor: this.motor ? this.motor.toJSON() : null,
    };
  }

  toApiFormat() {
    return {
      id: this.id,
      motorID: this.motor.id,
      customerID: this.customer.id,
      description: this.description,
      repair_status: this.repair_status,
      created_at: this.created_at,
      estimatedIsComplete: this.estimatedIsComplete,
      cost: this.cost,
    };
  }
}
