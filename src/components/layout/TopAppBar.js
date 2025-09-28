import React from 'react';
import { AppBar, Toolbar, Box, IconButton, styled } from '@mui/material';
import Breadcrumbs from './Breadcrumbs';
import DateDisplay from './parts/DateDisplay';
import { Menu as MenuIcon } from '@mui/icons-material';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
  boxShadow: 'none',
  color: 'white',
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

const MenuButton = styled(IconButton)(({ theme }) => ({
  marginRight: theme.spacing(2),
  color: 'white',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
}));

export default function TopAppBar({ onMenuClick, isLargeScreen }) {
  return (
    <StyledAppBar position="static">
      <StyledToolbar>
        {!isLargeScreen && (
          <MenuButton color="inherit" aria-label="open drawer" edge="start" onClick={onMenuClick}>
            <MenuIcon />
          </MenuButton>
        )}
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
