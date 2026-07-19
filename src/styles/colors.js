// Κεντρική παλέτα χρωμάτων (accent colors), βασισμένη στις ακριβείς αποχρώσεις
// που ήδη χρησιμοποιεί το sidebar (SidebarContent.js) ως πηγή αλήθειας.
// `base`  = η ίδια απόχρωση με το sidebar (badges, dots, tints).
// `dark`  = πιο σκούρα εκδοχή της ίδιας απόχρωσης, για ευανάγνωστο κείμενο πάνω σε ανοιχτό φόντο.
export const accentColors = {
  blue: { base: '#90caf9', dark: '#1565c0' }, // Αρχική
  cyan: { base: '#81d4fa', dark: '#0277bd' }, // Στατιστικά
  teal: { base: '#80cbc4', dark: '#00796b' }, // Πελάτες
  orange: { base: '#ffb74d', dark: '#e65100' }, // Επισκευές
  purple: { base: '#b39ddb', dark: '#5e35b1' }, // Συνδέσεις
  indigo: { base: '#9fa8da', dark: '#3949ab' }, // Σχετικά
  pink: { base: '#f48fb1', dark: '#c2185b' }, // Feedback
  grey: { base: '#e0e0e0', dark: '#616161' }, // Fallback / άγνωστη τιμή
};
