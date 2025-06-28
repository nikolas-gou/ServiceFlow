import React from 'react';
import { Box } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';

export default function DateDisplay({ repairs, onFiltersChange }) {
  const today = new Date().toLocaleDateString('el-GR', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });

  return (
    <Box display="flex" alignItems="center" gap={1.5} justifyContent="space-between" width="100%">
      <Box flexGrow={1} />
      {/* Date Display */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          padding: '6px 12px',
          fontSize: 14,
          color: '#6b7280',
          border: '1px solid #e5e7eb',
          minWidth: '130px',
        }}
      >
        <EventIcon sx={{ fontSize: 16, mr: 0.5, color: '#9ca3af' }} />
        {today}
      </Box>
    </Box>
  );
}
