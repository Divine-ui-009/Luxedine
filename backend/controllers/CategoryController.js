const Category = require("../models/Category");

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({ categories });
    } catch (err) {
        res.status(500).json({ message: "Failed to get categories: " + err.message });
    }
};

exports.createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        const existing = await Category.findOne({ name });
        if (existing) return res.status(400).json({ message: "Category already exists" });

        const category = await Category.create({ name, description });
        res.status(201).json({ message: "Category created", category });
    } catch (err) {
        res.status(500).json({ message: "Failed to create category: " + err.message });
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const updated = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: "Category not found" });
        res.status(200).json({ message: "Category updated", category: updated });
    } catch (err) {
        res.status(500).json({ message: "Failed to update category: " + err.message });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const deleted = await Category.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Category not found" });
        res.status(200).json({ message: "Category deleted" });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete category: " + err.message });
    }
};