import type { CustomerInput } from '../components/Models/Customer';
import type { MotorInput } from '../components/Models/Motor';
import type { RepairFaultLinksInput } from '../components/Models/RepairFaultLinks';
import type { Image, ImageInput } from '../components/Models/Image';
import type { ScalarMotorField } from './motor';

export type { ScalarMotorField };

// Το mutable draft state που κρατάει η φόρμα καταχώρησης/επεξεργασίας επισκευής
// (βλ. EditRepairForm/RepairFormV2Page) - στα κύρια πεδία τιμών του Repair.toJSON(),
// αλλά customer/motor πάντα παρόντα (αρχικοποιούνται με `new Customer()`/`new Motor()`).
export interface RepairFormState {
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
  customer: CustomerInput;
  motor: MotorInput;
  repairFaultLinks?: RepairFaultLinksInput[];
  images?: (Image | ImageInput)[];
}

export type RepairFormSetter = (
  updater: RepairFormState | ((prev: RepairFormState) => RepairFormState),
) => void;

export interface FormFieldEvent {
  target: {
    name: string;
    value: unknown;
  };
}

export type InputChangeHandler = (event: FormFieldEvent) => void;

export type FormErrors = Record<string, string | null | undefined>;
export type FormErrorsSetter = (updater: FormErrors | ((prev: FormErrors) => FormErrors)) => void;

// Το "bag" από props που περνάνε τα περισσότερα form-parts της φόρμας επισκευής
// (βλ. BasicInfo, CostAndDelivery, TechnicalCharacteristics, Issues, DetailsWinding).
export interface RepairFormBagProps {
  repair: RepairFormState;
  setRepair: RepairFormSetter;
  errors: FormErrors;
  setErrors: FormErrorsSetter;
  handleInputChange: InputChangeHandler;
  hasError: (field: string) => boolean;
  getErrorMessage: (field: string) => string;
}
