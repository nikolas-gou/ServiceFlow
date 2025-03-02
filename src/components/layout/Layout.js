import React from "react";
import { Box, Typography } from "@mui/material";
import SideBar from "./SideBar";
import TopAppBar from "./TopAppBar";

const drawerWidth = 250;

const Layout = (props) => {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <Box sx={{ width: drawerWidth, minWidth: drawerWidth, flexShrink: 0 }}>
        <SideBar />
      </Box>

      {/* Κεντρικό περιεχόμενο (Αφήνει χώρο για το Sidebar) */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <TopAppBar />
        {/* Scrollable Content */}
        <Box sx={{ flexGrow: 1, p: 3, overflowY: "auto" }}>
          {props.children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
