import { Warning } from '@mui/icons-material';
import { safeStatValue, safeDataArray } from './errorHandling';
import { formatValue } from './statistics';
import { generateMonthlyData } from './statistics';

/**
 * Factory class για τη δημιουργία ανθεκτικών κάρτων
 */
export class CardFactory {
  /**
   * Δημιουργεί μια ασφαλή κάρτα με error handling
   * @param {Object} options - Επιλογές για τη δημιουργία της κάρτας
   * @param {Object} analyticsData - Τα δεδομένα από το backend
   * @returns {Object} Το αντικείμενο της κάρτας
   */
  static createSafeCard(options, analyticsData) {
    const {
      title,
      dataPath,
      subtitle,
      icon,
      category,
      type = 'line',
      gradient,
      trendsPath = null,
      customData = null,
      valueFormat = 'number',
      isMainCard = false,
    } = options;

    const valueData = safeStatValue(dataPath);
    const trendData = trendsPath ? safeDataArray(trendsPath) : [];
    const chartData = analyticsData.chartData;

    let formattedValue;
    if (valueData.isError) {
      formattedValue = valueData.value;
    } else {
      formattedValue =
        valueFormat === 'currency'
          ? formatValue(valueData.value, 'currency')
          : formatValue(valueData.value);
    }

    return {
      id: isMainCard ? 'main' : undefined,
      title,
      value: formattedValue,
      subtitle,
      icon: valueData.isError ? <Warning /> : icon,
      type,
      data: customData || generateMonthlyData(trendData, chartData),
      gradient: valueData.isError ? 'linear-gradient(135deg, #BE123C 0%, #E11D48 100%)' : gradient,
      category,
      isError: valueData.isError,
      errorMessage: valueData.errorMessage,
      errorDetails: valueData.errorDetails,
    };
  }

  /**
   * Δημιουργεί πολλαπλές κάρτες από ένα array επιλογών
   * @param {Array} cardOptions - Array με επιλογές για κάθε κάρτα
   * @param {Object} analyticsData - Τα δεδομένα από το backend
   * @returns {Array} Array με τις κάρτες
   */
  static createMultipleCards(cardOptions, analyticsData) {
    return cardOptions.map((options) => this.createSafeCard(options, analyticsData));
  }
}
