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
  Close as CloseIcon,
} from '@mui/icons-material';

import { volt_types, volt_types_mapping } from '../../../Models/Motor';
import { StyledFormControl } from '../../../common/StyledFormComponents';

const FilterButton = styled(IconButton)(({ theme, hasFilters }) => ({
  background: hasFilters
    ? 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)'
    : 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
  borderRadius: '12px',
  padding: '8px',
  border: hasFilters ? '1.5px solid #2196f3' : 'none',
  boxShadow: hasFilters ? '0 2px 8px rgba(33, 150, 243, 0.15)' : '0 1px 4px rgba(0,0,0,0.06)',
  transition: 'all 0.2s cubic-bezier(.4,2,.6,1)',
  '&:hover': {
    background: hasFilters
      ? 'linear-gradient(135deg, #bbdefb 0%, #e3f2fd 100%)'
      : 'linear-gradient(135deg, #e5e7eb 0%, #f3f4f6 100%)',
    boxShadow: '0 4px 16px rgba(33, 150, 243, 0.18)',
  },
  position: 'relative',
}));

const FilterPopover = styled(Paper)(({ theme }) => ({
  padding: '24px 20px',
  minWidth: '340px',
  borderRadius: '18px',
  boxShadow: '0 12px 32px rgba(30,60,114,0.13)',
  background: 'rgba(255,255,255,0.85)',
  backdropFilter: 'blur(8px)',
  opacity: 0,
  animation: 'fadeInPopover 0.35s ease forwards',
  '@keyframes fadeInPopover': {
    from: { opacity: 0, transform: 'translateY(16px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
  },
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#e0e0e0',
    transition: 'all 0.2s',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#bdbdbd',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#1976d2',
    boxShadow: '0 0 0 3px rgba(25, 118, 210, 0.08)',
  },
  '& .MuiSelect-select': {
    padding: '8px 14px',
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#e0e0e0',
      transition: 'all 0.2s',
    },
    '&:hover fieldset': {
      borderColor: '#bdbdbd',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#1976d2',
      boxShadow: '0 0 0 3px rgba(25, 118, 210, 0.08)',
    },
  },
  '& input': {
    padding: '8px 14px',
  },
}));

// Pulse effect για τα chips
const PulseChip = styled(Chip)(({ theme }) => ({
  fontWeight: 500,
  boxShadow: '0 2px 8px rgba(33,150,243,0.10)',
  background: 'linear-gradient(90deg, #e3f2fd 0%, #bbdefb 100%)',
  animation: 'chipPulse 0.35s',
  '@keyframes chipPulse': {
    '0%': { transform: 'scale(1)' },
    '50%': { transform: 'scale(1.08)' },
    '100%': { transform: 'scale(1)' },
  },
  '& .MuiChip-deleteIcon': {
    color: '#1976d2',
    '&:hover': { color: '#d32f2f' },
  },
}));

export default function Filter({ repairs, filteredRepairs, onFiltersChange }) {
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
  const manufacturers =
    [...new Set(repairs?.map((r) => r.motor?.manufacturer).filter(Boolean))] || [];

  // Υπολογισμός του πλήθους για κάθε μάρκα
  const manufacturerCounts =
    filteredRepairs?.reduce((acc, repair) => {
      const manufacturer = repair.motor?.manufacturer;
      if (manufacturer) {
        acc[manufacturer] = (acc[manufacturer] || 0) + 1;
      }
      return acc;
    }, {}) || {};

  // dummy θα το αλλαξω
  const statuses = [...new Set(repairs?.map((r) => r.repairStatus).filter(Boolean))] || [];
  const voltTypes = volt_types; // Από το volt_types_mapping

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
            sx={{
              mb: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <FilterIcon sx={{ color: 'primary.main', fontSize: 20 }} />
              <Typography variant="subtitle2" fontWeight={600}>
                Φίλτρα
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
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
              <IconButton
                size="small"
                onClick={handleClose}
                sx={{
                  color: 'text.secondary',
                  '&:hover': { color: 'text.primary' },
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>

          <Stack spacing={2}>
            {/* Manufacturer Filter */}
            <StyledFormControl fullWidth size="small">
              <InputLabel>Μάρκα</InputLabel>
              <StyledSelect
                value={filters.manufacturer}
                label="Μάρκα"
                onChange={(e) => handleFilterChange('manufacturer', e.target.value)}
              >
                <MenuItem value="">Όλες</MenuItem>
                {manufacturers.map((m) => (
                  <MenuItem key={m} value={m}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                      <span>{m}</span>
                      <Typography
                        variant="caption"
                        sx={{
                          color: 'text.secondary',
                          ml: 2,
                        }}
                      >
                        ({manufacturerCounts[m]})
                      </Typography>
                    </Box>
                  </MenuItem>
                ))}
              </StyledSelect>
            </StyledFormControl>

            {/* Status Filter */}
            <StyledFormControl fullWidth size="small">
              <InputLabel>Κατάσταση</InputLabel>
              <StyledSelect
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
              </StyledSelect>
            </StyledFormControl>

            {/* Volt Type Filter */}
            <StyledFormControl fullWidth size="small">
              <InputLabel>Τάση</InputLabel>
              <StyledSelect
                value={filters.voltType}
                label="Τάση"
                onChange={(e) => handleFilterChange('voltType', e.target.value)}
              >
                <MenuItem value="">Όλες</MenuItem>
                {volt_types.map((v) => (
                  <MenuItem key={v} value={v}>
                    {volt_types_mapping[v]}
                  </MenuItem>
                ))}
              </StyledSelect>
            </StyledFormControl>

            {/* kW Range Filter */}
            <Box sx={{ display: 'flex', gap: 2 }}>
              <StyledTextField
                label="kW από"
                type="number"
                size="small"
                value={filters.kwMin}
                onChange={(e) => handleFilterChange('kwMin', e.target.value)}
                InputProps={{ inputProps: { min: 0, step: 0.1 } }}
              />
              <StyledTextField
                label="kW έως"
                type="number"
                size="small"
                value={filters.kwMax}
                onChange={(e) => handleFilterChange('kwMax', e.target.value)}
                InputProps={{ inputProps: { min: 0, step: 0.1 } }}
              />
            </Box>
          </Stack>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <Box sx={{ mt: 3 }}>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                Ενεργά φίλτρα
              </Typography>
              <Stack direction="row" spacing={0.5} flexWrap="wrap" gap={0.5}>
                {filters.manufacturer && (
                  <Chip
                    label={`Μάρκα: ${filters.manufacturer}`}
                    onDelete={() => handleFilterChange('manufacturer', '')}
                    size="small"
                    sx={{
                      backgroundColor: 'rgba(25, 118, 210, 0.08)',
                      borderColor: 'rgba(25, 118, 210, 0.12)',
                      color: '#1976d2',
                      '& .MuiChip-deleteIcon': {
                        color: '#1976d2',
                        '&:hover': {
                          color: '#d32f2f',
                        },
                      },
                    }}
                  />
                )}
                {filters.status && (
                  <Chip
                    label={`Κατάσταση: ${filters.status}`}
                    onDelete={() => handleFilterChange('status', '')}
                    size="small"
                    sx={{
                      backgroundColor: 'rgba(25, 118, 210, 0.08)',
                      borderColor: 'rgba(25, 118, 210, 0.12)',
                      color: '#1976d2',
                      '& .MuiChip-deleteIcon': {
                        color: '#1976d2',
                        '&:hover': {
                          color: '#d32f2f',
                        },
                      },
                    }}
                  />
                )}
                {filters.voltType && (
                  <Chip
                    label={`Τάση: ${volt_types_mapping[filters.voltType]}`}
                    onDelete={() => handleFilterChange('voltType', '')}
                    size="small"
                    sx={{
                      backgroundColor: 'rgba(25, 118, 210, 0.08)',
                      borderColor: 'rgba(25, 118, 210, 0.12)',
                      color: '#1976d2',
                      '& .MuiChip-deleteIcon': {
                        color: '#1976d2',
                        '&:hover': {
                          color: '#d32f2f',
                        },
                      },
                    }}
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
          )}
        </FilterPopover>
      </Popover>
    </>
  );
}
