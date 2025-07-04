import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton,
  Divider,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

export const DeleteConfirmationModal = ({ open, onClose, onConfirm, repairData }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
        },
      }}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            backdropFilter: 'blur(2px)',
          },
        },
      }}
    >
      <Box>
        <DialogTitle
          sx={{
            p: 2.5,
            pb: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontSize: '1.125rem', fontWeight: 600, color: 'rgba(0, 0, 0, 0.87)' }}
          >
            Διαγραφή Επισκευής
          </Typography>
          <IconButton
            size="small"
            onClick={onClose}
            sx={{
              color: 'text.secondary',
              '&:hover': { transform: 'rotate(90deg)' },
              transition: 'transform 0.2s',
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </DialogTitle>
        <Divider />
      </Box>

      <DialogContent sx={{ px: 2.5, pb: 2 }}>
        <Typography variant="body1" sx={{ mb: 2, color: 'text.primary' }}>
          Είστε σίγουροι ότι θέλετε να διαγράψετε αυτή την επισκευή;
        </Typography>

        {repairData && (
          <Box sx={{ mb: 1 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              <strong>Σειριακός Αριθμός:</strong> {repairData.motor?.serialNumber || '-'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Πελάτης:</strong> {repairData.customer?.name || '-'}
            </Typography>
          </Box>
        )}

        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          * Η επισκευή θα μεταφερθεί στον κάδο ανακύκλωσης
        </Typography>
      </DialogContent>

      <DialogActions sx={{ px: 2.5, pb: 2.5 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          size="large"
          sx={{
            borderRadius: 1.5,
            textTransform: 'none',
            fontWeight: 500,
            minWidth: 100,
          }}
        >
          Άκυρο
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color="error"
          size="large"
          sx={{
            borderRadius: 1.5,
            textTransform: 'none',
            fontWeight: 500,
            minWidth: 100,
          }}
        >
          Διαγραφή
        </Button>
      </DialogActions>
    </Dialog>
  );
};
