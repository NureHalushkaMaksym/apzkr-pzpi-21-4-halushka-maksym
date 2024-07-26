"use client";

import React from 'react';
import { Container, Button, Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation'; 

const DashboardPage = () => {
  const router = useRouter();

  const handleSalesClick = () => {
    router.push('/sales');
  };

  const handleMarketAnalysisClick = () => {
    router.push('/market-analysis');
  };

  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSalesClick}
          fullWidth
          sx={{ mb: 2 }}
        >
          Продажі
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleMarketAnalysisClick}
          fullWidth
        >
          Аналіз ринку
        </Button>
      </Box>
    </Container>
  );
};

export default DashboardPage;
