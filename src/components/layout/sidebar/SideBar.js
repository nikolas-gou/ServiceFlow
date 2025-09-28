import React from 'react';
import { Drawer } from '@mui/material';
import { styled } from '@mui/material/styles';
import SidebarContent from './parts/SidebarContent';

const drawerWidth = 250;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
    borderRight: 'none',
    boxShadow: '4px 0 24px rgba(0, 0, 0, 0.15)',
    color: 'white',
  },
}));

export default function SideBar({ tabletOpen, isLargeScreen, onClose }) {
  // Desktop version - permanent sidebar
  if (isLargeScreen) {
    return (
      <StyledDrawer variant="permanent" open>
        <SidebarContent />
      </StyledDrawer>
    );
  }

  // Mobile version - temporary drawer
  return (
    <StyledDrawer
      variant="temporary"
      anchor="left"
      open={tabletOpen}
      onClose={onClose}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile
      }}
    >
      <SidebarContent tabletOpen={tabletOpen} onClose={onClose} />
    </StyledDrawer>
  );
}
