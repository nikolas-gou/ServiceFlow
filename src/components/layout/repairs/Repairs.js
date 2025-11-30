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
  TableSortLabel,
} from '@mui/material';
import { useRepairs } from '../../../context/RepairsContext';
import Search from '../Search';
import { RepairDetailModal } from './parts/RepairDetailModal';
import { RepairRow } from './parts/RepairRow';
import InboxIcon from '@mui/icons-material/Inbox';
import BuildIcon from '@mui/icons-material/Build';
import { ModalRepairForm } from '../form/parts/ModalRepairForm';
import PaginationComponent from '../pagination/PaginationComponent';

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
  const {
    repairs,
    loading,
    pagination,
    setPage,
    setPerPage,
    filters: contextFilters,
    updateFilters,
    deleteRepair,
    sorting,
    updateSorting,
  } = useRepairs();

  // Modal state
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedRepair, setSelectedRepair] = useState({});

  const [localFilters, setLocalFilters] = useState({
    manufacturer: '',
    status: '',
    voltType: '',
    kwMin: '',
    kwMax: '',
    rpm: '',
  });

  const [localSearch, setLocalSearch] = useState('');

  // Handle repair deletion
  const handleDelete = (repairId) => {
    // todo: is right the proccess of deletion?
    deleteRepair(repairId);
  };

  const handleFiltersChange = (newFilters) => {
    setLocalFilters(newFilters);
    // Update context filters (which will trigger a new API call)
    updateFilters({
      ...newFilters,
      search: localSearch,
    });
  };

  const handleSearchChange = (newSearch) => {
    setLocalSearch(newSearch);
    // Update context filters (which will trigger a new API call)
    updateFilters({
      ...localFilters,
      search: newSearch,
    });
  };

  // Pagination handlers
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setPerPage(newItemsPerPage);
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

  const onClickSortingTable = (columnName) => {
    if (columnName !== sorting.sortBy) {
      updateSorting({
        sortBy: columnName,
        sortOrder: 'ASC', // uppercase για backend
      });
    } else {
      updateSorting({
        sortBy: columnName,
        sortOrder: sorting.sortOrder === 'ASC' ? 'DESC' : 'ASC',
      });
    }
  };

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
                {pagination.totalItems}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Search και Filter components */}
        <Search
          repairs={repairs}
          filteredRepairs={repairs}
          onFiltersChange={handleFiltersChange}
          onSearchChange={handleSearchChange}
          searchValue={localSearch}
        />
      </Box>
      <TableContainer
        component={Paper}
        sx={{
          maxHeight: 'calc(100vh - 280px)',
          boxShadow: '0 2px 8px rgba(25,118,210,0.08)',
          borderRadius: '16px',
          maxHeight: '50vh', // test
        }}
      >
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              {/* only for testing */}
              <CompactTableCell>
                <TableSortLabel
                  active={sorting.sortBy === 'id'}
                  onClick={() => onClickSortingTable('id')}
                  direction={sorting.sortBy === 'id' ? sorting.sortOrder.toLowerCase() : 'asc'}
                >
                  ID
                </TableSortLabel>
              </CompactTableCell>
              <CompactTableCell>S/N</CompactTableCell>
              <CompactTableCell>Πελάτης</CompactTableCell>
              <CompactTableCell>Περιγραφή Κινητήρα</CompactTableCell>
              <CompactTableCell>Μάρκα</CompactTableCell>
              <CompactTableCell>kW</CompactTableCell>
              <CompactTableCell>hp</CompactTableCell>
              <CompactTableCell>Στροφές</CompactTableCell>
              <CompactTableCell>Τάση</CompactTableCell>
              <CompactTableCell>Αμπέρ</CompactTableCell>
              <CompactTableCell>Φάσεις</CompactTableCell>
              <CompactTableCell>Τύπος</CompactTableCell>
              {/* <CompactTableCell>Κατάσταση</CompactTableCell> */}
              <CompactTableCell>
                <TableSortLabel
                  active={sorting.sortBy === 'is_arrived'}
                  onClick={() => onClickSortingTable('is_arrived')}
                  direction={
                    sorting.sortBy === 'is_arrived' ? sorting.sortOrder.toLowerCase() : 'asc'
                  }
                >
                  Ημ. Παραλαβής
                </TableSortLabel>
              </CompactTableCell>
              <CompactTableCell width="50px">Προβολή</CompactTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {repairs.map((repair, index) => (
              <RepairRow
                key={repair.id}
                repair={repair}
                index={(pagination.currentPage - 1) * pagination.perPage + index}
                onView={handleViewRepair}
                onEdit={handleEditRepair}
                onDelete={handleDelete}
                zebra={index % 2 === 0}
              />
            ))}
            {repairs.length === 0 && !loading && (
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
                      {localSearch || Object.values(localFilters).some((f) => f !== '')
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

      {/* Pagination Component */}
      <PaginationComponent
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        totalItems={pagination.totalItems}
        itemsPerPage={pagination.perPage}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
        showItemsPerPage={true}
      />

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
