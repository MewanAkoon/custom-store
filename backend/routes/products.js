const express = require('express');
const router = express.Router();

const { Product, validate, validateUpdatedProduct } = require('../models/products');

// Gets all the products in the database
router.get('/', async (req, res) => {
  try {
    let products = await Product.find().populate('userId');
    if (products.length === 0) return res.status(404).send('No products in the database...');
    res.send(products);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Gets a product in the database
router.get('/:id', async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send('Product not found in the database...');
    res.send(product);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get products by a user
router.get('/user/:id', async (req, res) => {
  try {
    let products = await Product.find({ userId: req.params.id });
    if (products.length === 0) return res.status(404).send('No products in the database...');
    res.send(products);
  } catch (err) {
    res.status(400).send(err);
  }
});


// Create a product
router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  try {
    const product = new Product(req.body);
    await product.save();
    res.send(product);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Updates a product
router.patch('/:id', async (req, res) => {
  const { error } = validateUpdatedProduct(req.body);
  if (error) {
    console.log(error);
    return res.status(404).send(error.details[0].message);
  }

  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(product);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Deletes a product
router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.send('Product deleted...');
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;