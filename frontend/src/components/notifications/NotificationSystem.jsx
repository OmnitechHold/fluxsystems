import React from 'react';
import { Typography, Paper, Box } from '@mui/material';

function NotificationSystem() {
  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Notification System
        </Typography>
        <Typography>Welcome to the Notification System</Typography>
      </Paper>
    </Box>
  );
}

export default NotificationSystem;
