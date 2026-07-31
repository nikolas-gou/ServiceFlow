import { createContext, useContext, type ReactNode } from 'react';
import { useSuggestedFormValues as useSuggestedFormValuesQuery } from '../hooks/useSuggestedFormValues';
import type { CustomerSuggestion, MotorSuggestions, SuggestedMeta, SuggestionStructure } from '../types/suggested';

interface SuggestedFormValues {
  motor: MotorSuggestions;
  customer: SuggestionStructure<CustomerSuggestion>;
  meta: SuggestedMeta;
}

interface SuggestedFormValuesContextValue {
  suggested: SuggestedFormValues;
  refresh: () => Promise<unknown>;
  loading: boolean;
}

const emptySuggestion = (): SuggestionStructure<string> => ({ data: [], error: null, details: null });

const defaultSuggested: SuggestedFormValues = {
  motor: {
    crossSection: emptySuggestion(),
    manufacturer: emptySuggestion(),
    step: emptySuggestion(),
    description: emptySuggestion(),
  },
  customer: { data: [], error: null, details: null },
  meta: { hasErrors: false, errors: [] },
};

const SuggestedFormValuesContext = createContext<SuggestedFormValuesContextValue>({
  suggested: defaultSuggested,
  refresh: async () => {},
  loading: false,
});

export const SuggestedFormValuesProvider = ({ children }: { children: ReactNode }) => {
  const { data: rawResult, isLoading, refetch } = useSuggestedFormValuesQuery();

  const suggested: SuggestedFormValues = rawResult
    ? {
        motor: rawResult.data?.motor || defaultSuggested.motor,
        customer: rawResult.data?.customer || defaultSuggested.customer,
        meta: rawResult.meta || defaultSuggested.meta,
      }
    : defaultSuggested;

  return (
    <SuggestedFormValuesContext.Provider value={{ suggested, refresh: refetch, loading: isLoading }}>
      {children}
    </SuggestedFormValuesContext.Provider>
  );
};

export const useSuggestedFormValues = () => useContext(SuggestedFormValuesContext);
