import { router as orderRoutes } from './routes/orders.js'
import { router as productRoutes } from './routes/products.js'
import { router as shipmentRoutes } from './routes/shipments.js'
import { authFunction } from './auth.js'
import express from 'express'

// constants
const port = process.env.PORT || 80

// setup express
const app = express()
app.use(express.json())
app.use(authFunction)

// routes
app.use('/api/inventory/orders', orderRoutes)
app.use('/api/inventory/products', productRoutes)
app.use('/api/inventory/shipments', shipmentRoutes)

app.get('/api/hello', (req,res) => {
  console.log('update')
  res.json({msg: 'hello'})
})

app.listen(port, function () {
  console.log("Server has started on port: ", port);
});