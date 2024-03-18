import express, { response } from 'express'
import Product from '../models/product.js'
import { body, validationResult } from 'express-validator'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const products = await Product.find({})
    if (products) {
      res.status(200).json({ 'status': 'Success', 'products': products })
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error")
  }
})

router.post('/', [
  body('name', 'Enter valid title').isLength({ min: 4 }),
  body('description', 'Description atleast 5 characters').isLength({ min: 5 }),
  body('price', 'Enter valid price').notEmpty()
],
  async (req, res) => {
    try {
      const { name, description, price } = req.body
      //Validate data, if not return validation error
      const error = validationResult(req)
      if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
      }
      const newProduct = await new Product({
        name, description, price
      })
      const addProduct = await newProduct.save()
      if (addProduct._id) {
        res.status(201).json({ 'status': 'Success', 'productId': addProduct })
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error")
    }

  }
)

router.put('/:id', [
  body('name', 'Enter valid title').isLength({ min: 4 }),
  body('description', 'Description atleast 5 characters').isLength({ min: 5 }),
  body('price', 'Enter valid price').notEmpty()
],
  async (req, res) => {
    try {
      const { name, description, price } = req.body
      //Validate data, if not return validation error
      const error = validationResult(req)
      if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
      }
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

router.delete('/:id', async (req, res) => {
  try {
    // Find if product by id exist
    const product = await Product.findById(req.params.id)
    if (!product) {
      return res.status(404).json({ 'status': 'Failed', 'msg': 'Product not found' })
    }
    const productDel = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ 'status': 'Success', 'msg': 'Note deleted successfully' })
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error")
  }
})

export default router