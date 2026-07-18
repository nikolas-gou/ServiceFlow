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
  Tooltip,
  IconButton,
} from '@mui/material';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import HandymanRoundedIcon from '@mui/icons-material/HandymanRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import CableRoundedIcon from '@mui/icons-material/CableRounded';
import RateReviewRoundedIcon from '@mui/icons-material/RateReviewRounded';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
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
  transition: 'all 0.2s ease',
  '&:hover': {
    transform: 'scale(1.05) rotate(5deg)',
  },
});

const StyledListItem = styled(ListItemButton)(({ theme }) => ({
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

const StyledListItemCollapsed = styled(ListItemButton)(({ theme }) => ({
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

const IconBadge = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'badgeColor' && prop !== 'isSelected',
})(({ badgeColor, isSelected }) => ({
  width: 32,
  height: 32,
  borderRadius: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: isSelected ? `${badgeColor}40` : `${badgeColor}22`,
  boxShadow: isSelected ? `0 2px 8px ${badgeColor}55` : 'none',
  transition: 'all 0.2s ease',
}));

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
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  '&:hover': {
    opacity: 1,
  },
}));

const StyledDivider = styled(Divider)({
  margin: '12px 24px',
  background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
  height: '1px',
});

const CollapseButton = styled(IconButton)(({ theme }) => ({
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

export default function SidebarContent({ collapsed, onToggleCollapse }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleListItemClick = (event, route) => {
    navigate(route);
  };

  const menuItems = [
    {
      text: 'Αρχική',
      route: '/dashboard/overview',
      icon: <HomeRoundedIcon />,
      color: '#90caf9',
    },
    {
      text: 'Στατιστικά',
      route: '/dashboard/analytics',
      icon: <InsightsRoundedIcon />,
      color: '#81d4fa',
    },
    {
      text: 'Πελάτες',
      route: '/dashboard/customers',
      icon: <PeopleAltRoundedIcon />,
      color: '#80cbc4',
    },
    {
      text: 'Επισκευές',
      route: '/dashboard/services',
      icon: <HandymanRoundedIcon />,
      color: '#ffb74d',
    },
  ];

  const settingsItems = [
    {
      text: 'Συνδέσεις',
      route: '/dashboard/connections',
      icon: <CableRoundedIcon />,
      color: '#b39ddb',
    },
    {
      text: 'Σχετικά',
      route: '/dashboard/about',
      icon: <InfoRoundedIcon />,
      color: '#9fa8da',
    },
    {
      text: 'Feedback',
      route: '/dashboard/feedback',
      icon: <RateReviewRoundedIcon />,
      color: '#f48fb1',
    },
  ];

  const renderMenuItem = (item) => {
    const isSelected = location.pathname === item.route;
    const iconElement = React.cloneElement(item.icon, {
      sx: { color: item.color, fontSize: collapsed ? 18 : 19 },
    });

    if (collapsed) {
      return (
        <StyledListItemCollapsed
          key={item.route}
          selected={isSelected}
          onClick={(event) => handleListItemClick(event, item.route)}
        >
          <CollapsedItemIcon>
            <IconBadge badgeColor={item.color} isSelected={isSelected} sx={{ width: 28, height: 28 }}>
              {iconElement}
            </IconBadge>
          </CollapsedItemIcon>
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
        <StyledListItemIcon>
          <IconBadge badgeColor={item.color} isSelected={isSelected}>
            {iconElement}
          </IconBadge>
        </StyledListItemIcon>
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
      <List>
        {menuItems.map((item) => renderMenuItem(item))}
      </List>
      <StyledDivider />
      <List>
        {settingsItems.map((item) => renderMenuItem(item))}
      </List>
      <FooterText>© 2025 Nikolaos Gkouziotis. All rights reserved.</FooterText>
    </>
  );
}
