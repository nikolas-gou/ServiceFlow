import { useState, useCallback } from 'react';
import { Box } from '@mui/material';
import { Close as CloseIcon, Build as BuildIcon } from '@mui/icons-material';
import EditRepairForm from '../EditRepairForm';
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
import type { RepairJSON } from '../../../Models/Repair';

interface ModalRepairFormProps {
  open: boolean;
  onClose: () => void;
  repair?: RepairJSON | null;
}

export const ModalRepairForm = ({ open, onClose, repair }: ModalRepairFormProps) => {
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const handleDirtyChange = useCallback((dirty: boolean) => {
    setHasUnsavedChanges(Boolean(dirty));
  }, []);

  const handleClose = useCallback(() => {
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
  }, [hasUnsavedChanges, onClose]);

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
            <HeaderTitle id="repair-modal-title">Επεξεργασία Επισκευής</HeaderTitle>
            <HeaderSubtitle>Τροποποιήστε τα στοιχεία της επισκευής</HeaderSubtitle>
          </Box>
          <StyledCloseButton aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </StyledCloseButton>
        </ModalHeader>

        <ModalContent>
          <EditRepairForm
            repair={repair}
            onSubmitSuccess={() => {
              setHasUnsavedChanges(false);
              onClose();
            }}
            onDirtyChange={handleDirtyChange}
          />
        </ModalContent>
      </StyledPaper>
    </StyledModal>
  );
};
