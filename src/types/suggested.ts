export interface SuggestionStructure<T = string> {
  data: T[];
  error: string | null;
  details: unknown | null;
}

export interface CustomerSuggestion {
  id?: number | string | null;
  name: string;
  phone?: string;
  email?: string;
  type?: string;
}

export interface MotorSuggestions {
  crossSection: SuggestionStructure<string>;
  step: SuggestionStructure<string>;
  manufacturer: SuggestionStructure<string>;
  description: SuggestionStructure<string>;
}

export interface SuggestedError {
  scope: string;
  message: string;
  details: unknown | null;
}

export interface SuggestedMeta {
  hasErrors: boolean;
  errors: SuggestedError[];
}

export interface SuggestedResult {
  data: {
    motor: MotorSuggestions;
    customer: SuggestionStructure<CustomerSuggestion>;
  };
  meta: SuggestedMeta;
}
