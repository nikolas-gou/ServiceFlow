// import { Button, AppBar, Toolbar, Typography } from "@mui/material";
// import Dashboard from "../dashboard/Dashboard";

// export default function TopAppBar(props) {
//   return (
//     <AppBar position="static" color="primary">
//       <Toolbar>
//         <Typography>Service Flow</Typography>
//       </Toolbar>
//       <Dashboard />
//     </AppBar>
//   );
// }

import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import Breadcrumbs from "./Breadcrumbs";
import Search from "./Search";

export default function TopAppBar() {
  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
        boxShadow: "none",
      }}
    >
      <Toolbar>
        <Box flexGrow={1} minWidth={0}>
          <Breadcrumbs />
        </Box>
        <Box flexShrink={0}>
          <Search />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
