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
  Chip,
  Stack,
  IconButton,
  Popover,
  FormControlLabel,
  Checkbox,
  Button,
  Tooltip,
} from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import ViewColumnRoundedIcon from '@mui/icons-material/ViewColumnRounded';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import RecyclingRoundedIcon from '@mui/icons-material/RecyclingRounded';
import { useNavigate } from 'react-router-dom';
import { useRepairs } from '../../../context/RepairsContext';
import Search from '../Search';
import { RepairDetailModal } from './parts/RepairDetailModal';
import { RepairRow } from './parts/RepairRow';
import InboxIcon from '@mui/icons-material/Inbox';
import BuildIcon from '@mui/icons-material/Build';
import { ModalRepairForm } from '../form/parts/ModalRepairForm';
import PaginationComponent from '../pagination/PaginationComponent';
import { repairStatus_types, repairStatus_mapping, repairStatus_colors } from '../../Models/Motor';
import { REPAIRS_COLUMNS, ACTIONS_COLUMN } from './parts/repairsColumns';
import { useTableColumns } from '../../../hooks/useTableColumns';
import { useUpdateRepair } from '../../../hooks/useRepairs';
import { Repair } from '../../Models/Repair';

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
    backgroundColor: alpha(theme.palette.primary.main, 0.3),
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

// Main Modal Repairs Component
export default function Repairs() {
  const theme = useTheme();
  const navigate = useNavigate();
  const {
    repairs,
    loading,
    pagination,
    setPage,
    setPerPage,
    filters: contextFilters,
    updateFilters,
    sorting,
    updateSorting,
  } = useRepairs();

  // Modal state
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedRepair, setSelectedRepair] = useState({});

  // Τα local filters ξεκινάνε από τα (τυχόν persisted) context filters, ώστε το UI
  // (search box, filter popover, quick chips) να δείχνει σωστά την αποκατεστημένη κατάσταση.
  const [localFilters, setLocalFilters] = useState(() => {
    const { search, ...rest } = contextFilters;
    return rest;
  });

  const [localSearch, setLocalSearch] = useState(() => contextFilters.search || '');

  // Ορατότητα/πλάτος στηλών πίνακα, με persistence στο localStorage
  const { visibleColumns, columnWidths, toggleColumn, setColumnWidth, resetColumns } =
    useTableColumns('repairsTable', REPAIRS_COLUMNS);

  const [columnsAnchorEl, setColumnsAnchorEl] = useState(null);

  const activeColumns = REPAIRS_COLUMNS.filter((col) => visibleColumns.includes(col.id));

  const updateRepairMutation = useUpdateRepair();

  const handleStatusChange = (repair, newStatus) => {
    const dataApi = new Repair({ ...repair, repairStatus: newStatus });
    updateRepairMutation.mutate({ id: repair.id, data: { repair: dataApi } });
  };

  const handleFiltersChange = (newFilters) => {
    setLocalFilters(newFilters);
    // Update context filters (which will trigger a new API call)
    updateFilters({
      ...newFilters,
      search: localSearch,
    });
  };

  const handleQuickStatusClick = (status) => {
    const newStatus = localFilters.status === status ? '' : status;
    handleFiltersChange({ ...localFilters, status: newStatus });
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

  const columnsMenuOpen = Boolean(columnsAnchorEl);

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

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
          {/* Search και Filter components */}
          <Search
            repairs={repairs}
            filters={localFilters}
            onFiltersChange={handleFiltersChange}
            onSearchChange={handleSearchChange}
            searchValue={localSearch}
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

          {/* Κάδος ανακύκλωσης */}
          <Tooltip title="Κάδος ανακύκλωσης">
            <ToolbarIconButton
              iconColor="#43a047"
              onClick={() => navigate('/dashboard/services/trash')}
            >
              <RecyclingRoundedIcon fontSize="small" />
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
                {REPAIRS_COLUMNS.map((col) => (
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

      {/* Quick status filter chips */}
      <Stack direction="row" spacing={1.25} flexWrap="wrap" gap={1.25} sx={{ mb: 2.5 }}>
        {repairStatus_types.map((status) => {
          const isActive = localFilters.status === status;
          const color = repairStatus_colors[status];
          return (
            <Chip
              key={status}
              label={repairStatus_mapping[status]}
              icon={
                <Box
                  component="span"
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: isActive ? '#fff' : color,
                  }}
                />
              }
              clickable
              onClick={() => handleQuickStatusClick(status)}
              sx={{
                height: 34,
                px: 1,
                borderRadius: '999px',
                fontWeight: 600,
                fontSize: '0.8rem',
                border: `1.5px solid ${isActive ? color : '#e2e5ea'}`,
                backgroundColor: isActive ? color : '#fff',
                color: isActive ? '#fff' : 'text.secondary',
                boxShadow: isActive ? `0 3px 10px ${color}55` : '0 1px 2px rgba(0,0,0,0.03)',
                transition: 'all 0.18s ease',
                '& .MuiChip-icon': {
                  marginLeft: '10px',
                  marginRight: '-2px',
                },
                '& .MuiChip-label': {
                  px: 1.25,
                },
                '&:hover': {
                  backgroundColor: isActive ? color : '#f5f7fa',
                  borderColor: isActive ? color : '#cfd4da',
                },
              }}
            />
          );
        })}
      </Stack>

      <TableContainer
        component={Paper}
        sx={{
          maxHeight: '50vh',
          boxShadow: `0 2px 8px ${alpha(theme.palette.primary.main, 0.08)}`,
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
                  {col.sortKey ? (
                    <TableSortLabel
                      active={sorting.sortBy === col.sortKey}
                      onClick={() => onClickSortingTable(col.sortKey)}
                      direction={
                        sorting.sortBy === col.sortKey ? sorting.sortOrder.toLowerCase() : 'asc'
                      }
                    >
                      {col.label}
                    </TableSortLabel>
                  ) : (
                    col.label
                  )}
                  <ResizeHandle
                    onMouseDown={(e) => handleResizeStart(col.id, col.minWidth, e)}
                  />
                </CompactTableCell>
              ))}
              <CompactTableCell sx={{ width: ACTIONS_COLUMN.width }}>
                {ACTIONS_COLUMN.label}
              </CompactTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {repairs.map((repair, index) => (
              <RepairRow
                key={repair.id}
                repair={repair}
                index={(pagination.currentPage - 1) * pagination.perPage + index}
                columns={activeColumns}
                columnWidths={columnWidths}
                onView={handleViewRepair}
                onEdit={handleEditRepair}
                onStatusChange={handleStatusChange}
                zebra={index % 2 === 0}
              />
            ))}
            {repairs.length === 0 && !loading && (
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
