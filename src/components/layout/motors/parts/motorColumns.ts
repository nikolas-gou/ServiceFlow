import type { TableColumnDef, ActionsColumnDef } from '../../../../types/table';

export const MOTORS_COLUMNS: TableColumnDef[] = [
  { id: 'id', label: 'ID', defaultWidth: 70, minWidth: 50, sortKey: 'id' },
  { id: 'manufacturer', label: 'Κατασκευαστής', defaultWidth: 150, minWidth: 100, sortKey: 'manufacturer' },
  { id: 'description', label: 'Περιγραφή', defaultWidth: 130, minWidth: 80 },
  { id: 'kw', label: 'kW', defaultWidth: 80, minWidth: 60, sortKey: 'kw' },
  { id: 'hp', label: 'HP', defaultWidth: 70, minWidth: 50 },
  { id: 'rpm', label: 'RPM', defaultWidth: 80, minWidth: 60 },
  { id: 'volt', label: 'Τάση', defaultWidth: 100, minWidth: 80 },
  { id: 'typeOfMotor', label: 'Τύπος', defaultWidth: 100, minWidth: 80 },
  { id: 'repairsCount', label: 'Επισκευές', defaultWidth: 90, minWidth: 60, sortKey: 'repairsCount' },
  {
    id: 'createdAt',
    label: 'Ημ/νία Δημιουργίας',
    defaultWidth: 150,
    minWidth: 100,
    sortKey: 'createdAt',
  },
];

export const ACTIONS_COLUMN: ActionsColumnDef = { id: 'actions', label: 'Ενέργειες', width: 90 };
