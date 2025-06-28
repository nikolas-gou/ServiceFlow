import React from 'react';
import { AppBar, Toolbar, Box, styled } from '@mui/material';
import Breadcrumbs from './Breadcrumbs';
import DateDisplay from './parts/DateDisplay';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: 'none',
  color: 'white',
  borderRadius: '24px 0 0 0',
}));

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '8px 24px',
  gap: '16px',
  minHeight: '64px',
});

const ContentBox = styled(Box)({
  flexGrow: 1,
  minWidth: 0,
  display: 'flex',
  alignItems: 'center',
});

const DateBox = styled(Box)({
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
});

export default function TopAppBar() {
  return (
    <StyledAppBar position="static">
      <StyledToolbar>
        <ContentBox>
          <Breadcrumbs />
        </ContentBox>
        <DateBox>
          <DateDisplay />
        </DateBox>
      </StyledToolbar>
    </StyledAppBar>
  );
}
