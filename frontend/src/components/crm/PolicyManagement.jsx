import React from 'react';
import { Typography, Paper, Box } from '@mui/material';

function PolicyManagement() {
  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Policy Management
        </Typography>
        <Typography>Welcome to Policy Management</Typography>
      </Paper>
    </Box>
  );
}

export default PolicyManagement;
