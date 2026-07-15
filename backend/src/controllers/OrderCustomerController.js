import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import User from '../models/User.js';
import Order from '../models/Order.js';
import crypto from 'crypto';

// GET /orders
const getMyOrders = async(req, res) => {
    try {
         const orders = await Order.find({ userId: req.user._id })
            .sort({ createdAt: -1 })
            .select('orderNumber items totalAmount status paymentStatus createdAt');

        res.status(200).json(orders);
        console.log(`Fetched ${orders.length} orders for user ${req.user._id}`);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: 'Internal server error fetching orders.' });  

    }
}

// GET /orders/:orderId
const getOrderDetail = async(req, res) => {
    try {
        const order = await Order.findOne({
            _id: req.params.orderId,
            userId: req.user._id
        })

        if (!order) {
            return res.status(404).json({ message: 'Order not found.' });
        }

        res.status(200).json(order);
        console.log(`Fetched details for order ${order._id} of user ${req.user._id}`);
    } catch (error) {
        console.error("Error fetching order detail:", error);
        res.status(500).json({ message: 'Internal server error fetching order detail.' });  
    }
}

async function resolveItemsToCheckout(userId, { buyNow, productId, quantity, checkoutItems }) {
    // Direct Purchase
    if (buyNow) {
        if (!productId) {
            const err = new Error('productId is required for buyNow.');
            err.status = 400;
            throw err;
        }

        const product = await Product.findById(productId);
        if (!product || !product.isActive) {
            const err = new Error('Product not found.');
            err.status = 404;
            throw err;
        }
        if (!quantity || quantity < 1) {
            const err = new Error('Quantity must be at least 1.');
            err.status = 400;
            throw err;
        }
        if (quantity > product.stock) {
            const err = new Error(`Only ${product.stock} items in stock.`);
            err.status = 400;
            throw err;
        }

        return { items: [{ product, quantity }], cartItemIdsToRemove: [] };
    }

    const cart = await Cart.findOne({ userId }).populate('items.productId');
    if (!cart || cart.items.length === 0) {
        const err = new Error('Cart is empty.');
        err.status = 400;
        throw err;
    }

    let selected = [];

    if (checkoutItems && Array.isArray(checkoutItems) && checkoutItems.length > 0) {
        // Partial Cart Checkout with dynamic quantities
        const cartItemsMap = new Map(cart.items.map(item => [item.productId?._id.toString(), item]));

        for (const { productId: reqProductId, quantity: reqQty } of checkoutItems) {
            const cartItem = cartItemsMap.get(reqProductId);
            
            if (!cartItem) {
                const err = new Error(`Product ${reqProductId} is not present in the cart.`);
                err.status = 400;
                throw err;
            }
            if (!cartItem.productId?.isActive) continue;
            
            const parsedQty = Number(reqQty);
            if (!parsedQty || parsedQty < 1) {
                const err = new Error(`Invalid quantity provided for product ${reqProductId}.`);
                err.status = 400;
                throw err;
            }

            selected.push({
                productId: cartItem.productId,
                quantity: parsedQty 
            });
        }
    } else {
        selected = cart.items.filter(item => item.productId?.isActive);
    }

    if (selected.length === 0) {
        const err = new Error('No valid items selected for checkout.');
        err.status = 400;
        throw err;
    }

    // Validate against current inventory stock
    const stockErrors = selected
        .filter(item => item.quantity > item.productId.stock)
        .map(item => `"${item.productId.name}" only has ${item.productId.stock} unit(s) left.`);

    if (stockErrors.length > 0) {
        const err = new Error(stockErrors.join(' '));
        err.status = 400;
        throw err;
    }

    return {
        items: selected.map(item => ({ product: item.productId, quantity: item.quantity })),
        cartItemIdsToRemove: selected.map(item => item.productId._id.toString())
    };
}

// POST /orders/preview
const previewOrder = async (req, res) => {
    try {
        const userId = req.user._id;
        const { items } = await resolveItemsToCheckout(userId, req.body);
 
        const user = await User.findById(userId).select('firstName lastName phoneNumber addresses');
 
        const previewItems = items.map(({ product, quantity }) => ({
            productId: product._id,
            name: product.name,
            image: product.images?.[0] || null,
            price: product.price,
            quantity,
            subtotal: product.price * quantity
        }));
 
        const totalAmount = previewItems.reduce((sum, i) => sum + i.subtotal, 0);
 
        res.status(200).json({
            items: previewItems,
            totalAmount,
            customerInfo: {
                name: `${user?.firstName ?? ''} ${user?.lastName ?? ''}`.trim(),
                phoneNumber: user?.phoneNumber || null,
                addresses: user?.addresses ?? [],
            },
            paymentMethods: ['Credit Card', 'Bank Transfer', 'QRIS'],
        });
        console.log(`Previewed order for user ${userId} with ${items.length} item(s).`);
    } catch (error) {
        if (error.status) {
            return res.status(error.status).json({ message: error.message });
        }
        console.error("Error previewing order:", error);
        res.status(500).json({ message: 'Internal server error previewing order.' });
    }
};

// POST /orders
const createOrder = async (req, res) => {
    const { shippingAddress, paymentMethod } = req.body;
 
    if (!shippingAddress?.street || !shippingAddress?.city ||
        !shippingAddress?.state || !shippingAddress?.zipCode ||
        !shippingAddress?.country) {
        return res.status(400).json({ message: 'Complete shipping address is required.' });
    }
 
    const validMethods = ['Credit Card', 'Virtual Account', 'Bank Transfer', 'QRIS'];
    if (!validMethods.includes(paymentMethod)) {
        return res.status(400).json({ message: `Invalid payment method. Valid options: ${validMethods.join(', ')}` });
    }
 
    const userId = req.user._id;
    const session = await mongoose.startSession();
 
    try {
        let savedOrder;
 
        await session.withTransaction(async () => {
            const { items, cartItemIdsToRemove } = await resolveItemsToCheckout(userId, req.body);
 
            const orderItems = [];
            for (const { product, quantity: qty } of items) {
                // Atomic check-and-decrement: only succeeds if stock is still sufficient.
                const updatedProduct = await Product.findOneAndUpdate(
                    { _id: product._id, stock: { $gte: qty } },
                    { $inc: { stock: -qty } },
                    { session, new: true }
                );
 
                if (!updatedProduct) {
                    const err = new Error(`"${product.name}" no longer has enough stock.`);
                    err.status = 409;
                    throw err;
                }
 
                orderItems.push({
                    productId: product._id,
                    productName: product.name,
                    price: product.price,
                    quantity: qty,
                    total: product.price * qty
                });
            }
 
            const totalAmount = orderItems.reduce((sum, i) => sum + i.total, 0);
 
            const [order] = await Order.create([{
                userId,
                orderNumber: generateOrderNumber(),
                items: orderItems,
                totalAmount,
                shippingAddress,
                paymentMethod,
                status: 'Pending',
                paymentStatus: 'Pending',
            }], { session });
 
            if (cartItemIdsToRemove.length > 0) {
                await Cart.findOneAndUpdate(
                    { userId },
                    { $pull: { items: { productId: { $in: cartItemIdsToRemove } } } },
                    { session }
                );
            }
 
            savedOrder = order;
        });
 
        res.status(201).json({ message: 'Order placed successfully.', order: savedOrder });
    } catch (error) {
        if (error.status) {
            return res.status(error.status).json({ message: error.message });
        }
        console.error('createOrder error:', error);
        res.status(500).json({ message: 'Internal server error.' });
    } finally {
        session.endSession();
    }
};
 
function generateOrderNumber() {
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const rand = crypto.randomBytes(4).toString('hex').toUpperCase();
    return `HMA-${date}-${rand}`;
}
 
// POST /orders/:id/pay
const payOrder = async (req, res) => {
    try {
        const { orderId } = req.params ?? req.body;
        const userId = req.user._id;
 
        // Atomic transition: only proceeds if currently Pending, prevents double-processing
        // from duplicate/racing payment callbacks.
        const order = await Order.findOneAndUpdate(
            { _id: req.params.id ?? orderId, userId, paymentStatus: 'Pending', status: { $ne: 'Cancelled' } },
            { paymentStatus: 'Completed', status: 'Processing' },
            { new: true }
        );
 
        if (!order) {
            const existing = await Order.findOne({ _id: req.params.id ?? orderId, userId });
            if (!existing) {
                return res.status(404).json({ message: 'Order not found.' });
            }
            if (existing.status === 'Cancelled') {
                return res.status(400).json({ message: 'Cannot pay a cancelled order.' });
            }
            return res.status(400).json({ message: 'Order is already paid.' });
        }
 
        // TODO: midtrans payment gateway integration

        res.status(200).json({ message: 'Payment successful, order is now processing.', order });
    } catch (error) {
        console.error('payOrder error:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

export default {getMyOrders, getOrderDetail, previewOrder, createOrder, payOrder};