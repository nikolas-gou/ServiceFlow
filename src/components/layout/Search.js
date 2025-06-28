import React from 'react';
import { TextField, InputAdornment, Box, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { useSearch } from '../../context/SearchContext';
import Filter from './parts/tools/Filter';
import CustomerFilter from './parts/tools/CustomerFilter';

export default function Search({ repairs, customers, onFiltersChange }) {
  const { searchQuery, setSearchQuery } = useSearch();

  const today = new Date().toLocaleDateString('el-GR', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  // Determine which filter to show based on available data
  const showCustomerFilter = customers && !repairs;
  const showRepairFilter = repairs && !customers;
  const showRepairFilterByDefault = repairs && customers; // Default to repair filter if both are provided

  return (
    <Box display="flex" alignItems="center" gap={1.5} justifyContent="space-between" width="100%">
      <Box flexGrow={1} />

      {/* Search Field */}
      <TextField
        variant="outlined"
        placeholder={
          showCustomerFilter ? 'Όνομα, email, τηλέφωνο...' : 'Μάρκα, kw, hp, πελάτης, S/N...'
        }
        size="small"
        value={searchQuery}
        onChange={handleSearchChange}
        sx={{
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          minWidth: 280,
          '& .MuiOutlinedInput-root': {
            fontSize: 14,
            height: 36,
            '& fieldset': {
              border: '1px solid #e5e7eb',
            },
            '&:hover fieldset': {
              borderColor: '#d1d5db',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#2196f3',
              borderWidth: '2px',
            },
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: '#9ca3af', fontSize: 18 }} />
            </InputAdornment>
          ),
          endAdornment: searchQuery && (
            <InputAdornment position="end">
              <IconButton
                size="small"
                onClick={clearSearch}
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

      {/* Filter Component */}
      {showCustomerFilter && (
        <CustomerFilter customers={customers} onFiltersChange={onFiltersChange} />
      )}
      {(showRepairFilter || showRepairFilterByDefault) && (
        <Filter repairs={repairs} onFiltersChange={onFiltersChange} />
      )}
    </Box>
  );
}
