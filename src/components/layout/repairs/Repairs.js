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
  Chip,
  IconButton,
  styled,
} from '@mui/material';
import { Visibility as VisibilityIcon } from '@mui/icons-material';
import { useSearch } from '../../../context/SearchContext';
import { volt_types_mapping, repairStatus_mapping } from '../../Models/Motor';
import { useRepairs } from '../../../context/RepairsContext';
import Search from '../Search';
import ModalRepairs from '../parts/ModalRepairs';

const statusColors = {
  Pending: '#ff9800',
  'In-progress': '#2196f3',
  Completed: '#4caf50',
  Cancelled: '#f44336',
};

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

const CompactTableRow = styled(TableRow)(({ theme }) => ({
  '&:hover': {
    backgroundColor: '#f8f9fa',
    cursor: 'pointer',
    '& .view-icon': {
      color: '#1976d2',
    },
  },
  transition: 'all 0.2s ease',
}));

/**
 * Component για κάθε γραμμή του πίνακα επισκευών
 * @param {Object} repair - Αντικείμενο επισκευής
 * @param {number} index - Index της γραμμής
 * @param {Function} onOpenModal - Function για άνοιγμα του modal
 */
function RepairTableRow({ repair, index, onOpenModal }) {
  /**
   * Δημιουργεί chip για το status της επισκευής
   * @param {string} status - Status της επισκευής
   * @returns {JSX.Element} Chip component
   */
  const getStatusChip = (status) => {
    const color = statusColors[status] || '#757575';
    return (
      <Chip
        label={repairStatus_mapping[status] || status || 'Άγνωστο'}
        size="small"
        sx={{
          backgroundColor: color,
          color: 'white',
          fontSize: '0.65rem',
          height: '20px',
          '& .MuiChip-label': {
            px: 1,
          },
        }}
      />
    );
  };

  return (
    <CompactTableRow onClick={() => onOpenModal(repair)}>
      {/* Serial Number */}
      <CompactTableCell>
        <Typography variant="body2" fontWeight={600} fontSize="0.8rem">
          {repair.motor?.serialNumber || '-'}
        </Typography>
      </CompactTableCell>

      {/* Customer Name */}
      <CompactTableCell>
        <Typography variant="body2" fontSize="0.8rem" noWrap sx={{ maxWidth: '120px' }}>
          {repair.customer?.name || '-'}
        </Typography>
      </CompactTableCell>

      {/* Manufacturer */}
      <CompactTableCell>
        <Typography variant="body2" fontSize="0.8rem">
          {repair.motor?.manufacturer || '-'}
        </Typography>
      </CompactTableCell>

      {/* kW */}
      <CompactTableCell>
        <Typography variant="caption" fontSize="0.75rem">
          {repair.motor?.kw ? `${repair.motor.kw}kW` : '-'}
        </Typography>
      </CompactTableCell>

      {/* HP */}
      <CompactTableCell>
        <Typography variant="caption" fontSize="0.75rem">
          {repair.motor?.hp ? `${repair.motor.hp}hp` : '-'}
        </Typography>
      </CompactTableCell>

      {/* Voltage */}
      <CompactTableCell>
        <Typography variant="caption" fontSize="0.75rem">
          {volt_types_mapping[repair.motor?.volt] || repair.motor?.volt || '-'}
        </Typography>
      </CompactTableCell>

      {/* Status */}
      <CompactTableCell>{getStatusChip(repair.repairStatus)}</CompactTableCell>

      {/* Arrival Date */}
      <CompactTableCell>
        <Typography variant="caption" color="text.secondary" fontSize="0.7rem">
          {repair.isArrived || '-'}
        </Typography>
      </CompactTableCell>

      {/* View Button */}
      <CompactTableCell sx={{ width: '50px' }}>
        <IconButton
          size="small"
          className="view-icon"
          onClick={(e) => {
            e.stopPropagation();
            onOpenModal(repair);
          }}
          aria-label={`Προβολή επισκευής ${repair.motor?.serialNumber || repair.id}`}
        >
          <VisibilityIcon fontSize="small" />
        </IconButton>
      </CompactTableCell>
    </CompactTableRow>
  );
}

/**
 * Κύριο component για εμφάνιση πίνακα επισκευών
 * @returns {JSX.Element} Repairs table component
 */
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

  /**
   * Handle αλλαγές στα φίλτρα
   * @param {Object} newFilters - Νέα φίλτρα
   */
  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  /**
   * Handle άνοιγμα modal
   * @param {Object} repair - Επισκευή για εμφάνιση
   */
  const handleOpenModal = (repair) => {
    setSelectedRepair(repair);
    setModalOpen(true);
  };

  /**
   * Handle κλείσιμο modal
   */
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedRepair(null);
  };

  /**
   * Φιλτράρισμα επισκευών βάσει search query και filters
   */
  const filteredRepairs = repairs.filter((repair) => {
    // Search query filter
    const matchesSearch =
      !searchQuery ||
      repair.motor?.manufacturer?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      repair.motor?.kw?.toString().includes(searchQuery) ||
      repair.motor?.hp?.toString().includes(searchQuery) ||
      repair.customer?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      repair.motor?.serialNumber?.toLowerCase().includes(searchQuery.toLowerCase());

    // Manufacturer filter
    const matchesManufacturer =
      !filters.manufacturer || repair.motor?.manufacturer === filters.manufacturer;

    // Status filter
    const matchesStatus = !filters.status || repair.repairStatus === filters.status;

    // Volt type filter
    const matchesVoltType =
      !filters.voltType || volt_types_mapping[repair.motor?.volt] === filters.voltType;

    // kW range filter
    const matchesKwMin =
      !filters.kwMin || (repair.motor?.kw && repair.motor.kw >= parseFloat(filters.kwMin));

    const matchesKwMax =
      !filters.kwMax || (repair.motor?.kw && repair.motor.kw <= parseFloat(filters.kwMax));

    return (
      matchesSearch &&
      matchesManufacturer &&
      matchesStatus &&
      matchesVoltType &&
      matchesKwMin &&
      matchesKwMax
    );
  });

  // Loading state
  if (loading) {
    return (
      <Box sx={{ mt: 2, textAlign: 'center', py: 4 }}>
        <Typography variant="body1" color="text.secondary">
          Φόρτωση επισκευών...
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
          Επισκευές ({filteredRepairs.length})
        </Typography>

        {/* Search και Filter components */}
        <Search repairs={repairs} onFiltersChange={handleFiltersChange} />
      </Box>

      {/* Main Table */}
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
              <CompactTableCell>Κατάσταση</CompactTableCell>
              <CompactTableCell>Παραλαβή</CompactTableCell>
              <CompactTableCell width="50px">Προβολή</CompactTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRepairs.map((repair, index) => (
              <RepairTableRow
                key={repair.id || index}
                repair={repair}
                index={index}
                onOpenModal={handleOpenModal}
              />
            ))}

            {/* Empty State */}
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
      <ModalRepairs open={modalOpen} repair={selectedRepair} onClose={handleCloseModal} />
    </Box>
  );
}
