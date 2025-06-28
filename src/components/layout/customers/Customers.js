import React, { useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  styled,
} from '@mui/material';
import { useSearch } from '../../../context/SearchContext';
import { CustomerRepository } from '../../Repositories/CustomerRepository';
import Search from '../Search';
import { CustomerDetailModal } from './parts/CustomerDetailModal';
import { CustomerRow } from './parts/CustomerRow';

// Styled components για compact εμφάνιση
const CompactTableCell = styled(TableCell)(({ theme }) => ({
  padding: '6px 8px',
  fontSize: '0.8rem',
  '&.MuiTableCell-head': {
    fontWeight: 600,
    backgroundColor: '#f8f9fa',
    borderBottom: '2px solid #e9ecef',
    fontSize: '0.75rem',
    padding: '8px',
  },
}));

// Main Customers Component
export default function Customers() {
  const { searchQuery } = useSearch();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // State για τα filters
  const [filters, setFilters] = useState({
    type: '',
    email: '',
  });

  // Συνάρτηση για να χειριστεί τις αλλαγές στα φίλτρα
  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Handle modal open
  const handleOpenModal = (customer) => {
    setSelectedCustomer(customer);
    setModalOpen(true);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedCustomer(null);
  };

  // Φόρτωση πελατών από το repository
  const getCustomers = async () => {
    setLoading(true);
    try {
      const data = await CustomerRepository.getAll();
      setCustomers(data);
    } catch (err) {
      console.error('Σφάλμα φόρτωσης πελατών:', err);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getCustomers();
  }, []);

  // Φιλτράρισμα με βάση το search και τα filters
  const filteredCustomers = customers.filter((customer) => {
    // Search query filter
    const matchesSearch =
      !searchQuery ||
      customer.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone?.includes(searchQuery) ||
      customer.type?.toLowerCase().includes(searchQuery.toLowerCase());

    // Type filter
    const matchesType = !filters.type || customer.type === filters.type;

    // Email filter
    const matchesEmail =
      !filters.email || customer.email?.toLowerCase().includes(filters.email.toLowerCase());

    return matchesSearch && matchesType && matchesEmail;
  });

  if (loading) {
    return (
      <Box sx={{ mt: 2, textAlign: 'center', py: 4 }}>
        <Typography variant="body2" color="text.secondary">
          Φόρτωση πελατών...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 2 }}>
      {/* Header με τίτλο και Search/Filter components */}
      <Box
        sx={{
          mb: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 600 }}>
          Πελάτες ({filteredCustomers.length})
        </Typography>

        {/* Search και Filter components */}
        <Search customers={customers} onFiltersChange={handleFiltersChange} />
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          maxHeight: 'calc(100vh - 280px)',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          borderRadius: '8px',
        }}
      >
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <CompactTableCell>Όνομα</CompactTableCell>
              <CompactTableCell>Τύπος</CompactTableCell>
              <CompactTableCell>Email</CompactTableCell>
              <CompactTableCell>Τηλέφωνο</CompactTableCell>
              <CompactTableCell>Ημ/νία Δημιουργίας</CompactTableCell>
              <CompactTableCell width="50px">Προβολή</CompactTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCustomers.map((customer, index) => (
              <CustomerRow
                key={customer.id}
                customer={customer}
                index={index}
                onOpenModal={handleOpenModal}
              />
            ))}
            {filteredCustomers.length === 0 && (
              <TableRow>
                <CompactTableCell colSpan={7} align="center">
                  <Typography variant="body2" sx={{ py: 3, color: 'text.secondary' }}>
                    {searchQuery || Object.values(filters).some((f) => f !== '')
                      ? `Δεν βρέθηκαν αποτελέσματα`
                      : 'Δεν υπάρχουν πελάτες'}
                  </Typography>
                </CompactTableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Customer Detail Modal */}
      <CustomerDetailModal
        open={modalOpen}
        customer={selectedCustomer}
        onClose={handleCloseModal}
      />
    </Box>
  );
}
