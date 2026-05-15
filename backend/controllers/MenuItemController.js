const MenuItem = require("../models/MenuItem");

exports.getAllMenuItems = async (req, res) => {
    try {
        const { category, search, sort } = req.query;
        let query = {};

        if (category) query.category = category;
        if (search) query.name = { $regex: search, $options: "i" };

        let items = MenuItem.find(query).populate("category", "name");

        if (sort === "price_asc") items = items.sort({ price: 1 });
        else if (sort === "price_desc") items = items.sort({ price: -1 });

        const result = await items;
        res.status(200).json({ menuItems: result });
    } catch (err) {
        res.status(500).json({ message: "Failed to get menu items: " + err.message });
    }
};

exports.getMenuItemById = async (req, res) => {
    try {
        const item = await MenuItem.findById(req.params.id).populate("category", "name");
        if (!item) return res.status(404).json({ message: "Menu item not found" });
        res.status(200).json({ menuItem: item });
    } catch (err) {
        res.status(500).json({ message: "Failed to get menu item: " + err.message });
    }
};

exports.createMenuItem = async (req, res) => {
    try {
        const item = await MenuItem.create(req.body);
        res.status(201).json({ message: "Menu item created", menuItem: item });
    } catch (err) {
        res.status(500).json({ message: "Failed to create menu item: " + err.message });
    }
};

exports.updateMenuItem = async (req, res) => {
    try {
        const updated = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: "Menu item not found" });
        res.status(200).json({ message: "Menu item updated", menuItem: updated });
    } catch (err) {
        res.status(500).json({ message: "Failed to update menu item: " + err.message });
    }
};

exports.deleteMenuItem = async (req, res) => {
    try {
        const deleted = await MenuItem.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Menu item not found" });
        res.status(200).json({ message: "Menu item deleted" });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete menu item: " + err.message });
    }
};