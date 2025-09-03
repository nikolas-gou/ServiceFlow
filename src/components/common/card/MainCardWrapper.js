import React from 'react';
import { Typography, CardContent } from '@mui/material';
import { MainCard, CategoryIcon } from '../styled/CommonBoxes';
import { commonStyles } from '../styled/CommonStyles';

/**
 * Simple wrapper for main cards with icon and title
 * Uses composition pattern - children are rendered inside CardContent
 */
function MainCardWrapper({ icon, title, bgcolor = 'primary', children, mt = 0 }) {
  return (
    <MainCard sx={{ mt: mt }}>
      <CategoryIcon bgcolor={bgcolor}>{icon}</CategoryIcon>

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
