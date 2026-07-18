// Κεντρικός ορισμός των στηλών του πίνακα επισκευών.
// Χρησιμοποιείται τόσο από την επικεφαλίδα (header) όσο και από κάθε γραμμή (RepairRow),
// ώστε ορατότητα/πλάτος/σειρά να μένουν συγχρονισμένα.
export const REPAIRS_COLUMNS = [
  { id: 'id', label: 'ID', defaultWidth: 70, minWidth: 50, sortKey: 'id' },
  { id: 'serialNumber', label: 'S/N', defaultWidth: 110, minWidth: 70 },
  { id: 'customer', label: 'Πελάτης', defaultWidth: 140, minWidth: 90 },
  { id: 'description', label: 'Περιγραφή Κινητήρα', defaultWidth: 190, minWidth: 100 },
  { id: 'manufacturer', label: 'Μάρκα', defaultWidth: 110, minWidth: 70 },
  { id: 'kw', label: 'kW', defaultWidth: 65, minWidth: 50 },
  { id: 'hp', label: 'hp', defaultWidth: 65, minWidth: 50 },
  { id: 'rpm', label: 'Στροφές', defaultWidth: 85, minWidth: 60 },
  { id: 'volt', label: 'Τάση', defaultWidth: 85, minWidth: 60 },
  { id: 'amps', label: 'Αμπέρ', defaultWidth: 75, minWidth: 50 },
  { id: 'phase', label: 'Φάσεις', defaultWidth: 160, minWidth: 90 },
  { id: 'type', label: 'Τύπος', defaultWidth: 90, minWidth: 60 },
  { id: 'arrivalDate', label: 'Ημ. Παραλαβής', defaultWidth: 110, minWidth: 80, sortKey: 'is_arrived' },
];

// Η στήλη ενεργειών είναι πάντα ορατή, με σταθερό πλάτος (δεν κρύβεται/resize-άρεται).
export const ACTIONS_COLUMN = { id: 'actions', label: 'Προβολή', width: 130 };
