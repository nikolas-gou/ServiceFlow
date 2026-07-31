import { People, Person, Business } from '@mui/icons-material';
import { CardFactory, type StatCard, type CreateSafeCardOptions } from '../../../utils/CardFactory';
import { categoryGradients } from './categoryGradients';
import type { DashboardStatsData } from '../../../types/statistics';

/**
 * Κάρτες για τα στατιστικά πελατών
 */
export class CustomerCardsData {
  /**
   * Επιστρέφει όλες τις κάρτες πελατών
   */
  static getCustomerCards(analyticsData: DashboardStatsData): StatCard[] {
    const cardOptions: CreateSafeCardOptions[] = [
      // Κύρια κάρτα πελατών
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
      // Κάρτες τύπων πελατών
      {
        title: 'Ιδιώτες',
        dataPath: analyticsData.customer?.customerTypes?.individual,
        subtitle: 'Όλοι οι ιδιώτες',
        icon: <Person />,
        category: 'customers',
        type: 'line',
        gradient: 'linear-gradient(135deg, #00897b 0%, #00695c 100%)',
        trendsPath: analyticsData.customer?.trends?.monthlyIndividualTrends,
      },
      {
        title: 'Εργοστάσια',
        dataPath: analyticsData.customer?.customerTypes?.factory,
        subtitle: 'Όλα τα εργοστάσια',
        icon: <Business />,
        category: 'customers',
        type: 'line',
        gradient: 'linear-gradient(135deg, #00695c 0%, #00897b 100%)',
        trendsPath: analyticsData.customer?.trends?.monthlyFactoryTrends,
      },
    ];

    return CardFactory.createMultipleCards(cardOptions, analyticsData);
  }
}
