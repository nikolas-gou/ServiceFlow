import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { RepairRepository } from '../components/Repositories/RepairRepository';

const RepairsContext = createContext();

export const RepairsProvider = ({ children }) => {
  const [repairs, setRepairs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination state
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: localStorage.getItem('perPage') || 10,
    totalItems: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });

  // Filters state
  const [filters, setFilters] = useState({
    search: '',
    manufacturer: '',
    status: '',
    voltType: '',
    kwMin: '',
    kwMax: '',
  });

  // Fetch repairs with pagination and filters
  const getRepairs = useCallback(async () => {
    try {
      setLoading(true);

      // Build params object
      const params = {
        page: pagination.currentPage,
        perPage: pagination.perPage,
        ...filters,
      };

      // Remove empty filters
      Object.keys(params).forEach((key) => {
        if (params[key] === '' || params[key] === null || params[key] === undefined) {
          delete params[key];
        }
      });

      const result = await RepairRepository.getPaginated(params);

      setRepairs(result.data);
      setPagination(result.pagination);
    } catch (err) {
      console.error('Error fetching repairs:', err);
      setRepairs([]);
    } finally {
      setLoading(false);
    }
  }, [pagination.currentPage, pagination.perPage, filters]);

  // Fetch repairs when dependencies change
  useEffect(() => {
    getRepairs();
  }, [getRepairs]);

  // Update page number
  const setPage = (page) => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
  };

  // Update items per page
  const setPerPage = (perPage) => {
    setPagination((prev) => ({ ...prev, perPage, currentPage: 1 })); // Reset to page 1
    localStorage.setItem('perPage', perPage);
  };

  // Update filters (resets to page 1)
  const updateFilters = (newFilters) => {
    setFilters(newFilters);
    setPagination((prev) => ({ ...prev, currentPage: 1 })); // Reset to page 1 when filters change
  };

  const addRepair = (repair) => {
    // After adding a repair, refresh the list
    getRepairs();
  };

  const updateRepair = (updatedRepair) => {
    // After updating a repair, refresh the list
    getRepairs();
  };

  const deleteRepair = (repairId) => {
    // After deleting a repair, refresh the list
    getRepairs();
  };

  return (
    <RepairsContext.Provider
      value={{
        repairs,
        setRepairs,
        addRepair,
        updateRepair,
        deleteRepair,
        getRepairs,
        loading,
        pagination,
        setPage,
        setPerPage,
        filters,
        updateFilters,
      }}
    >
      {children}
    </RepairsContext.Provider>
  );
};

// Custom hook για cleaner χρήση
export const useRepairs = () => useContext(RepairsContext);
