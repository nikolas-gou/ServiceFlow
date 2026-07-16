import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ConnectionRepository } from '../components/Repositories/ConnectionRepository';

const ConnectionsContext = createContext();

export const ConnectionsProvider = ({ children }) => {
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const getConnections = useCallback(async () => {
    try {
      setLoading(true);

      const params = {
        page: pagination.currentPage,
        perPage: pagination.perPage,
        ...filters,
        sortBy: sorting.sortBy,
        sortOrder: sorting.sortOrder,
      };

      Object.keys(params).forEach((key) => {
        if (params[key] === '' || params[key] === null || params[key] === undefined) {
          delete params[key];
        }
      });

      const result = await ConnectionRepository.getPaginated(params);

      setConnections(result.data);
      setPagination(result.pagination);
    } catch (err) {
      console.error('Error fetching connections:', err);
      setConnections([]);
    } finally {
      setLoading(false);
    }
  }, [pagination.currentPage, pagination.perPage, filters, sorting]);

  useEffect(() => {
    getConnections();
  }, [getConnections]);

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

  const addConnection = async (connection) => {
    const result = await ConnectionRepository.createConnection(connection);
    getConnections();
    return result;
  };

  const updateConnection = async (connectionId, data) => {
    const result = await ConnectionRepository.updateConnection(connectionId, data);
    getConnections();
    return result;
  };

  const deleteConnection = async (connectionId) => {
    const result = await ConnectionRepository.deleteConnection(connectionId);
    getConnections();
    return result;
  };

  return (
    <ConnectionsContext.Provider
      value={{
        connections,
        setConnections,
        addConnection,
        updateConnection,
        deleteConnection,
        getConnections,
        loading,
        pagination,
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
