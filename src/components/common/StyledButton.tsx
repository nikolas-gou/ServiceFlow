import { Button, type ButtonProps } from '@mui/material';
import { styled, alpha, darken } from '@mui/material/styles';
import type { ReactNode, MouseEventHandler } from 'react';

const StyledButtonWrapper = styled(Button)(({ theme, variant }) => {
  const { primary } = theme.palette;

  return {
    borderRadius: theme.custom.radius.md,
    padding: theme.spacing(1.5, 3),
    fontSize: '0.95rem',
    fontWeight: 600,
    textTransform: 'none',
    minWidth: '140px',
    transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
    boxShadow:
      variant === 'contained' ? `0 4px 12px ${alpha(primary.main, 0.3)}` : '0 2px 8px rgba(0, 0, 0, 0.1)',
    ...(variant === 'contained' && {
      background: theme.custom.gradients.primary,
      border: `1px solid ${primary.dark}`,
      '&:hover': {
        background: `linear-gradient(135deg, ${darken(primary.dark, 0.25)} 0%, ${primary.dark} 100%)`,
        transform: 'translateY(-2px)',
        boxShadow: `0 6px 20px ${alpha(primary.main, 0.4)}`,
      },
    }),
    ...(variant === 'outlined' && {
      borderColor: primary.main,
      color: primary.main,
      background: alpha(primary.main, 0.02),
      '&:hover': {
        background: alpha(primary.main, 0.08),
        borderColor: primary.dark,
        transform: 'translateY(-2px)',
        boxShadow: `0 6px 16px ${alpha(primary.main, 0.2)}`,
      },
    }),
  };
});

interface StyledButtonProps extends Omit<ButtonProps, 'onClick'> {
  text: ReactNode;
  loading?: boolean;
  loadingText?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

/**
 * Enhanced Styled Button Component
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
}: StyledButtonProps) => {
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
