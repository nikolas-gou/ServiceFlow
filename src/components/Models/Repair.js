import { Customer } from './Customer';
import { Motor } from './Motor';
import { RepairFaultLinks } from './RepairFaultLinks';

export class Repair {
  constructor(data = {}) {
    this.id = data.id || null;
    this.motorID = data.motorID || null;
    this.customerID = data.customerID || null;
    this.repairStatus = data.repairStatus || 'in-progress';
    this.description = data.description || '';
    this.cost = data.cost || null;
    this.createdAt = data.createdAt || new Date();
    this.isArrived = data.isArrived || new Date().toISOString().split('T')[0];
    this.estimatedIsComplete = data.estimatedIsComplete || new Date().toISOString().split('T')[0];
    this.customer = data.customer ? new Customer(data.customer) : new Customer();
    this.motor = data.motor ? new Motor(data.motor) : new Motor();
    this.repairFaultLinks = Array.isArray(data.repairFaultLinks)
      ? data.repairFaultLinks.map((link) => new RepairFaultLinks(link))
      : [];
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
      repairFaultLinks: this.repairFaultLinks
        ? this.repairFaultLinks.map((link) => link.toJSON())
        : [],
    };
  }
}
