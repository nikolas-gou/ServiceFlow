import { Customer } from "./Customer";
import { Motor } from "./Motor";

export class Repair {
  constructor(data = {}) {
    this.id = data.id || null;
    this.motorID = data.motorID || null;
    this.customerID = data.customerID || null;
    this.repairStatus = data.repairStatus || "In-progress";
    this.description = data.description || "";
    this.cost = data.cost || "";
    this.createdAt = data.createdAt || new Date();
    this.isArrived = data.isArrived || new Date().toISOString().split("T")[0];
    this.estimatedIsComplete =
      data.estimatedIsComplete || new Date().toISOString().split("T")[0];
    this.customer = data.customer
      ? new Customer(data.customer)
      : new Customer();
    this.motor = data.motor ? new Motor(data.motor) : new Motor();
  }

  static fromApiFormat(apiData) {
    const transformedData = {
      id: apiData.id,
      motorID: apiData.motor_id,
      customerID: apiData.customer_id,
      repairStatus: apiData.repair_status,
      createdAt: apiData.created_at,
      isArrived: apiData.is_arrived,
      estimatedIsComplete: apiData.estimated_is_complete,
      description: apiData.description,
      cost: apiData.cost,
      customer: apiData.customer ? apiData.customer : null,
      motor: apiData.motor ? Motor.fromApiFormat(apiData.motor) : null,
    }
    return new Repair(transformedData)
  }

  toJSON() {
    return {
      id: this.id,
      motorID: this.motorID,
      customerID: this.customerID,
      repairStatus: this.repairStatus,
      createdAt: this.createdAt,
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
      motor_id: this.motor.id,
      customer_id: this.customer.id,
      description: this.description,
      repair_status: this.repairStatus,
      created_at: this.createdAt,
      is_arrived: this.isArrived,
      estimated_is_Complete: this.estimatedIsComplete,
      cost: this.cost,
      customer: this.customer ? this.customer.toApiFormat() : null,
      motor: this.motor ? this.motor.toApiFormat() : null,
    };
  }
}
