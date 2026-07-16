import { createContext, useContext, useState, useCallback } from 'react';
import { useConnectionsQuery, useCreateConnection, useUpdateConnection, useDeleteConnection } from '../hooks/useConnections';

const ConnectionsContext = createContext();

export const ConnectionsProvider = ({ children }) => {
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: localStorage.getItem('connectionsPerPage') || 10,
    totalItems: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });

  const [filters, setFilters] = useState({
    search: '',
    connectionType: '',
    poles: '',
    rpm: '',
    typeOfVolt: '',
  });

  const [sorting, setSorting] = useState({
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

  const setPage = (page) => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
  };

  const setPerPage = (perPage) => {
    setPagination((prev) => ({ ...prev, perPage, currentPage: 1 }));
    localStorage.setItem('connectionsPerPage', perPage);
  };

  const updateFilters = (newFilters) => {
    setFilters(newFilters);
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  const updateSorting = (newSorting) => {
    setSorting(newSorting);
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  const addConnection = useCallback(async (connection) => {
    await createConnectionMutation.mutateAsync(connection);
  }, [createConnectionMutation]);

  const updateConnection = useCallback(async (connectionId, data) => {
    await updateConnectionMutation.mutateAsync({ id: connectionId, data });
  }, [updateConnectionMutation]);

  const deleteConnection = useCallback(async (connectionId) => {
    await deleteConnectionMutation.mutateAsync(connectionId);
  }, [deleteConnectionMutation]);

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

export const useConnections = () => useContext(ConnectionsContext);
