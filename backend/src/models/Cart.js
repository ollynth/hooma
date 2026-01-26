import mongoose from "mongoose";

const Schema = mongoose.Schema;

const cartItemSchema = new Schema({
    productID:{
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    priceAtTimeofAdding: {
        type: Number,
        required: true,
        min: 0
    }
});

const cartSchema = new Schema({
    UserId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    items: [cartItemSchema]
}, { timestamps: true });