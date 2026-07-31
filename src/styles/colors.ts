// Μοναδική πηγή αλήθειας για raw hex τιμές σε όλη την εφαρμογή.
// Κανένα άλλο αρχείο δεν πρέπει να ξαναγράφει αυτά τα hex ως literal string —
// είτε τα εισάγει από εδώ, είτε (μέσα σε styled components) διαβάζει το ήδη
// wired theme.palette / theme.custom (βλ. src/styles/Themes.js).

export interface BrandPalette {
  main: string;
  dark: string;
  light: string;
}

export interface AccentColor {
  base: string;
  dark: string;
}

// Το βασικό "χρώμα ταυτότητας" της εφαρμογής (sidebar, header, modals, κουμπιά).
// Αντλείται από εδώ το theme.palette.primary στο Themes.js.
export const brand: BrandPalette = {
  main: '#2a5298',
  dark: '#1e3c72',
  light: '#5478b3',
};

// Ουδέτερα χρώματα κειμένου/εικονιδίων που χρησιμοποιούνται συχνά έξω από το theme.
export const neutral: { textSecondary: string } = {
  textSecondary: '#6B7280', // = theme.palette.text.secondary
};

// Αποχρώσεις ανά ενότητα, για τα gradient των στατιστικών καρτών (βλ. categoryGradients.js).
// Ξεχωριστές από το accentColors παρακάτω: εκείνο είναι για tints/badges πάνω σε
// φόντο, αυτό εδώ για gradient φόντα με λευκό κείμενο (χρειάζονται πιο βαθιά απόχρωση).
export const categoryAccents: Record<string, BrandPalette | { main: string; dark: string }> = {
  repairs: { main: '#4caf50', dark: '#388e3c' },
  motors: brand,
  customers: { main: '#00897b', dark: '#00695c' },
  revenue: { main: '#9c27b0', dark: '#7b1fa2' },
};

// Παλέτα accent χρωμάτων, βασισμένη στις ακριβείς αποχρώσεις
// που ήδη χρησιμοποιεί το sidebar (SidebarContent.js) ως πηγή αλήθειας.
// `base`  = η ίδια απόχρωση με το sidebar (badges, dots, tints).
// `dark`  = πιο σκούρα εκδοχή της ίδιας απόχρωσης, για ευανάγνωστο κείμενο πάνω σε ανοιχτό φόντο.
export const accentColors: Record<string, AccentColor> = {
  blue: { base: '#90caf9', dark: '#1565c0' }, // Αρχική
  cyan: { base: '#81d4fa', dark: '#0277bd' }, // Στατιστικά
  teal: { base: '#80cbc4', dark: '#00796b' }, // Πελάτες
  motorBlue: { base: '#7986cb', dark: '#3949ab' }, // Κινητήρες
  orange: { base: '#ffb74d', dark: '#e65100' }, // Επισκευές
  purple: { base: '#b39ddb', dark: '#5e35b1' }, // Συνδέσεις
  indigo: { base: '#9fa8da', dark: '#3949ab' }, // Σχετικά
  pink: { base: '#f48fb1', dark: '#c2185b' }, // Feedback
  grey: { base: '#e0e0e0', dark: '#616161' }, // Fallback / άγνωστη τιμή
};
