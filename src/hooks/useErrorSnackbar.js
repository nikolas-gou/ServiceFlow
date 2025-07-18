import { useState, useEffect } from 'react';

/**
 * Custom hook για τη διαχείριση error snackbar
 * @param {Array} statistics - Array με τα statistics data
 * @param {Function} safeStatValue - Function για έλεγχο error state στα fields
 * @returns {Object} - snackbar state και handlers
 */
export function useErrorSnackbar(statistics, safeStatValue) {
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [errorCount, setErrorCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  // Έλεγχος για errors όταν αλλάζουν τα statistics
  useEffect(() => {
    if (!statistics || Object.keys(statistics).length === 0) return;

    // Μέτρηση errors βάσει του είδους των statistics
    let errors = 0;
    let total = 0;

    // Για customer statistics
    if (statistics.totalCustomers !== undefined) {
      const customerFields = [
        statistics.totalCustomers,
        statistics.customerTypes?.individual,
        statistics.customerTypes?.factory,
        statistics.trends?.monthlyTrends,
        statistics.trends?.monthlyIndividualTrends,
        statistics.trends?.monthlyFactoryTrends,
        statistics.topCustomersByRevenue,
      ];

      customerFields.forEach((field) => {
        if (field !== undefined) {
          total++;
          const result = safeStatValue(field);
          if (result.isError) errors++;
        }
      });
    }

    // Για motor statistics
    else if (statistics.totalMotors !== undefined) {
      const motorFields = [
        statistics.totalMotors,
        statistics.motorTypes?.totalOnePhaseMotors,
        statistics.motorTypes?.totalThreePhaseMotors,
        statistics.motorTypes?.totalElMotorMotors,
        statistics.motorTypes?.totalPumpMotors,
        statistics.motorTypes?.totalGeneratorMotors,
        statistics.topBrands,
        statistics.trends?.monthlyTrends,
        statistics.trends?.monthlyOnePhaseTrends,
        statistics.trends?.monthlyThreePhaseTrends,
        statistics.trends?.monthlyElMotorTrends,
        statistics.trends?.monthlyPumpTrends,
        statistics.trends?.monthlyGeneratorTrends,
      ];

      motorFields.forEach((field) => {
        if (field !== undefined) {
          total++;
          const result = safeStatValue(field);
          if (result.isError) errors++;
        }
      });
    }

    // Για repair statistics
    else if (statistics.totalRepairs !== undefined || statistics.yearlyRevenue !== undefined) {
      const repairFields = [
        statistics.totalRepairs,
        statistics.yearlyRevenue,
        statistics.trends?.monthlyTrends,
      ];

      repairFields.forEach((field) => {
        if (field !== undefined) {
          total++;
          const result = safeStatValue(field);
          if (result.isError) errors++;
        }
      });
    }

    setErrorCount(errors);
    setTotalCount(total);

    // Εμφάνιση snackbar μόνο αν υπάρχουν errors
    if (errors > 0) {
      setShowErrorToast(true);
    }
  }, [statistics, safeStatValue]);

  const handleCloseErrorToast = (event, reason) => {
    if (reason === 'clickaway') return;
    setShowErrorToast(false);
  };

  const getErrorMessage = () => {
    if (errorCount === 0) return '';

    if (errorCount === 1) {
      return 'Ένα στατιστικό δεν φορτώθηκε';
    } else {
      return `Κάποια στατιστικά δεν φορτώθηκαν (${errorCount} από ${totalCount})`;
    }
  };

  return {
    showErrorToast,
    errorCount,
    totalCount,
    errorMessage: getErrorMessage(),
    handleCloseErrorToast,
  };
}
