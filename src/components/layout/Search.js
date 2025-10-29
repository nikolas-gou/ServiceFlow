import React from 'react';
import { InputAdornment, Box, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { useSearch } from '../../context/SearchContext';
import Filter from './parts/tools/Filter';
import CustomerFilter from './parts/tools/CustomerFilter';
import { StyledTextField } from '../common/StyledFormComponents';

export default function Search(props) {
  // Get context search for backward compatibility
  const { searchQuery: contextSearchQuery, setSearchQuery } = useSearch();

  const handleSearchInputChange = (e) => {
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
      <StyledTextField
        variant="outlined"
        placeholder={
          showCustomerFilter ? 'Όνομα, email, τηλέφωνο...' : 'Μάρκα, kw, hp, πελάτης, S/N...'
        }
        size="small"
        value={currentSearchValue}
        onChange={handleSearchInputChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon
                sx={{
                  color: '#757575',
                  fontSize: 18,
                  transition: 'color 0.2s',
                  '.MuiOutlinedInput-root.Mui-focused &': {
                    color: '#1976d2',
                  },
                }}
              />
            </InputAdornment>
          ),
          endAdornment: currentSearchValue && (
            <InputAdornment position="end">
              <IconButton
                size="small"
                onClick={clearSearch}
                sx={{
                  color: '#757575',
                  transition: 'all 0.2s',
                  '&:hover': {
                    color: '#d32f2f',
                    background: 'rgba(211, 47, 47, 0.04)',
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
        <CustomerFilter customers={props.customers} onFiltersChange={props.onFiltersChange} />
      )}
      {(showRepairFilter || showRepairFilterByDefault) && (
        <Filter
          repairs={props.repairs}
          filteredRepairs={props.filteredRepairs}
          onFiltersChange={props.onFiltersChange}
        />
      )}
    </Box>
  );
}
