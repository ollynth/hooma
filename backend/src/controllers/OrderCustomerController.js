import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import User from '../models/User.js';
import Order from '../models/Order.js';
import crypto from 'crypto';

const checkUserRole = (req, res, role) => {
    if (req.user.role !== role) {
        res.status(403).json({ message: 'Access denied..' });
        return false;
    }
    return true;
}

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

// POST /orders/preview
const previewOrder = async(req, res) => {
    try {
        const userId = req.user._id;
        const {productIds, buyNow, productId, quantity = 1} = req.body;
        
        let itemsToPreview = [];

        if(buyNow) {
            if (!productId) {
                return res.status(400).json({ message: 'productId is required for buyNow.' });
            }

            const product = await Product.findById(productId);
            if (!product) {
                return res.status(404).json({ message: 'Product not found.' });
            } 
            if (quantity > product.stock) {
                return res.status(400).json({ message: `Only ${product.stock} items in stock.` });
            }

            itemsToPreview = [{product, quantity}];
        } else {
            const cart = await Cart.findOne({userId}).populate('items.productId');
            if (!cart || cart.items.length === 0) {
                return res.status(400).json({ message: 'Cart is empty.' });
            }

            const selected = cart.items.filter(item => {
                if (!item.productId?.isActive) return false;
                if (productIds && productIds.length > 0) {
                    return productIds.includes(item.productId._id.toString());
                }
                return true;
            });

            if (selected.length === 0) {
                return res.status(400).json({ message: 'No valid products selected for preview.' });
            }

            const stockErrors = [];
            for (const item of selected) {
                if (item.quantity > item.productId.stock) {
                    stockErrors.push(`"${item.productId.name}" only has ${item.productId.stock} unit(s) left.`);
                }
            }

            if (stockErrors.length > 0) {
                return res.status(400).json({ message: 'Stock issues found:', errors: stockErrors });
            }

            itemsToPreview = selected.map(item => ({
                product: item.productId,
                quantity: item.quantity
            }));
        }

        // fetch user details
        const user = await User.findById(userId).select('profile addresses');
        const previewItems = itemsToPreview.map(({product, quantity}) => ({
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
                name: `${user.profile?.firstName ?? ''} ${user.profile?.lastName ?? ''}`.trim(),
                phoneNumber: user.profile?.phoneNumber || null,
                addresses: user.addresses ?? [],
            },
            paymentMethods: ['Credit Card', 'Bank Transfer', 'QRIS'],
        });
    } catch (error) {
        console.error("Error previewing order:", error);
        res.status(500).json({ message: 'Internal server error previewing order.' });
    }
}

// POST /orders
const createOrder = async(req, res) => {
    try {
        const userId = req.user._id;
        const {productIds, buyNow, productId, quantity=1, shippingAddress, paymentMethod} = req.body;

        if (!shippingAddress?.street || !shippingAddress?.city ||
            !shippingAddress?.state  || !shippingAddress?.zipCode ||
            !shippingAddress?.country) {
            return res.status(400).json({ message: 'Complete shipping address is required.' });
        }

        const validMethods = ['Credit Card', 'Bank Transfer', 'QRIS'];
        if (!validMethods.includes(paymentMethod)) {
            return res.status(400).json({ message: `Invalid payment method. Valid options: ${validMethods.join(', ')}` });
        }

        let itemToOrder = [];
        let cartItemIdsToRemove = [];

        if (buyNow) {
            const product = await Product.findById(productId);
            if (!product) {
                return res.status(404).json({ message: 'Product not found.' });
            }

            if (quantity > product.stock) {
                return res.status(400).json({ message: `Only ${product.stock} items in stock.` });
            }
            itemToOrder = [{product, quantity}];
        } else {
            const cart = await Cart.findOne({userId}).populate('items.productId');
            if (!cart || cart.items.length === 0) {
                return res.status(400).json({ message: 'Cart is empty.' });
            }

            const selected = cart.items.filter( items => {
                if (!items.productId?.isActive) return false;
                if (productIds && productIds.length > 0) {
                    return productIds.includes(items.productId._id.toString());
                }
                return true;
            });

            if (selected.length === 0) {
                return res.status(400).json({ message: 'No valid items to order.' });
            }

            const stockErrors = [];
            for (const item of selected) {
                if (item.quantity > item.productId.stock) {
                    stockErrors.push(`"${item.productId.name}" only has ${item.productId.stock} unit(s) left.`);
                }
            }
            if (stockErrors.length > 0) {
                return res.status(400).json({ message: stockErrors.join(' ') });
            }
            itemToOrder = selected.map( item => ({
                product: item.productId,
                quantity: item.quantity
            }));
            cartItemIdsToRemove = selected.map(item => item.productId._id.toString());
        }

        // Create order items and deduct stock
        const orderItems = [];
        for(const {product, quantity: qty} of itemToOrder) {
            orderItems.push({
                productId: product._id,
                productName: product.name,
                price: product.price,
                quantity: qty,
                total: product.price * qty
            });
            await Product.findByIdAndUpdate(product._id, {$inc: {stock: -qty}});
        }

        const totalAmount = orderItems.reduce((sum, i) => sum + i.total, 0);
        const order = new Order({
            userId,
            orderNumber:     generateOrderNumber(),
            items:           orderItems,
            totalAmount,
            shippingAddress,
            paymentMethod,
            status:          'Pending',
            paymentStatus:   'Pending',
        });
        await order.save();

        if (!buyNow && cartItemIdsToRemove.length > 0) {
            await Cart.findOneAndUpdate({userId}, 
                {$pull: {items: {productId: { $in: cartItemIdsToRemove}}}}
            );
        }
        res.status(201).json({ message: 'Order placed successfully.', order,});
    } catch (error) {
        console.error('createOrder error:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
}

function generateOrderNumber() {
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const rand = crypto.randomBytes(4).toString('hex').toUpperCase();
    return `HMA-${date}-${rand}`;   // e.g. HMA-20250517-3F9A1C2B
}

// PROCESS PAYMENT
// POST /orders/:orderId/pay
const payOrder = async(req, res) => {
    try {
        const {orderId} = req.params;
        const userId = req.user._id;
        const order = await Order.findOne({_id: orderId, userId: userId});
        if (!order) {
            return res.status(404).json({ message: 'Order not found.' });
        }

        if (order.paymentStatus === 'Completed') {
            return res.status(400).json({ message: 'Order is already paid.' });
        }

        if (order.status === 'Cancelled') {
            return res.status(400).json({ message: 'Cannot pay a cancelled order.' });
        }

        // PAYEMENT GATEWAY INTEGRATION

        order.paymentStatus = 'Completed';
        order.status = 'Processing';
        await order.save();

        res.status(200).json({ message: 'Payment successful, order is now processing.', order });

    } catch (error) {
        console.error('payOrder error:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
}

export default {getMyOrders, previewOrder, createOrder, payOrder};