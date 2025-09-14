import { Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledPaper = styled(Paper)(({ theme }) => ({
  width: '90%',
  maxWidth: '1200px',
  maxHeight: '90vh',
  overflow: 'hidden',
  position: 'relative',
  borderRadius: '20px',
  background: 'linear-gradient(135deg, #ffffff 0%, #f8fafb 100%)',
  boxShadow: '0 20px 40px rgba(30, 60, 114, 0.15), 0 8px 16px rgba(0, 0, 0, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  display: 'flex',
  flexDirection: 'column',
  transform: 'scale(0.95)',
  transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
  '&.modal-enter': {
    transform: 'scale(1)',
  },
  [theme.breakpoints.down('lg')]: {
    width: '95%',
    maxWidth: '900px',
    maxHeight: '85vh',
  },
}));
