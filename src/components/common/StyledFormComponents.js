import { styled, alpha } from '@mui/material/styles';
import { TextField, Autocomplete, FormControl } from '@mui/material';

// Shared Styled Components για Form Elements

export const StyledTextField = styled(
  ({ inputProps, ...otherProps }) => (
    <TextField
      {...otherProps}
      autoComplete="off"
      inputProps={{
        autoComplete: 'off',
        ...inputProps,
      }}
    />
  ),
  {
    shouldForwardProp: (prop) => prop !== 'isMultiline',
  },
)(({ theme, size = 'medium', isMultiline }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(10px)',
    transition: 'all 0.3s ease',
    // Δεν θέτουμε height για multiline fields
    ...(isMultiline ? {} : { height: size === 'small' ? '40px' : '56px' }),
    '& fieldset': {
      borderColor: alpha(theme.palette.primary.main, 0.2),
      borderWidth: '1px',
    },
    '&:hover fieldset': {
      borderColor: alpha(theme.palette.primary.main, 0.4),
      boxShadow: `0 2px 8px ${alpha(theme.palette.primary.main, 0.1)}`,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
      borderWidth: '2px',
      boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.2)}`,
    },
    '&.Mui-error fieldset': {
      borderColor: '#f44336',
      boxShadow: '0 2px 8px rgba(244, 67, 54, 0.2)',
    },
  },
  '& .MuiInputLabel-root': {
    color: theme.palette.text.secondary,
    fontSize: size === 'small' ? '0.8rem' : '0.9rem',
    fontWeight: 500,
    '&.Mui-focused': {
      color: theme.palette.primary.main,
      fontWeight: 600,
    },
    '&.Mui-error': {
      color: '#f44336',
    },
  },
  '& .MuiOutlinedInput-input': {
    padding: size === 'small' ? '8px 14px' : '16px',
    fontSize: size === 'small' ? '0.875rem' : '0.95rem',
    // Δεν θέτουμε height για multiline fields
    ...(isMultiline ? {} : { height: size === 'small' ? '24px' : '24px' }),
    '&::placeholder': {
      color: 'rgba(84, 110, 122, 0.6)',
      opacity: 1,
    },
  },
}));

export const StyledAutocomplete = styled(({ renderInput, ...props }) => (
  <Autocomplete
    {...props}
    autoComplete={false} // απενεργοποιεί το δικό του internal autocomplete
    renderInput={(params) =>
      renderInput({
        ...params,
        inputProps: {
          ...params.inputProps,
          autoComplete: 'new-password', // απενεργοποιεί το browser autocomplete
        },
      })
    }
  />
))(({ theme, size = 'medium' }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(10px)',
    transition: 'all 0.3s ease',
    minHeight: size === 'small' ? '40px' : '56px',
    '& fieldset': {
      borderColor: alpha(theme.palette.primary.main, 0.2),
      borderWidth: '1px',
    },
    '&:hover fieldset': {
      borderColor: alpha(theme.palette.primary.main, 0.4),
      boxShadow: `0 2px 8px ${alpha(theme.palette.primary.main, 0.1)}`,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
      borderWidth: '2px',
      boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.2)}`,
    },
  },
  '& .MuiInputLabel-root': {
    color: theme.palette.text.secondary,
    fontSize: size === 'small' ? '0.8rem' : '0.9rem',
    fontWeight: 500,
    '&.Mui-focused': {
      color: theme.palette.primary.main,
      fontWeight: 600,
    },
  },
  '& .MuiAutocomplete-input': {
    padding: size === 'small' ? '8px 14px !important' : '16px !important',
    fontSize: size === 'small' ? '0.875rem' : '0.95rem',
    height: size === 'small' ? '24px' : '24px',
  },
  '& .MuiAutocomplete-endAdornment': {
    right: '12px',
    '& .MuiIconButton-root': {
      color: theme.palette.text.secondary,
      padding: size === 'small' ? '4px' : '8px',
      '&:hover': {
        color: theme.palette.primary.main,
        backgroundColor: alpha(theme.palette.primary.main, 0.08),
      },
    },
  },
}));

export const StyledFormControl = styled(FormControl)(({ theme, size = 'medium' }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(10px)',
    transition: 'all 0.3s ease',
    minHeight: size === 'small' ? '40px' : '56px',
    '& fieldset': {
      borderColor: alpha(theme.palette.primary.main, 0.2),
      borderWidth: '1px',
    },
    '&:hover fieldset': {
      borderColor: alpha(theme.palette.primary.main, 0.4),
      boxShadow: `0 2px 8px ${alpha(theme.palette.primary.main, 0.1)}`,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
      borderWidth: '2px',
      boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.2)}`,
    },
  },
  '& .MuiInputLabel-root': {
    color: theme.palette.text.secondary,
    fontSize: size === 'small' ? '0.8rem' : '0.9rem',
    fontWeight: 500,
    '&.Mui-focused': {
      color: theme.palette.primary.main,
      fontWeight: 600,
    },
  },
  '& .MuiSelect-select': {
    padding: size === 'small' ? '8px 14px' : '16px',
    fontSize: size === 'small' ? '0.875rem' : '0.95rem',
    minHeight: size === 'small' ? '24px' : '24px',
    display: 'flex',
    alignItems: 'center',
  },
}));
