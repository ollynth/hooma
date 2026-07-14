import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import mongoose from 'mongoose';
import authRouter from './routes/AuthRoutes.js';
import userRouter from './routes/UserRoutes.js';
import productRouter from './routes/ProductRoutes.js';
import cartRouter from './routes/CartRoutes.js';
import orderRouter from './routes/OrderRoutes.js';
import connectDB from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';
import cookieParser from "cookie-parser";
import { verifyCsrfToken } from "./middleware/csrf.js";

dotenv.config(); 
const PORT = process.env.PORT || 4001;
const pathToUploads = path.join(path.resolve(), './src/uploads');
console.log('Uploads directory path:', pathToUploads);

const app = express();
app.use(cookieParser());
app.use(cors({ origin: process.env.FE_PATH, credentials: true }));
app.use(verifyCsrfToken); 

app.use(express.json());
app.use(rateLimiter);
app.use('/auth', authRouter);
app.use('/user', userRouter); 
// app.use('/uploads', express.static(pathToUploads));
app.use("/products", productRouter);
app.use("/cart", cartRouter);
app.use("/orders", orderRouter);

connectDB().then(() => {
    app.listen(PORT,() => {
        console.log('Server is running on port:', PORT);
    });
});