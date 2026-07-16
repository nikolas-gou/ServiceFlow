import { useQuery } from '@tanstack/react-query';
import { StatisticRepository } from '../components/Repositories/StatisticRepository';

const STATS_KEY = 'statistics';

export function useDashboardStats() {
  return useQuery({
    queryKey: [STATS_KEY, 'dashboard'],
    queryFn: () => StatisticRepository.getDashboard(),
  });
}

export function useCustomerStats() {
  return useQuery({
    queryKey: [STATS_KEY, 'customers'],
    queryFn: () => StatisticRepository.getCustomerStatistics(),
  });
}

export function useConnectionismStats() {
  return useQuery({
    queryKey: [STATS_KEY, 'connectionism'],
    queryFn: () => StatisticRepository.getConnectionismStatistics(),
  });
}
