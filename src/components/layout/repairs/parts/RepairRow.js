import React, { useState } from 'react';
import { Typography, Chip, IconButton, styled, TableCell, TableRow, Tooltip } from '@mui/material';
import {
  Visibility as VisibilityIcon,
  CheckCircle,
  HourglassEmpty,
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
import { RepairRepository } from '../../../Repositories/RepairRepository';
import { DeleteConfirmationModal } from './DeleteConfirmationModal';

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

export const RepairRow = ({ repair, onView, onEdit, onDelete, zebra }) => {
  const motor = repair?.motor || {};
  const customer = repair?.customer || {};
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

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
      await RepairRepository.softDelete(repair.id);
      if (onDelete) {
        onDelete(repair.id);
      }
      setDeleteModalOpen(false);
    } catch (error) {
      console.error('Error soft deleting repair:', error);
      // You might want to show an error message to the user here
    }
  };

  // Status chip config
  let chipColor = 'default';
  let chipIcon = null;
  if (repair.repairStatus === 'completed') {
    chipColor = 'success';
    chipIcon = <CheckCircle sx={{ fontSize: 16 }} />;
  } else if (repair.repairStatus === 'in-progress') {
    chipColor = 'warning';
    chipIcon = <HourglassEmpty sx={{ fontSize: 16 }} />;
  }

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
        <CompactTableCell>
          <Typography variant="body2" fontWeight={600} fontSize="0.8rem">
            {repair.id}
          </Typography>
        </CompactTableCell>
        <CompactTableCell>
          <Typography variant="body2" fontWeight={600} fontSize="0.8rem">
            {motor.serialNumber || '-'}
          </Typography>
        </CompactTableCell>
        <CompactTableCell>
          <Typography variant="body2" fontWeight={600} fontSize="0.8rem">
            {customer.name || '-'}
          </Typography>
        </CompactTableCell>
        <CompactTableCell>
          <Typography variant="body2" fontSize="0.8rem">
            {motor.description || '-'}
          </Typography>
        </CompactTableCell>
        <CompactTableCell>
          <Typography variant="body2" fontSize="0.8rem">
            {motor.manufacturer || '-'}
          </Typography>
        </CompactTableCell>
        <CompactTableCell>
          <Typography variant="caption" fontSize="0.75rem">
            {motor.kw ? `${motor.kw}kW` : '-'}
          </Typography>
        </CompactTableCell>
        <CompactTableCell>
          <Typography variant="caption" fontSize="0.75rem">
            {motor.hp ? `${motor.hp}hp` : '-'}
          </Typography>
        </CompactTableCell>
        <CompactTableCell>
          <Typography variant="caption" fontSize="0.75rem">
            {motor.rpm ? `${rpm_types_mapping[motor.rpm]}` : '-'}
          </Typography>
        </CompactTableCell>
        <CompactTableCell>
          <Typography variant="caption" fontSize="0.75rem">
            {volt_types_mapping[motor.volt] || '-'}
          </Typography>
        </CompactTableCell>
        <CompactTableCell>
          <Typography variant="caption" fontSize="0.75rem">
            {motor.amps ? motor.amps : '-'}
          </Typography>
        </CompactTableCell>
        <CompactTableCell>
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
        </CompactTableCell>
        <CompactTableCell>
          <Typography variant="caption" fontSize="0.75rem">
            {typeOfMotor_mapping[motor.typeOfMotor] || '-'}
          </Typography>
        </CompactTableCell>
        {/* <CompactTableCell>
          <Chip
            label={repairStatus_mapping[repair.repairStatus]}
            color={chipColor}
            icon={chipIcon}
            size="small"
            variant="filled"
            sx={{ fontWeight: 600, minWidth: 90 }}
          />
        </CompactTableCell> */}
        <CompactTableCell>
          <Typography variant="caption" color="text.secondary" fontSize="0.7rem">
            {repair.isArrived || '-'}
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
