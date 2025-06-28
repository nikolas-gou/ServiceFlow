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
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          minWidth: 280,
          '& .MuiOutlinedInput-root': {
            fontSize: 14,
            height: 40,
            '& fieldset': {
              borderColor: '#e0e0e0',
            },
            '&:hover fieldset': {
              borderColor: '#bdbdbd',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#1976d2',
            },
            '& input': {
              color: '#333333',
              '&::placeholder': {
                color: '#757575',
                opacity: 1,
              },
            },
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: '#757575', fontSize: 20 }} />
            </InputAdornment>
          ),
          endAdornment: searchQuery && (
            <InputAdornment position="end">
              <IconButton
                size="small"
                onClick={clearSearch}
                sx={{
                  color: '#757575',
                  '&:hover': {
                    color: '#1976d2',
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
        <CustomerFilter customers={customers} onFiltersChange={onFiltersChange} />
      )}
      {(showRepairFilter || showRepairFilterByDefault) && (
        <Filter repairs={repairs} onFiltersChange={onFiltersChange} />
      )}
    </Box>
  );
}
