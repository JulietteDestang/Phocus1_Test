import React from 'react';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import { Stack, Box, Typography } from '@mui/material';
import { MonetizationOn, TrendingUp } from '@mui/icons-material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Theme from '../theme';
import InterestCalculation from './InterestCalculator'; 
import InvestmentCalculation from './InvestmentCalculator';;

const Dashboard = [
  {
    kind: 'header',
    title: 'Calcul',
  },
  {
    segment: 'interest',
    title: 'Calcul d’intérêt composés',
    icon: <TrendingUp />,
  },
  {
    segment: 'investment',
    title: 'Calcul d’investissement',
    icon: <MonetizationOn />,
  },
];

const DashboardPage = () => {
  return (
    <AppProvider navigation={Dashboard} theme={Theme}>
      <Router>
        <DashboardLayout
          slots={{
            appTitle: () => <Typography variant="h4">Phocus1</Typography>,
          }}
        >
          <PageContainer>
            <Stack spacing={4} sx={{ marginTop: 4 }} direction="column">
              <Box flex={1}>
                <Routes>
                  <Route path="/interest" element={<InterestCalculation />} />
                  <Route path="/investment" element={<InvestmentCalculation />} />
                </Routes>
              </Box>
            </Stack>
          </PageContainer>
        </DashboardLayout>
      </Router>
    </AppProvider>
  );
};

export default DashboardPage;
