import React from 'react';
import { Box } from '@mui/material';
import { Close as CloseIcon, Cable as CableIcon } from '@mui/icons-material';

import {
  StyledModal,
  ModalHeader,
  HeaderIcon,
  HeaderTitle,
  HeaderSubtitle,
  StyledCloseButton,
  ModalContent,
} from '../../../common/styled/CommonModals';
import { StyledPaper } from '../../../common/styled/CommonPapers';
import CreateConnectionForm from '../CreateConnectionForm';

export const ModalConnectionForm = ({ open, onClose, connection, isEdit }) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <StyledModal
      open={open}
      onClose={handleClose}
      aria-labelledby="connection-modal-title"
      aria-describedby="connection-form-modal"
      closeAfterTransition
    >
      <StyledPaper className={open ? 'modal-enter' : ''}>
        <ModalHeader>
          <HeaderIcon>
            <CableIcon />
          </HeaderIcon>
          <Box flex={1}>
            <HeaderTitle id="connection-modal-title">Καταχώρηση Νέας Σύνδεσης</HeaderTitle>
            <HeaderSubtitle>Συμπληρώστε τα στοιχεία για τη νέα σύνδεση</HeaderSubtitle>
          </Box>
          <StyledCloseButton aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </StyledCloseButton>
        </ModalHeader>

        <ModalContent>
          {!isEdit ? (
            // <CreateRepairForm onSubmitSuccess={handleClose} />
            <CreateConnectionForm onSubmitSuccess={handleClose} />
          ) : (
            // <EditRepairForm repair={repair} onSubmitSuccess={handleClose} />
            <>on edit</>
          )}
        </ModalContent>
      </StyledPaper>
    </StyledModal>
  );
};
