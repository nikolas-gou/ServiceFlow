import type { TableColumnDef, ActionsColumnDef } from '../../../../types/table';

// Κεντρικός ορισμός των στηλών του πίνακα πελατών.
// Χρησιμοποιείται τόσο από την επικεφαλίδα (header) όσο και από κάθε γραμμή (CustomerRow),
// ώστε ορατότητα/πλάτος/σειρά να μένουν συγχρονισμένα.
export const CUSTOMERS_COLUMNS: TableColumnDef[] = [
  { id: 'id', label: 'ID', defaultWidth: 70, minWidth: 50, sortKey: 'id', defaultColumn: true },
  {
    id: 'name',
    label: 'Όνομα',
    defaultWidth: 180,
    minWidth: 100,
    sortKey: 'name',
    defaultColumn: true,
  },
  { id: 'type', label: 'Τύπος', defaultWidth: 130, minWidth: 90, defaultColumn: true },
  { id: 'email', label: 'Email', defaultWidth: 200, minWidth: 120, defaultColumn: true },
  { id: 'phone', label: 'Τηλέφωνο', defaultWidth: 140, minWidth: 100, defaultColumn: true },
  {
    id: 'createdAt',
    label: 'Ημ/νία Δημιουργίας',
    defaultWidth: 150,
    minWidth: 100,
    sortKey: 'createdAt',
    defaultColumn: true,
  },
];

// Η στήλη ενεργειών είναι πάντα ορατή, με σταθερό πλάτος (δεν κρύβεται/resize-άρεται).
export const ACTIONS_COLUMN: ActionsColumnDef = { id: 'actions', label: 'Ενέργειες', width: 90 };
