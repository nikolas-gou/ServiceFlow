import { createContext, useContext, useState, useEffect } from 'react';
import { RepairRepository } from '../components/Repositories/RepairRepository';

const RepairsContext = createContext();

export const RepairsProvider = ({ children }) => {
  const [repairs, setRepairs] = useState([]);
  const [loading, setLoading] = useState(true);

  const getRepairs = async () => {
    // try {
    //   const data = await RepairRepository.getAll();
    //   setRepairs(data);
    // } catch (err) {
    //   console.error('Error fetching repairs:', err);
    // }
  };

  useEffect(() => {
    // getRepairs();
    console.log('ok');
  }, []);

  const addRepair = (repair) => {
    // Βεβαιώνουμε ότι το repair είναι object και όχι array
    if (Array.isArray(repair)) {
      setRepairs((prev) => [...repair, ...prev]);
    } else {
      setRepairs((prev) => [repair, ...prev]);
    }
  };

  return (
    <RepairsContext.Provider value={{ repairs, setRepairs, addRepair, getRepairs, loading }}>
      {children}
    </RepairsContext.Provider>
  );
};

// Custom hook για cleaner χρήση
export const useConnections = () => useContext(RepairsContext);
