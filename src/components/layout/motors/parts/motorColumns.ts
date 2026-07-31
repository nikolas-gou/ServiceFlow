import type { TableColumnDef, ActionsColumnDef } from '../../../../types/table';

export const MOTORS_COLUMNS: TableColumnDef[] = [
  { id: 'id', label: 'ID', defaultWidth: 70, minWidth: 50, sortKey: 'id', defaultColumn: true },
  {
    id: 'manufacturer',
    label: 'Κατασκευαστής',
    defaultWidth: 150,
    minWidth: 100,
    sortKey: 'manufacturer',
    defaultColumn: true,
  },
  { id: 'description', label: 'Περιγραφή', defaultWidth: 130, minWidth: 80, defaultColumn: true },
  { id: 'kw', label: 'kW', defaultWidth: 80, minWidth: 60, sortKey: 'kw', defaultColumn: true },
  { id: 'hp', label: 'HP', defaultWidth: 70, minWidth: 50, defaultColumn: false },
  { id: 'rpm', label: 'RPM', defaultWidth: 80, minWidth: 60, defaultColumn: true },
  { id: 'volt', label: 'Τάση', defaultWidth: 100, minWidth: 80, defaultColumn: true },
  { id: 'typeOfMotor', label: 'Τύπος', defaultWidth: 100, minWidth: 80, defaultColumn: true },
  {
    id: 'repairsCount',
    label: 'Επισκευές',
    defaultWidth: 90,
    minWidth: 60,
    sortKey: 'repairsCount',
    defaultColumn: true,
  },
  {
    id: 'createdAt',
    label: 'Ημ/νία Δημιουργίας',
    defaultWidth: 150,
    minWidth: 100,
    sortKey: 'createdAt',
    defaultColumn: true,
  },
];

export const ACTIONS_COLUMN: ActionsColumnDef = { id: 'actions', label: 'Ενέργειες', width: 90 };
