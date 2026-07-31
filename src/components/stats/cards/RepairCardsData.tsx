import { Build, AccountBalance } from '@mui/icons-material';
import { CardFactory, type StatCard, type CreateSafeCardOptions } from '../../../utils/CardFactory';
import { categoryGradients } from './categoryGradients';
import type { DashboardStatsData } from '../../../types/statistics';

/**
 * Κάρτες για τα στατιστικά επισκευών
 */
export class RepairCardsData {
  /**
   * Επιστρέφει όλες τις κάρτες επισκευών
   */
  static getRepairCards(analyticsData: DashboardStatsData): StatCard[] {
    const cardOptions: CreateSafeCardOptions[] = [
      // Κύρια κάρτα επισκευών
      {
        title: 'Συνολικές Επισκευές',
        dataPath: analyticsData.repair?.totalRepairs,
        subtitle: 'Όλες οι επισκευές',
        icon: <Build />,
        category: 'repairs',
        type: 'line',
        gradient: categoryGradients.repairs,
        trendsPath: analyticsData.repair?.trends?.monthlyTrends,
        valueFormat: 'number',
        isMainCard: true,
      },
      // Κάρτα εσόδων
      {
        title: 'Συνολικά Έσοδα',
        dataPath: analyticsData.revenue?.yearlyRevenue,
        subtitle: 'Ετήσια έσοδα 2025',
        icon: <AccountBalance />,
        category: 'revenue',
        type: 'line',
        gradient: categoryGradients.revenue,
        trendsPath: analyticsData.revenue?.trends?.monthlyTrends,
        valueFormat: 'currency',
        isMainCard: true,
      },
    ];

    return CardFactory.createMultipleCards(cardOptions, analyticsData);
  }
}
