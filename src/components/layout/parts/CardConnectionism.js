import React from 'react';
import { Box, Typography, Chip } from '@mui/material';

import { connectionism_types_mapping } from '../../Models/Motor';

// Common styles object
const commonStyles = {
  headerContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
  },
  flexBetween: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flexWrap: {
    display: 'flex',
    gap: 0.5,
    flexWrap: 'wrap',
  },
  sectionTitle: {
    variant: 'h6',
    fontWeight: 'bold',
    mb: 2,
  },
  whiteText: {
    color: 'white',
  },
  whiteTextSemi: {
    color: 'white',
    opacity: 0.9,
  },
  cardContent: {
    pt: 3,
    pb: 3,
  },
  fullHeight: {
    height: '100%',
  },
  centeredText: {
    textAlign: 'center',
  },
};

export const CardConnectionism = (props) => {
  return (
    <Box sx={{ mt: 2, ...commonStyles.centeredText }}>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
        Τρόπος Σύνδεσης
      </Typography>
      <Chip
        label={connectionism_types_mapping[props.connectionism] || props.connectionism || '-'}
        color="info"
        size="small"
        sx={{ fontWeight: 'bold' }}
      />
    </Box>
  );
};
