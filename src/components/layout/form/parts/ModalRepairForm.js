import React, { useState, useCallback } from 'react';
import { Paper, Modal, IconButton, Box, Typography } from '@mui/material';
import { Close as CloseIcon, Build as BuildIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import CreateRepairForm from '../CreateRepairForm';
import EditRepairForm from '../EditRepairForm';

// Styled Components για το Modal
const StyledModal = styled(Modal)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& .MuiBackdrop-root': {
    backdropFilter: 'blur(8px)',
    backgroundColor: 'rgba(30, 60, 114, 0.4)',
    transition: 'all 0.3s ease',
  },
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  width: '90%',
  maxWidth: '1200px',
  maxHeight: '90vh',
  overflow: 'hidden',
  position: 'relative',
  borderRadius: '20px',
  background: 'linear-gradient(135deg, #ffffff 0%, #f8fafb 100%)',
  boxShadow: '0 20px 40px rgba(30, 60, 114, 0.15), 0 8px 16px rgba(0, 0, 0, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  display: 'flex',
  flexDirection: 'column',
  transform: 'scale(0.95)',
  transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
  '&.modal-enter': {
    transform: 'scale(1)',
  },
  [theme.breakpoints.down('lg')]: {
    width: '95%',
    maxWidth: '900px',
    maxHeight: '85vh',
  },
}));

const ModalHeader = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
  padding: theme.spacing(2.5, 3),
  position: 'relative',
  borderRadius: '20px 20px 0 0',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  [theme.breakpoints.down('lg')]: {
    padding: theme.spacing(2, 2.5),
  },
}));

const HeaderIcon = styled(Box)(({ theme }) => ({
  width: 48,
  height: 48,
  borderRadius: '12px',
  background:
    'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  '& .MuiSvgIcon-root': {
    color: '#ffb74d',
    fontSize: '24px',
    filter: 'drop-shadow(0 2px 4px rgba(255, 183, 77, 0.3))',
  },
}));

const HeaderTitle = styled(Typography)(({ theme }) => ({
  color: 'white',
  fontWeight: 700,
  fontSize: '1.5rem',
  textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
  letterSpacing: '0.5px',
  flex: 1,
}));

const HeaderSubtitle = styled(Typography)(({ theme }) => ({
  color: 'rgba(255, 255, 255, 0.8)',
  fontSize: '0.875rem',
  marginTop: theme.spacing(0.5),
  letterSpacing: '0.25px',
}));

const StyledCloseButton = styled(IconButton)(({ theme }) => ({
  color: 'rgba(255, 255, 255, 0.8)',
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  width: 44,
  height: 44,
  transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.2)',
    color: 'white',
    transform: 'rotate(90deg) scale(1.1)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
  },
  '& .MuiSvgIcon-root': {
    fontSize: '20px',
  },
}));

const ModalContent = styled(Box)(({ theme }) => ({
  flex: 1,
  overflow: 'auto',
  position: 'relative',
  '&::-webkit-scrollbar': {
    width: '8px',
    background: 'transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
    borderRadius: '4px',
    '&:hover': {
      background: 'linear-gradient(135deg, #2a5298 0%, #1e3c72 100%)',
    },
  },
  '&::-webkit-scrollbar-track': {
    background: 'rgba(0, 0, 0, 0.05)',
    borderRadius: '4px',
  },
}));

export const ModalRepairForm = ({ open, onClose, repair, isEdit }) => {
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const handleDirtyChange = useCallback((dirty) => {
    setHasUnsavedChanges(Boolean(dirty));
  }, []);

  const handleClose = useCallback(
    (event, reason) => {
      if (hasUnsavedChanges) {
        const confirmClose = window.confirm(
          'Υπάρχουν μη αποθηκευμένες αλλαγές. Είσαι σίγουρος ότι θέλεις να κλείσεις; Τα στοιχεία θα χαθούν.',
        );
        if (!confirmClose) {
          // Ακύρωση κλεισίματος
          return;
        }
      }
      onClose();
    },
    [hasUnsavedChanges, onClose],
  );

  return (
    <StyledModal
      open={open}
      onClose={handleClose}
      aria-labelledby="repair-modal-title"
      aria-describedby="repair-form-modal"
      closeAfterTransition
    >
      <StyledPaper className={open ? 'modal-enter' : ''}>
        <ModalHeader>
          <HeaderIcon>
            <BuildIcon />
          </HeaderIcon>
          <Box flex={1}>
            <HeaderTitle id="repair-modal-title">
              {!isEdit ? 'Καταχώρηση Νέας Επισκευής' : 'Επεξεργασία Επισκευής'}
            </HeaderTitle>
            <HeaderSubtitle>
              {!isEdit
                ? 'Συμπληρώστε τα στοιχεία για τη νέα επισκευή'
                : 'Τροποποιήστε τα στοιχεία της επισκευής'}
            </HeaderSubtitle>
          </Box>
          <StyledCloseButton aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </StyledCloseButton>
        </ModalHeader>

        <ModalContent>
          {!isEdit ? (
            <CreateRepairForm
              onSubmitSuccess={() => {
                setHasUnsavedChanges(false);
                onClose();
              }}
              onDirtyChange={handleDirtyChange}
            />
          ) : (
            <EditRepairForm
              repair={repair}
              onSubmitSuccess={() => {
                setHasUnsavedChanges(false);
                onClose();
              }}
              onDirtyChange={handleDirtyChange}
            />
          )}
        </ModalContent>
      </StyledPaper>
    </StyledModal>
  );
};
