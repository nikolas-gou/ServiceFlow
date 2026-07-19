import { categoryAccents } from '../../../styles/colors';

// Κοινές αποχρώσεις για τις "κύριες" κάρτες κατηγορίας (Επισκευές/Κινητήρες/Πελάτες/Έσοδα),
// ώστε να μην ξαναγράφονται τα ίδια hex σε κάθε *CardsData.js αρχείο.
// Οι πελάτες μοιράζονται το teal με τις δικές τους υπο-κάρτες (Ιδιώτες/Εργοστάσια),
// και οι κινητήρες μοιράζονται το navy gradient της εφαρμογής (sidebar/header/buttons).
// Οι ίδιες οι αποχρώσεις ζουν στο src/styles/colors.js (categoryAccents) — εδώ μόνο
// συνθέτουμε τα CSS gradient strings.
export const categoryGradients = {
  repairs: `linear-gradient(135deg, ${categoryAccents.repairs.main} 0%, ${categoryAccents.repairs.dark} 100%)`,
  motors: `linear-gradient(135deg, ${categoryAccents.motors.dark} 0%, ${categoryAccents.motors.main} 100%)`,
  customers: `linear-gradient(135deg, ${categoryAccents.customers.dark} 0%, ${categoryAccents.customers.main} 100%)`,
  revenue: `linear-gradient(135deg, ${categoryAccents.revenue.main} 0%, ${categoryAccents.revenue.dark} 100%)`,
};
