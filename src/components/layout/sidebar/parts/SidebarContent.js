import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Divider,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AssessmentIcon from '@mui/icons-material/Assessment';
import GroupIcon from '@mui/icons-material/Group';
import BuildIcon from '@mui/icons-material/Build';
import InfoIcon from '@mui/icons-material/Info';
import CableIcon from '@mui/icons-material/Cable';
import FeedbackIcon from '@mui/icons-material/Feedback';
import { styled } from '@mui/material/styles';
import logo from '../../../../assets/OIP-removebg-preview-2.png';

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
  transition: 'transform 0.2s ease',
  '&:hover': {
    transform: 'scale(1.05) rotate(5deg)',
  },
});

const StyledListItem = styled(ListItemButton)(({ theme }) => ({
  margin: '4px 12px',
  borderRadius: '12px',
  color: 'rgba(255, 255, 255, 0.8)',
  transition: 'all 0.2s ease',
  '&:hover': {
    background:
      'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
    color: 'white',
    transform: 'translateX(4px)',
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

const StyledListItemIcon = styled(ListItemIcon)({
  minWidth: 40,
  color: 'rgba(255, 255, 255, 0.8)',
  transition: 'all 0.2s ease',
});

const StyledListItemText = styled(ListItemText)({
  '& .MuiListItemText-primary': {
    fontSize: '0.95rem',
    fontWeight: 500,
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
  '&:hover': {
    opacity: 1,
  },
}));

const StyledDivider = styled(Divider)({
  margin: '12px 24px',
  background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
  height: '1px',
});

export default function SidebarContent({ tabletOpen, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleListItemClick = (event, route) => {
    if (tabletOpen && onClose) {
      // non-desktop version
      onClose();
    }
    navigate(route);
  };

  const menuItems = [
    {
      text: 'Αρχική',
      route: '/dashboard/overview',
      icon: <HomeIcon sx={{ color: '#90caf9' }} />,
    },
    {
      text: 'Στατιστικά',
      route: '/dashboard/analytics',
      icon: <AssessmentIcon sx={{ color: '#81d4fa' }} />,
    },
    {
      text: 'Πελάτες',
      route: '/dashboard/customers',
      icon: <GroupIcon sx={{ color: '#80cbc4' }} />,
    },
    {
      text: 'Επισκευές',
      route: '/dashboard/services',
      icon: <BuildIcon sx={{ color: '#ffb74d' }} />,
    },
  ];

  const settingsItems = [
    {
      text: 'Συνδέσεις',
      route: '/dashboard/connections',
      icon: <CableIcon sx={{ color: '#b39ddb' }} />,
    },
    {
      text: 'Σχετικά',
      route: '/dashboard/about',
      icon: <InfoIcon sx={{ color: '#9fa8da' }} />,
    },
    {
      text: 'Feedback',
      route: '/dashboard/feedback',
      icon: <FeedbackIcon sx={{ color: '#f48fb1' }} />,
    },
  ];

  return (
    <>
      <LogoContainer>
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
      <List>
        {menuItems.map((item) => (
          <StyledListItem
            key={item.route}
            selected={location.pathname === item.route}
            onClick={(event) => handleListItemClick(event, item.route)}
          >
            <StyledListItemIcon>{item.icon}</StyledListItemIcon>
            <StyledListItemText primary={item.text} />
          </StyledListItem>
        ))}
      </List>
      <StyledDivider />
      <List>
        {settingsItems.map((item) => (
          <StyledListItem
            key={item.route}
            selected={location.pathname === item.route}
            onClick={(event) => handleListItemClick(event, item.route)}
          >
            <StyledListItemIcon>{item.icon}</StyledListItemIcon>
            <StyledListItemText primary={item.text} />
          </StyledListItem>
        ))}
      </List>
      <FooterText>© 2025 Nikolaos Gkouziotis. All rights reserved.</FooterText>
    </>
  );
}
