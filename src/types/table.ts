export interface TableColumnDef {
  id: string;
  label: string;
  defaultWidth: number;
  minWidth: number;
  sortKey?: string;
}

export interface ActionsColumnDef {
  id: string;
  label: string;
  width: number;
}
