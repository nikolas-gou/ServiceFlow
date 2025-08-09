import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { ColoredBox } from '../../../styled/CommonBoxes';
import { commonStyles } from '../../../styled/CommonStyles';

function BoxInfoDisplay(props) {
  return (
    <ColoredBox color={props.color}>
      <Typography sx={{ mb: 1.5, ...commonStyles.whiteText, ...commonStyles.flexBetween }}>
        {props.icon}
        {props.title || ''}
      </Typography>
      <Stack spacing={1.5}>
        {props.values?.map(({ label, value }) => (
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
    </ColoredBox>
  );
}

export default BoxInfoDisplay;
