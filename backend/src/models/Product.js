import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    defaultImage: { type: String, required: true }, // URL of the default image
    // images: [{ type: String }], // Array of image URLs
    variations: [{
        color: { type: String, required: true },
        size: { type: String, required: false },
        stock: { type: Number, required: true, default: 0 },
        sku: { type: String, required: true, unique: true }
    }]
}, {
    timestamps: true
});
const Product = mongoose.model("Product", productSchema);

export default Product;