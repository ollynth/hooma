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

// GET /cart
const getCart = async(req, res) => {
    if (!checkUserRole(req, res, 'customer')) return;
    
    try {
        const cart = await Cart.findOne({userId: req.user._id}).populate('items.productId');

        if (!cart || cart.items.length === 0) {
            console.log("Cart is empty for user:", req.user._id);
            return res.status(404).json({ message: 'Cart is empty.' });
        }

        //check for any inactive products in the cart and remove them
        const activeBefore = cart.items.length;
        cart.items = cart.items.filter(item => item.productId?.isActive);
        if (cart.items.length !== activeBefore) {
            await cart.save();
        }

        res.status(200).json(cart);
    } catch (error) {
        console.error("Error fetching cart:", error);
        res.status(500).json({ message: 'Internal server error fetching cart.' });
    }
}

// POST /cart/:productId
const addToCart = async (req, res) => {
    if (!checkUserRole(req, res, 'customer')) return;

    try {
        const userId = req.user._id;
        const { productId } = req.params;           // from URL
        const { quantity = 1 } = req.body;          // optional, defaults to 1
    
        if (!Number.isInteger(quantity) || quantity <= 0) {
            return res.status(400).json({ message: 'Quantity must be a positive integer.' });
        }

        const product = await Product.findById(productId);
        if (!product)          return res.status(404).json({ message: 'Product not found.' });
        if (!product.isActive) return res.status(400).json({ message: 'Product is not available.' });

        let cart = await Cart.findOne({ userId });
        if (!cart) cart = new Cart({ userId, items: [] });

        const existingIndex = cart.items.findIndex(
            item => item.productId.toString() === productId
        );

        if (existingIndex > -1) {
            const newQty = cart.items[existingIndex].quantity + quantity;
            if (newQty > product.stock) {
                const canAdd = product.stock - cart.items[existingIndex].quantity;
                return res.status(400).json({
                    message: `Only ${canAdd} more unit(s) can be added. Stock available: ${product.stock}.`
                });
            }
            cart.items[existingIndex].quantity = newQty;
        } else {
            if (quantity > product.stock) {
                return res.status(400).json({
                    message: `Requested quantity exceeds available stock (${product.stock}).`
                });
            }
            cart.items.push({ productId, quantity });
        }

        await cart.save();
        await cart.populate('items.productId');

        console.log(`User ${userId} added product ${productId} (qty: ${quantity}) to cart.`);
        res.status(200).json({ message: 'Item added to cart.', cart });
    } catch (error) {
        console.error('addToCart error:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

const updateCartItem = async(req, res) => {
    if (!checkUserRole(req, res, 'customer')) return;

    try {
        const { productId } = req.params;
        const { quantity } = req.body;
        
        if (!productId || !quantity || quantity <= 0) {
            return res.status(400).json({ message: 'Product ID and quantity are required.' });
        }
        
        const [cart, product] = await Promise.all([
            Cart.findOne({userId: req.user._id}),
            Product.findById(productId).select('stock isActive')
        ]);

        if(!cart) {
            return res.status(404).json({ message: 'Cart not found.' });
        }

        if (!product) {
            return res.status(404).json({ message: 'Product not found.' });
        }
        
        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

        if (itemIndex === -1) {
            return res.status(404).json({ message: 'Item not found in cart.' });
        }
        if (quantity > product.stock) {
            return res.status(400).json({ message: 'Requested quantity exceeds available stock.' });
        }

        cart.items[itemIndex].quantity = quantity;
        await cart.save();
        await cart.populate('items.productId');
        
        console.log(`User ${req.user._id} updated product ${productId} quantity to ${quantity} in cart.`);
        res.status(200).json({ message: 'Cart item updated successfully!',cart });
    } catch (error) {
        console.error("Error updating cart item:", error);
        res.status(500).json({ message: 'Internal server error updating cart item.' });
    }
}

// DELETE /cart
const deleteCartItem = async(req, res) => {
    if (!checkUserRole(req, res, 'customer')) return;

    try {
        const { productIds } = req.body;
        if (!Array.isArray(productIds) || productIds.length === 0) {
            return res.status(400).json({ message: 'Provide a non-empty productIds array.' });
        }

        const cart = await Cart.findOne({ userId: req.user._id });
        if (!cart) return res.status(404).json({ message: 'Cart not found.' });

        const sizeBefore = cart.items.length;
        cart.items = cart.items.filter(
            item => !productIds.includes(item.productId.toString())
        );

        if (cart.items.length === sizeBefore) {
            return res.status(404).json({ message: 'None of the specified items were found in cart.' });
        }

        await cart.save();
        await cart.populate('items.productId');
        
        res.status(200).json({
            message: 'Item deleted from cart successfully!', cart
        });
    } catch (error) {
        console.error("Error deleting cart item:", error);
        res.status(500).json({ message: 'Internal server error deleting cart item.' });
    }
}
export default {getCart, addToCart, updateCartItem, deleteCartItem};