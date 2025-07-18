import React from 'react';
import { Snackbar, Alert } from '@mui/material';

/**
 * Reusable ErrorSnackbar component για εμφάνιση error notifications
 * @param {Object} props
 * @param {boolean} props.open - Αν το snackbar είναι ανοιχτό
 * @param {string} props.message - Το μήνυμα προς εμφάνιση
 * @param {Function} props.onClose - Handler για κλείσιμο του snackbar
 * @param {number} props.autoHideDuration - Χρόνος αυτόματου κλεισίματος (default: 6000ms)
 * @param {'top'|'bottom'} props.vertical - Κάθετη θέση (default: 'bottom')
 * @param {'left'|'center'|'right'} props.horizontal - Οριζόντια θέση (default: 'center')
 * @param {'error'|'warning'|'info'|'success'} props.severity - Τύπος alert (default: 'warning')
 */
export default function ErrorSnackbar({
  open,
  message,
  onClose,
  autoHideDuration = 6000,
  vertical = 'bottom',
  horizontal = 'center',
  severity = 'warning',
}) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical, horizontal }}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
