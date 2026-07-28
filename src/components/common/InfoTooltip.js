import React from 'react';
import { Tooltip, IconButton } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export function InfoTooltip({ title, size = 'small', sx, iconSx }) {
  return (
    <Tooltip title={title} arrow placement="top" enterTouchDelay={0}>
      <IconButton size={size} tabIndex={-1} sx={{ p: 0.5, color: 'text.secondary', ...sx }}>
        <InfoOutlinedIcon fontSize={size} sx={iconSx} />
      </IconButton>
    </Tooltip>
  );
}
