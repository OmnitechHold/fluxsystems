import React from 'react';
import { Typography, Paper, Box } from '@mui/material';

function BranchDashboard() {
  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Branch Dashboard
        </Typography>
        <Typography>Welcome to the Branch Dashboard</Typography>
      </Paper>
    </Box>
  );
}

export default BranchDashboard;
