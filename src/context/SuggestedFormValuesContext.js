import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { SuggestedRepository } from '../components/Repositories/SuggestedRepository';

const initialState = {
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
  suggested: initialState,
  loading: false,
  refresh: async () => {},
});

export const SuggestedFormValuesProvider = ({ children }) => {
  const [suggested, setSuggested] = useState(initialState);
  const [loading, setLoading] = useState(true);

  const getSuggested = useCallback(async () => {
    try {
      setLoading(true);

      const { data, meta } = await SuggestedRepository.getSuggested();
      setSuggested({
        motor: data.motor,
        customer: data.customer,
        meta,
      });
    } catch (err) {
      console.error('Error fetching suggested form values:', err);
      setSuggested(initialState);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch suggested when dependencies change
  useEffect(() => {
    getSuggested();
  }, [getSuggested]);

  return (
    <SuggestedFormValuesContext.Provider
      value={{
        suggested,
        refresh: getSuggested,
        loading,
      }}
    >
      {children}
    </SuggestedFormValuesContext.Provider>
  );
};

export const useSuggestedFormValues = () => useContext(SuggestedFormValuesContext);
