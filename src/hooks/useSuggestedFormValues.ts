import { useQuery } from '@tanstack/react-query';
import { SuggestedRepository } from '../components/Repositories/SuggestedRepository';

const SUGGESTED_KEY = 'suggested';

export function useSuggestedFormValues() {
  return useQuery({
    queryKey: [SUGGESTED_KEY, 'form-values'],
    queryFn: () => SuggestedRepository.getSuggested(),
    staleTime: 5 * 60 * 1000,
  });
}
