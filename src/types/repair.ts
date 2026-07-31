import type { RepairJSON } from '../components/Models/Repair';

// Backend enriches each fault link with the fault's name (join) όταν επιστρέφει το
// ιστορικό επισκευών ενός κινητήρα - διαφορετικό από το πλάτο RepairFaultLinksJSON model.
export interface RepairFaultLinkWithName {
  repairID?: number | string | null;
  commonFaultID?: number | string | null;
  name?: string;
}

export interface RepairHistoryItem extends Omit<RepairJSON, 'repairFaultLinks'> {
  repairFaultLinks?: RepairFaultLinkWithName[];
}
