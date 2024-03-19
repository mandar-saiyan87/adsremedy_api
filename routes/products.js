import express, { response } from 'express'
import Product from '../models/product.js'
import { body, validationResult } from 'express-validator'

const router = express.Router()


// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find()
    if (products) {
      res.status(200).json({ 'status': 'Success', 'products': products })
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error")
  }
})

// Get product by id
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      return res.status(404).json({ 'status': 'Failed', 'msg': 'Product not found' })
    }
    return res.status(200).json({ 'status': 'Success', 'product': product })
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error")
  }
})

// Add new product
router.post('/', [
  body('name', 'Enter valid name').isLength({ min: 4 }),
  body('description', 'Description atleast 5 characters').isLength({ min: 5 }),
  body('price', 'Enter valid price').notEmpty()
],
  async (req, res) => {
    try {
      //Validate data, if not return validation error
      const error = validationResult(req)
      const { name, description, price } = req.body
      if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
      }
      const newProduct = await new Product({
        name, description, price
      })
      const addProduct = await newProduct.save()
      if (addProduct._id) {
        res.status(201).json({ 'status': 'Success', 'product': addProduct })
      } else {
        res.status(400).json({ 'status': 'Failed', 'msg': 'Failed to add new product' })
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error")
    }

  }
)

// Edit / Modify existing product
router.put('/:id', [
  body('name', 'Enter valid title').isLength({ min: 4 }),
  body('description', 'Description atleast 5 characters').isLength({ min: 5 }),
  body('price', 'Enter valid price').notEmpty()
],
  async (req, res) => {
    try {
      //Validate data, if not return validation error
      const error = validationResult(req)
      if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
      }
      const { name, description, price } = req.body
      const updatedProd = {}
      if (name) { updatedProd.name = name }
      if (description) { updatedProd.description = description }
      if (price) { updatedProd.price = price }

      // Find if product by id exist
      const product = await Product.findById(req.params.id)
      if (!product) {
        return res.status(404).json({ 'status': 'Failed', 'msg': 'Product not found' })
      }
      // console.log(product)
      const productUpdate = await Product.findByIdAndUpdate(req.params.id, { $set: updatedProd }, { new: true })
      return res.status(201).json({ 'status': 'Success', 'product': productUpdate })
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error")
    }
  }
)

// Delete product
router.delete('/:id', async (req, res) => {
  try {
    // Find if product by id exist
    const product = await Product.findById(req.params.id)
    if (!product) {
      return res.status(404).json({ 'status': 'Failed', 'msg': 'Product not found' })
    }
    const productDel = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ 'status': 'Success', 'msg': 'Product deleted successfully' })
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error")
  }
})

export default router