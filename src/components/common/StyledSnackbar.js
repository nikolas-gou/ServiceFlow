import React from 'react';
import { Snackbar, Alert, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { CheckCircleOutline as SuccessIcon, ErrorOutline as ErrorIcon } from '@mui/icons-material';

// Styled Components για τα Enhanced Alerts
const StyledSnackbarWrapper = styled(Snackbar)(({ theme }) => ({
  '& .MuiAlert-root': {
    borderRadius: '16px',
    padding: theme.spacing(2, 3),
    fontSize: '0.95rem',
    fontWeight: 500,
    backdropFilter: 'blur(10px)',
    border: '1px solid',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
    minWidth: '350px',
    '& .MuiAlert-icon': {
      fontSize: '24px',
      marginRight: theme.spacing(2),
    },
    '& .MuiAlert-message': {
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing(1),
    },
  },
  '& .MuiAlert-standardSuccess': {
    background:
      'linear-gradient(135deg, rgba(76, 175, 80, 0.95) 0%, rgba(102, 187, 106, 0.95) 100%)',
    borderColor: 'rgba(76, 175, 80, 0.3)',
    color: 'white',
    '& .MuiAlert-icon': {
      color: 'white',
    },
  },
  '& .MuiAlert-standardError': {
    background:
      'linear-gradient(135deg, rgba(244, 67, 54, 0.95) 0%, rgba(229, 115, 115, 0.95) 100%)',
    borderColor: 'rgba(244, 67, 54, 0.3)',
    color: 'white',
    '& .MuiAlert-icon': {
      color: 'white',
    },
  },
}));

/**
 * Enhanced Styled Snackbar Component
 *
 * @param {boolean} open - Καθορίζει αν το snackbar είναι ανοιχτό/εμφανές
 * @param {function} onClose - Callback function που καλείται όταν κλείνει το snackbar
 * @param {string} severity - Τύπος snackbar ('success', 'error', 'warning', 'info')
 * @param {string} title - Τίτλος του snackbar
 * @param {string} message - Μήνυμα περιγραφής του snackbar
 * @param {number} autoHideDuration - Διάρκεια αυτόματου κλεισίματος σε ms (default: 4000)
 * @param {object} anchorOrigin - Θέση εμφάνισης { vertical: 'top'|'bottom', horizontal: 'left'|'center'|'right' }
 * @param {...any} props - Επιπλέον props που περνούν στο Snackbar component
 *
 * @example
 * // Success Snackbar
 * <StyledSnackbar
 *   open={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   severity="success"
 *   title="Επιτυχία!"
 *   message="Η ενέργεια ολοκληρώθηκε με επιτυχία"
 * />
 *
 * @example
 * // Error Snackbar
 * <StyledSnackbar
 *   open={hasError}
 *   onClose={() => setHasError(false)}
 *   severity="error"
 *   title="Σφάλμα"
 *   message="Παρουσιάστηκε πρόβλημα"
 *   anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
 * />
 */
const StyledSnackbar = ({
  open,
  onClose,
  severity = 'success',
  title,
  message,
  autoHideDuration = 4000,
  anchorOrigin = { vertical: 'top', horizontal: 'center' },
  ...props
}) => {
  const getIcon = () => {
    switch (severity) {
      case 'success':
        return <SuccessIcon sx={{ fontSize: '24px' }} />;
      case 'error':
        return <ErrorIcon sx={{ fontSize: '24px' }} />;
      default:
        return null;
    }
  };

  return (
    <StyledSnackbarWrapper
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={anchorOrigin}
      {...props}
    >
      <Alert onClose={onClose} severity={severity} icon={getIcon()}>
        <Box>
          <Typography variant="body1" fontWeight={600}>
            {title}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            {message}
          </Typography>
        </Box>
      </Alert>
    </StyledSnackbarWrapper>
  );
};

export default StyledSnackbar;
