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
import { volt_types_mapping } from '../../Models/Motor';
import { useRepairs } from '../../../context/RepairsContext';
import Search from '../Search';
import { RepairDetailModal } from './parts/RepairDetailModal';
import { RepairRow } from './parts/RepairRow';
import InboxIcon from '@mui/icons-material/Inbox';
import BuildIcon from '@mui/icons-material/Build';
import { ModalRepairForm } from '../form/parts/ModalRepairForm';

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

// Main Modal Repairs Component
export default function Repairs() {
  const { searchQuery } = useSearch();
  const { repairs, loading, setRepairs } = useRepairs();

  // Modal state
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedRepair, setSelectedRepair] = useState({});

  // State για τα filters
  const [filters, setFilters] = useState({
    manufacturer: '',
    status: '',
    voltType: '',
    kwMin: '',
    kwMax: '',
  });

  // Handle repair deletion
  const handleDelete = (repairId) => {
    setRepairs(repairs.filter((repair) => repair.id !== repairId));
  };

  // Συνάρτηση για να χειριστεί τις αλλαγές στα φίλτρα
  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setSelectedRepair({});
    setViewModalOpen(false);
    setEditModalOpen(false);
  };

  const handleViewRepair = (repair) => {
    setSelectedRepair(repair);
    setViewModalOpen(true);
  };

  const handleEditRepair = (repair) => {
    setSelectedRepair(repair);
    setEditModalOpen(true);
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
            <BuildIcon sx={{ color: 'primary.main', fontSize: 20 }} />
            <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 600 }}>
              Επισκευές
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
                {filteredRepairs.length}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Search και Filter components */}
        <Search
          repairs={repairs}
          filteredRepairs={filteredRepairs}
          onFiltersChange={handleFiltersChange}
        />
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
                onView={handleViewRepair}
                onEdit={handleEditRepair}
                onDelete={handleDelete}
                zebra={index % 2 === 0}
              />
            ))}
            {filteredRepairs.length === 0 && (
              <TableRow>
                <CompactTableCell colSpan={11} align="center">
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
                        : 'Δεν υπάρχουν επισκευές'}
                    </Typography>
                  </Box>
                </CompactTableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Repair Detail Modal */}
      <RepairDetailModal open={viewModalOpen} repair={selectedRepair} onClose={handleCloseModal} />
      <ModalRepairForm
        open={editModalOpen}
        onClose={handleCloseModal}
        repair={selectedRepair}
        isEdit={true}
      />
    </Box>
  );
}
