/**
 * Shared Error Handling Utilities
 * Used across statistics components for consistent error handling
 */

/**
 * Utility για ασφαλή εμφάνιση τιμής ή error
 * @param {any} field - The field to check (can be value or error object)
 * @param {string} fallback - Fallback value if field is undefined/null
 * @returns {Object} - {value, isError, errorMessage, errorDetails}
 */
export function safeStatValue(field, fallback = '—') {
  if (typeof field === 'number' || typeof field === 'string') {
    return { value: field, isError: false, errorMessage: null };
  }
  if (field && typeof field === 'object' && field.error) {
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
 * @param {any} field - The field to check (should be array or error object)
 * @returns {Array} - Safe array (empty array if error or invalid)
 */
export function safeDataArray(field) {
  if (Array.isArray(field)) return field;
  if (field && typeof field === 'object' && field.error) return [];
  return [];
}

/**
 * Utility για standardized error messages
 * @param {string} componentType - Type of component (e.g., 'πελατών', 'επισκευών', 'κινητήρων')
 * @param {Error} error - The error object
 * @returns {string} - Formatted error message
 */
export function getStandardErrorMessage(componentType, error) {
  return `Σφάλμα φόρτωσης στατιστικών ${componentType}: ${error.message || error}`;
}
