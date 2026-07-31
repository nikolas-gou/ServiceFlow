/**
 * Shared Error Handling Utilities
 * Used across statistics components for consistent error handling
 */

// Shape returned by the backend for a stat field that failed to compute.
export interface ErrorField {
  error: string;
  details?: unknown;
}

export interface SafeStatValue {
  value: string | number;
  isError: boolean;
  errorMessage: string | null;
  errorDetails?: unknown;
}

function isErrorField(field: unknown): field is ErrorField {
  return Boolean(field) && typeof field === 'object' && 'error' in (field as object);
}

/**
 * Utility για ασφαλή εμφάνιση τιμής ή error.
 * Δέχεται οτιδήποτε (αριθμό/string/ErrorField/nested object/array) — τα πεδία
 * στατιστικών φτάνουν με ετερογενές σχήμα από το backend.
 */
export function safeStatValue(field: unknown, fallback: string = '—'): SafeStatValue {
  if (typeof field === 'number' || typeof field === 'string') {
    return { value: field, isError: false, errorMessage: null };
  }
  if (isErrorField(field)) {
    return {
      value: 'Μη διαθέσιμο',
      isError: true,
      errorMessage: field.error,
      errorDetails: field.details,
    };
  }
  return { value: fallback, isError: false, errorMessage: null };
}

/**
 * Utility για ασφαλή data array
 */
export function safeDataArray<T = number>(field: T[] | ErrorField | null | undefined): T[] {
  if (Array.isArray(field)) return field;
  return [];
}

/**
 * Utility για standardized error messages
 */
export function getStandardErrorMessage(componentType: string, error: unknown): string {
  const message = error instanceof Error ? error.message : String(error);
  return `Σφάλμα φόρτωσης στατιστικών ${componentType}: ${message}`;
}
