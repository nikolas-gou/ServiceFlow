import { Stepper, Step, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledStepper = styled(Stepper)(({ theme }) => ({
  marginBottom: theme.spacing(2.5),
  padding: theme.spacing(2, 1.5),
  background: 'linear-gradient(135deg, #f8fafb 0%, #ffffff 100%)',
  borderRadius: '12px',
  border: '1px solid rgba(30, 60, 114, 0.08)',
  boxShadow: '0 2px 8px rgba(30, 60, 114, 0.06)',
  [theme.breakpoints.down('lg')]: {
    marginBottom: theme.spacing(1.5),
    padding: theme.spacing(1.5, 1),
  },
  '& .MuiStepConnector-root': {
    top: '20px',
    left: 'calc(-50% + 20px)',
    right: 'calc(50% + 20px)',
    [theme.breakpoints.down('lg')]: {
      top: '18px',
      left: 'calc(-50% + 18px)',
      right: 'calc(50% + 18px)',
    },
    '& .MuiStepConnector-line': {
      height: '3px',
      border: 0,
      background: 'linear-gradient(90deg, #e3f2fd 0%, #bbdefb 50%, #e3f2fd 100%)',
      borderRadius: '2px',
      position: 'relative',
      overflow: 'hidden',
      '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: '-100%',
        width: '100%',
        height: '100%',
        background: 'linear-gradient(90deg, transparent, rgba(25, 118, 210, 0.3), transparent)',
        animation: 'shimmer 2s infinite',
      },
    },
  },
  '& .MuiStepConnector-active .MuiStepConnector-line': {
    background: 'linear-gradient(90deg, #1976d2 0%, #2196f3 50%, #1976d2 100%)',
    boxShadow: '0 2px 8px rgba(25, 118, 210, 0.3)',
  },
  '& .MuiStepConnector-completed .MuiStepConnector-line': {
    background: 'linear-gradient(90deg, #4caf50 0%, #66bb6a 50%, #4caf50 100%)',
    boxShadow: '0 2px 8px rgba(76, 175, 80, 0.3)',
  },
  '@keyframes shimmer': {
    '0%': { left: '-100%' },
    '100%': { left: '100%' },
  },
}));

export const StyledStep = styled(Step)(({ theme }) => ({
  '& .MuiStepLabel-root': {
    cursor: 'default',
    transition: 'all 0.3s ease',
  },
  '& .MuiStepLabel-iconContainer': {
    transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
    '& .MuiStepIcon-root': {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      border: '2px solid #e3f2fd',
      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafb 100%)',
      color: '#90a4ae',
      fontSize: '20px',
      fontWeight: 600,
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
      transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      '& .MuiStepIcon-text': {
        fill: '#90a4ae',
        fontWeight: 600,
      },
      // Styling για custom εικονίδια
      '& .MuiSvgIcon-root': {
        fontSize: '20px',
        color: 'inherit',
      },
      [theme.breakpoints.down('lg')]: {
        width: '36px',
        height: '36px',
        fontSize: '16px',
        border: '2px solid #e3f2fd',
        '& .MuiSvgIcon-root': {
          fontSize: '16px',
        },
      },
    },
  },
  '& .MuiStepLabel-active .MuiStepIcon-root': {
    background: 'linear-gradient(135deg, #1976d2 0%, #2196f3 100%)',
    borderColor: '#1976d2',
    color: 'white',
    transform: 'scale(1.1)',
    boxShadow: '0 4px 16px rgba(25, 118, 210, 0.4)',
    '& .MuiStepIcon-text': {
      fill: 'white',
    },
    '& .MuiSvgIcon-root': {
      color: 'white',
    },
    [theme.breakpoints.down('lg')]: {
      transform: 'scale(1.05)',
      boxShadow: '0 3px 12px rgba(25, 118, 210, 0.3)',
    },
  },
  '& .MuiStepLabel-completed .MuiStepIcon-root': {
    background: 'linear-gradient(135deg, #4caf50 0%, #66bb6a 100%)',
    borderColor: '#4caf50',
    color: 'white',
    '& .MuiStepIcon-text': {
      fill: 'white',
    },
    '& .MuiSvgIcon-root': {
      color: 'white',
    },
  },
  '& .MuiStepLabel-label': {
    marginTop: theme.spacing(0.8),
    fontSize: '0.8rem',
    fontWeight: 500,
    color: '#546e7a',
    transition: 'all 0.3s ease',
    textAlign: 'center',
    '&.Mui-active': {
      color: '#1976d2',
      fontWeight: 600,
    },
    '&.Mui-completed': {
      color: '#4caf50',
      fontWeight: 600,
    },
    [theme.breakpoints.down('lg')]: {
      fontSize: '0.75rem',
      marginTop: theme.spacing(0.6),
    },
  },
}));

export const StyledTabContent = styled(Box)(({ theme }) => ({
  minHeight: '320px',
  padding: theme.spacing(2.5),
  background: 'linear-gradient(135deg, #ffffff 0%, #fafbfc 100%)',
  borderRadius: '12px',
  border: '1px solid rgba(30, 60, 114, 0.08)',
  boxShadow: '0 2px 8px rgba(30, 60, 114, 0.06)',
  marginBottom: theme.spacing(2),
  position: 'relative',
  transition: 'all 0.3s ease',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '3px',
    background: 'linear-gradient(90deg, #1976d2 0%, #2196f3 50%, #1976d2 100%)',
    borderRadius: '12px 12px 0 0',
  },
  [theme.breakpoints.down('lg')]: {
    minHeight: '280px',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(1.5),
  },
}));
