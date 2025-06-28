import React from 'react';
import { Typography, Chip, IconButton, styled, TableCell, TableRow } from '@mui/material';
import { Visibility as VisibilityIcon } from '@mui/icons-material';

// Styled components για compact εμφάνιση
const CompactTableCell = styled(TableCell)(({ theme }) => ({
  padding: '6px 8px',
  fontSize: '0.8rem',
  '&.MuiTableCell-head': {
    fontWeight: 600,
    backgroundColor: '#f8f9fa',
    borderBottom: '2px solid #e9ecef',
    fontSize: '0.75rem',
    padding: '8px',
  },
}));

const CompactTableRow = styled(TableRow)(({ theme }) => ({
  '&:hover': {
    backgroundColor: '#f8f9fa',
    cursor: 'pointer',
    '& .view-icon': {
      color: '#1976d2',
    },
  },
  transition: 'all 0.2s ease',
}));

export const CustomerRow = ({ customer, index, onOpenModal }) => {
  const getTypeChip = (type) => {
    const typeConfig = {
      individual: { label: 'Ιδιώτης', color: '#2196f3' },
      factory: { label: 'Εργοστάσιο', color: '#ff9800' },
    };

    const config = typeConfig[type] || { label: type, color: '#757575' };

    return (
      <Chip
        label={config.label}
        size="small"
        sx={{
          backgroundColor: config.color,
          color: 'white',
          fontSize: '0.65rem',
          height: '20px',
          '& .MuiChip-label': {
            px: 1,
          },
        }}
      />
    );
  };

  return (
    <CompactTableRow onClick={() => onOpenModal(customer)}>
      <CompactTableCell>
        <Typography variant="body2" fontSize="0.8rem" noWrap sx={{ maxWidth: '150px' }}>
          {customer.name || '-'}
        </Typography>
      </CompactTableCell>

      <CompactTableCell>{getTypeChip(customer.type)}</CompactTableCell>

      <CompactTableCell>
        <Typography variant="caption" fontSize="0.75rem" noWrap sx={{ maxWidth: '120px' }}>
          {customer.email || '-'}
        </Typography>
      </CompactTableCell>

      <CompactTableCell>
        <Typography variant="caption" fontSize="0.75rem">
          {customer.phone || '-'}
        </Typography>
      </CompactTableCell>

      <CompactTableCell>
        <Typography variant="caption" fontSize="0.75rem">
          {customer.createdAt ? new Date(customer.createdAt).toLocaleDateString('el-GR') : '-'}
        </Typography>
      </CompactTableCell>

      <CompactTableCell sx={{ width: '50px' }}>
        <IconButton
          size="small"
          className="view-icon"
          onClick={(e) => {
            e.stopPropagation();
            onOpenModal(customer);
          }}
        >
          <VisibilityIcon fontSize="small" />
        </IconButton>
      </CompactTableCell>
    </CompactTableRow>
  );
};
