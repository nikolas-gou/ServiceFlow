// Γενικές βοηθητικές συναρτήσεις για στατιστικά και κάρτες
import type { ReactNode } from 'react';
import { safeDataArray } from './errorHandling';

/**
 * Υπολογίζει το trend (ποσοστιαία μεταβολή) μεταξύ των δύο τελευταίων τιμών ενός πίνακα.
 */
export function calculateTrend(data: number[] | null | undefined): string {
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
 */
export function getTrendColor(trend: string | null | undefined): string {
  if (!trend) return 'primary';
  return trend.startsWith('+') ? 'success' : 'error';
}

export interface TrendIcons {
  up: ReactNode;
  down: ReactNode;
  neutral: ReactNode;
}

/**
 * Επιστρέφει το κατάλληλο εικονίδιο για trend (React element)
 */
export function getTrendIcon(
  trend: string | null | undefined,
  icons: TrendIcons | null | undefined,
): ReactNode {
  if (!trend || !icons) return icons?.neutral ?? null;
  return trend.startsWith('+') ? icons.up : icons.down;
}

/**
 * Μορφοποιεί αριθμούς ή ποσά για εμφάνιση (π.χ. 1.2k, €1.000)
 */
export function formatValue(value: number | string, type: 'number' | 'currency' = 'number'): string {
  if (value === undefined || value === null) return '0';
  switch (type) {
    case 'currency':
      return `€${Number(value).toLocaleString()}`;
    case 'number':
      if (Number(value) >= 1000) {
        return `${(Number(value) / 1000).toFixed(1)}k`;
      }
      return value.toString();
    default:
      return value.toString();
  }
}

/**
 * Εξασφαλίζει ότι τα δεδομένα για τα charts είναι πάντα array με αριθμούς (χωρίς undefined/null)
 */
export function getSafeDataArray(
  data: Array<number | null | undefined> | null | undefined,
  fallback: number[] = [0, 0, 0, 0, 0],
): number[] {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return fallback;
  }
  return data.map((value) =>
    value === undefined || value === null || isNaN(value) ? 0 : Number(value),
  );
}

export interface MonthlyChartSource {
  labels?: string[];
  totalMonths?: number;
}

export interface MonthlyData {
  labels: string[];
  values: number[];
}

/**
 * Generate monthly data for charts
 */
export const generateMonthlyData = (
  data: number[] | null | undefined,
  chartData: MonthlyChartSource | null = null,
): MonthlyData => {
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
