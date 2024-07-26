"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Оставить, если используется в другом месте
import { TextField, Button, Container, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_BASE_URL = 'http://localhost:3000/api/market-analysis';

const getMarketAnalyses = async () => {
  const response = await fetch(API_BASE_URL);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

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

const deleteMarketAnalysis = async (id: number) => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
};

const CreateMarketAnalysis = ({ onCreate }: { onCreate: () => void }) => {
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [data, setData] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await createMarketAnalysis({ description, status, data });
      toast.success('Market Analysis created successfully!');
      onCreate();
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
      </Box>
      <ToastContainer />
    </Container>
  );
};

const MarketAnalysisList = ({ analyses, onDelete }: { analyses: any[]; onDelete: (id: number) => void }) => {
  const router = useRouter();

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Market Analyses
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Analysis Date</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Data</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {analyses.map((analysis) => (
              <TableRow key={analysis.id}>
                <TableCell>{analysis.id}</TableCell>
                <TableCell>{new Date(analysis.analysis_date).toLocaleDateString()}</TableCell>
                <TableCell>{analysis.description}</TableCell>
                <TableCell>{analysis.status}</TableCell>
                <TableCell>{typeof analysis.data === 'object' ? JSON.stringify(analysis.data) : analysis.data}</TableCell>
                <TableCell>
                  <Button variant="contained" color="secondary" onClick={() => onDelete(analysis.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ToastContainer />
    </Container>
  );
};

const MarketAnalysisPage = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [marketAnalyses, setMarketAnalyses] = useState<any[]>([]);
  const router = useRouter(); // Додано useRouter

  const fetchData = async () => {
    try {
      const data = await getMarketAnalyses();
      setMarketAnalyses(data);
    } catch (error) {
      toast.error('Error fetching Market Analyses');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = () => {
    setShowCreateForm(false);
    fetchData();
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteMarketAnalysis(id);
      setMarketAnalyses(marketAnalyses.filter((analysis) => analysis.id !== id));
      toast.success('Market Analysis deleted successfully!');
    } catch (error) {
      toast.error('Error deleting Market Analysis');
    }
  };

  return (
    <div>
      {showCreateForm ? (
        <CreateMarketAnalysis onCreate={handleCreate} />
      ) : (
        <MarketAnalysisList analyses={marketAnalyses} onDelete={handleDelete} />
      )}
      <Button onClick={() => setShowCreateForm(!showCreateForm)}>
        {showCreateForm ? 'Back to List' : 'Create New Analysis'}
      </Button>
    </div>
  );
};

export default MarketAnalysisPage;
