import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container } from '@mui/material';

// Components
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import BranchDashboard from './components/branch/BranchDashboard';
import NotificationSystem from './components/notifications/NotificationSystem';
import PolicyManagement from './components/crm/PolicyManagement';
import PolicyPremiumCalculator from './components/crm/PolicyPremiumCalculator';
import PolicyLapseDetection from './components/crm/PolicyLapseDetection';
import TillManagementSystem from './components/till/TillManagementSystem';
import QueryTicketingSystem from './components/crm/QueryTicketingSystem';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navigation />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/branch-dashboard" element={<BranchDashboard />} />
            <Route path="/notification-system" element={<NotificationSystem />} />
            <Route path="/policy-management" element={<PolicyManagement />} />
            <Route path="/policy-premium-calculator" element={<PolicyPremiumCalculator />} />
            <Route path="/policy-lapse-detection" element={<PolicyLapseDetection />} />
            <Route path="/till-management-system" element={<TillManagementSystem />} />
            <Route path="/query-ticketing-system" element={<QueryTicketingSystem />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
