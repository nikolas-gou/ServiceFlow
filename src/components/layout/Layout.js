import React, { useState } from 'react';
import { Box, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SideBar from './SideBar';
import TopAppBar from './TopAppBar';
import { ModalRepairForm } from './form/parts/ModalRepairForm';

const drawerWidth = 250;

const Layout = (props) => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        // background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
      }}
    >
      {/* Sidebar */}
      <Box
        sx={{
          width: drawerWidth,
          minWidth: drawerWidth,
          flexShrink: 0,
        }}
      >
        <SideBar />
      </Box>

      {/* Main content */}
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <TopAppBar />
        {/* Scrollable Content */}
        <Box
          sx={{
            flexGrow: 1,
            p: 3,
            overflowY: 'auto',
            '& > *': {
              padding: '24px',
              transition: 'transform 0.2s ease',
            },
            '&::-webkit-scrollbar': {
              width: '8px',
              background: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'rgba(0, 0, 0, 0.1)',
              borderRadius: '4px',
              '&:hover': {
                background: 'rgba(0, 0, 0, 0.15)',
              },
            },
          }}
        >
          {props.children}
        </Box>

        {/* Floating Action Button (FAB) */}
        <Fab
          color="primary"
          aria-label="add"
          onClick={handleOpenModal}
          sx={{
            position: 'absolute',
            bottom: 24,
            right: 24,
            zIndex: 1000,
            background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
            color: 'white',
            boxShadow: '0 4px 12px rgba(30, 60, 114, 0.3)',
            transition: 'all 0.2s ease',
            '&:hover': {
              background: 'linear-gradient(135deg, #2a5298 0%, #1e3c72 100%)',
              transform: 'scale(1.05)',
              boxShadow: '0 6px 16px rgba(30, 60, 114, 0.4)',
            },
            '& .MuiSvgIcon-root': {
              transition: 'transform 0.2s',
            },
            '&:hover .MuiSvgIcon-root': {
              transform: 'rotate(90deg)',
            },
          }}
        >
          <AddIcon />
        </Fab>

        {/* Modal for the form */}
        <ModalRepairForm
          open={openModal}
          onClose={() => setOpenModal(false)}
          repair={null}
          isEdit={false}
        />
      </Box>
    </Box>
  );
};

export default Layout;
