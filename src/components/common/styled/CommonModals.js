import { Modal, Box, IconButton, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled Components για το Modal
export const StyledModal = styled(Modal)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& .MuiBackdrop-root': {
    backdropFilter: 'blur(8px)',
    backgroundColor: 'rgba(30, 60, 114, 0.4)',
    transition: 'all 0.3s ease',
  },
}));

export const ModalHeader = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
  padding: theme.spacing(2.5, 3),
  position: 'relative',
  borderRadius: '20px 20px 0 0',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  [theme.breakpoints.down('lg')]: {
    padding: theme.spacing(2, 2.5),
  },
}));

export const HeaderIcon = styled(Box)(({ theme }) => ({
  width: 48,
  height: 48,
  borderRadius: '12px',
  background:
    'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  '& .MuiSvgIcon-root': {
    color: '#ffb74d',
    fontSize: '24px',
    filter: 'drop-shadow(0 2px 4px rgba(255, 183, 77, 0.3))',
  },
}));

export const HeaderTitle = styled(Typography)(({ theme }) => ({
  color: 'white',
  fontWeight: 700,
  fontSize: '1.5rem',
  textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
  letterSpacing: '0.5px',
  flex: 1,
}));

export const HeaderSubtitle = styled(Typography)(({ theme }) => ({
  color: 'rgba(255, 255, 255, 0.8)',
  fontSize: '0.875rem',
  marginTop: theme.spacing(0.5),
  letterSpacing: '0.25px',
}));

export const StyledCloseButton = styled(IconButton)(({ theme }) => ({
  color: 'rgba(255, 255, 255, 0.8)',
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  width: 44,
  height: 44,
  transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.2)',
    color: 'white',
    transform: 'rotate(90deg) scale(1.1)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
  },
  '& .MuiSvgIcon-root': {
    fontSize: '20px',
  },
}));

export const ModalContent = styled(Box)(({ theme }) => ({
  flex: 1,
  overflow: 'auto',
  position: 'relative',
  '&::-webkit-scrollbar': {
    width: '8px',
    background: 'transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
    borderRadius: '4px',
    '&:hover': {
      background: 'linear-gradient(135deg, #2a5298 0%, #1e3c72 100%)',
    },
  },
  '&::-webkit-scrollbar-track': {
    background: 'rgba(0, 0, 0, 0.05)',
    borderRadius: '4px',
  },
}));
