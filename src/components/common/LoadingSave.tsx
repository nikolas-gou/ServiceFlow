import { Box, Typography, type BoxProps } from '@mui/material';
import { styled } from '@mui/material/styles';

interface LoadingOverlayProps {
  show?: boolean;
  backgroundColor?: string;
  borderRadius?: string;
  zIndex?: number;
}

const LoadingOverlay = styled(Box)<LoadingOverlayProps>(
  ({ show, backgroundColor = 'rgba(255, 255, 255, 0.9)', borderRadius = '24px', zIndex = 1000 }) => ({
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

interface SpinnerBoxProps {
  spinnerSize?: number;
  spinnerColor?: string;
}

const SpinnerBox = styled(Box)<SpinnerBoxProps>(({ theme, spinnerSize = 40, spinnerColor }) => {
  const color = spinnerColor || theme.palette.primary.main;
  return {
    width: spinnerSize,
    height: spinnerSize,
    margin: '0 auto 16px',
    border: `3px solid ${color}33`, // 33 για transparency
    borderTop: `3px solid ${color}`,
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    '@keyframes spin': {
      '0%': { transform: 'rotate(0deg)' },
      '100%': { transform: 'rotate(360deg)' },
    },
  };
});

interface LoadingSaveProps extends Omit<BoxProps, 'color'> {
  show?: boolean;
  message?: string;
  spinnerColor?: string;
  spinnerSize?: number;
  backgroundColor?: string;
  borderRadius?: string;
  zIndex?: number;
}

/**
 * Loading Save Overlay Component
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
const LoadingSave = ({
  show = false,
  message = 'Αποθήκευση...',
  spinnerColor,
  spinnerSize = 40,
  backgroundColor = 'rgba(255, 255, 255, 0.9)',
  borderRadius = '24px',
  zIndex = 1000,
  ...props
}: LoadingSaveProps) => {
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
