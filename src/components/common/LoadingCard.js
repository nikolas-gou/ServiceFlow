import React from 'react';
import { Card, Box, Skeleton } from '@mui/material';

const LoadingCard = () => {
  return (
    <Card
      elevation={5}
      sx={{
        p: 2,
        borderRadius: 4,
        background: 'linear-gradient(135deg, #e0e7ff, #c7d2fe)',
        minHeight: 130,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Skeleton variant="circular" width={36} height={36} sx={{ mr: 2 }} />
        <Box sx={{ flex: 1 }}>
          <Skeleton variant="text" width="70%" height={16} sx={{ mb: 0.5 }} />
          <Skeleton variant="text" width="50%" height={28} />
        </Box>
        <Skeleton variant="rounded" width={50} height={24} />
      </Box>
      <Box sx={{ height: 35 }}>
        <Skeleton variant="rounded" width="100%" height={35} />
      </Box>
    </Card>
  );
};

export default LoadingCard;
