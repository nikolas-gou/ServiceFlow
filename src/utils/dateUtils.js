/**
 * Utility functions for date formatting and manipulation
 */

/**
 * Formats a date string for display in Greek locale
 * @param {string|Date|null} dateString - Date string or Date object
 * @returns {string} Formatted date string or '-' if invalid
 */
export const formatDateForDisplay = (dateString) => {
  if (!dateString) return '-';
  try {
    const date = dateString instanceof Date ? dateString : new Date(dateString);
    if (isNaN(date.getTime())) return dateString; // Invalid date, return original
    return date.toLocaleDateString('el-GR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch (e) {
    return dateString; // Fallback to original string
  }
};

/**
 * Formats a date string for date input fields (YYYY-MM-DD)
 * @param {string|Date|null} dateString - Date string or Date object
 * @returns {string} Date string in YYYY-MM-DD format or empty string
 */
export const formatDateForInput = (dateString) => {
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
 * @param {string|Date|null} dateString - Date string or Date object
 * @returns {string} Formatted date string in DD/MM/YYYY format or '-' if invalid
 */
export const formatDateNumeric = (dateString) => {
  if (!dateString) return '-';
  try {
    const date = dateString instanceof Date ? dateString : new Date(dateString);
    if (isNaN(date.getTime())) return dateString; // Invalid date, return original
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  } catch (e) {
    return dateString; // Fallback to original string
  }
};

/**
 * Formats a timestamp for display with time in Greek locale
 * @param {string|Date|null} dateString - Date string or Date object
 * @returns {string} Formatted date with time or '-' if invalid
 */
export const formatDateTimeForDisplay = (dateString) => {
  if (!dateString) return '-';
  try {
    const date = dateString instanceof Date ? dateString : new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString('el-GR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch (e) {
    return dateString;
  }
};

/**
 * Gets current date as ISO string (YYYY-MM-DD)
 * @returns {string} Current date in YYYY-MM-DD format
 */
export const getCurrentDateString = () => {
  return new Date().toISOString().split('T')[0];
};

/**
 * Gets current timestamp as ISO string
 * @returns {string} Current timestamp in ISO format
 */
export const getCurrentTimestamp = () => {
  return new Date().toISOString();
};
