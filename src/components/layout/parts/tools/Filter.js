import React, { useState } from 'react';
import {
  Box,
  IconButton,
  Popover,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Typography,
  Chip,
  Stack,
  Divider,
  styled,
} from '@mui/material';
import {
  FilterList as FilterIcon,
  Clear as ClearIcon,
  Check as CheckIcon,
} from '@mui/icons-material';

import { volt_types_translated } from '../../../Models/Motor';

const FilterButton = styled(IconButton)(({ theme, hasFilters }) => ({
  backgroundColor: hasFilters ? '#e3f2fd' : '#f3f4f6',
  borderRadius: '8px',
  padding: '6px',
  border: hasFilters ? '1px solid #2196f3' : 'none',
  '&:hover': {
    backgroundColor: hasFilters ? '#bbdefb' : '#e5e7eb',
  },
  transition: 'all 0.2s ease',
}));

const FilterPopover = styled(Paper)(({ theme }) => ({
  padding: '16px',
  minWidth: '320px',
  borderRadius: '12px',
  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
}));

export default function Filter({ repairs, onFiltersChange }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [filters, setFilters] = useState({
    manufacturer: '',
    status: '',
    voltType: '',
    kwMin: '',
    kwMax: '',
    serialNumber: '',
  });

  const open = Boolean(anchorEl);

  // Get unique values for dropdowns
  //   ισως να φτιαξω το api να φερνει μαρκες οτι χρεαιζονται ατ φιλτρα category, type, quantity
  const manufacturers =
    [...new Set(repairs?.map((r) => r.motor?.manufacturer).filter(Boolean))] || [];
  // dummy θα το αλλαξω
  const statuses = [...new Set(repairs?.map((r) => r.repairStatus).filter(Boolean))] || [];
  const voltTypes = volt_types_translated; // Από το volt_types_mapping

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const clearAllFilters = () => {
    const emptyFilters = {
      manufacturer: '',
      status: '',
      voltType: '',
      kwMin: '',
      kwMax: '',
      serialNumber: '',
    };
    setFilters(emptyFilters);
    onFiltersChange?.(emptyFilters);
  };

  const hasActiveFilters = Object.values(filters).some((value) => value !== '');
  const activeFiltersCount = Object.values(filters).filter((value) => value !== '').length;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <FilterButton onClick={handleClick} hasFilters={hasActiveFilters}>
        <FilterIcon
          fontSize="small"
          sx={{
            color: hasActiveFilters ? '#2196f3' : '#6b7280',
          }}
        />
        {hasActiveFilters && (
          <Typography
            variant="caption"
            sx={{
              position: 'absolute',
              top: -4,
              right: -4,
              backgroundColor: '#2196f3',
              color: 'white',
              borderRadius: '50%',
              width: 16,
              height: 16,
              fontSize: '0.6rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {activeFiltersCount}
          </Typography>
        )}
      </FilterButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <FilterPopover>
          <Box
            sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
          >
            <Typography variant="subtitle2" fontWeight={600}>
              Φίλτρα
            </Typography>
            {hasActiveFilters && (
              <Button
                size="small"
                onClick={clearAllFilters}
                startIcon={<ClearIcon />}
                sx={{ fontSize: '0.75rem' }}
              >
                Καθαρισμός
              </Button>
            )}
          </Box>

          <Stack spacing={2}>
            {/* Manufacturer Filter */}
            <FormControl fullWidth size="small">
              <InputLabel>Μάρκα</InputLabel>
              <Select
                value={filters.manufacturer}
                label="Μάρκα"
                onChange={(e) => handleFilterChange('manufacturer', e.target.value)}
              >
                <MenuItem value="">Όλες</MenuItem>
                {manufacturers.map((m) => (
                  <MenuItem key={m} value={m}>
                    {m}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Status Filter */}
            <FormControl fullWidth size="small">
              <InputLabel>Κατάσταση</InputLabel>
              <Select
                value={filters.status}
                label="Κατάσταση"
                onChange={(e) => handleFilterChange('status', e.target.value)}
              >
                <MenuItem value="">Όλες</MenuItem>
                {statuses.map((s) => (
                  <MenuItem key={s} value={s}>
                    {s}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Volt Type Filter */}
            <FormControl fullWidth size="small">
              <InputLabel>Τάση</InputLabel>
              <Select
                value={filters.voltType}
                label="Τάση"
                onChange={(e) => handleFilterChange('voltType', e.target.value)}
              >
                <MenuItem value="">Όλες</MenuItem>
                {voltTypes.map((v) => (
                  <MenuItem key={v} value={v}>
                    {v}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Divider />

            {/* kW Range */}
            <Typography variant="caption" color="text.secondary" sx={{ mb: 1 }}>
              Εύρος Ισχύος (kW)
            </Typography>
            <Stack direction="row" spacing={1}>
              <TextField
                size="small"
                label="Από"
                type="number"
                value={filters.kwMin}
                onChange={(e) => handleFilterChange('kwMin', e.target.value)}
                sx={{ width: '50%' }}
              />
              <TextField
                size="small"
                label="Έως"
                type="number"
                value={filters.kwMax}
                onChange={(e) => handleFilterChange('kwMax', e.target.value)}
                sx={{ width: '50%' }}
              />
            </Stack>

            {/* Active Filters Display */}
            {hasActiveFilters && (
              <>
                <Divider />
                <Box>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ mb: 1, display: 'block' }}
                  >
                    Ενεργά φίλτρα:
                  </Typography>
                  <Stack direction="row" spacing={0.5} flexWrap="wrap" gap={0.5}>
                    {filters.manufacturer && (
                      <Chip
                        label={`Μάρκα: ${filters.manufacturer}`}
                        size="small"
                        onDelete={() => handleFilterChange('manufacturer', '')}
                        color="primary"
                        variant="outlined"
                      />
                    )}
                    {filters.status && (
                      <Chip
                        label={`Κατάσταση: ${filters.status}`}
                        size="small"
                        onDelete={() => handleFilterChange('status', '')}
                        color="primary"
                        variant="outlined"
                      />
                    )}
                    {filters.voltType && (
                      <Chip
                        label={`Τάση: ${filters.voltType}`}
                        size="small"
                        onDelete={() => handleFilterChange('voltType', '')}
                        color="primary"
                        variant="outlined"
                      />
                    )}
                    {(filters.kwMin || filters.kwMax) && (
                      <Chip
                        label={`kW: ${filters.kwMin || '∞'}-${filters.kwMax || '∞'}`}
                        size="small"
                        onDelete={() => {
                          handleFilterChange('kwMin', '');
                          handleFilterChange('kwMax', '');
                        }}
                        color="primary"
                        variant="outlined"
                      />
                    )}
                  </Stack>
                </Box>
              </>
            )}
          </Stack>
        </FilterPopover>
      </Popover>
    </>
  );
}
