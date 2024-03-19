import express from 'express'
import cors from 'cors'
import connectMongo from './db.js'
import productroutes from './routes/products.js'
import orderroutes from './routes/orders.js'


connectMongo()
const app = express()
const port = 3000
app.use(express.json())
app.use(cors())


// Routes
app.use('/api/products', productroutes)
app.use('/api/orders', orderroutes)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`app listening on port http://loaclhost:${port}`)
})