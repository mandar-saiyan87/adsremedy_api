import mongoose from 'mongoose'

const OrdersSchema = mongoose.Schema({
  customername: {
    type: String,
    required: true
  },
  totalcost: {
    type: Number,
    required: true
  },
  ordersdetails: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Products',
      required: true
    },
    qty: {
      type: Number,
      required: true
    }
  }
  ]
})

const Orders = mongoose.model('Orders', OrdersSchema)
export default Orders