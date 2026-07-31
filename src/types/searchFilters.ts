export interface RepairFilterValues {
  status: string;
  typeOfMotor: string;
  manufacturer: string;
  voltType: string;
  rpm: string;
  kwMin: string;
  kwMax: string;
  dateFrom: string;
  dateTo: string;
}

export interface CustomerFilterValues {
  type: string;
  email: string;
}
