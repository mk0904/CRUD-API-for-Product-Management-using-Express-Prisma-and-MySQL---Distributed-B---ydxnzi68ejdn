const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

// Create a new product
router.post('/create', async (req, res) => {
  const { name, stock, price } = req.body;
  if (!name || stock == null || price == null) {
    return res.status(400).json({ error: 'All fields required' });
  }
  const product = await prisma.product.create({ data: { name, stock, price } });
  res.status(201).json(product);
});

// Retrieve all products
router.get('/get', async (req, res) => {
  const products = await prisma.product.findMany();
  res.status(200).json(products);
});

// Retrieve a product by ID
router.get('/getById/:id', async (req, res) => {
  const { id } = req.params;
  const product = await prisma.product.findUnique({ where: { id: Number(id) } });
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.status(200).json(product);
});

// Update a product (full update)
router.put('/put/:id', async (req, res) => {
  const { id } = req.params;
  const { name, stock, price } = req.body;
  if (!name || stock == null || price == null) {
    return res.status(400).json({ error: 'All fields required' });
  }
  const product = await prisma.product.update({
    where: { id: Number(id) },
    data: { name, stock, price },
  });
  res.status(200).json(product);
});

// Partially update a product
router.patch('/patch/:id', async (req, res) => {
  const { id } = req.params;
  const { name, stock, price } = req.body;
  const data = { ...(name && { name }), ...(stock != null && { stock }), ...(price != null && { price }) };
  const product = await prisma.product.update({
    where: { id: Number(id) },
    data,
  });
  res.status(200).json(product);
});

// Delete a product
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.product.delete({ where: { id: Number(id) } });
  res.status(200).json({ message: 'Product is deleted' });
});

module.exports = router;
