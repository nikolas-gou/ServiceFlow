import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import Breadcrumbs from './Breadcrumbs';
import DateDisplay from './parts/DateDisplay';

export default function TopAppBar() {
  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: 'background.default',
        color: 'text.primary',
        boxShadow: 'none',
      }}
    >
      <Toolbar>
        <Box flexGrow={1} minWidth={0}>
          <Breadcrumbs />
        </Box>
        <Box flexShrink={0}>
          <DateDisplay />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
