import { Drawer } from '@mui/material';
import { styled } from '@mui/material/styles';
import SidebarContent from './parts/SidebarContent';

interface StyledDrawerProps {
  drawerWidth?: number;
}

const StyledDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== 'drawerWidth',
})<StyledDrawerProps>(({ theme, drawerWidth }) => ({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    background: theme.custom.gradients.primary,
    borderRight: 'none',
    boxShadow: '4px 0 24px rgba(0, 0, 0, 0.15)',
    color: 'white',
    overflowX: 'hidden',
    transition: 'width 0.2s ease',
  },
}));

interface SideBarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export default function SideBar({ collapsed, onToggleCollapse }: SideBarProps) {
  const drawerWidth = collapsed ? 80 : 250;

  return (
    <StyledDrawer variant="permanent" open drawerWidth={drawerWidth}>
      <SidebarContent collapsed={collapsed} onToggleCollapse={onToggleCollapse} />
    </StyledDrawer>
  );
}
