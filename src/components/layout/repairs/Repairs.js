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
import { volt_types_mapping } from '../../Models/Motor';
import { useRepairs } from '../../../context/RepairsContext';
import Search from '../Search';
import { RepairDetailModal } from './parts/RepairDetailModal';
import { RepairRow } from './parts/RepairRow';

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

// Main Modal Repairs Component
export default function Repairs() {
  const { searchQuery } = useSearch();
  const { repairs, loading } = useRepairs();

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRepair, setSelectedRepair] = useState(null);

  // State για τα filters
  const [filters, setFilters] = useState({
    manufacturer: '',
    status: '',
    voltType: '',
    kwMin: '',
    kwMax: '',
  });

  // Συνάρτηση για να χειριστεί τις αλλαγές στα φίλτρα
  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Handle modal open
  const handleOpenModal = (repair) => {
    setSelectedRepair(repair);
    setModalOpen(true);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedRepair(null);
  };

  // Φιλτράρισμα με βάση το search και τα filters
  const filteredRepairs = repairs.filter((repair) => {
    // Search query filter
    const matchesSearch =
      !searchQuery ||
      repair.motor.manufacturer?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      repair.motor.kw?.toString().includes(searchQuery) ||
      repair.motor.hp?.toString().includes(searchQuery) ||
      repair.customer.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      repair.motor.serialNumber?.toLowerCase().includes(searchQuery.toLowerCase());

    // Manufacturer filter
    const matchesManufacturer =
      !filters.manufacturer || repair.motor.manufacturer === filters.manufacturer;

    // Status filter
    const matchesStatus = !filters.status || repair.repairStatus === filters.status;

    // Volt type filter
    const matchesVoltType =
      !filters.voltType || volt_types_mapping[repair.motor.volt] === filters.voltType;

    // kW range filter
    const matchesKwMin =
      !filters.kwMin || (repair.motor.kw && repair.motor.kw >= parseFloat(filters.kwMin));

    const matchesKwMax =
      !filters.kwMax || (repair.motor.kw && repair.motor.kw <= parseFloat(filters.kwMax));

    return (
      matchesSearch &&
      matchesManufacturer &&
      matchesStatus &&
      matchesVoltType &&
      matchesKwMin &&
      matchesKwMax
    );
  });

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
          Επισκευές ({filteredRepairs.length})
        </Typography>

        {/* Search και Filter components */}
        <Search repairs={repairs} onFiltersChange={handleFiltersChange} />
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
              <CompactTableCell>S/N</CompactTableCell>
              <CompactTableCell>Πελάτης</CompactTableCell>
              <CompactTableCell>Μάρκα</CompactTableCell>
              <CompactTableCell>kW</CompactTableCell>
              <CompactTableCell>hp</CompactTableCell>
              <CompactTableCell>Τάση</CompactTableCell>
              <CompactTableCell>Φάσεις</CompactTableCell>
              <CompactTableCell>Τύπος</CompactTableCell>
              <CompactTableCell>Κατάσταση</CompactTableCell>
              <CompactTableCell>Παραλαβή</CompactTableCell>
              <CompactTableCell width="50px">Προβολή</CompactTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRepairs.map((repair, index) => (
              <RepairRow
                key={repair.id}
                repair={repair}
                index={index}
                onOpenModal={handleOpenModal}
              />
            ))}
            {filteredRepairs.length === 0 && (
              <TableRow>
                <CompactTableCell colSpan={9} align="center">
                  <Typography variant="body2" sx={{ py: 3, color: 'text.secondary' }}>
                    {searchQuery || Object.values(filters).some((f) => f !== '')
                      ? `Δεν βρέθηκαν αποτελέσματα`
                      : 'Δεν υπάρχουν επισκευές'}
                  </Typography>
                </CompactTableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Repair Detail Modal */}
      <RepairDetailModal open={modalOpen} repair={selectedRepair} onClose={handleCloseModal} />
    </Box>
  );
}
