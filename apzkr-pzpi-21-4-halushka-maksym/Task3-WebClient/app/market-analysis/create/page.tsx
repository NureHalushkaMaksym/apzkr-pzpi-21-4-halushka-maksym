"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TextField, Button, Container, Box, Typography } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_BASE_URL = 'http://localhost:3000/api/market-analysis';

const createMarketAnalysis = async (marketAnalysis: { description: string; status: string; data: any }) => {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(marketAnalysis),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const CreateMarketAnalysisPage = () => {
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [data, setData] = useState<any>(''); // Додане поле для data
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await createMarketAnalysis({ description, status, data });
      toast.success('Market Analysis created successfully!');
      router.push('/market-analysis'); // Повертаємо на список аналізів після успішного створення
    } catch (error) {
      toast.error('Error creating Market Analysis');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Typography variant="h4" component="h1" gutterBottom>
          Create Market Analysis
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          id="description"
          label="Description"
          name="description"
          autoFocus
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="status"
          label="Status"
          name="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
        <TextField
          margin="normal"
          fullWidth
          id="data"
          label="Data"
          name="data"
          value={data}
          onChange={(e) => setData(e.target.value)}
          helperText="Enter the data in JSON format"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          Create
        </Button>
        <Button
          onClick={() => router.push('/market-analysis')}
          fullWidth
          variant="outlined"
          style={{ marginTop: '10px' }}
        >
          Back to List
        </Button>
      </Box>
      <ToastContainer />
    </Container>
  );
};

export default CreateMarketAnalysisPage;
