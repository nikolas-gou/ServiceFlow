import type { ConnectionInput } from '../components/Models/Connection';
import type { InputChangeHandler, FormErrors, FormErrorsSetter } from './repairForm';

export interface ConnectionFormBagProps {
  connection: ConnectionInput;
  handleInputChange: InputChangeHandler;
  errors: FormErrors;
  setErrors: FormErrorsSetter;
  hasError: (field: string) => boolean;
  getErrorMessage: (field: string) => string;
}
