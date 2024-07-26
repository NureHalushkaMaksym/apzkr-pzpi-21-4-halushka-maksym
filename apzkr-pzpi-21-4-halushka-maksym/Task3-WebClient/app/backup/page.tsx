"use client";

import React from 'react';
import { Container, Button, Typography } from '@mui/material';

const BackupPage: React.FC = () => {
  const handleDownloadBackup = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/backup/download');
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'test.txt'; // Назва файлу для завантаження
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        const errorText = await response.text();
        alert(`Failed to download backup: ${errorText}`);
      }
    } catch (error) {
      alert(`Failed to download backup: ${error.message}`);
    }
  };

  return (
    <Container>
      <Typography variant="h4">Backup Page</Typography>
      <Button variant="contained" color="primary" onClick={handleDownloadBackup}>
        Download Backup
      </Button>
    </Container>
  );
};

export default BackupPage;
