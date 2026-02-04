import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import mongoose from "mongoose";

const checkUserRole = (req, res, role) => {
    if (req.user.role !== role) {
        res.status(403).json({ message: 'Access denied..' });
        return false;
    }
    return true;
}

const getCart = async(req, res) => {
    if (!checkUserRole(req, res, 'customer')) return;
    
    try {
        const cart = await Cart.findOne({UserId: req.user._id}).populate('items.productID');

        if (!cart) {
            return res.status(404).json({ message: 'Cart is empty.' });
        }

        //check for any inactive products in the cart and remove them
        cart.items = cart.items.filter(item => item.productID && item.productID.isActive);
        await cart.save();

        res.status(200).json(cart);
    } catch (error) {
        console.error("Error fetching cart:", error);
        res.status(500).json({ message: 'Internal server error fetching cart.' });
    }
}

const addToCart = async(req, res) => {
    if (!checkUserRole(req, res, 'customer')) return;

    try {
        const userId = req.user._id;
        const { productId, quantity=1 } = req.body;

        if (quantity <= 0) {
            return res.status(400).json({ message: 'Quantity must be greater than zero.' });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found.' });
        }
        if (!product.isActive) {
            return res.status(400).json({ message: 'Cannot add inactive product to cart.' });
        }

        // check stock availability
        if (quantity > product.stock) {
            return res.status(400).json({ message: 'Requested quantity exceeds available stock.' });
        }

        let cart = await Cart.findOne({ UserId: userId });

        if (!cart) {
            cart = new Cart({ UserId: userId, items: [] });
        }   

        //check if item already exists in cart
        const existingItemIndex = cart.items.findIndex(item => item.productID.toString() === productId);

        if (existingItemIndex > -1) {
            const newQuantity = cart.items[existingItemIndex].quantity + quantity;
            if (newQuantity > product.stock) {
                return res.status(400).json({ message: `Adding ${quantity} more would exceed available stock. Only ${product.stock - cart.items[existingItemIndex].quantity} more can be added.` });
            }

            cart.items[existingItemIndex].quantity = newQuantity;
            cart.items[existingItemIndex].priceAtTimeofAdding = product.price;
        } else {
            cart.items.push({
                productID: productId,
                quantity,
                priceAtTimeofAdding: product.price
            })
        }
       

        await cart.save();
        res.status(200).json({
            message: 'Item(s) added to cart successfully!',
            cart
        });
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({ message: 'Internal server error adding to cart.' });
    }
}

const updateCartItem = async(req, res) => {
    if (!checkUserRole(req, res, 'customer')) return;

    try {
        const cart = await Cart.findOne({ UserId: req.user._id });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found.' });
        }

        const { productId, quantity } = req.body;
        
        if (!productId || !quantity) {
            return res.status(400).json({ message: 'Product ID and quantity are required.' });
        }
        
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found.' });
        }
        
        const itemIndex = cart.items.findIndex(item => item.productID.toString() === productId);

        if (itemIndex === -1) {
            return res.status(404).json({ message: 'Item not found in cart.' });
        }
        if (quantity <= 0) {
            return res.status(400).json({ message: 'Quantity must be greater than zero.' });
        }
        if (quantity > product.stock) {
            return res.status(400).json({ message: 'Requested quantity exceeds available stock.' });
        }

        cart.items[itemIndex].quantity = quantity;
        cart.items[itemIndex].priceAtTimeofAdding = product.price;

        await cart.save();
        
        res.status(200).json({
            message: 'Cart item updated successfully!',
            cart
        });
    } catch (error) {
        console.error("Error updating cart item:", error);
        res.status(500).json({ message: 'Internal server error updating cart item.' });
    }
}

const deleteCartItem = async(req, res) => {
    if (!checkUserRole(req, res, 'customer')) return;

    try {
        const cart = await Cart.findOne({ UserId: req.user._id });
        
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found.' });
        }

        const { productId } = req.body;
        const itemIndex = cart.items.findIndex(item => item.productID.toString() === productId);

        if (itemIndex === -1) {
            return res.status(404).json({ message: 'Item not found in cart.' });
        }

        cart.items.splice(itemIndex, 1);
        await cart.save();
        
        res.status(200).json({
            message: 'Item deleted from cart successfully!',
            cart
        });
    } catch (error) {
        console.error("Error deleting cart item:", error);
        res.status(500).json({ message: 'Internal server error deleting cart item.' });
    }
}
export default {getCart, addToCart, updateCartItem, deleteCartItem};