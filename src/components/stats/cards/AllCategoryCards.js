import { Build, Memory, People, AccountBalance } from '@mui/icons-material';
import { CardFactory } from '../../../utils/CardFactory';

/**
 * Κύριες κάρτες για το tab "Όλα"
 */
export class AllCategoryCards {
  /**
   * Επιστρέφει τις κύριες κάρτες για το dashboard
   * @param {Object} analyticsData - Τα δεδομένα από το backend
   * @returns {Array} Array με τις κύριες κάρτες
   */
  static getMainCards(analyticsData) {
    const cardOptions = [
      {
        title: 'Συνολικές Επισκευές',
        dataPath: analyticsData.repair?.totalRepairs,
        subtitle: 'Όλες οι επισκευές',
        icon: <Build />,
        category: 'repairs',
        type: 'line',
        gradient: 'linear-gradient(135deg, #4caf50 0%, #388e3c 100%)',
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
        gradient: 'linear-gradient(135deg, #1976d2 0%, #1e3c72 100%)',
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
        gradient: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
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
        gradient: 'linear-gradient(135deg, #9c27b0 0%, #7b1fa2 100%)',
        trendsPath: analyticsData.revenue?.trends?.monthlyTrends,
        valueFormat: 'currency',
        isMainCard: true,
      },
    ];

    return CardFactory.createMultipleCards(cardOptions, analyticsData);
  }
}
