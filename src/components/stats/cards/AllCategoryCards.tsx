import { Build, Memory, People, AccountBalance } from '@mui/icons-material';
import { CardFactory, type StatCard, type CreateSafeCardOptions } from '../../../utils/CardFactory';
import { categoryGradients } from './categoryGradients';
import type { DashboardStatsData } from '../../../types/statistics';

/**
 * Κύριες κάρτες για το tab "Όλα"
 */
export class AllCategoryCards {
  /**
   * Επιστρέφει τις κύριες κάρτες για το dashboard
   */
  static getMainCards(analyticsData: DashboardStatsData): StatCard[] {
    const cardOptions: CreateSafeCardOptions[] = [
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
      {
        title: 'Συνολικοί Κινητήρες',
        dataPath: analyticsData.motor?.totalMotors,
        subtitle: 'Όλοι οι κινητήρες',
        icon: <Memory />,
        category: 'motors',
        type: 'line',
        gradient: categoryGradients.motors,
        trendsPath: analyticsData.motor?.trends?.monthlyTrends,
        valueFormat: 'number',
        isMainCard: true,
      },
      {
        title: 'Συνολικοί Πελάτες',
        dataPath: analyticsData.customer?.totalCustomers,
        subtitle: 'Όλοι οι πελάτες',
        icon: <People />,
        category: 'customers',
        type: 'line',
        gradient: categoryGradients.customers,
        trendsPath: analyticsData.customer?.trends?.monthlyTrends,
        valueFormat: 'number',
        isMainCard: true,
      },
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
