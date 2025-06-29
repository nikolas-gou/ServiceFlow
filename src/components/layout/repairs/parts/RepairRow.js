import React, { useState } from 'react';
import { Typography, Chip, IconButton, styled, TableCell, TableRow } from '@mui/material';
import { Visibility as VisibilityIcon } from '@mui/icons-material';
import {
  volt_types_mapping,
  repairStatus_mapping,
  typeOfMotor_mapping,
  typeOfVolt_mapping,
  typeOfStep_mapping,
} from '../../../Models/Motor';

const statusColors = {
  Pending: '#ff9800',
  'In-progress': '#2196f3',
  Completed: '#4caf50',
  Cancelled: '#f44336',
};

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

export const RepairRow = ({ repair, index, onOpenModal }) => {
  const getStatusChip = (status) => {
    const color = statusColors[status] || '#757575';
    return (
      <Chip
        label={repairStatus_mapping[status]}
        size="small"
        sx={{
          backgroundColor: color,
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

  // Safety checks για να αποφύγουμε undefined errors
  const motor = repair?.motor || {};
  const customer = repair?.customer || {};

  return (
    <CompactTableRow onClick={() => onOpenModal(repair)}>
      <CompactTableCell>
        <Typography variant="body2" fontWeight={600} fontSize="0.8rem">
          {motor.serialNumber || '-'}
        </Typography>
      </CompactTableCell>

      <CompactTableCell>
        <Typography variant="body2" fontSize="0.8rem" noWrap sx={{ maxWidth: '120px' }}>
          {customer.name || '-'}
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
          {volt_types_mapping[motor.volt] || '-'}
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

      <CompactTableCell>{getStatusChip(repair.repairStatus)}</CompactTableCell>

      <CompactTableCell>
        <Typography variant="caption" color="text.secondary" fontSize="0.7rem">
          {repair.isArrived || '-'}
        </Typography>
      </CompactTableCell>

      <CompactTableCell sx={{ width: '50px' }}>
        <IconButton
          size="small"
          className="view-icon"
          onClick={(e) => {
            e.stopPropagation();
            onOpenModal(repair);
          }}
        >
          <VisibilityIcon fontSize="small" />
        </IconButton>
      </CompactTableCell>
    </CompactTableRow>
  );
};
