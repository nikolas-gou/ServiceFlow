import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AssessmentIcon from "@mui/icons-material/Assessment";
import GroupIcon from "@mui/icons-material/Group";
import BuildIcon from "@mui/icons-material/Build";
import SettingsIcon from "@mui/icons-material/Settings";
import InfoIcon from "@mui/icons-material/Info";
import FeedbackIcon from "@mui/icons-material/Feedback";
import { styled } from "@mui/material/styles";
import logo from "../../assets/OIP-removebg-preview-2.png";

const drawerWidth = 250;

// **Ανοιχτό Sidebar**
const StyledDrawer = styled(Drawer)({
  "& .MuiDrawer-paper": {
    width: drawerWidth,
    backgroundColor: "#EFF1F4", // Ανοιχτό γκρι
    borderRight: "1px solid #D1D4DA", // Λεπτό περίγραμμα
  },
});

// **Στυλ επιλεγμένου και hover item**
const StyledListItem = styled(ListItemButton)(({ theme }) => ({
  borderRadius: "8px",
  margin: "5px 10px",
  "&:hover": {
    backgroundColor: "#E4E7EB", // Πιο ανοιχτό hover
  },
  "&.Mui-selected": {
    backgroundColor: "#DADDE2", // Ανοιχτό active state
    fontWeight: "bold",
    color: "black",
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
      text: "Αρχική",
      route: "/dashboard/overview",
      icon: <HomeIcon />,
      index: 0,
    },
    {
      text: "Στατιστικά",
      route: "/dashboard/analytics",
      icon: <AssessmentIcon />,
      index: 1,
    },
    {
      text: "Πελάτες",
      route: "/dashboard/customers",
      icon: <GroupIcon />,
      index: 2,
    },
    {
      text: "Επισκευές",
      route: "/dashboard/services",
      icon: <BuildIcon />,
      index: 3,
    },
  ];

  const settingsItems = [
    { text: "Ρυθμίσες", icon: <SettingsIcon />, index: 4 },
    { text: "Σχετικά", icon: <InfoIcon />, index: 5 },
    { text: "Feedback", icon: <FeedbackIcon />, index: 6 },
  ];

  return (
    <StyledDrawer variant="permanent" anchor="left">
      {/* LOGO SECTION */}
      <Box
        sx={{
          p: 2,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img src={logo} alt="logo" style={{ width: 60, marginBottom: 8 }} />
        <Typography variant="subtitle1" fontWeight="bold">
          Επισκευές Μοτέρ
        </Typography>
        <Typography variant="caption" color="gray">
          Service Flow
        </Typography>
      </Box>

      <Divider />

      {/* MENU ITEMS */}
      <List>
        {menuItems.map((item, index) => (
          <StyledListItem
            key={item.index}
            selected={selectedIndex === item.index}
            onClick={(event) =>
              handleListItemClick(event, item.index, item.route)
            }
          >
            <ListItemIcon
              sx={{ color: selectedIndex === item.index ? "black" : "gray" }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </StyledListItem>
        ))}
      </List>

      <Divider />

      {/* SETTINGS SECTION */}
      <List>
        {settingsItems.map((item) => (
          <StyledListItem
            key={item.index}
            selected={selectedIndex === item.index}
            onClick={(event) => handleListItemClick(event, item.index)}
          >
            <ListItemIcon
              sx={{ color: selectedIndex === item.index ? "black" : "gray" }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </StyledListItem>
        ))}
      </List>
    </StyledDrawer>
  );
}
