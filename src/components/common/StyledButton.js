import React from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

/**
 * Enhanced Styled Button Component
 *
 * @param {string} variant - Τύπος button ('contained', 'outlined', 'text')
 * @param {string} text - Κείμενο που εμφανίζεται στο button
 * @param {node} startIcon - Icon που εμφανίζεται στην αρχή του button
 * @param {node} endIcon - Icon που εμφανίζεται στο τέλος του button
 * @param {function} onClick - Callback function που καλείται όταν πατηθεί το button
 * @param {boolean} disabled - Καθορίζει αν το button είναι disabled
 * @param {boolean} loading - Καθορίζει αν το button είναι σε κατάσταση loading
 * @param {string} loadingText - Κείμενο που εμφανίζεται όταν το button είναι loading
 * @param {string} color - Χρώμα του button ('primary', 'secondary', κτλ.)
 * @param {object} sx - Επιπλέον styling (Material-UI sx prop)
 * @param {...any} props - Επιπλέον props που περνούν στο Button component
 *
 * @example
 * // Contained Button με Save Icon
 * <StyledButton
 *   variant="contained"
 *   text="Αποθήκευση"
 *   endIcon={<SaveIcon />}
 *   onClick={handleSave}
 * />
 *
 * @example
 * // Outlined Button με Back Icon
 * <StyledButton
 *   variant="outlined"
 *   text="Πίσω"
 *   startIcon={<BackIcon />}
 *   onClick={handleBack}
 * />
 *
 * @example
 * // Loading Button
 * <StyledButton
 *   variant="contained"
 *   text="Αποθήκευση"
 *   loading={isSubmitting}
 *   loadingText="Αποθήκευση..."
 *   onClick={handleSave}
 * />
 */
const StyledButtonWrapper = styled(Button)(({ theme, variant }) => ({
  borderRadius: '12px',
  padding: theme.spacing(1.5, 3),
  fontSize: '0.95rem',
  fontWeight: 600,
  textTransform: 'none',
  minWidth: '140px',
  transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
  boxShadow:
    variant === 'contained' ? '0 4px 12px rgba(25, 118, 210, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.1)',
  ...(variant === 'contained' && {
    background: 'linear-gradient(135deg, #1976d2 0%, #2196f3 100%)',
    border: '1px solid #1976d2',
    '&:hover': {
      background: 'linear-gradient(135deg, #1565c0 0%, #1976d2 100%)',
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 20px rgba(25, 118, 210, 0.4)',
    },
  }),
  ...(variant === 'outlined' && {
    borderColor: '#1976d2',
    color: '#1976d2',
    background: 'rgba(25, 118, 210, 0.02)',
    '&:hover': {
      background: 'rgba(25, 118, 210, 0.08)',
      borderColor: '#1565c0',
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 16px rgba(25, 118, 210, 0.2)',
    },
  }),
}));

const StyledButton = ({
  variant = 'contained',
  text,
  startIcon,
  endIcon,
  loading = false,
  loadingText,
  disabled = false,
  onClick,
  ...props
}) => {
  const displayText = loading && loadingText ? loadingText : text;
  const isDisabled = disabled || loading;

  return (
    <StyledButtonWrapper
      variant={variant}
      startIcon={loading ? null : startIcon}
      endIcon={loading ? null : endIcon}
      disabled={isDisabled}
      onClick={onClick}
      {...props}
    >
      {displayText}
    </StyledButtonWrapper>
  );
};

export default StyledButton;
