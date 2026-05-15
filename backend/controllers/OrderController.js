const Order = require("../models/Order");
const Cart = require("../models/Cart");

exports.placeOrder = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.userId }).populate("items.menuItem");
        if (!cart || cart.items.length === 0)
            return res.status(400).json({ message: "Cart is empty" });

        const order = await Order.create({
            user: req.user.userId,
            items: cart.items.map((i) => ({
                menuItem: i.menuItem._id,
                quantity: i.quantity,
                price: i.price,
            })),
            total: cart.total,
            deliveryAddress: req.body.deliveryAddress || "",
        });

        // Clear cart after order
        cart.items = [];
        cart.total = 0;
        await cart.save();

        res.status(201).json({ message: "Order placed successfully", order });
    } catch (err) {
        res.status(500).json({ message: "Failed to place order: " + err.message });
    }
};

exports.getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.userId })
            .populate("items.menuItem", "name price image")
            .sort({ createdAt: -1 });
        res.status(200).json({ orders });
    } catch (err) {
        res.status(500).json({ message: "Failed to get orders: " + err.message });
    }
};

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate("user", "name email")
            .populate("items.menuItem", "name price")
            .sort({ createdAt: -1 });
        res.status(200).json({ orders });
    } catch (err) {
        res.status(500).json({ message: "Failed to get all orders: " + err.message });
    }
};

exports.updateOrderStatus = async (req, res) => {
    try {
        const updated = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: "Order not found" });
        res.status(200).json({ message: "Order updated", order: updated });
    } catch (err) {
        res.status(500).json({ message: "Failed to update order: " + err.message });
    }
};