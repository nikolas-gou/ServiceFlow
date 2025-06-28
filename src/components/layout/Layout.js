import React, { useState } from 'react';
import { Box, Paper, Modal, IconButton, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import SideBar from './SideBar';
import TopAppBar from './TopAppBar';
import CreateRepairForm from './form/CreateRepairForm';

const drawerWidth = 250;

const Layout = (props) => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
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
          background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
          borderRadius: '24px 0 0 24px',
          boxShadow: '-4px 0 24px rgba(0, 0, 0, 0.1)',
          margin: '16px 0 16px 0',
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
              background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
              borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
              padding: '24px',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              border: '1px solid rgba(0,0,0,0.08)',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 24px rgba(0, 0, 0, 0.08)',
              },
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
          }}
        >
          <AddIcon />
        </Fab>

        {/* Modal for the form */}
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="create-repair-modal"
          aria-describedby="create-repair-form-modal"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            '& .MuiBackdrop-root': {
              backdropFilter: 'blur(3px)',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            },
          }}
        >
          <Paper
            sx={{
              width: '90%',
              maxWidth: '1200px',
              maxHeight: '90vh',
              overflow: 'auto',
              position: 'relative',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
              boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)',
              p: 3,
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
            <IconButton
              aria-label="close"
              onClick={handleCloseModal}
              sx={{
                position: 'absolute',
                right: 16,
                top: 16,
                zIndex: 2000,
                color: '#666',
                background: 'rgba(255, 255, 255, 0.9)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                '&:hover': {
                  background: '#fff',
                  color: '#1e3c72',
                  transform: 'rotate(90deg)',
                },
                transition: 'all 0.2s ease',
              }}
            >
              <CloseIcon />
            </IconButton>
            <CreateRepairForm onSubmitSuccess={handleCloseModal} />
          </Paper>
        </Modal>
      </Box>
    </Box>
  );
};

export default Layout;
