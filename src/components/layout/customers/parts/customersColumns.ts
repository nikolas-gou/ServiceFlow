import type { TableColumnDef, ActionsColumnDef } from '../../../../types/table';

// Κεντρικός ορισμός των στηλών του πίνακα πελατών.
// Χρησιμοποιείται τόσο από την επικεφαλίδα (header) όσο και από κάθε γραμμή (CustomerRow),
// ώστε ορατότητα/πλάτος/σειρά να μένουν συγχρονισμένα.
export const CUSTOMERS_COLUMNS: TableColumnDef[] = [
  { id: 'id', label: 'ID', defaultWidth: 70, minWidth: 50, sortKey: 'id' },
  { id: 'name', label: 'Όνομα', defaultWidth: 180, minWidth: 100, sortKey: 'name' },
  { id: 'type', label: 'Τύπος', defaultWidth: 130, minWidth: 90 },
  { id: 'email', label: 'Email', defaultWidth: 200, minWidth: 120 },
  { id: 'phone', label: 'Τηλέφωνο', defaultWidth: 140, minWidth: 100 },
  {
    id: 'createdAt',
    label: 'Ημ/νία Δημιουργίας',
    defaultWidth: 150,
    minWidth: 100,
    sortKey: 'createdAt',
  },
];

// Η στήλη ενεργειών είναι πάντα ορατή, με σταθερό πλάτος (δεν κρύβεται/resize-άρεται).
export const ACTIONS_COLUMN: ActionsColumnDef = { id: 'actions', label: 'Ενέργειες', width: 90 };
