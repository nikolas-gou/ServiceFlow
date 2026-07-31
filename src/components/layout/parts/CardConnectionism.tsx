import { Box, Typography, Chip } from '@mui/material';

import { connectionism_types_mapping } from '../../Models/Motor';

// Common styles object
const commonStyles = {
  centeredText: {
    textAlign: 'center',
  },
} as const;

interface CardConnectionismProps {
  connectionism?: string | null;
}

export const CardConnectionism = (props: CardConnectionismProps) => {
  return (
    <Box sx={{ mt: 2, ...commonStyles.centeredText }}>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
        Τρόπος Σύνδεσης
      </Typography>
      <Chip
        label={(props.connectionism && connectionism_types_mapping[props.connectionism]) || props.connectionism || '-'}
        color="info"
        size="small"
        sx={{ fontWeight: 'bold' }}
      />
    </Box>
  );
};
