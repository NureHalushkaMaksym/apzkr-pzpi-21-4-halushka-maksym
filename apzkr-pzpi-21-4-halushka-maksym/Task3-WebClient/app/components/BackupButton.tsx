// src/components/BackupButton.tsx
import React from 'react';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';

const BackupButton: React.FC = () => {
  const router = useRouter();

  const handleCreateBackup = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/backup/create', {
        method: 'GET',
      });

      if (response.ok) {
        const { filePath } = await response.json();
        const downloadResponse = await fetch(`http://localhost:3000/api/backup/download?filePath=${encodeURIComponent(filePath)}`);
        if (downloadResponse.ok) {
          const blob = await downloadResponse.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = filePath.split('/').pop()!;
          document.body.appendChild(a);
          a.click();
          a.remove();
        }
      } else {
        console.error('Failed to create backup');
      }
    } catch (error) {
      console.error('Error creating backup', error);
    }
  };

  return (
    <Button variant="contained" color="primary" onClick={handleCreateBackup}>
      Create Backup
    </Button>
  );
};

export default BackupButton;
