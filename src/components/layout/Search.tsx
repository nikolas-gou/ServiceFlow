import { InputAdornment, Box, IconButton, TextField, styled } from '@mui/material';
import type { ChangeEvent } from 'react';
import { alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { useSearch } from '../../context/SearchContext';
import Filter from './parts/tools/Filter';
import CustomerFilter from './parts/tools/CustomerFilter';
import type { RepairFilterValues, CustomerFilterValues } from '../../types/searchFilters';
import type { CustomerJSON } from '../Models/Customer';
import type { RepairJSON } from '../Models/Repair';

const SearchField = styled(TextField)(({ theme }) => ({
  minWidth: 300,
  '& .MuiOutlinedInput-root': {
    height: 42,
    borderRadius: '999px',
    backgroundColor: '#fff',
    paddingLeft: '4px',
    transition: 'all 0.2s ease',
    '& fieldset': {
      borderColor: '#e2e5ea',
      borderWidth: '1.5px',
    },
    '&:hover fieldset': {
      borderColor: '#c7cdd6',
    },
    '&.Mui-focused': {
      boxShadow: `0 3px 10px ${alpha(theme.palette.primary.main, 0.15)}`,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
      borderWidth: '1.5px',
    },
  },
  '& .MuiOutlinedInput-input': {
    padding: '0 8px',
    fontSize: '0.875rem',
    '&::placeholder': {
      color: theme.palette.text.secondary,
      opacity: 1,
    },
  },
}));

interface SearchProps {
  customers?: CustomerJSON[];
  repairs?: RepairJSON[];
  filters?: RepairFilterValues | CustomerFilterValues | Record<string, never>;
  onFiltersChange?: ((filters: RepairFilterValues) => void) | ((filters: CustomerFilterValues) => void);
  onSearchChange?: (value: string) => void;
  searchValue?: string;
}

export default function Search(props: SearchProps) {
  // Get context search for backward compatibility
  const { searchQuery: contextSearchQuery, setSearchQuery } = useSearch();

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (props.onSearchChange) {
      // Use local search pattern
      props.onSearchChange(e.target.value);
    } else {
      // on customer page(fix ti in future todo)
      setSearchQuery(e.target.value);
    }
  };

  const clearSearch = () => {
    if (props.onSearchChange) {
      // Use local search pattern
      props.onSearchChange('');
    } else {
      // on customer page(fix ti in future todo)
      setSearchQuery('');
    }
  };

  // Use local search value if provided, otherwise use context(on customer page(fix ti in future todo))
  const currentSearchValue =
    props.searchValue !== undefined ? props.searchValue : contextSearchQuery;

  // Determine which filter to show based on available data
  const showCustomerFilter = props.customers && !props.repairs;
  const showRepairFilter = props.repairs && !props.customers;
  const showRepairFilterByDefault = props.repairs && props.customers; // Default to repair filter if both are provided

  return (
    <Box display="flex" alignItems="center" gap={2.5} justifyContent="space-between" width="100%">
      <Box flexGrow={1} />

      {/* Search Field */}
      <SearchField
        variant="outlined"
        placeholder={
          showCustomerFilter ? 'Όνομα, email, τηλέφωνο...' : 'Μάρκα, kw, hp, πελάτης, S/N...'
        }
        size="small"
        value={currentSearchValue}
        onChange={handleSearchInputChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" sx={{ pl: 1.25 }}>
              <SearchIcon
                sx={{
                  color: 'text.secondary',
                  fontSize: 19,
                  transition: 'color 0.2s',
                  '.MuiOutlinedInput-root.Mui-focused &': {
                    color: 'primary.main',
                  },
                }}
              />
            </InputAdornment>
          ),
          endAdornment: currentSearchValue && (
            <InputAdornment position="end" sx={{ pr: 0.5 }}>
              <IconButton
                size="small"
                onClick={clearSearch}
                sx={{
                  color: 'text.secondary',
                  transition: 'all 0.2s',
                  '&:hover': {
                    color: '#d32f2f',
                    background: 'rgba(211, 47, 47, 0.08)',
                  },
                }}
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {/* Filter Component */}
      {showCustomerFilter && (
        <CustomerFilter
          filters={props.filters as CustomerFilterValues | undefined}
          onFiltersChange={props.onFiltersChange as ((filters: CustomerFilterValues) => void) | undefined}
        />
      )}
      {(showRepairFilter || showRepairFilterByDefault) && (
        <Filter
          repairs={props.repairs}
          filters={props.filters as RepairFilterValues | undefined}
          onFiltersChange={props.onFiltersChange as ((filters: RepairFilterValues) => void) | undefined}
        />
      )}
    </Box>
  );
}
