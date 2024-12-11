import React from 'react';
import { Typography, Paper, Box } from '@mui/material';

function QueryTicketingSystem() {
  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Query Ticketing
        </Typography>
        <Typography>Welcome to Query Ticketing System</Typography>
      </Paper>
    </Box>
  );
}

export default QueryTicketingSystem;
