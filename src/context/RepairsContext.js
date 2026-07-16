import { createContext, useContext, useState, useCallback } from 'react';
import { useRepairsQuery, useCreateRepair, useUpdateRepair, useSoftDeleteRepair } from '../hooks/useRepairs';

const RepairsContext = createContext();

export const RepairsProvider = ({ children }) => {
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: localStorage.getItem('perPage') || 10,
    totalItems: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });

  const [filters, setFilters] = useState({
    search: '',
    manufacturer: '',
    status: '',
    voltType: '',
    kwMin: '',
    kwMax: '',
    rpm: '',
  });

  const [sorting, setSorting] = useState({
    sortBy: 'is_arrived',
    sortOrder: 'DESC',
  });

  const params = {
    page: pagination.currentPage,
    perPage: pagination.perPage,
    ...filters,
    sortBy: sorting.sortBy,
    sortOrder: sorting.sortOrder,
  };

  const { data: result, isLoading } = useRepairsQuery(params);
  const createRepairMutation = useCreateRepair();
  const updateRepairMutation = useUpdateRepair();
  const softDeleteMutation = useSoftDeleteRepair();

  const repairs = result?.data || [];
  const paginationMeta = result?.pagination || pagination;

  const setPage = (page) => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
  };

  const setPerPage = (perPage) => {
    setPagination((prev) => ({ ...prev, perPage, currentPage: 1 }));
    localStorage.setItem('perPage', perPage);
  };

  const updateFilters = (newFilters) => {
    setFilters(newFilters);
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  const updateSorting = (newSorting) => {
    setSorting(newSorting);
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  const addRepair = useCallback(() => {}, []);

  const updateRepair = useCallback(async (id, data) => {
    await updateRepairMutation.mutateAsync({ id, data });
  }, [updateRepairMutation]);

  const deleteRepair = useCallback(async (repairId) => {
    await softDeleteMutation.mutateAsync(repairId);
  }, [softDeleteMutation]);

  const getRepairs = useCallback(async () => {
    // React Query handles refetching automatically
  }, []);

  return (
    <RepairsContext.Provider
      value={{
        repairs,
        setRepairs: () => {},
        addRepair,
        updateRepair,
        deleteRepair,
        getRepairs,
        loading: isLoading,
        pagination: paginationMeta,
        setPage,
        setPerPage,
        filters,
        updateFilters,
        sorting,
        updateSorting,
      }}
    >
      {children}
    </RepairsContext.Provider>
  );
};

export const useRepairs = () => useContext(RepairsContext);
