import { commonStyles } from '../../../styled/CommonStyles';

/**
 * Κοινή τυπογραφία για τα χρωματιστά boxes της περιέλιξης (detail view & motor page),
 * ώστε τριφασικά και μονοφασικά να δείχνουν ίδια. Οι τιμές είναι σκόπιμα κοντά στο
 * μέγεθος του κειμένου (1rem) - μόνο οι αριθμοί μέσα στις στήλες είναι λίγο μεγαλύτεροι.
 */

// Ίδιο accent με τις υπόλοιπες επισημάνσεις του detail view (π.χ. "12 σύρμ.")
export const HIGHLIGHT = '#FAC775';
// Σκούρο μπλε κείμενο πάνω στο αμπέρ πλακίδιο (theme.palette.primary.dark)
export const HIGHLIGHT_TEXT = '#1e3c72';
export const HALF_COLUMN_BG = 'rgba(255, 255, 255, 0.16)';
export const MUTED_TEXT = 'rgba(255, 255, 255, 0.72)';
export const DIVIDER_COLOR = 'rgba(255, 255, 255, 0.18)';
export const DASH_COLOR = 'rgba(255, 255, 255, 0.42)';

export const boxTitleSx = {
  ...commonStyles.whiteText,
  fontSize: '0.95rem',
  fontWeight: 600,
};

export const boxLabelSx = {
  ...commonStyles.whiteTextSemi,
  fontSize: '0.85rem',
  lineHeight: 1.25,
  whiteSpace: 'nowrap',
};

export const boxValueSx = {
  ...commonStyles.whiteText,
  fontWeight: 700,
  fontSize: '1rem',
  lineHeight: 1.25,
};

/**
 * Οι αριθμοί μέσα στις στήλες (Βήμα/Σπείρες). Ίδιο μέγεθος με τις υπόλοιπες τιμές
 * (Διατομή/Σύνδεση), ώστε τα boxes -απλά & συνδυασμένα- να είναι οπτικά συνεπή.
 */
export const boxColumnValueSx = { ...boxValueSx };

/** ΜΙΣΟ / ΟΛΟΚΛΗΡΟ: κεφαλίδες στηλών και υπόμνημα. */
export const typeLabelSx = {
  fontSize: '0.62rem',
  fontWeight: 700,
  letterSpacing: '0.03em',
  lineHeight: 1.4,
};
