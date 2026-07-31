import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import {
  useConnectionsQuery,
  useCreateConnection,
  useUpdateConnection,
  useDeleteConnection,
} from '../hooks/useConnections';
import type { ConnectionJSON } from '../components/Models/Connection';
import type { PaginationMeta } from '../types/api';

export interface ConnectionsFilters {
  search: string;
  connectionType: string;
  poles: string;
  rpm: string;
  typeOfVolt: string;
}

interface ConnectionsSorting {
  sortBy: string;
  sortOrder: string;
}

interface ConnectionsPaginationState {
  currentPage: number;
  perPage: number | string;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

interface ConnectionsContextValue {
  connections: ConnectionJSON[];
  setConnections: () => void;
  addConnection: (connection: Partial<ConnectionJSON>) => Promise<void>;
  updateConnection: (connectionId: number | string, data: Partial<ConnectionJSON>) => Promise<void>;
  deleteConnection: (connectionId: number | string) => Promise<void>;
  getConnections: () => Promise<void>;
  loading: boolean;
  pagination: ConnectionsPaginationState | PaginationMeta;
  setPage: (page: number) => void;
  setPerPage: (perPage: number | string) => void;
  filters: ConnectionsFilters;
  updateFilters: (newFilters: ConnectionsFilters) => void;
  sorting: ConnectionsSorting;
  updateSorting: (newSorting: ConnectionsSorting) => void;
}

const ConnectionsContext = createContext<ConnectionsContextValue | undefined>(undefined);

export const ConnectionsProvider = ({ children }: { children: ReactNode }) => {
  const [pagination, setPagination] = useState<ConnectionsPaginationState>({
    currentPage: 1,
    perPage: localStorage.getItem('connectionsPerPage') || 10,
    totalItems: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });

  const [filters, setFilters] = useState<ConnectionsFilters>({
    search: '',
    connectionType: '',
    poles: '',
    rpm: '',
    typeOfVolt: '',
  });

  const [sorting, setSorting] = useState<ConnectionsSorting>({
    sortBy: 'created_at',
    sortOrder: 'DESC',
  });

  const params = {
    page: pagination.currentPage,
    perPage: pagination.perPage,
    ...filters,
    sortBy: sorting.sortBy,
    sortOrder: sorting.sortOrder,
  };

  const { data: result, isLoading } = useConnectionsQuery(params);
  const createConnectionMutation = useCreateConnection();
  const updateConnectionMutation = useUpdateConnection();
  const deleteConnectionMutation = useDeleteConnection();

  const connections = result?.data || [];
  const paginationMeta = result?.pagination || pagination;

  const setPage = (page: number) => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
  };

  const setPerPage = (perPage: number | string) => {
    setPagination((prev) => ({ ...prev, perPage, currentPage: 1 }));
    localStorage.setItem('connectionsPerPage', String(perPage));
  };

  const updateFilters = (newFilters: ConnectionsFilters) => {
    setFilters(newFilters);
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  const updateSorting = (newSorting: ConnectionsSorting) => {
    setSorting(newSorting);
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  const addConnection = useCallback(
    async (connection: Partial<ConnectionJSON>) => {
      await createConnectionMutation.mutateAsync(connection);
    },
    [createConnectionMutation],
  );

  const updateConnection = useCallback(
    async (connectionId: number | string, data: Partial<ConnectionJSON>) => {
      await updateConnectionMutation.mutateAsync({ id: connectionId, data });
    },
    [updateConnectionMutation],
  );

  const deleteConnection = useCallback(
    async (connectionId: number | string) => {
      await deleteConnectionMutation.mutateAsync(connectionId);
    },
    [deleteConnectionMutation],
  );

  const getConnections = useCallback(async () => {
    // React Query handles refetching automatically
  }, []);

  return (
    <ConnectionsContext.Provider
      value={{
        connections,
        setConnections: () => {},
        addConnection,
        updateConnection,
        deleteConnection,
        getConnections,
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
    </ConnectionsContext.Provider>
  );
};

export const useConnections = (): ConnectionsContextValue => {
  const context = useContext(ConnectionsContext);
  if (!context) {
    throw new Error('useConnections must be used within a ConnectionsProvider');
  }
  return context;
};
