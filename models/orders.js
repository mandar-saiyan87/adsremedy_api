import mongoose from 'mongoose'

const OrderSchema = mongoose.Schema({
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
      ref: 'Product',
      required: true
    },
    qty: {
      type: Number,
      required: true
    }
  }
  ]
})

const Order = mongoose.model('Order', OrderSchema)
export default Order