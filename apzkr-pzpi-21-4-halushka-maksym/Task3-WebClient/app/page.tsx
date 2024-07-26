// app/page.tsx
import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const HomePage: React.FC = () => {
  return (
    <Container>
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        height="80vh" // висота контейнера, щоб надпис був по центру екрану
      >
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Welcome to the software system "Food Sales Zones"
        </Typography>
      </Box>
    </Container>
  );
};

export default HomePage;
