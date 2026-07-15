import { useMediaQuery, useTheme } from '@mui/material';

export default function useResponsive() {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const isLargeScreen = useMediaQuery('(min-width: 1366px)');

  return { isMobile, isTablet, isDesktop, isLargeScreen };
}
