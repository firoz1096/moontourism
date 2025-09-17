const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Blog = require("../models/PostBlogEntry");

// ==================== CREATE ====================
router.post("/blogs", async (req, res) => {
  try {
    const {
      title,
      slug,
      content,
      excerpt,
      coverImage,
      location,
      categories,
      tags,
      isPublished,
    } = req.body;

    const existing = await Blog.findOne({ slug });
    if (existing) {
      return res.status(400).json({ success: false, message: "Slug already exists" });
    }

    const blog = new Blog({
      title,
      slug,
      content,
      excerpt,
      coverImage,
      location,
      categories,
      tags,
      isPublished,
      publishedAt: isPublished ? new Date() : null,
    });

    await blog.save();
    res.status(201).json({ success: true, blog });
  } catch (err) {
    console.error("POST /blogs error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// ==================== GET ROUTES ====================

// 1) Get blogs by slug (specific) - must come before /blogs/:id
router.get("/blogs/slug/:slug", async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug }).populate("categories", "name slug");
    if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });
    res.status(200).json({ success: true, blog });
  } catch (err) {
    console.error("GET /blogs/slug/:slug error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// 2) Get blogs by category (specific)
router.get("/blogs/category/:categoryId", async (req, res) => {
  try {
    const blogs = await Blog.find({ categories: req.params.categoryId })
      .populate("categories", "name slug")
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, blogs });
  } catch (err) {
    console.error("GET /blogs/category/:categoryId error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// 3) Get all blogs with optional category filter via query string
//    Example: GET /api/blogs?categories=catId1,catId2
router.get("/blogs", async (req, res) => {
  try {
    const filter = {};
    if (req.query.categories) {
      filter.categories = { $in: req.query.categories.split(",") };
    }

    const blogs = await Blog.find(filter)
      .populate("categories", "name slug")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, blogs });
  } catch (err) {
    console.error("GET /blogs error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// 4) Get a single blog by ID (parameter route) - validate ObjectId first
router.get("/blogs/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid blog id" });
    }

    const blog = await Blog.findById(id).populate("categories", "name slug");
    if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });

    res.status(200).json({ success: true, blog });
  } catch (err) {
    console.error("GET /blogs/:id error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// Navigation: next & previous
router.get("/blogs/:id/navigation", async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid blog id" });
    }
    const currentBlog = await Blog.findById(id).select("createdAt");
    if (!currentBlog) return res.status(404).json({ success: false, message: "Blog not found" });

    const prevBlog = await Blog.findOne({ createdAt: { $lt: currentBlog.createdAt } })
      .sort({ createdAt: -1 })
      .select("title slug");
    const nextBlog = await Blog.findOne({ createdAt: { $gt: currentBlog.createdAt } })
      .sort({ createdAt: 1 })
      .select("title slug");

    res.status(200).json({ success: true, prev: prevBlog || null, next: nextBlog || null });
  } catch (err) {
    console.error("GET /blogs/:id/navigation error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// ==================== UPDATE ====================
router.put("/blogs/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid blog id" });
    }

    const updateData = req.body;
    if (updateData.isPublished && !updateData.publishedAt) updateData.publishedAt = new Date();

    const blog = await Blog.findByIdAndUpdate(id, updateData, { new: true, runValidators: true })
      .populate("categories", "name slug");
    if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });

    res.status(200).json({ success: true, blog });
  } catch (err) {
    console.error("PUT /blogs/:id error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// ==================== DELETE ====================
router.delete("/blogs/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid blog id" });
    }

    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });

    res.status(200).json({ success: true, message: "Blog deleted successfully" });
  } catch (err) {
    console.error("DELETE /blogs/:id error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
