import React, { useState } from 'react';
import {
  Box,
  IconButton,
  Popover,
  Paper,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography,
  Chip,
  Stack,
  Divider,
  styled,
  InputAdornment,
} from '@mui/material';
import { FilterList as FilterIcon, Clear as ClearIcon } from '@mui/icons-material';
import { StyledFormControl, StyledTextField } from '../../../common/StyledFormComponents';

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

export default function CustomerFilter({ customers, onFiltersChange }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [filters, setFilters] = useState({
    type: '',
    email: '',
  });

  const open = Boolean(anchorEl);

  // Get unique values for dropdowns
  const types = [...new Set(customers?.map((c) => c.type).filter(Boolean))] || [];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const clearAllFilters = () => {
    const emptyFilters = {
      type: '',
      email: '',
    };
    setFilters(emptyFilters);
    onFiltersChange?.(emptyFilters);
  };

  const clearFilter = (key) => {
    handleFilterChange(key, '');
  };

  const hasActiveFilters = Object.values(filters).some((value) => value !== '');
  const activeFiltersCount = Object.values(filters).filter((value) => value !== '').length;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getTypeLabel = (type) => {
    const typeLabels = {
      individual: 'Ιδιώτης',
      factory: 'Εργοστάσιο',
    };
    return typeLabels[type] || type;
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
              Φίλτρα Πελατών
            </Typography>
            {hasActiveFilters && (
              <Button
                size="small"
                onClick={clearAllFilters}
                startIcon={<ClearIcon />}
                sx={{ fontSize: '0.75rem' }}
              >
                Καθαρισμός Όλων
              </Button>
            )}
          </Box>

          <Stack spacing={2}>
            {/* Type Filter */}
            <StyledFormControl fullWidth size="small">
              <InputLabel>Τύπος</InputLabel>
              <Select
                value={filters.type}
                label="Τύπος"
                onChange={(e) => handleFilterChange('type', e.target.value)}
                endAdornment={
                  filters.type && (
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        onClick={() => clearFilter('type')}
                        sx={{
                          color: '#9ca3af',
                          '&:hover': { color: '#ef4444' },
                        }}
                      >
                        <ClearIcon fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  )
                }
              >
                <MenuItem value="">Όλοι</MenuItem>
                {types.map((type) => (
                  <MenuItem key={type} value={type}>
                    {getTypeLabel(type)}
                  </MenuItem>
                ))}
              </Select>
            </StyledFormControl>

            {/* Email Filter */}
            <StyledTextField
              size="small"
              label="Email"
              value={filters.email}
              onChange={(e) => handleFilterChange('email', e.target.value)}
              placeholder="Αναζήτηση με email..."
              InputProps={{
                endAdornment: filters.email && (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      onClick={() => clearFilter('email')}
                      sx={{
                        color: '#9ca3af',
                        '&:hover': { color: '#ef4444' },
                      }}
                    >
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

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
                    {filters.type && (
                      <Chip
                        label={`Τύπος: ${getTypeLabel(filters.type)}`}
                        size="small"
                        onDelete={() => clearFilter('type')}
                        color="primary"
                        variant="outlined"
                      />
                    )}
                    {filters.email && (
                      <Chip
                        label={`Email: ${filters.email}`}
                        size="small"
                        onDelete={() => clearFilter('email')}
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
