import express from 'express'
import cors from 'cors'
import connectMongo from './db.js'


connectMongo()
const app = express()
const port = 3000
app.use(express.json())
app.use(cors())


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`app listening on port http://loaclhost:${port}`)
})