import { useState, type MouseEvent as ReactMouseEvent } from 'react';
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
  TableSortLabel,
} from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import ViewColumnRoundedIcon from '@mui/icons-material/ViewColumnRounded';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SettingsIcon from '@mui/icons-material/Settings';
import InboxIcon from '@mui/icons-material/Inbox';
import { useMotors } from '../../../hooks/useMotors';
import Search from '../Search';
import { MotorRow } from './parts/MotorRow';
import { MOTORS_COLUMNS, ACTIONS_COLUMN } from './parts/motorColumns';
import { useTableColumns } from '../../../hooks/useTableColumns';
import PaginationComponent from '../pagination/PaginationComponent';

const CompactTableCell = styled(TableCell)(() => ({
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

interface ToolbarIconButtonProps {
  iconColor?: string;
}

const ToolbarIconButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'iconColor',
})<ToolbarIconButtonProps>(({ iconColor }) => ({
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

interface MotorsSorting {
  sortBy: string;
  sortOrder: 'ASC' | 'DESC';
}

export default function Motors() {
  const theme = useTheme();
  const { data: motors = [], isLoading: loading } = useMotors();

  const [search, setSearch] = useState('');

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(
    () => Number(localStorage.getItem('motorsPerPage')) || 10,
  );

  const [sorting, setSorting] = useState<MotorsSorting>({ sortBy: 'createdAt', sortOrder: 'DESC' });

  const onClickSortingTable = (columnName: string) => {
    setSorting((prev) => ({
      sortBy: columnName,
      sortOrder: prev.sortBy === columnName && prev.sortOrder === 'ASC' ? 'DESC' : 'ASC',
    }));
    setPage(1);
  };

  const { visibleColumns, columnWidths, toggleColumn, setColumnWidth, resetColumns } =
    useTableColumns('motorsTable', MOTORS_COLUMNS);

  const [columnsAnchorEl, setColumnsAnchorEl] = useState<HTMLElement | null>(null);
  const activeColumns = MOTORS_COLUMNS.filter((col) => visibleColumns.includes(col.id));
  const columnsMenuOpen = Boolean(columnsAnchorEl);

  const handleSearchChange = (newSearch: string) => {
    setSearch(newSearch);
    setPage(1);
  };

  const handleItemsPerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage);
    setPage(1);
    localStorage.setItem('motorsPerPage', String(newPerPage));
  };

  const handleResizeStart = (colId: string, minWidth: number, event: ReactMouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    const startX = event.clientX;
    const startWidth = columnWidths[colId] || 100;

    const onMouseMove = (moveEvent: MouseEvent) => {
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

  const filteredMotors = motors.filter((motor) => {
    if (!search) return true;
    const s = search.toLowerCase();
    return (
      motor.manufacturer?.toLowerCase().includes(s) ||
      motor.description?.toLowerCase().includes(s) ||
      motor.volt?.toLowerCase().includes(s) ||
      motor.typeOfMotor?.toLowerCase().includes(s) ||
      String(motor.kw).includes(s) ||
      String(motor.hp).includes(s) ||
      String(motor.id).includes(s) ||
      motor.serialNumber?.toLowerCase().includes(s)
    );
  });

  const sortedMotors = [...filteredMotors].sort((a, b) => {
    let aVal: string | number = (a as unknown as Record<string, string | number>)[sorting.sortBy];
    let bVal: string | number = (b as unknown as Record<string, string | number>)[sorting.sortBy];

    if (sorting.sortBy === 'createdAt') {
      aVal = aVal ? new Date(aVal).getTime() : 0;
      bVal = bVal ? new Date(bVal).getTime() : 0;
    } else if (sorting.sortBy === 'id' || sorting.sortBy === 'kw' || sorting.sortBy === 'repairsCount') {
      aVal = Number(aVal) || 0;
      bVal = Number(bVal) || 0;
    } else {
      aVal = (aVal || '').toString().toLowerCase();
      bVal = (bVal || '').toString().toLowerCase();
    }

    if (aVal < bVal) return sorting.sortOrder === 'ASC' ? -1 : 1;
    if (aVal > bVal) return sorting.sortOrder === 'ASC' ? 1 : -1;
    return 0;
  });

  const totalPages = Math.max(1, Math.ceil(filteredMotors.length / perPage));
  const currentPage = Math.min(page, totalPages);
  const paginatedMotors = sortedMotors.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage,
  );

  if (loading) {
    return (
      <Box sx={{ mt: 2, textAlign: 'center', py: 4 }}>
        <Typography variant="body2" color="text.secondary">
          Φόρτωση κινητήρων...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 2 }}>
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
            <SettingsIcon sx={{ color: 'primary.main', fontSize: 20 }} />
            <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 600 }}>
              Κινητήρες
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
                {filteredMotors.length}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
          <Search
            filters={{}}
            onFiltersChange={() => {}}
            onSearchChange={handleSearchChange}
            searchValue={search}
          />

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
                {MOTORS_COLUMNS.map((col) => (
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
                      onClick={() => onClickSortingTable(col.sortKey as string)}
                      direction={
                        sorting.sortBy === col.sortKey ? sorting.sortOrder.toLowerCase() as 'asc' | 'desc' : 'asc'
                      }
                    >
                      {col.label}
                    </TableSortLabel>
                  ) : (
                    col.label
                  )}
                  <ResizeHandle onMouseDown={(e) => handleResizeStart(col.id, col.minWidth, e)} />
                </CompactTableCell>
              ))}
              <CompactTableCell sx={{ width: ACTIONS_COLUMN.width }}>
                {ACTIONS_COLUMN.label}
              </CompactTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedMotors.map((motor, index) => (
              <MotorRow
                key={motor.id}
                motor={motor}
                columns={activeColumns}
                columnWidths={columnWidths}
                zebra={index % 2 === 0}
              />
            ))}
            {filteredMotors.length === 0 && (
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
                      {search
                        ? `Δεν βρέθηκαν αποτελέσματα`
                        : 'Δεν υπάρχουν κινητήρες'}
                    </Typography>
                  </Box>
                </CompactTableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredMotors.length}
        itemsPerPage={perPage}
        onPageChange={setPage}
        onItemsPerPageChange={handleItemsPerPageChange}
        showItemsPerPage={true}
      />

    </Box>
  );
}
