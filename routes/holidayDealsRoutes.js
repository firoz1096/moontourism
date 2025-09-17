const express = require("express");
const router = express.Router();
const PostHolidayDealschema = require("../models/PostHolidayDeals");


// Create a new holiday deal
router.post("/", async (req, res) => {
  try {
    const deal = new PostHolidayDealschema(req.body);
    await deal.save();
    res.status(201).json(deal);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all deals
router.get("/", async (_req, res) => {
  try {
    const deals = await PostHolidayDealschema.find();
    res.json(deals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get deals by category
router.get("/category/:category", async (req, res) => {
  try {
    const deals = await PostHolidayDealschema.find({ category: req.params.category });
    res.json(deals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get deal by ID
router.get("/:id", async (req, res) => {
  try {
    const deal = await PostHolidayDealschema.findById(req.params.id);
    if (!deal) {
      return res.status(404).json({ error: "Deal not found" });
    }
    res.json(deal);
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

// Update a deal by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedDeal = await PostHolidayDealschema.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedDeal) {
      return res.status(404).json({ error: "Deal not found" });
    }

    res.json(updatedDeal);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a deal by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedDeal = await PostHolidayDealschema.findByIdAndDelete(req.params.id);

    if (!deletedDeal) {
      return res.status(404).json({ error: "Deal not found" });
    }

    res.json({ message: "Deal deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
