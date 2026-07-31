import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { useRepairsQuery, useUpdateRepair, useSoftDeleteRepair } from '../hooks/useRepairs';
import type { RepairJSON, Repair } from '../components/Models/Repair';
import type { PaginationMeta } from '../types/api';

const FILTERS_STORAGE_KEY = 'repairs_filters';

export interface RepairsFilters {
  search: string;
  manufacturer: string;
  status: string;
  typeOfMotor: string;
  voltType: string;
  kwMin: string;
  kwMax: string;
  rpm: string;
  dateFrom: string;
  dateTo: string;
}

interface RepairsSorting {
  sortBy: string;
  sortOrder: string;
}

interface RepairsPaginationState {
  currentPage: number;
  perPage: number | string;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

interface RepairMutationPayload {
  repair: Repair | Partial<RepairJSON>;
}

interface RepairsContextValue {
  repairs: RepairJSON[];
  setRepairs: () => void;
  addRepair: () => void;
  updateRepair: (id: number | string, data: RepairMutationPayload) => Promise<void>;
  deleteRepair: (repairId: number | string) => Promise<void>;
  getRepairs: () => Promise<void>;
  loading: boolean;
  pagination: RepairsPaginationState | PaginationMeta;
  setPage: (page: number) => void;
  setPerPage: (perPage: number | string) => void;
  filters: RepairsFilters;
  updateFilters: (newFilters: RepairsFilters) => void;
  sorting: RepairsSorting;
  updateSorting: (newSorting: RepairsSorting) => void;
}

const RepairsContext = createContext<RepairsContextValue | undefined>(undefined);

const DEFAULT_FILTERS: RepairsFilters = {
  search: '',
  manufacturer: '',
  status: '',
  typeOfMotor: '',
  voltType: '',
  kwMin: '',
  kwMax: '',
  rpm: '',
  dateFrom: '',
  dateTo: '',
};

const loadPersistedFilters = (): RepairsFilters => {
  try {
    const saved: unknown = JSON.parse(localStorage.getItem(FILTERS_STORAGE_KEY) || 'null');
    if (saved && typeof saved === 'object') {
      return { ...DEFAULT_FILTERS, ...(saved as Partial<RepairsFilters>) };
    }
  } catch (e) {
    // αγνόησε corrupted localStorage και πέσε στα defaults
  }
  return DEFAULT_FILTERS;
};

export const RepairsProvider = ({ children }: { children: ReactNode }) => {
  const [pagination, setPagination] = useState<RepairsPaginationState>({
    currentPage: 1,
    perPage: localStorage.getItem('perPage') || 10,
    totalItems: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });

  const [filters, setFilters] = useState<RepairsFilters>(loadPersistedFilters);

  // Προεπιλογή "id DESC" ώστε να φαίνεται πάντα πρώτη η τελευταία καταχωρημένη επισκευή
  // (μονότονα αυξανόμενο, σε αντίθεση με το is_arrived που μπορεί να έχει ίδιες/παλαιότερες ημερομηνίες).
  const [sorting, setSorting] = useState<RepairsSorting>({
    sortBy: 'id',
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
  const updateRepairMutation = useUpdateRepair();
  const softDeleteMutation = useSoftDeleteRepair();

  const repairs = result?.data || [];
  const paginationMeta = result?.pagination || pagination;

  const setPage = (page: number) => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
  };

  const setPerPage = (perPage: number | string) => {
    setPagination((prev) => ({ ...prev, perPage, currentPage: 1 }));
    localStorage.setItem('perPage', String(perPage));
  };

  const updateFilters = (newFilters: RepairsFilters) => {
    setFilters(newFilters);
    localStorage.setItem(FILTERS_STORAGE_KEY, JSON.stringify(newFilters));
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  const updateSorting = (newSorting: RepairsSorting) => {
    setSorting(newSorting);
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  const addRepair = useCallback(() => {}, []);

  const updateRepair = useCallback(
    async (id: number | string, data: RepairMutationPayload) => {
      await updateRepairMutation.mutateAsync({ id, data });
    },
    [updateRepairMutation],
  );

  const deleteRepair = useCallback(
    async (repairId: number | string) => {
      await softDeleteMutation.mutateAsync(repairId);
    },
    [softDeleteMutation],
  );

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

export const useRepairs = (): RepairsContextValue => {
  const context = useContext(RepairsContext);
  if (!context) {
    throw new Error('useRepairs must be used within a RepairsProvider');
  }
  return context;
};
