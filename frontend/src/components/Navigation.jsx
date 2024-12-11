import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

function Navigation() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Flux Funeral Services
        </Typography>
        <Button color="inherit" component={Link} to="/">Dashboard</Button>
        <Button color="inherit" component={Link} to="/branch-dashboard">Branch</Button>
        <Button color="inherit" component={Link} to="/notification-system">Notifications</Button>
        <Button color="inherit" component={Link} to="/policy-management">Policies</Button>
        <Button color="inherit" component={Link} to="/till-management-system">Till</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navigation;
