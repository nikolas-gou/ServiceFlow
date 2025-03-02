import { Button, AppBar, Toolbar, Typography } from "@mui/material";
import Dashboard from "../dashboard/Dashboard";

export default function TopAppBar(props) {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography>Service Flow</Typography>
      </Toolbar>
      <Dashboard />
    </AppBar>
  );
}
