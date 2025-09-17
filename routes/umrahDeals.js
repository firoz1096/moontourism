const express = require("express");
const router = express.Router();
const PostUmrahDealschema = require("../models/PostUmrahDeals");

// Create a new Umrah deal
router.post("/", async (req, res) => {
  try {
    const deal = new PostUmrahDealschema(req.body);
    await deal.save();
    res.status(201).json(deal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all Umrah deals
router.get("/", async (req, res) => {
  try {
    const deals = await PostUmrahDealschema.find().sort({ _id: -1 });
    res.json(deals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single Umrah deal by ID
router.get("/:id", async (req, res) => {
  try {
    const deal = await PostUmrahDealschema.findById(req.params.id);
    if (!deal) return res.status(404).json({ error: "Deal not found" });
    res.json(deal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Umrah deal
router.put("/:id", async (req, res) => {
  try {
    const updated = await PostUmrahDealschema.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: "Deal not found" });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete Umrah deal
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await PostUmrahDealschema.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Deal not found" });
    res.json({ message: "Deal deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
