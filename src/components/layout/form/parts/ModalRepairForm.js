import React from 'react';
import { Paper, Modal, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CreateRepairForm from '../CreateRepairForm';
import EditRepairForm from '../EditRepairForm';

export const ModalRepairForm = ({ open, onClose, repair, isEdit }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="repair-modal"
      aria-describedby="repair-form-modal"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '& .MuiBackdrop-root': {
          backdropFilter: 'blur(3px)',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
      }}
    >
      <Paper
        sx={{
          width: '90%',
          maxWidth: '1200px',
          maxHeight: '90vh',
          overflow: 'auto',
          position: 'relative',
          borderRadius: '16px',
          background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
          boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)',
          p: 3,
          '&::-webkit-scrollbar': {
            width: '8px',
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(0, 0, 0, 0.1)',
            borderRadius: '4px',
            '&:hover': {
              background: 'rgba(0, 0, 0, 0.15)',
            },
          },
        }}
      >
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 16,
            top: 16,
            zIndex: 2000,
            color: '#666',
            background: 'rgba(255, 255, 255, 0.9)',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            '&:hover': {
              background: '#fff',
              color: '#1e3c72',
              transform: 'rotate(90deg)',
            },
            transition: 'all 0.2s ease',
          }}
        >
          <CloseIcon />
        </IconButton>
        {!isEdit ? (
          <CreateRepairForm onSubmitSuccess={onClose} />
        ) : (
          <EditRepairForm repair={repair} onSubmitSuccess={onClose} />
        )}
      </Paper>
    </Modal>
  );
};
