import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import Theme from './theme';
import Dashboard from './components/Dashboard'

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <Dashboard />
    </ThemeProvider>
  );
}

export default App;
