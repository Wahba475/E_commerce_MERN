import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import connectDB from './Config/mongodb.js'
import ProductModel from './Models/ProductsSchema.js'
import UserRouter from './routes/UserRoute.js'
import ProductsRouter from './routes/ProductsRoute.js'
import OrderRouter from './routes/OrderRoute.js'
import CartRouter from './routes/CartRoute.js'




dotenv.config()

connectDB()


const app = express()
const port = process.env.PORT || 5000


app.use(express.json())
app.use(cors())

// Serve static files from uploads directory
app.use('/uploads', express.static('uploads'))


app.get('/', (req, res) => {
    res.send('API is Running')
})
app.use('/user', UserRouter)
app.use('/products', ProductsRouter)
app.use('/cart', CartRouter)
app.use('/order', OrderRouter)



app.get("/api/products", async (req, res) => {
    const products = await ProductModel.find(); // from MongoDB
    res.json(products);
  });
  

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})





