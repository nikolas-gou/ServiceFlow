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
  IconButton,
  Popover,
  FormControlLabel,
  Checkbox,
  Tooltip,
  Stack,
} from '@mui/material';
import ViewColumnRoundedIcon from '@mui/icons-material/ViewColumnRounded';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { useCustomers } from '../../../hooks/useCustomers';
import Search from '../Search';
import { CustomerDetailModal } from './parts/CustomerDetailModal';
import { CustomerRow } from './parts/CustomerRow';
import PeopleIcon from '@mui/icons-material/People';
import InboxIcon from '@mui/icons-material/Inbox';
import { CUSTOMERS_COLUMNS, ACTIONS_COLUMN } from './parts/customersColumns';
import { useTableColumns } from '../../../hooks/useTableColumns';
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

const ResizeHandle = styled(Box)(({ theme }) => ({
  position: 'absolute',
  right: -4,
  top: 0,
  bottom: 0,
  width: 8,
  cursor: 'col-resize',
  zIndex: 2,
  '&:hover, &:active': {
    backgroundColor: 'rgba(25, 118, 210, 0.3)',
  },
}));

const ToolbarIconButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'iconColor',
})(({ iconColor }) => ({
  width: 40,
  height: 40,
  borderRadius: '12px',
  color: iconColor,
  backgroundColor: `${iconColor}1f`,
  transition: 'all 0.15s ease',
  '&:hover': {
    backgroundColor: `${iconColor}33`,
  },
}));

const EMPTY_FILTERS = { type: '', email: '' };

// Main Customers Component
export default function Customers() {
  const { data: customers = [], isLoading: loading } = useCustomers();

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [search, setSearch] = useState('');

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(() => Number(localStorage.getItem('customersPerPage')) || 10);

  // Ορατότητα/πλάτος στηλών πίνακα, με persistence στο localStorage
  const { visibleColumns, columnWidths, toggleColumn, setColumnWidth, resetColumns } =
    useTableColumns('customersTable', CUSTOMERS_COLUMNS);

  const [columnsAnchorEl, setColumnsAnchorEl] = useState(null);
  const activeColumns = CUSTOMERS_COLUMNS.filter((col) => visibleColumns.includes(col.id));
  const columnsMenuOpen = Boolean(columnsAnchorEl);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  const handleSearchChange = (newSearch) => {
    setSearch(newSearch);
    setPage(1);
  };

  const handleItemsPerPageChange = (newPerPage) => {
    setPerPage(newPerPage);
    setPage(1);
    localStorage.setItem('customersPerPage', newPerPage);
  };

  const handleResizeStart = (colId, minWidth, event) => {
    event.preventDefault();
    event.stopPropagation();
    const startX = event.clientX;
    const startWidth = columnWidths[colId] || 100;

    const onMouseMove = (moveEvent) => {
      const delta = moveEvent.clientX - startX;
      setColumnWidth(colId, Math.max(minWidth, Math.round(startWidth + delta)));
    };
    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
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

  // Φιλτράρισμα με βάση το search και τα filters
  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      !search ||
      customer.name?.toLowerCase().includes(search.toLowerCase()) ||
      customer.email?.toLowerCase().includes(search.toLowerCase()) ||
      customer.phone?.includes(search) ||
      customer.type?.toLowerCase().includes(search.toLowerCase());

    const matchesType = !filters.type || customer.type === filters.type;

    const matchesEmail =
      !filters.email || customer.email?.toLowerCase().includes(filters.email.toLowerCase());

    return matchesSearch && matchesType && matchesEmail;
  });

  const totalPages = Math.max(1, Math.ceil(filteredCustomers.length / perPage));
  const currentPage = Math.min(page, totalPages);
  const paginatedCustomers = filteredCustomers.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage,
  );

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

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
          {/* Search και Filter components */}
          <Search
            customers={customers}
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onSearchChange={handleSearchChange}
            searchValue={search}
          />

          {/* Column visibility control */}
          <Tooltip title="Στήλες">
            <ToolbarIconButton
              iconColor="#7e57c2"
              onClick={(e) => setColumnsAnchorEl(e.currentTarget)}
            >
              <ViewColumnRoundedIcon fontSize="small" />
            </ToolbarIconButton>
          </Tooltip>

          <Popover
            open={columnsMenuOpen}
            anchorEl={columnsAnchorEl}
            onClose={() => setColumnsAnchorEl(null)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <Box sx={{ p: 2, minWidth: 240 }}>
              <Box
                sx={{
                  mb: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Typography variant="subtitle2" fontWeight={600}>
                  Ορατές στήλες
                </Typography>
                <Tooltip title="Επαναφορά προεπιλογών">
                  <IconButton size="small" onClick={resetColumns}>
                    <RestartAltIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
              <Divider sx={{ mb: 1 }} />
              <Stack spacing={0}>
                {CUSTOMERS_COLUMNS.map((col) => (
                  <FormControlLabel
                    key={col.id}
                    control={
                      <Checkbox
                        size="small"
                        checked={visibleColumns.includes(col.id)}
                        onChange={() => toggleColumn(col.id)}
                      />
                    }
                    label={<Typography variant="body2">{col.label}</Typography>}
                  />
                ))}
              </Stack>
            </Box>
          </Popover>
        </Box>
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          maxHeight: '50vh',
          boxShadow: '0 2px 8px rgba(25,118,210,0.08)',
          borderRadius: '16px',
        }}
      >
        <Table stickyHeader size="small" sx={{ tableLayout: 'fixed' }}>
          <TableHead>
            <TableRow>
              {activeColumns.map((col) => (
                <CompactTableCell
                  key={col.id}
                  sx={{ position: 'relative', width: columnWidths[col.id] }}
                >
                  {col.label}
                  <ResizeHandle onMouseDown={(e) => handleResizeStart(col.id, col.minWidth, e)} />
                </CompactTableCell>
              ))}
              <CompactTableCell sx={{ width: ACTIONS_COLUMN.width }}>
                {ACTIONS_COLUMN.label}
              </CompactTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCustomers.map((customer, index) => (
              <CustomerRow
                key={customer.id}
                customer={customer}
                columns={activeColumns}
                columnWidths={columnWidths}
                onOpenModal={handleOpenModal}
                zebra={index % 2 === 0}
              />
            ))}
            {filteredCustomers.length === 0 && (
              <TableRow>
                <CompactTableCell colSpan={activeColumns.length + 1} align="center">
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
                      {search || Object.values(filters).some((f) => f !== '')
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

      {/* Pagination Component */}
      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredCustomers.length}
        itemsPerPage={perPage}
        onPageChange={setPage}
        onItemsPerPageChange={handleItemsPerPageChange}
        showItemsPerPage={true}
      />

      {/* Customer Detail Modal */}
      <CustomerDetailModal
        open={modalOpen}
        customer={selectedCustomer}
        onClose={handleCloseModal}
      />
    </Box>
  );
}
