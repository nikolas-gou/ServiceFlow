import { Box, Card, styled } from '@mui/material';
import type { PaletteColorKey } from '../../../types/theme';

// Styled Components
export const MainCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.spacing(3),
  overflow: 'visible',
  position: 'relative',
  background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
  border: '1px solid rgba(0,0,0,0.08)',
}));

interface AccentColorProps {
  // Ονομάζεται "accentColor" (όχι "bgcolor") ώστε να μη συγκρούεται με το
  // ενσωματωμένο system prop `bgcolor` του MUI Box (διαφορετικός τύπος τιμών).
  accentColor?: PaletteColorKey;
}

export const CategoryIcon = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'accentColor',
})<AccentColorProps>(({ theme, accentColor }) => ({
  position: 'absolute',
  top: -16,
  left: 16,
  width: 32,
  height: 32,
  borderRadius: '50%',
  backgroundColor: accentColor ? theme.palette[accentColor].main : undefined,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  boxShadow: accentColor ? `0 4px 12px ${theme.palette[accentColor].main}40` : undefined,
}));

export const ColoredBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'accentColor',
})<AccentColorProps>(({ theme, accentColor }) => ({
  padding: theme.spacing(2),
  backgroundColor: accentColor ? theme.palette[accentColor].light : undefined,
  borderRadius: theme.spacing(2),
  height: '100%',
}));
