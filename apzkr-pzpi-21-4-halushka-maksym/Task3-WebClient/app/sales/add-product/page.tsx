"use client";

import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Alert } from '@mui/material';

const AddProductPage = () => {
  const [productName, setProductName] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/sales/add-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ product_name: productName, amount: parseFloat(amount) }),
      });

      console.log('Response status:', response.status);
      if (!response.ok) {
        const errorText = await response.text();
        console.log('Error text:', errorText);
        throw new Error(`Failed to add product: ${errorText}`);
      }

      const result = await response.json();
      console.log('Product added:', result);

      setProductName('');
      setAmount('');
      setMessage('Product added successfully!');
      setIsError(false);
    } catch (error) {
      console.error('Error adding product:', error);
      setMessage(`Error adding product: ${error.message}`);
      setIsError(true);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Add Product
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <TextField
          label="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
        />
        <TextField
          label="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Add Product
        </Button>
      </Box>

      {message && (
        <Box mt={2}>
          <Alert severity={isError ? 'error' : 'success'}>{message}</Alert>
        </Box>
      )}
    </Container>
  );
};

export default AddProductPage;
