const express = require('express');
const router = express.Router();

const products = [
  { id: 1, name: 'Laptop', price: 999.99, category: 'electronics', stock: 10 },
  { id: 2, name: 'Desk Chair', price: 249.99, category: 'furniture', stock: 25 },
  { id: 3, name: 'Coffee Maker', price: 79.99, category: 'appliances', stock: 50 },
];

router.get('/', (req, res) => {
  const { category } = req.query;
  if (category) {
    return res.json(products.filter(p => p.category === category));
  }
  res.json(products);
});

router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

router.post('/', (req, res) => {
  const { name, price, category, stock = 0 } = req.body;
  if (!name || price === undefined || !category) {
    return res.status(400).json({ error: 'name, price, and category are required' });
  }
  const newProduct = { id: products.length + 1, name, price, category, stock };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

router.delete('/:id', (req, res) => {
  const index = products.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Product not found' });
  products.splice(index, 1);
  res.status(204).send();
});

module.exports = router;
