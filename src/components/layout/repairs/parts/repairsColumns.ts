import type { TableColumnDef, ActionsColumnDef } from '../../../../types/table';

// Κεντρικός ορισμός των στηλών του πίνακα επισκευών.
// Χρησιμοποιείται τόσο από την επικεφαλίδα (header) όσο και από κάθε γραμμή (RepairRow),
// ώστε ορατότητα/πλάτος/σειρά να μένουν συγχρονισμένα.
export const REPAIRS_COLUMNS: TableColumnDef[] = [
  { id: 'id', label: 'ID', defaultWidth: 70, minWidth: 50, sortKey: 'id', defaultColumn: true },
  { id: 'customer', label: 'Πελάτης', defaultWidth: 140, minWidth: 90, defaultColumn: true },
  { id: 'type', label: 'Τύπος', defaultWidth: 90, minWidth: 60, defaultColumn: true },
  { id: 'serialNumber', label: 'S/N', defaultWidth: 110, minWidth: 70, defaultColumn: true },
  { id: 'manufacturer', label: 'Μάρκα', defaultWidth: 110, minWidth: 70, defaultColumn: true },
  {
    id: 'description',
    label: 'Περιγραφή Κινητήρα',
    defaultWidth: 190,
    minWidth: 100,
    defaultColumn: true,
  },
  { id: 'kw', label: 'kW', defaultWidth: 65, minWidth: 50, defaultColumn: true },
  { id: 'hp', label: 'hp', defaultWidth: 65, minWidth: 50, defaultColumn: false },
  { id: 'rpm', label: 'Στροφές', defaultWidth: 85, minWidth: 60, defaultColumn: true },
  { id: 'volt', label: 'Τάση', defaultWidth: 85, minWidth: 60, defaultColumn: true },
  { id: 'amps', label: 'Αμπέρ', defaultWidth: 75, minWidth: 50, defaultColumn: true },
  { id: 'phase', label: 'Φάσεις', defaultWidth: 160, minWidth: 90, defaultColumn: true },
  { id: 'status', label: 'Κατάσταση', defaultWidth: 140, minWidth: 110, defaultColumn: true },
  {
    id: 'arrivalDate',
    label: 'Ημ. Παραλαβής',
    defaultWidth: 110,
    minWidth: 80,
    sortKey: 'is_arrived',
    defaultColumn: true,
  },
];

// Η στήλη ενεργειών είναι πάντα ορατή, με σταθερό πλάτος (δεν κρύβεται/resize-άρεται).
export const ACTIONS_COLUMN: ActionsColumnDef = { id: 'actions', label: 'Προβολή', width: 130 };
