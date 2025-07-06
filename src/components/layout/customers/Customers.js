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
  Divider,
} from '@mui/material';
import { useSearch } from '../../../context/SearchContext';
import { CustomerRepository } from '../../Repositories/CustomerRepository';
import Search from '../Search';
import { CustomerDetailModal } from './parts/CustomerDetailModal';
import { CustomerRow } from './parts/CustomerRow';
import PeopleIcon from '@mui/icons-material/People';
import InboxIcon from '@mui/icons-material/Inbox';

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
    position: 'sticky',
    top: 0,
    zIndex: 1,
    boxShadow: '0 2px 4px rgba(0,0,0,0.03)',
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
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            sx={{
              width: 4,
              height: 24,
              backgroundColor: 'primary.main',
              borderRadius: 4,
            }}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <PeopleIcon sx={{ color: 'primary.main', fontSize: 20 }} />
            <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 600 }}>
              Πελάτες
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                color: 'text.secondary',
              }}
            >
              <Divider orientation="vertical" flexItem sx={{ mx: 1, height: 16 }} />
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                }}
              >
                {filteredCustomers.length}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Search και Filter components */}
        <Search customers={customers} onFiltersChange={handleFiltersChange} />
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          maxHeight: 'calc(100vh - 280px)',
          boxShadow: '0 2px 8px rgba(25,118,210,0.08)',
          borderRadius: '16px',
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
              <CompactTableCell width="50px">Ενέργειες</CompactTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCustomers.map((customer, index) => (
              <CustomerRow
                key={customer.id}
                customer={customer}
                index={index}
                onOpenModal={handleOpenModal}
                zebra={index % 2 === 0}
              />
            ))}
            {filteredCustomers.length === 0 && (
              <TableRow>
                <CompactTableCell colSpan={6} align="center">
                  <Box
                    sx={{
                      py: 4,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      color: 'text.secondary',
                    }}
                  >
                    <InboxIcon sx={{ fontSize: 48, mb: 1 }} />
                    <Typography variant="body2">
                      {searchQuery || Object.values(filters).some((f) => f !== '')
                        ? `Δεν βρέθηκαν αποτελέσματα`
                        : 'Δεν υπάρχουν πελάτες'}
                    </Typography>
                  </Box>
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
