import type { MotorJSON } from '../components/Models/Motor';

// Σχήμα όπως επιστρέφεται από GET /api/motors: το motor JSON εμπλουτισμένο με repairsCount
// (join από το backend) - όχι το ίδιο με το MotorJSON που παράγει το Motor model.
export interface MotorListItem extends MotorJSON {
  repairsCount?: number;
}

// Ονόματα των αριθμητικών/string πεδίων περιέλιξης του Motor (χωρίς motorCrossSectionLinks)
// - χρησιμοποιείται για δυναμική πρόσβαση `motor[fields.step]` στα winding builders/configs.
export type ScalarMotorField =
  | 'step'
  | 'halfStep'
  | 'helperStep'
  | 'helperHalfStep'
  | 'spiral'
  | 'halfSpiral'
  | 'helperSpiral'
  | 'helperHalfSpiral'
  | 'coilsCount'
  | 'halfCoilsCount'
  | 'helperCoilsCount'
  | 'helperHalfCoilsCount';
