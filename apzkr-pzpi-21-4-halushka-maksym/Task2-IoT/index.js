const express = require('express');
const axios = require('axios'); 
const app = express();
const port = 3002;

const getProductsFromApi = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/sales/view-product-list');
    return response.data; 
  } catch (err) {
    console.error('Failed to fetch products from API:', err.message);
    return [];
  }
};


const getRandomTemperature = () => Math.floor(Math.random() * (30 - 15 + 1)) + 15;


const getRandomDemandForProducts = (products) => {
  return products.map(product => ({
    id: product.id,
    name: product.name,
    stock: Math.floor(Math.random() * 100), 
    demand: Math.floor(Math.random() * 100)
  }));
};

app.get('/api/products', async (req, res) => {
  try {
    const products = await getProductsFromApi();

    const productsWithStockAndDemand = getRandomDemandForProducts(products);
    res.json(productsWithStockAndDemand);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get('/api/temperature', (req, res) => {
  res.json({ temperature: getRandomTemperature() });
});


app.get('/api/demand', async (req, res) => {
  try {

    const products = await getProductsFromApi();

    const demand = getRandomDemandForProducts(products);
    res.json(demand);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`IoT simulator listening at http://localhost:${port}`);
});
