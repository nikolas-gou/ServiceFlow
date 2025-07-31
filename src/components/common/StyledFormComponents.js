import { styled } from '@mui/material/styles';
import { TextField, Autocomplete, FormControl } from '@mui/material';

// Shared Styled Components για Form Elements

export const StyledTextField = styled(TextField, {
  shouldForwardProp: (prop) => prop !== 'isMultiline',
})(({ theme, size = 'medium', isMultiline }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(10px)',
    transition: 'all 0.3s ease',
    // Δεν θέτουμε height για multiline fields
    ...(isMultiline ? {} : { height: size === 'small' ? '40px' : '56px' }),
    '& fieldset': {
      borderColor: 'rgba(25, 118, 210, 0.2)',
      borderWidth: '1px',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(25, 118, 210, 0.4)',
      boxShadow: '0 2px 8px rgba(25, 118, 210, 0.1)',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#1976d2',
      borderWidth: '2px',
      boxShadow: '0 4px 12px rgba(25, 118, 210, 0.2)',
    },
    '&.Mui-error fieldset': {
      borderColor: '#f44336',
      boxShadow: '0 2px 8px rgba(244, 67, 54, 0.2)',
    },
  },
  '& .MuiInputLabel-root': {
    color: '#546e7a',
    fontSize: size === 'small' ? '0.8rem' : '0.9rem',
    fontWeight: 500,
    '&.Mui-focused': {
      color: '#1976d2',
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

export const StyledAutocomplete = styled(Autocomplete)(({ theme, size = 'medium' }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(10px)',
    transition: 'all 0.3s ease',
    minHeight: size === 'small' ? '40px' : '56px',
    '& fieldset': {
      borderColor: 'rgba(25, 118, 210, 0.2)',
      borderWidth: '1px',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(25, 118, 210, 0.4)',
      boxShadow: '0 2px 8px rgba(25, 118, 210, 0.1)',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#1976d2',
      borderWidth: '2px',
      boxShadow: '0 4px 12px rgba(25, 118, 210, 0.2)',
    },
  },
  '& .MuiInputLabel-root': {
    color: '#546e7a',
    fontSize: size === 'small' ? '0.8rem' : '0.9rem',
    fontWeight: 500,
    '&.Mui-focused': {
      color: '#1976d2',
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
      color: '#546e7a',
      padding: size === 'small' ? '4px' : '8px',
      '&:hover': {
        color: '#1976d2',
        backgroundColor: 'rgba(25, 118, 210, 0.08)',
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
      borderColor: 'rgba(25, 118, 210, 0.2)',
      borderWidth: '1px',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(25, 118, 210, 0.4)',
      boxShadow: '0 2px 8px rgba(25, 118, 210, 0.1)',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#1976d2',
      borderWidth: '2px',
      boxShadow: '0 4px 12px rgba(25, 118, 210, 0.2)',
    },
  },
  '& .MuiInputLabel-root': {
    color: '#546e7a',
    fontSize: size === 'small' ? '0.8rem' : '0.9rem',
    fontWeight: 500,
    '&.Mui-focused': {
      color: '#1976d2',
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
