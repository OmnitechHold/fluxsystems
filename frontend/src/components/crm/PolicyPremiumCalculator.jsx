import React from 'react';
import { Typography, Paper, Box } from '@mui/material';

function PolicyPremiumCalculator() {
  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Premium Calculator
        </Typography>
        <Typography>Welcome to the Premium Calculator</Typography>
      </Paper>
    </Box>
  );
}

export default PolicyPremiumCalculator;
