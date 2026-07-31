import type { MonthlyChartSource } from '../utils/statistics';

// Οι "κύριες" τιμές ανά ενότητα (totalMotors, totalCustomers, totalRepairs, yearlyRevenue) έρχονται
// από το backend είτε ως αριθμός είτε ως error-shaped object (βλ. utils/errorHandling.ErrorField) -
// γι' αυτό είναι unknown εδώ: οι καταναλωτές τους περνάνε πάντα από safeStatValue/Number() πριν τα χρησιμοποιήσουν.
export interface TrendsData {
  monthlyTrends?: number[];
  monthlyIndividualTrends?: number[];
  monthlyFactoryTrends?: number[];
  monthlyOnePhaseTrends?: number[];
  monthlyThreePhaseTrends?: number[];
  monthlyElMotorTrends?: number[];
  monthlyPumpTrends?: number[];
  monthlyGeneratorTrends?: number[];
}

export interface MotorTypesBreakdown {
  totalOnePhaseMotors?: number;
  totalThreePhaseMotors?: number;
  totalElMotorMotors?: number;
  totalPumpMotors?: number;
  totalGeneratorMotors?: number;
}

export interface StepTypesBreakdown {
  totalStandardStep?: number;
  totalHalfStep?: number;
  totalCombinedStep?: number;
}

export interface TopBrandEntry {
  manufacturer: string;
  count: number;
}

export interface MotorStatsSection {
  totalMotors?: unknown;
  motorTypes?: MotorTypesBreakdown;
  stepTypes?: StepTypesBreakdown;
  topBrands?: TopBrandEntry[];
  trends?: TrendsData;
}

export interface CustomerTypesBreakdown {
  individual?: unknown;
  factory?: unknown;
}

export interface TopCustomerEntry {
  name: string;
  totalRevenue: number;
}

export interface CustomerStatsSection {
  totalCustomers?: unknown;
  customerTypes?: CustomerTypesBreakdown;
  trends?: TrendsData;
  topCustomersByRevenue?: TopCustomerEntry[];
}

export interface RepairStatsSection {
  totalRepairs?: unknown;
  trends?: TrendsData;
}

export interface RevenueStatsSection {
  yearlyRevenue?: unknown;
  trends?: TrendsData;
}

// Σχήμα του GET /api/statistics/dashboard (nested ανά κατηγορία).
export interface DashboardStatsData {
  chartData?: MonthlyChartSource;
  customer?: CustomerStatsSection;
  motor?: MotorStatsSection;
  repair?: RepairStatsSection;
  revenue?: RevenueStatsSection;
}

// Σχήμα του GET /api/statistics/customers (επίπεδο, χωρίς nesting κάτω από `customer`).
export interface CustomerStatisticsData extends CustomerStatsSection {
  chartData?: MonthlyChartSource;
}

// Σχήμα του GET /api/statistics/connectionism.
export interface ConnectionismStatisticsData {
  totalSimple?: number;
  totalOneTimeParallel?: number;
  totalTwoTimesParallel?: number;
  totalThreeTimesParallel?: number;
  monthlySimpleTrends?: number[];
  monthlyOneTimeParallelTrends?: number[];
  monthlyTwoTimesParallelTrends?: number[];
  monthlyThreeTimesParallelTrends?: number[];
}
