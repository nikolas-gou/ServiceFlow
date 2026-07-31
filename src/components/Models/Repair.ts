import { Customer, type CustomerInput } from './Customer';
import { Motor, type MotorInput } from './Motor';
import { RepairFaultLinks, type RepairFaultLinksInput } from './RepairFaultLinks';
import { Image, type ImageInput } from './Image';

export interface RepairInput {
  id?: number | string | null;
  motorID?: number | string | null;
  customerID?: number | string | null;
  repairStatus?: string;
  description?: string;
  cost?: number | string | null;
  createdAt?: string | Date | null;
  isArrived?: string;
  estimatedIsComplete?: string | null;
  deletedAt?: string | null;
  customer?: CustomerInput | null;
  motor?: MotorInput | null;
  repairFaultLinks?: RepairFaultLinksInput[];
  images?: (Image | ImageInput)[];
}

export interface RepairJSON {
  id: number | string | null;
  motorID: number | string | null;
  customerID: number | string | null;
  repairStatus: string;
  createdAt: string | Date | null;
  isArrived: string;
  estimatedIsComplete: string | null;
  description: string;
  cost: number | string | null;
  deletedAt: string | null;
  customer: ReturnType<Customer['toJSON']> | null;
  motor: ReturnType<Motor['toJSON']> | null;
  repairFaultLinks: ReturnType<RepairFaultLinks['toJSON']>[];
  images: ReturnType<Image['toJSON']>[];
}

export class Repair {
  id: number | string | null;
  motorID: number | string | null;
  customerID: number | string | null;
  repairStatus: string;
  description: string;
  cost: number | string | null;
  createdAt: string | Date | null;
  isArrived: string;
  estimatedIsComplete: string | null;
  deletedAt: string | null;
  customer: Customer;
  motor: Motor;
  repairFaultLinks: RepairFaultLinks[];
  images: Image[];

  constructor(data: RepairInput = {}) {
    this.id = data.id ?? null;
    this.motorID = data.motorID ?? null;
    this.customerID = data.customerID ?? null;
    this.repairStatus = data.repairStatus || 'in-progress';
    this.description = data.description || '';
    this.cost = data.cost ?? null;
    this.createdAt = data.createdAt ?? null;
    this.isArrived = data.isArrived || new Date().toISOString().split('T')[0];
    this.estimatedIsComplete = data.estimatedIsComplete ?? null;
    this.deletedAt = data.deletedAt ?? null;
    this.customer = data.customer ? new Customer(data.customer) : new Customer();
    this.motor = data.motor ? new Motor(data.motor) : new Motor();
    this.repairFaultLinks = Array.isArray(data.repairFaultLinks)
      ? data.repairFaultLinks.map((link) => new RepairFaultLinks(link))
      : [];
    this.images = Array.isArray(data.images)
      ? data.images.map((image) => (image instanceof Image ? image : new Image(image)))
      : [];
  }

  toJSON(): RepairJSON {
    return {
      id: this.id,
      motorID: this.motorID,
      customerID: this.customerID,
      repairStatus: this.repairStatus,
      createdAt: this.createdAt instanceof Date ? this.createdAt.toISOString() : this.createdAt,
      isArrived: this.isArrived,
      estimatedIsComplete: this.estimatedIsComplete,
      description: this.description,
      cost: this.cost,
      deletedAt: this.deletedAt,
      customer: this.customer ? this.customer.toJSON() : null,
      motor: this.motor ? this.motor.toJSON() : null,
      repairFaultLinks: this.repairFaultLinks
        ? this.repairFaultLinks.map((link) => link.toJSON())
        : [],
      images: this.images ? this.images.map((image) => image.toJSON()) : [],
    };
  }
}
