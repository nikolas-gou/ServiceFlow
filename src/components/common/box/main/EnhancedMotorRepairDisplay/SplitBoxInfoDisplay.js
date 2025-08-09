import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { ColoredBox } from '../../../styled/CommonBoxes';
import { commonStyles } from '../../../styled/CommonStyles';

function SplitBoxInfoDisplay(props) {
  return (
    <ColoredBox color={props.color}>
      <Typography sx={{ mb: 1.5, ...commonStyles.whiteText, ...commonStyles.flexBetween }}>
        {props.icon}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'stretch' }}>
        {/* Left (Half) */}
        <Box sx={{ flex: 1, pr: 2, borderRight: '2px solid #fff' }}>
          <Typography variant="subtitle2" sx={{ color: '#fff', mb: 1, textAlign: 'center' }}>
            {props.leftTitle}
          </Typography>
          <Stack spacing={1.5}>
            {props.leftValues?.map(({ label, value }) => (
              <Box key={label} sx={commonStyles.flexBetween}>
                <Typography variant="body2" sx={commonStyles.whiteTextSemi}>
                  {label}
                </Typography>
                <Typography variant="body1" sx={{ ...commonStyles.whiteText, fontWeight: 'bold' }}>
                  {value || '-'}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>
        {/* Right (Standard) */}
        <Box sx={{ flex: 1, pl: 2 }}>
          <Typography variant="subtitle2" sx={{ color: '#fff', mb: 1, textAlign: 'center' }}>
            {props.rightTitle}
          </Typography>
          <Stack spacing={1.5}>
            {props.rightValues?.map(({ label, value }) => (
              <Box key={label} sx={commonStyles.flexBetween}>
                <Typography variant="body2" sx={commonStyles.whiteTextSemi}>
                  {label}
                </Typography>
                <Typography variant="body1" sx={{ ...commonStyles.whiteText, fontWeight: 'bold' }}>
                  {value || '-'}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>
      </Box>
    </ColoredBox>
  );
}

export default SplitBoxInfoDisplay;
