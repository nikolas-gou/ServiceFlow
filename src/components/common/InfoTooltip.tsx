import { Tooltip, IconButton, type SxProps, type Theme } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import type { ReactNode } from 'react';

interface InfoTooltipProps {
  title: ReactNode;
  size?: 'small' | 'medium' | 'large';
  sx?: SxProps<Theme>;
  iconSx?: SxProps<Theme>;
}

export function InfoTooltip({ title, size = 'small', sx, iconSx }: InfoTooltipProps) {
  return (
    <Tooltip title={title} arrow placement="top" enterTouchDelay={0}>
      <IconButton size={size} tabIndex={-1} sx={{ p: 0.5, color: 'text.secondary', ...sx }}>
        <InfoOutlinedIcon fontSize={size} sx={iconSx} />
      </IconButton>
    </Tooltip>
  );
}
