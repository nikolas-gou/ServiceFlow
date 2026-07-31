import { useState, useRef, type ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Fab } from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import SideBar from './sidebar/SideBar';
import TopAppBar from './TopAppBar';
import { ModalConnectionForm } from './form/parts/ModalConnectionForm';
import useResponsive from '../../hooks/useResponsive';
import { useScrollRestoration } from '../../hooks/useScrollRestoration';

interface LayoutProps {
  children?: ReactNode;
}

const Layout = (props: LayoutProps) => {
  const theme = useTheme();
  const [openModal, setOpenModal] = useState(false);
  const { isLargeScreen } = useResponsive();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(!isLargeScreen);
  const location = useLocation();
  const navigate = useNavigate();
  const [, , child] = location.pathname.split('/');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  useScrollRestoration(scrollContainerRef, 'layout');

  // Νέα επισκευή -> πάντα η v2 σελίδα (η παλιά modal φόρμα δημιουργίας δεν υπάρχει πια).
  // Οι συνδέσεις (connections) συνεχίζουν να χρησιμοποιούν το δικό τους modal.
  const handleFabClick = () => {
    if (typeOfModal() === 'repair') {
      navigate('/dashboard/services/new-v2');
    } else {
      setOpenModal(true);
    }
  };

  const handleToggleCollapse = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const renderSidebar = () => (
    <SideBar
      collapsed={sidebarCollapsed}
      onToggleCollapse={handleToggleCollapse}
    />
  );

  const typeOfModal = (): 'repair' | 'connection' | undefined => {
    if (
      child === 'overview' ||
      child === 'analytics' ||
      child === 'customers' ||
      child === 'services'
    ) {
      return 'repair';
    }
    if (child === 'connections') {
      return 'connection';
    }
    return undefined;
  };

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
      }}
    >
      {/* Sidebar */}
      {renderSidebar()}

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
          ref={scrollContainerRef}
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
          onClick={handleFabClick}
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 1000,
            background: theme.custom.gradients.primary,
            color: 'white',
            boxShadow: `0 4px 12px ${alpha(theme.palette.primary.dark, 0.3)}`,
            transition: 'all 0.2s ease',
            '&:hover': {
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
              transform: 'scale(1.05)',
              boxShadow: `0 6px 16px ${alpha(theme.palette.primary.dark, 0.4)}`,
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

        {/* Modal για συνδέσεις - η δημιουργία επισκευής πλέον πηγαίνει στη v2 σελίδα, όχι modal */}
        {typeOfModal() === 'connection' && (
          <ModalConnectionForm
            open={openModal}
            onClose={() => setOpenModal(false)}
            connection={null}
            isEdit={false}
          />
        )}
      </Box>
    </Box>
  );
};

export default Layout;
