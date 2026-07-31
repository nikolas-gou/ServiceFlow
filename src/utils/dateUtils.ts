/**
 * Utility functions for date formatting
 */

type DateInput = string | Date | null | undefined;

/**
 * Formats a date string for display in Greek locale
 */
export const formatDateForDisplay = (dateString: DateInput): string => {
  if (!dateString) return '-';
  try {
    const date = dateString instanceof Date ? dateString : new Date(dateString);
    if (isNaN(date.getTime())) return String(dateString); // Invalid date, return original
    return date.toLocaleDateString('el-GR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch (e) {
    return String(dateString); // Fallback to original string
  }
};

/**
 * Formats a date string for date input fields (YYYY-MM-DD)
 */
export const formatDateForInput = (dateString: DateInput): string => {
  if (!dateString) return '';
  try {
    const date = dateString instanceof Date ? dateString : new Date(dateString);
    if (isNaN(date.getTime())) return '';
    return date.toISOString().split('T')[0]; // YYYY-MM-DD
  } catch (e) {
    return '';
  }
};

/**
 * Formats a date string for numeric display (DD/MM/YYYY)
 */
export const formatDateNumeric = (dateString: DateInput): string => {
  if (!dateString) return '-';
  try {
    const date = dateString instanceof Date ? dateString : new Date(dateString);
    if (isNaN(date.getTime())) return String(dateString); // Invalid date, return original
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  } catch (e) {
    return String(dateString); // Fallback to original string
  }
};

/**
 * Formats a timestamp for display with time in Greek locale
 */
export const formatDateTimeForDisplay = (dateString: DateInput): string => {
  if (!dateString) return '-';
  try {
    const date = dateString instanceof Date ? dateString : new Date(dateString);
    if (isNaN(date.getTime())) return String(dateString);
    return date.toLocaleDateString('el-GR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch (e) {
    return String(dateString);
  }
};

/**
 * Gets current date as ISO string (YYYY-MM-DD)
 */
export const getCurrentDateString = (): string => {
  return new Date().toISOString().split('T')[0];
};

/**
 * Gets current timestamp as ISO string
 */
export const getCurrentTimestamp = (): string => {
  return new Date().toISOString();
};
