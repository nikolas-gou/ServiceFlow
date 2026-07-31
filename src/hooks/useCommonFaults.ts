import { useQuery } from '@tanstack/react-query';
import { CommonFaultRepository } from '../components/Repositories/CommonFaultRepository';

const COMMON_FAULTS_KEY = 'commonFaults';

export function useCommonFaults() {
  return useQuery({
    queryKey: [COMMON_FAULTS_KEY],
    queryFn: () => CommonFaultRepository.getAll(),
  });
}
