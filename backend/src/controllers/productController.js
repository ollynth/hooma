import Product from "../models/Product.js";

async function getAllProducts(_, res) {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: 'Internal server error retrieving products.' });
    }
}

async function getProductById(req, res) {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found.' });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error("Error fetching product by ID:", error);
        res.status(500).json({ message: 'Internal server error retrieving product.' }); 
    }
}

// ADMIN SIDE
async function createProduct(req, res) {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Admin access required.' });
    }
    try {
        const {name, price, stock, description, category, attributes, images} = req.body;
        const defaultImagePath = '/uploads/default_img.jpeg';
        const imagePath = req.file ? `/uploads/${req.file.filename}` : defaultImagePath;

        if (!name || !price || !description || !category || attributes.length === 0) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        if (isNaN(price) || isNaN(stock) || price < 0 || stock < 0) {
            return res.status(400).json({ message: 'Price and stock must be non-negative numbers.' });
        }

        const newProduct = new Product({
            name,
            price,
            stock,
            description,
            category,
            attributes,
            images: images && images.length > 0 ? images : [defaultImagePath],
            isActive: stock > 0 ? true : false
        })

        await newProduct.save();
2
        res.status(201).json({ message: 'Product created successfully', product: newProduct });
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ message: 'Internal server error creating product.' });
    }
}

async function updateProduct(req, res) {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Admin access required.' });
    }

    try {
        
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ message: 'Internal server error updating product.' });
    }
}

async function deleteProduct(req, res) {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Admin access required.' });
    }

    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found.' });
        }

        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Product deleted successfully.' });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ message: 'Internal server error deleting product.' });
    }
}

export default { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };