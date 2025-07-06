import React from 'react';
import { Typography, Chip, IconButton, styled, TableCell, TableRow, Tooltip } from '@mui/material';
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

export const CustomerRow = ({ customer, index, onOpenModal, zebra }) => {
  const getTypeChip = (type) => {
    const typeConfig = {
      individual: { label: 'Ιδιώτης', color: 'info' },
      factory: { label: 'Εργοστάσιο', color: 'warning' },
    };

    const config = typeConfig[type] || { label: type, color: 'default' };

    return (
      <Chip
        label={config.label}
        size="small"
        color={config.color}
        variant="filled"
        sx={{
          fontWeight: 600,
          minWidth: 90,
          fontSize: '0.75rem',
          height: '24px',
        }}
      />
    );
  };

  const handleViewClick = (e) => {
    e.stopPropagation();
    onOpenModal(customer);
  };

  return (
    <CompactTableRow
      hover
      sx={{
        backgroundColor: zebra ? '#f8fafd' : '#fff',
        transition: 'background 0.2s',
        '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.08)' },
      }}
      onClick={() => onOpenModal(customer)}
    >
      <CompactTableCell>
        <Typography variant="body2" fontWeight={600} fontSize="0.8rem">
          {customer.name || '-'}
        </Typography>
      </CompactTableCell>

      <CompactTableCell>{getTypeChip(customer.type)}</CompactTableCell>

      <CompactTableCell>
        <Typography variant="caption" fontSize="0.75rem">
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

      <CompactTableCell sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <Tooltip title="Προβολή">
          <IconButton
            size="small"
            className="view-icon"
            sx={{ color: 'primary.main', p: 0.5 }}
            onClick={handleViewClick}
          >
            <VisibilityIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </CompactTableCell>
    </CompactTableRow>
  );
};
