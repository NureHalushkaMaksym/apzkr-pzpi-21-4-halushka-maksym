// src/layout.tsx
"use client";

import React, { ReactNode } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import Link from 'next/link';
import { AuthProvider } from './contexts/AuthContext'; // Make sure to import AuthProvider

interface RootLayoutProps {
  children: ReactNode;
}

const Header: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Food Sales Zones
        </Typography>
        <Button color="inherit" component={Link} href="/sign-in">Sign In</Button>
        <Button color="inherit" component={Link} href="/sign-up">Sign Up</Button>
      </Toolbar>
    </AppBar>
  );
};

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <title>Food Sales Zones</title>
        <meta name="description" content="Welcome to the software system Food Sales Zones" />
      </head>
      <body>
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;
