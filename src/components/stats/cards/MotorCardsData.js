import {
  Memory,
  ElectricalServices,
  SettingsInputComponent,
  Settings,
  Opacity,
  Power,
} from '@mui/icons-material';
import { CardFactory } from '../../../utils/CardFactory';

/**
 * Κάρτες για τα στατιστικά κινητήρων
 */
export class MotorCardsData {
  /**
   * Επιστρέφει όλες τις κάρτες κινητήρων
   * @param {Object} analyticsData - Τα δεδομένα από το backend
   * @returns {Array} Array με τις κάρτες κινητήρων
   */
  static getMotorCards(analyticsData) {
    const cardOptions = [
      // Κύρια κάρτα κινητήρων
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
      // Κάρτες τύπων κινητήρων (zebra pattern)
      {
        title: 'Μονοφασικοί Κινητήρες',
        dataPath: analyticsData.motor?.motorTypes?.totalOnePhaseMotors,
        subtitle: 'Όλοι οι μονοφασικοί κινητήρες',
        icon: <ElectricalServices />,
        category: 'motors',
        type: 'line',
        gradient: 'linear-gradient(135deg, #ffb74d 0%, #ff9800 100%)',
        trendsPath: analyticsData.motor?.trends?.monthlyOnePhaseTrends,
      },
      {
        title: 'Τριφασικοί Κινητήρες',
        dataPath: analyticsData.motor?.motorTypes?.totalThreePhaseMotors,
        subtitle: 'Όλοι οι τριφασικοί κινητήρες',
        icon: <SettingsInputComponent />,
        category: 'motors',
        type: 'line',
        gradient: 'linear-gradient(135deg, #ff9800 0%, #f57c00 100%)',
        trendsPath: analyticsData.motor?.trends?.monthlyThreePhaseTrends,
      },
      {
        title: 'Μοτέρ',
        dataPath: analyticsData.motor?.motorTypes?.totalElMotorMotors,
        subtitle: 'Όλα τα μοτέρ',
        icon: <Settings />,
        category: 'motors',
        type: 'line',
        gradient: 'linear-gradient(135deg, #ffb74d 0%, #ff9800 100%)',
        trendsPath: analyticsData.motor?.trends?.monthlyElMotorTrends,
      },
      {
        title: 'Αντλίες',
        dataPath: analyticsData.motor?.motorTypes?.totalPumpMotors,
        subtitle: 'Όλες οι αντλίες',
        icon: <Opacity />,
        category: 'motors',
        type: 'line',
        gradient: 'linear-gradient(135deg, #ff9800 0%, #f57c00 100%)',
        trendsPath: analyticsData.motor?.trends?.monthlyPumpTrends,
      },
      {
        title: 'Γεννήτριες',
        dataPath: analyticsData.motor?.motorTypes?.totalGeneratorMotors,
        subtitle: 'Όλες οι γεννήτριες',
        icon: <Power />,
        category: 'motors',
        type: 'line',
        gradient: 'linear-gradient(135deg, #ffb74d 0%, #ff9800 100%)',
        trendsPath: analyticsData.motor?.trends?.monthlyGeneratorTrends,
      },
    ];

    return CardFactory.createMultipleCards(cardOptions, analyticsData);
  }
}
