import { Build, AccountBalance } from '@mui/icons-material';
import { CardFactory } from '../../../utils/CardFactory';

/**
 * Κάρτες για τα στατιστικά επισκευών
 */
export class RepairCardsData {
  /**
   * Επιστρέφει όλες τις κάρτες επισκευών
   * @param {Object} analyticsData - Τα δεδομένα από το backend
   * @returns {Array} Array με τις κάρτες επισκευών
   */
  static getRepairCards(analyticsData) {
    const cardOptions = [
      // Κύρια κάρτα επισκευών
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
      // Κάρτα εσόδων
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
