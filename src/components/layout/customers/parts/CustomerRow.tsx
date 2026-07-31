import { Typography, Chip, IconButton, styled, TableCell, TableRow, Tooltip } from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import { Visibility as VisibilityIcon } from '@mui/icons-material';
import type { ReactNode, MouseEvent } from 'react';
import { customerType_mapping, customerType_colors } from '../../../Models/Customer';
import type { CustomerJSON } from '../../../Models/Customer';
import { formatDateNumeric } from '../../../../utils/dateUtils';
import { ACTIONS_COLUMN } from './customersColumns';
import type { TableColumnDef } from '../../../../types/table';

// Styled components για compact εμφάνιση
const CompactTableCell = styled(TableCell)(() => ({
  padding: '6px 8px',
  fontSize: '0.8rem',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
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
      color: theme.palette.primary.main,
    },
  },
  transition: 'all 0.2s ease',
}));

interface CustomerRowProps {
  customer: CustomerJSON;
  onOpenModal: (customer: CustomerJSON) => void;
  zebra?: boolean;
  columns: TableColumnDef[];
  columnWidths: Record<string, number>;
}

export const CustomerRow = ({ customer, onOpenModal, zebra, columns, columnWidths }: CustomerRowProps) => {
  const theme = useTheme();
  const typeColor = customerType_colors[customer.type] || { base: '#e0e0e0', dark: '#616161' };
  const typeLabel = customerType_mapping[customer.type] || customer.type;

  const handleViewClick = (e: MouseEvent) => {
    e.stopPropagation();
    onOpenModal(customer);
  };

  // Περιεχόμενο κάθε στήλης, keyed by column id (βλ. customersColumns.js)
  const cellContent: Record<string, ReactNode> = {
    id: (
      <Typography variant="caption" color="text.secondary" fontSize="0.75rem">
        #{customer.id}
      </Typography>
    ),
    name: (
      <Typography variant="body2" fontWeight={600} fontSize="0.8rem">
        {customer.name || '-'}
      </Typography>
    ),
    type: (
      <Chip
        label={typeLabel}
        size="small"
        sx={{
          fontWeight: 600,
          fontSize: '0.75rem',
          height: '24px',
          backgroundColor: `${typeColor.base}33`,
          color: typeColor.dark,
        }}
      />
    ),
    email: (
      <Typography variant="caption" fontSize="0.75rem">
        {customer.email || '-'}
      </Typography>
    ),
    phone: (
      <Typography variant="caption" fontSize="0.75rem">
        {customer.phone || '-'}
      </Typography>
    ),
    createdAt: (
      <Typography variant="caption" color="text.secondary" fontSize="0.75rem">
        {formatDateNumeric(customer.createdAt)}
      </Typography>
    ),
  };

  return (
    <CompactTableRow
      hover
      sx={{
        backgroundColor: zebra ? '#f8fafd' : '#fff',
        transition: 'background 0.2s',
        '&:hover': { backgroundColor: alpha(theme.palette.primary.main, 0.08) },
      }}
      onClick={() => onOpenModal(customer)}
    >
      {columns.map((col) => (
        <CompactTableCell key={col.id} sx={{ width: columnWidths[col.id] }}>
          {cellContent[col.id]}
        </CompactTableCell>
      ))}
      <CompactTableCell
        sx={{
          width: ACTIONS_COLUMN.width,
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
          overflow: 'visible',
        }}
      >
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
