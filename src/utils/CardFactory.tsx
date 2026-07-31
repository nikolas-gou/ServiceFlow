import type { ReactElement } from 'react';
import { Warning } from '@mui/icons-material';
import { safeStatValue, safeDataArray } from './errorHandling';
import { formatValue, generateMonthlyData, type MonthlyChartSource, type MonthlyData } from './statistics';

export interface CardFactoryAnalyticsData {
  chartData?: MonthlyChartSource;
}

export interface CreateSafeCardOptions {
  title: string;
  dataPath: unknown;
  subtitle?: string;
  icon: ReactElement;
  category?: string;
  type?: string;
  gradient?: string;
  trendsPath?: unknown;
  customData?: MonthlyData | null;
  valueFormat?: 'number' | 'currency';
  isMainCard?: boolean;
}

export interface StatCard {
  id?: string;
  title: string;
  value: string | number;
  subtitle?: string;
  icon: ReactElement;
  type: string;
  data: MonthlyData;
  gradient?: string;
  category?: string;
  isError: boolean;
  errorMessage?: string | null;
  errorDetails?: unknown;
}

/**
 * Factory class για τη δημιουργία ανθεκτικών κάρτων
 */
export class CardFactory {
  /**
   * Δημιουργεί μια ασφαλή κάρτα με error handling
   */
  static createSafeCard(
    options: CreateSafeCardOptions,
    analyticsData: CardFactoryAnalyticsData,
  ): StatCard {
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
    const trendData = trendsPath ? safeDataArray<number>(trendsPath as number[]) : [];
    const chartData = analyticsData.chartData;

    let formattedValue: string | number;
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
      data: customData || generateMonthlyData(trendData, chartData ?? null),
      gradient: valueData.isError ? 'linear-gradient(135deg, #BE123C 0%, #E11D48 100%)' : gradient,
      category,
      isError: valueData.isError,
      errorMessage: valueData.errorMessage,
      errorDetails: valueData.errorDetails,
    };
  }

  /**
   * Δημιουργεί πολλαπλές κάρτες από ένα array επιλογών
   */
  static createMultipleCards(
    cardOptions: CreateSafeCardOptions[],
    analyticsData: CardFactoryAnalyticsData,
  ): StatCard[] {
    return cardOptions.map((options) => this.createSafeCard(options, analyticsData));
  }
}
