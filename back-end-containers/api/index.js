import { router as productRoutes } from './routes/products.js'
import { router as orderRoutes } from './routes/orders.js'
import express from 'express'

// constants
const port = process.env.PORT || 80

// setup express
const app = express()
app.use(express.json())

// routes
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)

app.get('/api/hello', (req,res) => {
  console.log('api hello')
  res.json({ msg: 'hello'})
})


app.listen(port, () => {
  console.log(`Server has started on port: ${port}`)
})