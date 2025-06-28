import React from 'react';
import { Box, Typography, styled } from '@mui/material';
import { CalendarToday } from '@mui/icons-material';

const DateContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '6px 12px',
  borderRadius: '10px',
  background: 'rgba(255, 255, 255, 0.08)',
  transition: 'background 0.2s ease',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.12)',
  },
});

const IconWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& .MuiSvgIcon-root': {
    fontSize: '16px',
    color: 'rgba(255, 255, 255, 0.7)',
  },
});

const DateText = styled(Typography)({
  fontSize: '0.85rem',
  color: 'rgba(255, 255, 255, 0.7)',
  letterSpacing: '0.5px',
});

export default function DateDisplay() {
  const formatDate = (date) => {
    return new Date().toLocaleDateString('el-GR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <DateContainer>
      <IconWrapper>
        <CalendarToday />
      </IconWrapper>
      <DateText>{formatDate(new Date())}</DateText>
    </DateContainer>
  );
}
