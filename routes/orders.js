import express, { response } from 'express'
import Order from '../models/orders.js'
import { body, validationResult } from 'express-validator'

const router = express.Router()

// Get all orders
router.get('/', async (req, res) => {
  try {
    const ordersData = await Order.find().populate('ordersdetails.product')
    if (ordersData) {
      res.status(201).json({ 'status': 'Success', 'orders': ordersData })
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error")
  }
})

// Get order by id
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('ordersdetails.product')
    if (!order) {
      return res.status(404).json({ 'status': 'Failed', 'msg': 'Order not found' })
    }
    return res.status(200).json({ 'status': 'Success', 'order': order })
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error")
  }
})

// Create new order
router.post('/', [
  body('customername', 'Enter valid name').isLength({ min: 4 }),
  body('totalcost', 'Total cost missing').notEmpty(),
  body('ordersdetails', 'No products added').notEmpty()
],
  async (req, res) => {
    try {
      const error = validationResult(req)
      if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
      }
      const { customername, totalcost, ordersdetails } = req.body
      const newOrder = await new Order({
        customername, totalcost, ordersdetails
      })
      const addOrder = await newOrder.save()
      if (addOrder._id) {
        res.status(201).json({ 'status': 'Success', 'order': addOrder })
      }
      else {
        res.status(400).json({ 'status': 'Failed', 'msg': 'Failed to add new order' })
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error")
    }
  }
)

export default router
