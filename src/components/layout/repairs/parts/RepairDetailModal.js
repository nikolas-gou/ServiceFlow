import React from 'react';
import { Box, Typography, IconButton, Modal, Backdrop, Fade, styled } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import EnhancedMotorRepairDisplay from '../../parts/EnhancedMotorRepairDisplay';

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

export const RepairDetailModal = ({ open, repair, onClose }) => {
  if (!repair) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 300,
        sx: {
          backdropFilter: 'blur(3px)',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
      }}
    >
      <Fade in={open} timeout={300}>
        <Box sx={ModalStyle}>
          <ModalHeader>
            <Box>
              <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
                Λεπτομέρειες Επισκευής
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <IconButton
                onClick={onClose}
                sx={{
                  color: 'text.secondary',
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
          </ModalHeader>

          <ModalContent>
            <EnhancedMotorRepairDisplay repair={repair} />
          </ModalContent>
        </Box>
      </Fade>
    </Modal>
  );
};
