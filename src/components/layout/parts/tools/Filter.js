import React, { useState } from 'react';
import {
  Box,
  IconButton,
  Popover,
  Paper,
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
  TuneRounded as FilterIcon,
  Clear as ClearIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { alpha } from '@mui/material/styles';
import { brand } from '../../../../styles/colors';

import {
  volt_types,
  volt_types_mapping,
  rpm_types,
  rpm_types_mapping,
  typeOfMotor,
  typeOfMotor_mapping,
  repairStatus_types,
  repairStatus_mapping,
  repairStatus_colors,
} from '../../../Models/Motor';
import { formatDateNumeric } from '../../../../utils/dateUtils';
import { StyledFormControl } from '../../../common/StyledFormComponents';

const EMPTY_FILTERS = {
  status: '',
  typeOfMotor: '',
  manufacturer: '',
  voltType: '',
  rpm: '',
  kwMin: '',
  kwMax: '',
  dateFrom: '',
  dateTo: '',
};

const FilterButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'hasFilters',
})(({ theme, hasFilters }) => ({
  width: 40,
  height: 40,
  borderRadius: '12px',
  backgroundColor: hasFilters ? theme.palette.primary.main : alpha(theme.palette.primary.main, 0.1),
  border: 'none',
  boxShadow: hasFilters ? `0 3px 10px ${alpha(theme.palette.primary.main, 0.28)}` : 'none',
  transition: 'all 0.15s ease',
  '&:hover': {
    backgroundColor: hasFilters
      ? theme.palette.primary.dark
      : alpha(theme.palette.primary.main, 0.18),
  },
  position: 'relative',
}));

const FilterPopover = styled(Paper)(({ theme }) => ({
  padding: '20px',
  minWidth: '380px',
  maxWidth: '420px',
  borderRadius: '18px',
  boxShadow: `0 12px 32px ${alpha(theme.palette.primary.dark, 0.13)}`,
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
    borderColor: theme.palette.primary.main,
    boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.08)}`,
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
      borderColor: theme.palette.primary.main,
      boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.08)}`,
    },
  },
  '& input': {
    padding: '8px 14px',
  },
}));

const SectionLabel = ({ children }) => (
  <Typography
    variant="caption"
    sx={{
      fontWeight: 700,
      color: 'text.secondary',
      textTransform: 'uppercase',
      letterSpacing: '0.06em',
      fontSize: '0.68rem',
    }}
  >
    {children}
  </Typography>
);

const StatusDot = ({ color }) => (
  <Box
    component="span"
    sx={{
      width: 9,
      height: 9,
      borderRadius: '50%',
      backgroundColor: color,
      display: 'inline-block',
      flexShrink: 0,
    }}
  />
);

const activeFilterChipSx = {
  height: 30,
  borderRadius: '999px',
  backgroundColor: alpha(brand.main, 0.08),
  border: `1px solid ${alpha(brand.main, 0.15)}`,
  color: 'primary.main',
  fontWeight: 500,
  fontSize: '0.78rem',
  '& .MuiChip-label': {
    px: 1.25,
  },
  '& .MuiChip-icon': {
    marginLeft: '10px',
    marginRight: '-2px',
  },
  '& .MuiChip-deleteIcon': {
    color: 'primary.main',
    marginRight: '6px',
    '&:hover': { color: '#d32f2f' },
  },
};

export default function Filter({ repairs, filters, onFiltersChange }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const currentFilters = filters || EMPTY_FILTERS;

  const open = Boolean(anchorEl);

  // Μοναδικές τιμές μάρκας για το dropdown
  const manufacturers =
    [...new Set(repairs?.map((r) => r.motor?.manufacturer).filter(Boolean))] || [];

  const handleFilterChange = (key, value) => {
    onFiltersChange?.({ ...currentFilters, [key]: value });
  };

  const clearAllFilters = () => {
    onFiltersChange?.({ ...EMPTY_FILTERS });
  };

  const hasActiveFilters = Object.values(currentFilters).some((value) => value !== '');
  const activeFiltersCount = Object.values(currentFilters).filter((value) => value !== '').length;

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <FilterButton onClick={handleClick} hasFilters={hasActiveFilters}>
        <FilterIcon fontSize="small" sx={{ color: hasActiveFilters ? '#fff' : 'primary.main' }} />
        {hasActiveFilters && (
          <Typography
            variant="caption"
            sx={{
              position: 'absolute',
              top: -5,
              right: -5,
              backgroundColor: '#fff',
              color: 'primary.main',
              borderWidth: '1.5px',
              borderStyle: 'solid',
              borderColor: 'primary.main',
              borderRadius: '50%',
              width: 18,
              height: 18,
              fontSize: '0.62rem',
              fontWeight: 700,
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
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
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
                sx={{ color: 'text.secondary', '&:hover': { color: 'text.primary' } }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>

          <Stack spacing={2.5}>
            {/* Κατάσταση & Τύπος */}
            <Stack spacing={1}>
              <SectionLabel>Κατάσταση & Τύπος</SectionLabel>
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
                <StyledFormControl fullWidth size="small">
                  <InputLabel>Κατάσταση</InputLabel>
                  <StyledSelect
                    value={currentFilters.status}
                    label="Κατάσταση"
                    onChange={(e) => handleFilterChange('status', e.target.value)}
                  >
                    <MenuItem value="">Όλες</MenuItem>
                    {repairStatus_types.map((s) => (
                      <MenuItem key={s} value={s}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
                          <StatusDot color={repairStatus_colors[s]} />
                          <span>{repairStatus_mapping[s]}</span>
                        </Box>
                      </MenuItem>
                    ))}
                  </StyledSelect>
                </StyledFormControl>

                <StyledFormControl fullWidth size="small">
                  <InputLabel>Τύπος</InputLabel>
                  <StyledSelect
                    value={currentFilters.typeOfMotor}
                    label="Τύπος"
                    onChange={(e) => handleFilterChange('typeOfMotor', e.target.value)}
                  >
                    <MenuItem value="">Όλοι</MenuItem>
                    {typeOfMotor.map((t) => (
                      <MenuItem key={t} value={t}>
                        {typeOfMotor_mapping[t]}
                      </MenuItem>
                    ))}
                  </StyledSelect>
                </StyledFormControl>
              </Box>
            </Stack>

            <Divider />

            {/* Χαρακτηριστικά Κινητήρα */}
            <Stack spacing={1.5}>
              <SectionLabel>Χαρακτηριστικά Κινητήρα</SectionLabel>

              <StyledFormControl fullWidth size="small">
                <InputLabel>Μάρκα</InputLabel>
                <StyledSelect
                  value={currentFilters.manufacturer}
                  label="Μάρκα"
                  onChange={(e) => handleFilterChange('manufacturer', e.target.value)}
                >
                  <MenuItem value="">Όλες</MenuItem>
                  {manufacturers.map((m) => (
                    <MenuItem key={m} value={m}>
                      {m}
                    </MenuItem>
                  ))}
                </StyledSelect>
              </StyledFormControl>

              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
                <StyledFormControl fullWidth size="small">
                  <InputLabel>Τάση</InputLabel>
                  <StyledSelect
                    value={currentFilters.voltType}
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

                <StyledFormControl fullWidth size="small">
                  <InputLabel>Στροφές</InputLabel>
                  <StyledSelect
                    value={currentFilters.rpm}
                    label="Στροφές"
                    onChange={(e) => handleFilterChange('rpm', e.target.value)}
                  >
                    <MenuItem value="">Όλες</MenuItem>
                    {rpm_types.map((r) => (
                      <MenuItem key={r} value={r}>
                        {rpm_types_mapping[r]}
                      </MenuItem>
                    ))}
                  </StyledSelect>
                </StyledFormControl>
              </Box>

              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
                <StyledTextField
                  label="kW από"
                  type="number"
                  size="small"
                  value={currentFilters.kwMin}
                  onChange={(e) => handleFilterChange('kwMin', e.target.value)}
                  InputProps={{ inputProps: { min: 0, step: 0.1 } }}
                />
                <StyledTextField
                  label="kW έως"
                  type="number"
                  size="small"
                  value={currentFilters.kwMax}
                  onChange={(e) => handleFilterChange('kwMax', e.target.value)}
                  InputProps={{ inputProps: { min: 0, step: 0.1 } }}
                />
              </Box>
            </Stack>

            <Divider />

            {/* Ημερομηνία Παραλαβής */}
            <Stack spacing={1}>
              <SectionLabel>Ημερομηνία Παραλαβής</SectionLabel>
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
                <StyledTextField
                  label="Από"
                  type="date"
                  size="small"
                  value={currentFilters.dateFrom}
                  onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
                <StyledTextField
                  label="Έως"
                  type="date"
                  size="small"
                  value={currentFilters.dateTo}
                  onChange={(e) => handleFilterChange('dateTo', e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </Box>
            </Stack>
          </Stack>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <Box sx={{ mt: 3 }}>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                Ενεργά φίλτρα
              </Typography>
              <Stack direction="row" spacing={0.5} flexWrap="wrap" gap={0.5}>
                {currentFilters.status && (
                  <Chip
                    icon={<StatusDot color={repairStatus_colors[currentFilters.status]} />}
                    label={`Κατάσταση: ${repairStatus_mapping[currentFilters.status]}`}
                    onDelete={() => handleFilterChange('status', '')}
                    size="small"
                    sx={activeFilterChipSx}
                  />
                )}
                {currentFilters.typeOfMotor && (
                  <Chip
                    label={`Τύπος: ${typeOfMotor_mapping[currentFilters.typeOfMotor]}`}
                    onDelete={() => handleFilterChange('typeOfMotor', '')}
                    size="small"
                    sx={activeFilterChipSx}
                  />
                )}
                {currentFilters.manufacturer && (
                  <Chip
                    label={`Μάρκα: ${currentFilters.manufacturer}`}
                    onDelete={() => handleFilterChange('manufacturer', '')}
                    size="small"
                    sx={activeFilterChipSx}
                  />
                )}
                {currentFilters.voltType && (
                  <Chip
                    label={`Τάση: ${volt_types_mapping[currentFilters.voltType]}`}
                    onDelete={() => handleFilterChange('voltType', '')}
                    size="small"
                    sx={activeFilterChipSx}
                  />
                )}
                {currentFilters.rpm && (
                  <Chip
                    label={`Στροφές: ${rpm_types_mapping[currentFilters.rpm]}`}
                    onDelete={() => handleFilterChange('rpm', '')}
                    size="small"
                    sx={activeFilterChipSx}
                  />
                )}
                {(currentFilters.kwMin || currentFilters.kwMax) && (
                  <Chip
                    label={`kW: ${currentFilters.kwMin || '∞'}-${currentFilters.kwMax || '∞'}`}
                    size="small"
                    onDelete={() => {
                      onFiltersChange?.({ ...currentFilters, kwMin: '', kwMax: '' });
                    }}
                    sx={activeFilterChipSx}
                  />
                )}
                {(currentFilters.dateFrom || currentFilters.dateTo) && (
                  <Chip
                    label={`Παραλαβή: ${
                      currentFilters.dateFrom ? formatDateNumeric(currentFilters.dateFrom) : '...'
                    } - ${currentFilters.dateTo ? formatDateNumeric(currentFilters.dateTo) : '...'}`}
                    size="small"
                    onDelete={() => {
                      onFiltersChange?.({ ...currentFilters, dateFrom: '', dateTo: '' });
                    }}
                    sx={activeFilterChipSx}
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
