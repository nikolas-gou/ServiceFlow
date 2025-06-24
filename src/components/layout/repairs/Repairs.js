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
  Collapse,
  Tooltip,
  Chip,
  IconButton,
  styled,
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { useSearch } from '../../../context/SearchContext';
import { volt_types_mapping, repairStatus_mapping } from '../../Models/Motor';
import { useRepairs } from '../../../context/RepairsContext';
import EnhancedMotorRepairDisplay from '../parts/EnhancedMotorRepairDisplay';
import Search from '../Search'; // Import του Search component

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
    '& .expand-icon': {
      color: '#1976d2',
    },
  },
  transition: 'all 0.2s ease',
}));

// Compact Row Component
function CompactRepairRow({ repair, index }) {
  const [open, setOpen] = useState(false);

  const getStatusChip = (status) => {
    const color = statusColors[status] || '#757575';
    return (
      <Chip
        label={repairStatus_mapping[status]}
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
    <>
      <CompactTableRow onClick={() => setOpen(!open)}>
        <CompactTableCell>
          <Typography variant="body2" fontWeight={600} fontSize="0.8rem">
            {repair.motor.serialNumber || '-'}
          </Typography>
        </CompactTableCell>

        <CompactTableCell>
          <Typography variant="body2" fontSize="0.8rem" noWrap sx={{ maxWidth: '120px' }}>
            {repair.customer.name || '-'}
          </Typography>
        </CompactTableCell>

        <CompactTableCell>
          <Typography variant="body2" fontSize="0.8rem">
            {repair.motor.manufacturer || '-'}
          </Typography>
        </CompactTableCell>

        <CompactTableCell>
          <Typography variant="caption" fontSize="0.75rem">
            {repair.motor.kw ? `${repair.motor.kw}kW` : '-'}
          </Typography>
        </CompactTableCell>

        <CompactTableCell>
          <Typography variant="caption" fontSize="0.75rem">
            {repair.motor.hp ? `${repair.motor.hp}hp` : '-'}
          </Typography>
        </CompactTableCell>

        <CompactTableCell>
          <Typography variant="caption" fontSize="0.75rem">
            {volt_types_mapping[repair.motor.volt] || '-'}
          </Typography>
        </CompactTableCell>

        <CompactTableCell>{getStatusChip(repair.repairStatus)}</CompactTableCell>

        <CompactTableCell>
          <Typography variant="caption" color="text.secondary" fontSize="0.7rem">
            {repair.isArrived || '-'}
          </Typography>
        </CompactTableCell>

        <CompactTableCell sx={{ width: '30px' }}>
          <IconButton size="small" className="expand-icon">
            <ExpandMoreIcon
              fontSize="small"
              sx={{
                transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s',
              }}
            />
          </IconButton>
        </CompactTableCell>
      </CompactTableRow>

      <TableRow>
        <CompactTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ py: 1 }}>
              <EnhancedMotorRepairDisplay repair={repair} />
            </Box>
          </Collapse>
        </CompactTableCell>
      </TableRow>
    </>
  );
}

// Main Compact Repairs Component
export default function CompactRepairs() {
  const { searchQuery } = useSearch();
  const { repairs, loading } = useRepairs();

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
              <CompactTableCell>Κατάσταση</CompactTableCell>
              <CompactTableCell>Παραλαβή</CompactTableCell>
              <CompactTableCell width="40px"></CompactTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRepairs.map((repair, index) => (
              <CompactRepairRow key={repair.id} repair={repair} index={index} />
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
    </Box>
  );
}
