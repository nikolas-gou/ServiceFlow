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
  Tooltip,
  Snackbar,
  Alert,
  InputAdornment,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RecyclingRoundedIcon from '@mui/icons-material/RecyclingRounded';
import UnarchiveRoundedIcon from '@mui/icons-material/UnarchiveRounded';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { useRepairsTrashQuery, useRestoreRepair } from '../../../hooks/useRepairs';
import { RepairDetailModal } from './parts/RepairDetailModal';
import PaginationComponent from '../pagination/PaginationComponent';
import { StyledTextField } from '../../common/StyledFormComponents';
import { formatDateNumeric } from '../../../utils/dateUtils';

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
  },
}));

const CompactTableRow = styled(TableRow)(({ theme }) => ({
  transition: 'all 0.2s ease',
  '&:hover': { backgroundColor: '#f8f9fa' },
}));

export default function RepairsTrash() {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [search, setSearch] = useState('');

  const { data: result, isLoading } = useRepairsTrashQuery({ page, perPage, search });
  const restoreMutation = useRestoreRepair();

  const repairs = result?.data || [];
  const pagination = result?.pagination || { currentPage: 1, totalPages: 0, totalItems: 0, perPage };

  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedRepair, setSelectedRepair] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleView = (repair) => {
    setSelectedRepair(repair);
    setViewModalOpen(true);
  };

  const handleRestore = async (repair) => {
    try {
      await restoreMutation.mutateAsync(repair.id);
      setSnackbar({ open: true, message: 'Η επισκευή επαναφέρθηκε επιτυχώς', severity: 'success' });
    } catch (error) {
      setSnackbar({ open: true, message: 'Αποτυχία επαναφοράς της επισκευής', severity: 'error' });
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

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
          <Tooltip title="Πίσω στις επισκευές">
            <IconButton
              onClick={() => navigate('/dashboard/services')}
              sx={{
                width: 38,
                height: 38,
                borderRadius: '999px',
                border: '1.5px solid #e2e5ea',
                '&:hover': { backgroundColor: '#f5f7fa' },
              }}
            >
              <ArrowBackIcon fontSize="small" sx={{ color: '#68727e' }} />
            </IconButton>
          </Tooltip>
          <Box
            sx={{
              width: 4,
              height: 24,
              backgroundColor: '#43a047',
              borderRadius: 4,
            }}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <RecyclingRoundedIcon sx={{ color: '#43a047', fontSize: 20 }} />
            <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 600 }}>
              Κάδος Ανακύκλωσης
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
              <Divider orientation="vertical" flexItem sx={{ mx: 1, height: 16 }} />
              <Typography
                variant="body2"
                sx={{ color: 'text.secondary', fontSize: '0.875rem', fontWeight: 500 }}
              >
                {pagination.totalItems}
              </Typography>
            </Box>
          </Box>
        </Box>

        <StyledTextField
          variant="outlined"
          placeholder="Μάρκα, πελάτης, S/N..."
          size="small"
          value={search}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: '#9aa4b1', fontSize: 18 }} />
              </InputAdornment>
            ),
            endAdornment: search && (
              <InputAdornment position="end">
                <IconButton size="small" onClick={() => setSearch('')}>
                  <ClearIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          maxHeight: '55vh',
          boxShadow: '0 2px 8px rgba(25,118,210,0.08)',
          borderRadius: '16px',
        }}
      >
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <CompactTableCell width={60}>ID</CompactTableCell>
              <CompactTableCell>S/N</CompactTableCell>
              <CompactTableCell>Πελάτης</CompactTableCell>
              <CompactTableCell>Μάρκα</CompactTableCell>
              <CompactTableCell>Περιγραφή Κινητήρα</CompactTableCell>
              <CompactTableCell>Ημ. Παραλαβής</CompactTableCell>
              <CompactTableCell>Ημ. Διαγραφής</CompactTableCell>
              <CompactTableCell width={100}>Ενέργειες</CompactTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {repairs.map((repair) => {
              const motor = repair.motor || {};
              const customer = repair.customer || {};
              return (
                <CompactTableRow key={repair.id}>
                  <CompactTableCell>{repair.id}</CompactTableCell>
                  <CompactTableCell>{motor.serialNumber || '-'}</CompactTableCell>
                  <CompactTableCell>{customer.name || '-'}</CompactTableCell>
                  <CompactTableCell>{motor.manufacturer || '-'}</CompactTableCell>
                  <CompactTableCell>{motor.description || '-'}</CompactTableCell>
                  <CompactTableCell>{formatDateNumeric(repair.isArrived)}</CompactTableCell>
                  <CompactTableCell>{formatDateNumeric(repair.deletedAt)}</CompactTableCell>
                  <CompactTableCell sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Tooltip title="Προβολή">
                      <IconButton
                        size="small"
                        sx={{
                          color: '#1976d2',
                          backgroundColor: 'rgba(25, 118, 210, 0.10)',
                          p: 0.5,
                          '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.2)' },
                        }}
                        onClick={() => handleView(repair)}
                      >
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Επαναφορά">
                      <IconButton
                        size="small"
                        sx={{
                          color: '#43a047',
                          backgroundColor: 'rgba(67, 160, 71, 0.12)',
                          p: 0.5,
                          '&:hover': { backgroundColor: 'rgba(67, 160, 71, 0.22)' },
                        }}
                        onClick={() => handleRestore(repair)}
                        disabled={restoreMutation.isPending}
                      >
                        <UnarchiveRoundedIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </CompactTableCell>
                </CompactTableRow>
              );
            })}
            {repairs.length === 0 && !isLoading && (
              <TableRow>
                <CompactTableCell colSpan={8} align="center">
                  <Box
                    sx={{
                      py: 4,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      color: 'text.secondary',
                    }}
                  >
                    <RecyclingRoundedIcon sx={{ fontSize: 48, mb: 1, color: '#c5cad1' }} />
                    <Typography variant="body2">
                      {search ? 'Δεν βρέθηκαν αποτελέσματα' : 'Ο κάδος ανακύκλωσης είναι άδειος'}
                    </Typography>
                  </Box>
                </CompactTableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <PaginationComponent
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        totalItems={pagination.totalItems}
        itemsPerPage={pagination.perPage}
        onPageChange={setPage}
        onItemsPerPageChange={(value) => {
          setPerPage(value);
          setPage(1);
        }}
        showItemsPerPage={true}
      />

      <RepairDetailModal
        open={viewModalOpen}
        repair={selectedRepair}
        onClose={() => setViewModalOpen(false)}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity={snackbar.severity} variant="filled" sx={{ borderRadius: '10px' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
