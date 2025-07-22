// Γενικές βοηθητικές συναρτήσεις για στατιστικά και κάρτες
import { safeDataArray } from './errorHandling';

/**
 * Υπολογίζει το trend (ποσοστιαία μεταβολή) μεταξύ των δύο τελευταίων τιμών ενός πίνακα.
 * @param {number[]} data
 * @returns {string} π.χ. '+25%' ή '-10%'
 */
export function calculateTrend(data) {
  if (!data || !Array.isArray(data) || data.length < 2) return '+0%';
  const current = data[data.length - 1] || 0;
  const previous = data[data.length - 2] || 0;
  if (previous === 0) return current > 0 ? '+100%' : '+0%';
  const change = ((current - previous) / previous) * 100;
  const sign = change >= 0 ? '+' : '';
  return `${sign}${change.toFixed(0)}%`;
}

/**
 * Επιστρέφει το κατάλληλο χρώμα για trend (π.χ. πράσινο για θετικό, κόκκινο για αρνητικό)
 * @param {string} trend
 * @returns {string}
 */
export function getTrendColor(trend) {
  if (!trend) return 'primary';
  return trend.startsWith('+') ? 'success' : 'error';
}

/**
 * Επιστρέφει το κατάλληλο εικονίδιο για trend (React element)
 * @param {string} trend
 * @param {object} icons - { up: ReactNode, down: ReactNode, neutral: ReactNode }
 * @returns {ReactNode}
 */
export function getTrendIcon(trend, icons) {
  if (!trend || !icons) return icons?.neutral || null;
  return trend.startsWith('+') ? icons.up : icons.down;
}

/**
 * Μορφοποιεί αριθμούς ή ποσά για εμφάνιση (π.χ. 1.2k, €1.000)
 * @param {number|string} value
 * @param {'number'|'currency'} type
 * @returns {string}
 */
export function formatValue(value, type = 'number') {
  if (value === undefined || value === null) return '0';
  switch (type) {
    case 'currency':
      return `€${Number(value).toLocaleString()}`;
    case 'number':
      if (value >= 1000) {
        return `${(value / 1000).toFixed(1)}k`;
      }
      return value.toString();
    default:
      return value.toString();
  }
}

/**
 * Εξασφαλίζει ότι τα δεδομένα για τα charts είναι πάντα array με αριθμούς (χωρίς undefined/null)
 * @param {any[]} data
 * @param {number[]} fallback
 * @returns {number[]}
 */
export function getSafeDataArray(data, fallback = [0, 0, 0, 0, 0]) {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return fallback;
  }
  return data.map((value) =>
    value === undefined || value === null || isNaN(value) ? 0 : Number(value),
  );
}

/**
 * Generate monthly data for charts
 */
export const generateMonthlyData = (data, chartData = null) => {
  const safeData = safeDataArray(data);

  // Χρήση των μηνών από το backend αν υπάρχουν
  const allMonths = chartData?.labels || [];

  if (safeData.length === 0) {
    // Χρήση του πλήθους μηνών από το backend ή fallback σε 7
    const monthCount = chartData?.totalMonths || 7;
    return {
      labels: allMonths.slice(0, monthCount),
      values: new Array(monthCount).fill(0),
    };
  }

  // Χρήση του πλήθους μηνών από το backend ή fallback στο μήκος των δεδομένων
  const monthCount = chartData?.totalMonths || Math.min(safeData.length, 12);
  const labels = allMonths.slice(0, monthCount);

  return {
    labels,
    values: safeData.slice(0, monthCount),
  };
};
