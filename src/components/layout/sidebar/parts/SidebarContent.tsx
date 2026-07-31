import type { ReactNode, MouseEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Divider,
  Tooltip,
  IconButton,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AssessmentIcon from '@mui/icons-material/Assessment';
import GroupIcon from '@mui/icons-material/Group';
import BuildIcon from '@mui/icons-material/Build';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import CableIcon from '@mui/icons-material/Cable';
import FeedbackIcon from '@mui/icons-material/Feedback';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { styled } from '@mui/material/styles';
import logo from '../../../../assets/OIP-removebg-preview-2.png';
import { accentColors } from '../../../../styles/colors';

const LogoContainer = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(3, 2),
  marginBottom: theme.spacing(1),
  background:
    'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: '20%',
    right: '20%',
    height: '2px',
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
  },
}));

const StyledLogo = styled('img')({
  width: 70,
  height: 70,
  marginBottom: 8,
  filter: 'brightness(0) invert(1)',
  transition: 'all 0.2s ease',
  '&:hover': {
    transform: 'scale(1.05) rotate(5deg)',
  },
});

const StyledListItem = styled(ListItemButton)(() => ({
  margin: '4px 12px',
  borderRadius: '12px',
  color: 'rgba(255, 255, 255, 0.8)',
  transition: 'all 0.2s ease',
  justifyContent: 'center',
  '&:hover': {
    background:
      'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
    color: 'white',
    '& .MuiListItemIcon-root': {
      transform: 'scale(1.1)',
      color: 'white',
    },
  },
  '&.Mui-selected': {
    background:
      'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.1) 100%)',
    color: 'white',
    '&:hover': {
      background:
        'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.15) 100%)',
    },
    '& .MuiListItemIcon-root': {
      transform: 'scale(1.1)',
      color: 'white',
    },
    '& .MuiListItemText-primary': {
      fontWeight: 600,
    },
  },
}));

const StyledListItemCollapsed = styled(ListItemButton)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '2px 4px',
  padding: '6px 2px',
  borderRadius: '12px',
  color: 'rgba(255, 255, 255, 0.8)',
  transition: 'all 0.2s ease',
  minHeight: 'auto',
  '&:hover': {
    background:
      'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
    color: 'white',
    transform: 'translateY(-2px)',
    '& .MuiListItemIcon-root': {
      transform: 'scale(1.1)',
      color: 'white',
    },
  },
  '&.Mui-selected': {
    background:
      'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.1) 100%)',
    color: 'white',
    '&:hover': {
      background:
        'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.15) 100%)',
    },
    '& .MuiListItemIcon-root': {
      transform: 'scale(1.1)',
      color: 'white',
    },
  },
}));

const StyledListItemExpanded = styled(StyledListItem)({
  justifyContent: 'flex-start',
  paddingLeft: '16px',
  '&:hover': {
    transform: 'translateX(4px)',
  },
});

const StyledListItemIcon = styled(ListItemIcon)({
  minWidth: 40,
  color: 'rgba(255, 255, 255, 0.8)',
  transition: 'all 0.2s ease',
  justifyContent: 'center',
});

const StyledListItemText = styled(ListItemText)({
  '& .MuiListItemText-primary': {
    fontSize: '0.95rem',
    fontWeight: 500,
    transition: 'all 0.2s ease',
  },
});

const CollapsedItemIcon = styled(ListItemIcon)({
  minWidth: 0,
  color: 'rgba(255, 255, 255, 0.8)',
  justifyContent: 'center',
  transition: 'all 0.2s ease',
});

const CollapsedItemText = styled(ListItemText)({
  '& .MuiListItemText-primary': {
    fontSize: '0.6rem',
    fontWeight: 500,
    textAlign: 'center',
    lineHeight: 1.2,
    transition: 'all 0.2s ease',
  },
});

const FooterText = styled(Typography)(({ theme }) => ({
  position: 'absolute',
  bottom: theme.spacing(2),
  left: theme.spacing(2),
  right: theme.spacing(2),
  textAlign: 'center',
  fontSize: '0.75rem',
  color: 'rgba(255, 255, 255, 0.6)',
  opacity: 0.8,
  transition: 'opacity 0.2s ease',
  whiteSpace: 'wrap',
}));

const StyledDivider = styled(Divider)({
  margin: '12px 24px',
  background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
  height: '1px',
});

const CollapseButton = styled(IconButton)(() => ({
  color: 'rgba(255, 255, 255, 0.6)',
  transition: 'all 0.2s ease',
  '&:hover': {
    color: 'white',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
}));

const CollapsedLogo = styled('img')({
  width: 36,
  height: 36,
  filter: 'brightness(0) invert(1)',
  transition: 'all 0.2s ease',
  '&:hover': {
    transform: 'scale(1.05) rotate(5deg)',
  },
});

interface MenuItem {
  text: string;
  route: string;
  icon: ReactNode;
}

interface SidebarContentProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export default function SidebarContent({ collapsed, onToggleCollapse }: SidebarContentProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleListItemClick = (event: MouseEvent, route: string) => {
    navigate(route);
  };

  const menuItems: MenuItem[] = [
    {
      text: 'Αρχική',
      route: '/dashboard/overview',
      icon: <HomeIcon sx={{ color: accentColors.blue.base }} />,
    },
    {
      text: 'Στατιστικά',
      route: '/dashboard/analytics',
      icon: <AssessmentIcon sx={{ color: accentColors.cyan.base }} />,
    },
    {
      text: 'Πελάτες',
      route: '/dashboard/customers',
      icon: <GroupIcon sx={{ color: accentColors.teal.base }} />,
    },
    {
      text: 'Κινητήρες',
      route: '/dashboard/motors',
      icon: <SettingsIcon sx={{ color: accentColors.motorBlue.base }} />,
    },
    {
      text: 'Επισκευές',
      route: '/dashboard/services',
      icon: <BuildIcon sx={{ color: accentColors.orange.base }} />,
    },
  ];

  const settingsItems: MenuItem[] = [
    {
      text: 'Συνδέσεις',
      route: '/dashboard/connections',
      icon: <CableIcon sx={{ color: accentColors.purple.base }} />,
    },
    {
      text: 'Σχετικά',
      route: '/dashboard/about',
      icon: <InfoIcon sx={{ color: accentColors.indigo.base }} />,
    },
    {
      text: 'Feedback',
      route: '/dashboard/feedback',
      icon: <FeedbackIcon sx={{ color: accentColors.pink.base }} />,
    },
  ];

  const renderMenuItem = (item: MenuItem) => {
    const isSelected =
      item.route === '/dashboard'
        ? location.pathname === item.route
        : location.pathname.startsWith(item.route);

    if (collapsed) {
      return (
        <StyledListItemCollapsed
          key={item.route}
          selected={isSelected}
          onClick={(event) => handleListItemClick(event, item.route)}
        >
          <CollapsedItemIcon>{item.icon}</CollapsedItemIcon>
          <CollapsedItemText primary={item.text} />
        </StyledListItemCollapsed>
      );
    }

    return (
      <StyledListItemExpanded
        key={item.route}
        selected={isSelected}
        onClick={(event) => handleListItemClick(event, item.route)}
      >
        <StyledListItemIcon>{item.icon}</StyledListItemIcon>
        <StyledListItemText primary={item.text} />
      </StyledListItemExpanded>
    );
  };

  if (collapsed) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '8px 0',
            width: '100%',
          }}
        >
          <Tooltip title="Service Flow" placement="right" arrow>
            <Box sx={{ cursor: 'pointer' }}>
              <CollapsedLogo src={logo} alt="logo" />
            </Box>
          </Tooltip>
          <Tooltip title="Ανάπτυξη μενού" placement="right" arrow>
            <CollapseButton onClick={onToggleCollapse} sx={{ mt: 0.5 }}>
              <ChevronRightIcon />
            </CollapseButton>
          </Tooltip>
        </Box>

        <List sx={{ width: '100%', px: 0.5, py: 0 }}>
          {menuItems.map((item) => renderMenuItem(item))}
        </List>

        <StyledDivider sx={{ width: '60%', mx: 'auto' }} />

        <List sx={{ width: '100%', px: 0.5, py: 0 }}>
          {settingsItems.map((item) => renderMenuItem(item))}
        </List>
      </Box>
    );
  }

  return (
    <>
      <LogoContainer>
        <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
          <Tooltip title="Σύμπτυξη μενού" placement="right" arrow>
            <CollapseButton onClick={onToggleCollapse} size="small">
              <ChevronLeftIcon />
            </CollapseButton>
          </Tooltip>
        </Box>
        <StyledLogo src={logo} alt="logo" />
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            fontSize: '1.1rem',
            color: 'white',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
          }}
        >
          Επισκευές Μοτέρ
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: 'rgba(255, 255, 255, 0.7)',
            letterSpacing: '1px',
            mt: 0.5,
            textTransform: 'uppercase',
            fontSize: '0.7rem',
          }}
        >
          Service Flow
        </Typography>
      </LogoContainer>
      <List>{menuItems.map((item) => renderMenuItem(item))}</List>
      <StyledDivider />
      <List>{settingsItems.map((item) => renderMenuItem(item))}</List>
      <FooterText>© 2025 Nikolaos Gkouziotis. All rights reserved.</FooterText>
    </>
  );
}
