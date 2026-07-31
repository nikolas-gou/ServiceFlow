import { Box, Typography, Stack, Tooltip } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import type { ReactNode } from 'react';
import { ColoredBox } from '../../../styled/CommonBoxes';
import { commonStyles } from '../../../styled/CommonStyles';
import { boxTitleSx, boxLabelSx, boxValueSx } from './windingBoxStyles';
import type { PaletteColorKey } from '../../../../../types/theme';
import type { DisplayValueRow } from '../../../../../types/display';

interface BoxInfoDisplayProps {
  color?: PaletteColorKey;
  icon?: ReactNode;
  title?: ReactNode;
  titleTooltip?: ReactNode;
  values?: DisplayValueRow[];
}

function BoxInfoDisplay(props: BoxInfoDisplayProps) {
  return (
    <ColoredBox accentColor={props.color}>
      {/* component="div": ο τίτλος περιέχει Box, που δεν επιτρέπεται μέσα σε <p> */}
      <Typography component="div" sx={{ mb: 1.5, ...boxTitleSx, ...commonStyles.flexBetween }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          {props.icon}
          {props.title || ''}
          {props.titleTooltip && (
            <Tooltip title={props.titleTooltip} arrow placement="top">
              <InfoOutlinedIcon sx={{ fontSize: 15, opacity: 0.85, cursor: 'help' }} />
            </Tooltip>
          )}
        </Box>
      </Typography>
      <Stack spacing={1.25}>
        {props.values?.map(({ label, value }) => (
          <Box key={label} sx={{ ...commonStyles.flexBetween, alignItems: 'baseline', gap: 2 }}>
            <Typography variant="body2" sx={boxLabelSx}>
              {label}
            </Typography>
            <Typography variant="body1" sx={{ ...boxValueSx, textAlign: 'right' }}>
              {value || '-'}
            </Typography>
          </Box>
        ))}
      </Stack>
    </ColoredBox>
  );
}

export default BoxInfoDisplay;
