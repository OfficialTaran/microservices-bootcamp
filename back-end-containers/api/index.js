import express from 'express'

// constants
const port = process.env.PORT || 80

// setup express
const app = express()
app.use(express.json())

app.get('/api/hello', (req,res) => {
  console.log('api hello')
  res.json({ msg: 'hello'})
})

app.listen(port, () => {
  console.log(`Server has started on port: ${port}`)
})