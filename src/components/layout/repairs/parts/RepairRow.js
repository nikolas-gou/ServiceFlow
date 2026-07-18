import React, { useState } from 'react';
import { Typography, IconButton, styled, TableCell, TableRow, Tooltip, Box } from '@mui/material';
import {
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import {
  volt_types_mapping,
  typeOfMotor_mapping,
  typeOfVolt_mapping,
  typeOfStep_mapping,
  rpm_types_mapping,
} from '../../../Models/Motor';
import { useSoftDeleteRepair } from '../../../../hooks/useRepairs';
import { DeleteConfirmationModal } from './DeleteConfirmationModal';
import { formatDateNumeric } from '../../../../utils/dateUtils';
import { ACTIONS_COLUMN } from './repairsColumns';

// Styled components για compact εμφάνιση
const CompactTableCell = styled(TableCell)(({ theme }) => ({
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
      color: '#1976d2',
    },
  },
  transition: 'all 0.2s ease',
}));

export const RepairRow = ({ repair, onView, onEdit, zebra, columns, columnWidths }) => {
  const motor = repair?.motor || {};
  const customer = repair?.customer || {};
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const softDeleteMutation = useSoftDeleteRepair();

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setDeleteModalOpen(true);
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    onEdit(repair);
  };

  const handleViewClick = (e) => {
    e.stopPropagation();
    onView(repair);
  };

  const handleDeleteConfirm = async () => {
    try {
      await softDeleteMutation.mutateAsync(repair.id);
      setDeleteModalOpen(false);
    } catch (error) {
      console.error('Error soft deleting repair:', error);
    }
  };

  // Περιεχόμενο κάθε στήλης, keyed by column id (βλ. repairsColumns.js)
  const cellContent = {
    id: (
      <Typography variant="body2" fontWeight={600} fontSize="0.8rem">
        {repair.id}
      </Typography>
    ),
    serialNumber: (
      <Typography variant="body2" fontWeight={600} fontSize="0.8rem">
        {motor.serialNumber || '-'}
      </Typography>
    ),
    customer: (
      <Typography variant="body2" fontWeight={600} fontSize="0.8rem">
        {customer.name || '-'}
      </Typography>
    ),
    description: (
      <Typography variant="body2" fontSize="0.8rem">
        {motor.description || '-'}
      </Typography>
    ),
    manufacturer: (
      <Typography variant="body2" fontSize="0.8rem">
        {motor.manufacturer || '-'}
      </Typography>
    ),
    kw: (
      <Typography variant="caption" fontSize="0.75rem">
        {motor.kw ? `${motor.kw}kW` : '-'}
      </Typography>
    ),
    hp: (
      <Typography variant="caption" fontSize="0.75rem">
        {motor.hp ? `${motor.hp}hp` : '-'}
      </Typography>
    ),
    rpm: (
      <Typography variant="caption" fontSize="0.75rem">
        {motor.rpm ? `${rpm_types_mapping[motor.rpm]}` : '-'}
      </Typography>
    ),
    volt: (
      <Typography variant="caption" fontSize="0.75rem">
        {volt_types_mapping[motor.volt] || '-'}
      </Typography>
    ),
    amps: (
      <Typography variant="caption" fontSize="0.75rem">
        {motor.amps ? motor.amps : '-'}
      </Typography>
    ),
    phase: (
      <Typography variant="caption" fontSize="0.75rem">
        {typeOfVolt_mapping[motor.typeOfVolt] && typeOfStep_mapping[motor.typeOfStep] ? (
          <>
            {typeOfVolt_mapping[motor.typeOfVolt]} (
            <strong>{typeOfStep_mapping[motor.typeOfStep]}</strong>)
          </>
        ) : (
          '-'
        )}
      </Typography>
    ),
    type: (
      <Typography variant="caption" fontSize="0.75rem">
        {typeOfMotor_mapping[motor.typeOfMotor] || '-'}
      </Typography>
    ),
    arrivalDate: (
      <Typography variant="caption" color="text.secondary" fontSize="0.7rem">
        {formatDateNumeric(repair.isArrived)}
      </Typography>
    ),
  };

  return (
    <>
      <CompactTableRow
        hover
        sx={{
          backgroundColor: zebra ? '#f8fafd' : '#fff',
          transition: 'background 0.2s',
          '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.08)' },
        }}
        onClick={() => onView(repair)}
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
          <Tooltip title="Επεξεργασία">
            <IconButton
              size="small"
              sx={{ color: 'warning.main', p: 0.5 }}
              onClick={handleEditClick}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Διαγραφή">
            <IconButton
              size="small"
              sx={{ color: 'error.main', p: 0.5 }}
              onClick={handleDeleteClick}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </CompactTableCell>
      </CompactTableRow>

      <DeleteConfirmationModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        repairData={repair}
      />
    </>
  );
};
