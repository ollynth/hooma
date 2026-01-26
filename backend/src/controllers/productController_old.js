import Product from "../models/Products.js";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// File filter to accept only images
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only JPEG, PNG, JPG and WEBP files are allowed.'), false);
    }
};

// Configure multer with our options
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB file size limit
    }
});


// Get all products
async function getAllProducts(req, res) {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Get product by ID
async function getProductById(req, res) {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(product);
    } catch (error) {
        console.error("Error fetching product by ID:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Create a new product
async function createProduct(req, res) {
    try {
        const { name, price, description, category, images, variations } = req.body;
        const defaultImagePath = '/uploads/default_img.jpeg';
        const imagePath = req.file ? `/uploads/${req.file.filename}` : defaultImagePath;

        // Validate required fields
        if (!name || !price || !description || !category || !variations || variations.length === 0) {
            return res.status(400).json({ message: 'All fields are required, including at least one variation.' });
        }

        // Validate variations
        for (const variation of variations) {
            if (!variation.color || !variation.stock || !variation.sku) {
                return res.status(400).json({ message: 'Each variation must include color, stock, and SKU.' });
            }
        }

        const newProduct = new Product({
            name,
            price,
            description,
            category,
            defaultImage: defaultImagePath,
            variations
        });

        // Save the product to the database
        const savedProduct = await newProduct.save();

        // Respond with the saved product
        res.status(201).json(savedProduct);
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Update product by ID
async function updateProduct(req, res) {
    try {
        const { name, price, description, category, defaultImage, images, variations } = req.body;
        
         // Validate required fields
        if (!name || !price || !description || !category || !variations || variations.length === 0) {
            return res.status(400).json({ message: 'All fields are required, including at least one variation.' });
        }

        // Validate variations
        for (const variation of variations) {
            if (!variation.color || !variation.stock || !variation.sku) {
                return res.status(400).json({ message: 'Each variation must include color, stock, and SKU.' });
            }
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { name, price, description, category, variations },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Delete product by ID
async function deleteProduct(req, res) {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export { getAllProducts, getProductById, createProduct, deleteProduct, updateProduct };