import { useNavigate } from 'react-router-dom';
import { Typography, Chip, IconButton, styled, TableCell, TableRow, Tooltip } from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import { Visibility as VisibilityIcon } from '@mui/icons-material';
import type { ReactNode, MouseEvent } from 'react';
import { volt_types_mapping, typeOfMotor_mapping, rpm_types_mapping } from '../../../Models/Motor';
import { formatDateNumeric } from '../../../../utils/dateUtils';
import { ACTIONS_COLUMN } from './motorColumns';
import type { TableColumnDef } from '../../../../types/table';
import type { MotorListItem } from '../../../../types/motor';

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

interface MotorRowProps {
  motor: MotorListItem;
  zebra?: boolean;
  columns: TableColumnDef[];
  columnWidths: Record<string, number>;
}

export const MotorRow = ({ motor, zebra, columns, columnWidths }: MotorRowProps) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleViewClick = (e: MouseEvent) => {
    e.stopPropagation();
    navigate(`/dashboard/motors/${motor.id}`);
  };

  const typeOfMotorLabel = typeOfMotor_mapping[motor.typeOfMotor] || motor.typeOfMotor || '-';
  const voltLabel = volt_types_mapping[motor.volt] || motor.volt || '-';
  const rpmLabel = rpm_types_mapping[motor.rpm] || motor.rpm || '-';

  const cellContent: Record<string, ReactNode> = {
    id: (
      <Typography variant="caption" color="text.secondary" fontSize="0.75rem">
        #{motor.id}
      </Typography>
    ),
    manufacturer: (
      <Typography variant="body2" fontWeight={600} fontSize="0.8rem">
        {motor.manufacturer || '-'}
      </Typography>
    ),
    description: (
      <Typography variant="caption" fontSize="0.75rem">
        {motor.description || '-'}
      </Typography>
    ),
    kw: (
      <Typography variant="caption" fontSize="0.75rem">
        {motor.kw || '-'}
      </Typography>
    ),
    hp: (
      <Typography variant="caption" fontSize="0.75rem">
        {motor.hp || '-'}
      </Typography>
    ),
    rpm: (
      <Typography variant="caption" fontSize="0.75rem">
        {rpmLabel}
      </Typography>
    ),
    volt: (
      <Typography variant="caption" fontSize="0.75rem">
        {voltLabel}
      </Typography>
    ),
    typeOfMotor: (
      <Chip
        label={typeOfMotorLabel}
        size="small"
        sx={{
          fontWeight: 600,
          fontSize: '0.7rem',
          height: '22px',
          backgroundColor: 'rgba(42, 82, 152, 0.1)',
          color: '#2a5298',
        }}
      />
    ),
    repairsCount: (
      <Chip
        label={motor.repairsCount || 0}
        size="small"
        sx={{
          fontWeight: 600,
          fontSize: '0.75rem',
          height: '22px',
          minWidth: '28px',
          backgroundColor:
            (motor.repairsCount || 0) > 1
              ? 'rgba(255, 152, 0, 0.12)'
              : 'rgba(76, 175, 80, 0.12)',
          color: (motor.repairsCount || 0) > 1 ? '#e65100' : '#2e7d32',
        }}
      />
    ),
    createdAt: (
      <Typography variant="caption" color="text.secondary" fontSize="0.75rem">
        {formatDateNumeric(motor.createdAt)}
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
      onClick={() => navigate(`/dashboard/motors/${motor.id}`)}
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
        <Tooltip title="Προβολή ιστορικού">
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
