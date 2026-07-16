import { createContext, useContext } from 'react';
import { useSuggestedFormValues as useSuggestedFormValuesQuery } from '../hooks/useSuggestedFormValues';

const defaultSuggested = {
  motor: {
    crossSection: { data: [], error: null, details: null },
    manufacturer: { data: [], error: null, details: null },
    step: { data: [], error: null, details: null },
    description: { data: [], error: null, details: null },
  },
  customer: { data: [], error: null, details: null },
  meta: { hasErrors: false, errors: [] },
};

const SuggestedFormValuesContext = createContext({
  suggested: defaultSuggested,
  refresh: async () => {},
  loading: false,
});

export const SuggestedFormValuesProvider = ({ children }) => {
  const { data: rawResult, isLoading, refetch } = useSuggestedFormValuesQuery();

  const suggested = rawResult
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
