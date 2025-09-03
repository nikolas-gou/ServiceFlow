import { Box, Card, styled } from '@mui/material';

// Styled Components
export const MainCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.spacing(3),
  overflow: 'visible',
  position: 'relative',
  background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
  border: '1px solid rgba(0,0,0,0.08)',
  elevation: 4,
}));

export const CategoryIcon = styled(Box)(({ theme, bgcolor }) => ({
  position: 'absolute',
  top: -16,
  left: 16,
  width: 32,
  height: 32,
  borderRadius: '50%',
  backgroundColor: theme.palette[bgcolor]?.main || bgcolor,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  boxShadow: `0 4px 12px ${theme.palette[bgcolor]?.main}40` || `0 4px 12px ${bgcolor}40`,
}));

export const ColoredBox = styled(Box)(({ theme, color }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette[color]?.light || color,
  borderRadius: theme.spacing(2),
  height: '100%',
}));
