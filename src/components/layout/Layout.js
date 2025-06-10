import React, { useState } from 'react';
import { Box, Fab, Typography, Modal, Paper, IconButton } from '@mui/material';
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
    <Box sx={{ display: 'flex', height: '100vh' }}>
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

      {/* Κεντρικό περιεχόμενο (Αφήνει χώρο για το Sidebar) */}
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          position: 'relative', // To position the FAB
        }}
      >
        <TopAppBar />
        {/* Scrollable Content */}
        <Box sx={{ flexGrow: 1, p: 3, overflowY: 'auto' }}>{props.children}</Box>

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
          }}
        >
          <Paper
            sx={{
              width: '90%',
              maxWidth: '1200px',
              maxHeight: '90vh',
              overflow: 'auto',
              position: 'relative',
              p: 1,
            }}
          >
            <IconButton
              aria-label="close"
              onClick={handleCloseModal}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                zIndex: 2000,
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
