const Cart = require("../models/Cart");
const MenuItem = require("../models/MenuItem");

exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.userId }).populate("items.menuItem");
        if (!cart) return res.status(200).json({ cart: { items: [], total: 0 } });
        res.status(200).json({ cart });
    } catch (err) {
        res.status(500).json({ message: "Failed to get cart: " + err.message });
    }
};

exports.addToCart = async (req, res) => {
    try {
        const { menuItemId, quantity } = req.body;
        const menuItem = await MenuItem.findById(menuItemId);
        if (!menuItem) return res.status(404).json({ message: "Menu item not found" });

        let cart = await Cart.findOne({ user: req.user.userId });

        if (!cart) {
            cart = new Cart({ user: req.user.userId, items: [], total: 0 });
        }

        const existingItem = cart.items.find(
            (i) => i.menuItem.toString() === menuItemId
        );

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({ menuItem: menuItemId, quantity, price: menuItem.price });
        }

        cart.total = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
        cart.updatedAt = Date.now();
        await cart.save();

        res.status(200).json({ message: "Item added to cart", cart });
    } catch (err) {
        res.status(500).json({ message: "Failed to add to cart: " + err.message });
    }
};

exports.updateCartItem = async (req, res) => {
    try {
        const { menuItemId, quantity } = req.body;
        const cart = await Cart.findOne({ user: req.user.userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        const item = cart.items.find((i) => i.menuItem.toString() === menuItemId);
        if (!item) return res.status(404).json({ message: "Item not in cart" });

        if (quantity <= 0) {
            cart.items = cart.items.filter((i) => i.menuItem.toString() !== menuItemId);
        } else {
            item.quantity = quantity;
        }

        cart.total = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
        await cart.save();
        res.status(200).json({ message: "Cart updated", cart });
    } catch (err) {
        res.status(500).json({ message: "Failed to update cart: " + err.message });
    }
};

exports.clearCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        cart.items = [];
        cart.total = 0;
        await cart.save();
        res.status(200).json({ message: "Cart cleared" });
    } catch (err) {
        res.status(500).json({ message: "Failed to clear cart: " + err.message });
    }
};