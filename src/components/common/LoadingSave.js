import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

/**
 * Loading Save Overlay Component
 *
 * @param {boolean} show - Καθορίζει αν το loading overlay είναι εμφανές
 * @param {string} message - Μήνυμα που εμφανίζεται κάτω από το spinner (default: "Αποθήκευση...")
 * @param {string} spinnerColor - Χρώμα του spinner (default: "#1976d2")
 * @param {number} spinnerSize - Μέγεθος του spinner σε pixels (default: 40)
 * @param {string} backgroundColor - Χρώμα φόντου του overlay (default: "rgba(255, 255, 255, 0.9)")
 * @param {string} borderRadius - Border radius του overlay (default: "24px")
 * @param {number} zIndex - Z-index του overlay (default: 1000)
 *
 * @example
 * // Βασική χρήση
 * <LoadingSave show={isSubmitting} />
 *
 * @example
 * // Με custom μήνυμα
 * <LoadingSave
 *   show={isProcessing}
 *   message="Επεξεργασία δεδομένων..."
 * />
 *
 * @example
 * // Με custom styling
 * <LoadingSave
 *   show={isLoading}
 *   message="Παρακαλώ περιμένετε..."
 *   spinnerColor="#4caf50"
 *   spinnerSize={50}
 * />
 */
const LoadingOverlay = styled(Box)(
  ({
    theme,
    show,
    backgroundColor = 'rgba(255, 255, 255, 0.9)',
    borderRadius = '24px',
    zIndex = 1000,
  }) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: backgroundColor,
    backdropFilter: 'blur(4px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius,
    opacity: show ? 1 : 0,
    visibility: show ? 'visible' : 'hidden',
    transition: 'all 0.3s ease',
    zIndex: zIndex,
  }),
);

const SpinnerBox = styled(Box)(({ spinnerSize = 40, spinnerColor = '#1976d2' }) => ({
  width: spinnerSize,
  height: spinnerSize,
  margin: '0 auto 16px',
  border: `3px solid ${spinnerColor}33`, // 33 για transparency
  borderTop: `3px solid ${spinnerColor}`,
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
  '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },
}));

const LoadingSave = ({
  show = false,
  message = 'Αποθήκευση...',
  spinnerColor = '#1976d2',
  spinnerSize = 40,
  backgroundColor = 'rgba(255, 255, 255, 0.9)',
  borderRadius = '24px',
  zIndex = 1000,
  ...props
}) => {
  return (
    <LoadingOverlay
      show={show}
      backgroundColor={backgroundColor}
      borderRadius={borderRadius}
      zIndex={zIndex}
      {...props}
    >
      <Box textAlign="center">
        <SpinnerBox spinnerSize={spinnerSize} spinnerColor={spinnerColor} />
        <Typography variant="body1" color="primary" fontWeight={600}>
          {message}
        </Typography>
      </Box>
    </LoadingOverlay>
  );
};

export default LoadingSave;
