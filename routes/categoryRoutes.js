const express = require("express");
const router = express.Router();
const Category = require("../models/PostBlogCategory");

// ==================== CREATE ====================
// POST /api/categories
router.post("/categories", async (req, res) => {
  try {
    const { name, slug, description } = req.body;

    // ✅ check duplicate slug
    const existing = await Category.findOne({ slug });
    if (existing) {
      return res.status(400).json({ success: false, message: "Category slug already exists" });
    }

    const category = new Category({ name, slug, description });
    await category.save();

    res.status(201).json({ success: true, category });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ==================== READ ====================
// GET /api/categories
router.get("/categories", async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 }); // newest first
    res.status(200).json({ success: true, categories });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/categories/:id
router.get("/categories/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }
    res.status(200).json({ success: true, category });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});



router.delete("/categories/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.status(200).json({ message: "Deal deleted successfully" });
  } catch (error) {
    console.error("Error deleting deal:", error);
    res.status(500).json({ error: "Server error while deleting deal" });
  }
});


module.exports = router;
