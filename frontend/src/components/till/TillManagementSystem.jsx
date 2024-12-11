import React from 'react';
import { Typography, Paper, Box } from '@mui/material';

function TillManagementSystem() {
  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Till Management
        </Typography>
        <Typography>Welcome to Till Management System</Typography>
      </Paper>
    </Box>
  );
}

export default TillManagementSystem;
