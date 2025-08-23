import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import mongoose from 'mongoose';
import productRouter from './routes/productRoutes.js';
import connectDB from './config/db.js';

dotenv.config();
const PORT = process.env.PORT || 4001;
const pathToUploads = path.join(path.resolve(), 'src/uploads');
console.log('Uploads directory path:', pathToUploads);
const app = express();

app.use(express.json());

app.use('/uploads', express.static(pathToUploads));
app.use("/api/products", productRouter)

connectDB().then(() => {
    app.listen(PORT,() => {
        console.log('Server is running on port:', PORT);
    });
});