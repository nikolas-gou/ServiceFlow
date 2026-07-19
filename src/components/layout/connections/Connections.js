import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import CableIcon from '@mui/icons-material/Cable';
import { accentColors } from '../../../styles/colors';

export const Connections = () => {
  const theme = useTheme();
  // να βαλω να φτιαχνω συνδεσεις, και να φαινονται ανα πολους, λουκια κτλ
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        py: 8,
        px: 3,
        backgroundColor: '#fff',
        borderRadius: '16px',
        border: '1px solid rgba(0,0,0,0.06)',
        boxShadow: `0 2px 8px ${alpha(theme.palette.primary.dark, 0.06)}`,
      }}
    >
      <Box
        sx={{
          width: 64,
          height: 64,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: `${accentColors.purple.base}33`,
          mb: 2,
        }}
      >
        <CableIcon sx={{ fontSize: 32, color: accentColors.purple.dark }} />
      </Box>
      <Typography variant="h6" sx={{ color: 'text.primary', mb: 0.5 }}>
        Σε Εξέλιξη
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 360 }}>
        Η διαχείριση συνδέσεων ανά πόλους και λούκια θα προστεθεί σύντομα.
      </Typography>
    </Box>
  );
};
