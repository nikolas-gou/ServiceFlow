import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Drawer,
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
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import FeedbackIcon from '@mui/icons-material/Feedback';
import { styled } from '@mui/material/styles';
import logo from '../../assets/OIP-removebg-preview-2.png';

const drawerWidth = 250;

const StyledDrawer = styled(Drawer)(() => ({
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    backgroundColor: '#f9fafb', // Πολύ ανοιχτό γκρι
    borderRight: '1px solid #e0e0e0',
  },
}));

const StyledListItem = styled(ListItemButton)(({ theme }) => ({
  borderRadius: 8,
  margin: '4px 8px',
  '&:hover': {
    backgroundColor: '#e3f2fd',
  },
  '&.Mui-selected': {
    backgroundColor: '#bbdefb',
    fontWeight: 'bold',
    color: '#0d47a1',
    '& .MuiListItemIcon-root': {
      color: '#0d47a1',
    },
  },
}));

export default function SideBar() {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (event, index, route) => {
    navigate(route);
    setSelectedIndex(index);
  };

  const menuItems = [
    {
      text: 'Αρχική',
      route: '/dashboard/overview',
      icon: <HomeIcon sx={{ color: '#1976d2' }} />,
      index: 0,
    },
    {
      text: 'Στατιστικά',
      route: '/dashboard/analytics',
      icon: <AssessmentIcon sx={{ color: '#0288d1' }} />,
      index: 1,
    },
    {
      text: 'Πελάτες',
      route: '/dashboard/customers',
      icon: <GroupIcon sx={{ color: '#009688' }} />,
      index: 2,
    },
    {
      text: 'Επισκευές',
      route: '/dashboard/services',
      icon: <BuildIcon sx={{ color: '#f57c00' }} />,
      index: 3,
    },
  ];

  const settingsItems = [
    { text: 'Ρυθμίσεις', icon: <SettingsIcon sx={{ color: '#607d8b' }} />, index: 4 },
    { text: 'Σχετικά', icon: <InfoIcon sx={{ color: '#5c6bc0' }} />, index: 5 },
    { text: 'Feedback', icon: <FeedbackIcon sx={{ color: '#c2185b' }} />, index: 6 },
  ];

  return (
    <StyledDrawer variant="permanent" anchor="left">
      <Box
        sx={{
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <img src={logo} alt="logo" style={{ width: 60, marginBottom: 6 }} />
        <Typography variant="subtitle1" fontWeight={600}>
          Επισκευές Μοτέρ
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Service Flow
        </Typography>
      </Box>

      <Divider sx={{ mb: 1 }} />

      <List>
        {menuItems.map((item) => (
          <StyledListItem
            key={item.index}
            selected={selectedIndex === item.index}
            onClick={(event) => handleListItemClick(event, item.index, item.route)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </StyledListItem>
        ))}
      </List>

      <Divider sx={{ my: 1 }} />

      <List>
        {settingsItems.map((item) => (
          <StyledListItem
            key={item.index}
            selected={selectedIndex === item.index}
            onClick={(event) => handleListItemClick(event, item.index)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </StyledListItem>
        ))}
      </List>

      <Box sx={{ position: 'absolute', bottom: 10, left: 16, right: 16 }}>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ textAlign: 'center', display: 'block' }}
        >
          © 2025 Nikolaos Gkouziotis. All rights reserved.
        </Typography>
      </Box>
    </StyledDrawer>
  );
}
