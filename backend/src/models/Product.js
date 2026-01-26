import monggose from "mongoose";

const Schema = monggose.Schema;

const productSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0 },
    description: { type: String, required: true },
    category: { type: String, required: true },
    attributes: { type: Schema.Types.Mixed, default: {}},
    images: [{ type: String }], 
    isActive: {type: Boolean, default: true}
}, {timestamps: true});

const Product = monggose.model("Product", productSchema);
export default Product;