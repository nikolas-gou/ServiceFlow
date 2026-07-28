import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { ArrowBack, Build } from '@mui/icons-material';
import { useRepairById } from '../../../hooks/useRepairs';
import LoadingCard from '../../common/LoadingCard';
import EnhancedMotorRepairDisplay from '../parts/EnhancedMotorRepairDisplay';

export default function RepairDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: repair, isLoading } = useRepairById(id);

  if (isLoading) {
    return (
      <Box sx={{ mt: 2 }}>
        <LoadingCard />
      </Box>
    );
  }

  if (!repair) {
    return (
      <Box sx={{ mt: 2, textAlign: 'center', py: 4 }}>
        <Typography variant="body2" color="text.secondary">
          Η επισκευή δεν βρέθηκε
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 2 }}>
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Tooltip title="Πίσω στις επισκευές">
          <IconButton
            onClick={() => navigate('/dashboard/services')}
            sx={{
              width: 38,
              height: 38,
              borderRadius: '999px',
              border: '1.5px solid #e2e5ea',
              '&:hover': { backgroundColor: '#f5f7fa' },
            }}
          >
            <ArrowBack fontSize="small" sx={{ color: 'text.secondary' }} />
          </IconButton>
        </Tooltip>
        <Box
          sx={{
            width: 4,
            height: 24,
            backgroundColor: 'primary.main',
            borderRadius: 4,
          }}
        />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Build sx={{ color: 'primary.main', fontSize: 20 }} />
          <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 600 }}>
            Επισκευή #{repair.id}
          </Typography>
        </Box>
      </Box>

      <EnhancedMotorRepairDisplay repair={repair} />
    </Box>
  );
}
