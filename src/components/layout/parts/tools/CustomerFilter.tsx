import { useState, type MouseEvent } from 'react';
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
  type SelectChangeEvent,
} from '@mui/material';
import { TuneRounded as FilterIcon, Clear as ClearIcon, Close as CloseIcon } from '@mui/icons-material';
import { alpha } from '@mui/material/styles';
import { customerType_types, customerType_mapping, customerType_colors } from '../../../Models/Customer';
import { StyledFormControl, StyledTextField } from '../../../common/StyledFormComponents';
import { brand } from '../../../../styles/colors';
import type { CustomerFilterValues } from '../../../../types/searchFilters';

const EMPTY_FILTERS: CustomerFilterValues = {
  type: '',
  email: '',
};

interface FilterButtonProps {
  hasFilters?: boolean;
}

const FilterButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'hasFilters',
})<FilterButtonProps>(({ theme, hasFilters }) => ({
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
  minWidth: '320px',
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

const TypeDot = ({ color }: { color?: string }) => (
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
  '& .MuiChip-deleteIcon': {
    color: 'primary.main',
    marginRight: '6px',
    '&:hover': { color: '#d32f2f' },
  },
};

interface CustomerFilterProps {
  filters?: CustomerFilterValues;
  onFiltersChange?: (filters: CustomerFilterValues) => void;
}

export default function CustomerFilter({ filters, onFiltersChange }: CustomerFilterProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const currentFilters = filters || EMPTY_FILTERS;

  const open = Boolean(anchorEl);

  const handleFilterChange = (key: keyof CustomerFilterValues, value: string) => {
    onFiltersChange?.({ ...currentFilters, [key]: value });
  };

  const clearAllFilters = () => {
    onFiltersChange?.({ ...EMPTY_FILTERS });
  };

  const hasActiveFilters = Object.values(currentFilters).some((value) => value !== '');
  const activeFiltersCount = Object.values(currentFilters).filter((value) => value !== '').length;

  const handleClick = (event: MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
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
            sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <FilterIcon sx={{ color: 'primary.main', fontSize: 20 }} />
              <Typography variant="subtitle2" fontWeight={600}>
                Φίλτρα Πελατών
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

          <Stack spacing={2}>
            {/* Type Filter */}
            <StyledFormControl fullWidth size="small">
              <InputLabel>Τύπος</InputLabel>
              <StyledSelect
                value={currentFilters.type}
                label="Τύπος"
                onChange={(e: SelectChangeEvent<unknown>) => handleFilterChange('type', e.target.value as string)}
              >
                <MenuItem value="">Όλοι</MenuItem>
                {customerType_types.map((type) => (
                  <MenuItem key={type} value={type}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <TypeDot color={customerType_colors[type].dark} />
                      <span>{customerType_mapping[type]}</span>
                    </Box>
                  </MenuItem>
                ))}
              </StyledSelect>
            </StyledFormControl>

            {/* Email Filter */}
            <StyledTextField
              size="small"
              label="Email"
              value={currentFilters.email}
              onChange={(e) => handleFilterChange('email', e.target.value)}
              placeholder="Αναζήτηση με email..."
            />
          </Stack>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <Box sx={{ mt: 3 }}>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                Ενεργά φίλτρα
              </Typography>
              <Stack direction="row" spacing={0.5} flexWrap="wrap" gap={0.5}>
                {currentFilters.type && (
                  <Chip
                    icon={<TypeDot color={customerType_colors[currentFilters.type].dark} />}
                    label={`Τύπος: ${customerType_mapping[currentFilters.type]}`}
                    onDelete={() => handleFilterChange('type', '')}
                    size="small"
                    sx={activeFilterChipSx}
                  />
                )}
                {currentFilters.email && (
                  <Chip
                    label={`Email: ${currentFilters.email}`}
                    onDelete={() => handleFilterChange('email', '')}
                    size="small"
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
