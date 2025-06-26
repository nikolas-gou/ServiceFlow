import React from 'react';
import { Box, Typography, Chip, IconButton, styled, Modal, Backdrop, Fade } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { repairStatus_mapping } from '../../Models/Motor';
import EnhancedMotorRepairDisplay from '../parts/EnhancedMotorRepairDisplay';

// Modal styling
const ModalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '95vw',
  maxWidth: '1200px',
  maxHeight: '90vh',
  bgcolor: 'background.paper',
  borderRadius: 3,
  boxShadow: 24,
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
};

const ModalHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2, 3),
  borderBottom: '1px solid #e0e0e0',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#f8f9fa',
  minHeight: '60px',
}));

const ModalContent = styled(Box)({
  flex: 1,
  overflow: 'auto',
  padding: '0',
});

/**
 * Modal component για εμφάνιση λεπτομερειών επισκευής
 * @param {boolean} open - Κατάσταση ανοίγματος του modal
 * @param {Object} repair - Αντικείμενο επισκευής
 * @param {Function} onClose - Function για κλείσιμο του modal
 */
export default function ModalRepairs({ open, repair, onClose }) {
  // Early return αν δεν υπάρχει repair
  if (!repair) return null;

  // Συνάρτηση για να πάρουμε το σωστό χρώμα του status chip
  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'success';
      case 'In-progress':
        return 'info';
      case 'Pending':
        return 'warning';
      case 'Cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 300,
        sx: { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
      }}
    >
      <Fade in={open} timeout={300}>
        <Box sx={ModalStyle}>
          {/* Modal Header */}
          <ModalHeader>
            <Box>
              <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
                Λεπτομέρειες Επισκευής
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {repair.motor?.manufacturer || 'Άγνωστη μάρκα'} -{' '}
                {repair.motor?.serialNumber || 'Χωρίς S/N'}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              {/* Status Chip */}
              <Chip
                label={
                  repairStatus_mapping[repair.repairStatus] || repair.repairStatus || 'Άγνωστο'
                }
                color={getStatusColor(repair.repairStatus)}
                size="small"
                sx={{ fontWeight: 'bold' }}
              />

              {/* Close Button */}
              <IconButton
                onClick={onClose}
                sx={{
                  color: 'text.secondary',
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                }}
                aria-label="κλείσιμο modal"
              >
                <CloseIcon />
              </IconButton>
            </Box>
          </ModalHeader>

          {/* Modal Content */}
          <ModalContent>
            <EnhancedMotorRepairDisplay repair={repair} />
          </ModalContent>
        </Box>
      </Fade>
    </Modal>
  );
}
