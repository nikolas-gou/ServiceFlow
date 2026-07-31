import { Typography, CardContent } from '@mui/material';
import type { ReactNode } from 'react';
import { MainCard, CategoryIcon } from '../styled/CommonBoxes';
import { commonStyles } from '../styled/CommonStyles';
import type { PaletteColorKey } from '../../../types/theme';

interface MainCardWrapperProps {
  icon?: ReactNode;
  title?: ReactNode;
  bgcolor?: PaletteColorKey;
  children?: ReactNode;
  mt?: number;
}

/**
 * Simple wrapper for main cards with icon and title
 * Uses composition pattern - children are rendered inside CardContent
 */
function MainCardWrapper({ icon, title, bgcolor = 'primary', children, mt = 0 }: MainCardWrapperProps) {
  return (
    <MainCard sx={{ mt: mt }}>
      <CategoryIcon accentColor={bgcolor}>{icon}</CategoryIcon>

      <CardContent sx={commonStyles.cardContent}>
        <Typography color="primary.main" sx={commonStyles.sectionTitle}>
          {title}
        </Typography>

        {children}
      </CardContent>
    </MainCard>
  );
}

export default MainCardWrapper;
