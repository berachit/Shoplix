import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./config/db.js"
import connectCloudinary from "./config/cloudinary.js"
import userRouter from "./routes/userRoute.js"
import productRouter from "./routes/productRoute.js"
import { cartRouter } from "./routes/cartRouter.js"
import { orderRouter } from "./routes/orderRoutes.js"

// app config
const app = express()
const port = process.env.PORT || 9000;
connectDB();
connectCloudinary();

// middlewares
app.use(express.json()) //auto covert incoming json into JS object
app.use(cors())

// API endpoints
app.use("/api/user", userRouter)
app.use("/api/product",productRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`)
})