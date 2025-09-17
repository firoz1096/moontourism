const express = require("express");
const router = express.Router();
const PostRoundTripSchema = require("../models/PostRoundTripDeals");


// --- Post round trip Deals ---
router.post("/", async (req, res) => {
  try {
    const roundTripDeal = await PostRoundTripSchema.create(req.body);
    res.json(roundTripDeal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ GET flight deals (all or filter by country)
router.get("/", async (req, res) => {
  try {
    const { country } = req.query;

    let query = {};
    if (country) {
      query.country = country; // filter by country if provided
    }

    // sort by price ascending
    const deals = await PostRoundTripSchema.find(query).sort({ price: 1 });

    res.status(200).json(deals);
  } catch (error) {
    console.error("Error fetching flight deals:", error);
    res.status(500).json({ error: "Server error while fetching deals" });
  }
});


// Update a deal
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedDeal = await PostRoundTripSchema.findByIdAndUpdate(
      id,
      req.body,
      { new: true } // return updated doc
    );
    if (!updatedDeal) {
      return res.status(404).json({ error: "Deal not found" });
    }
    res.status(200).json(updatedDeal);
  } catch (error) {
    console.error("Error updating deal:", error);
    res.status(500).json({ error: "Server error while updating deal" });
  }
});

// Delete a deal
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDeal = await PostRoundTripSchema.findByIdAndDelete(id);
    if (!deletedDeal) {
      return res.status(404).json({ error: "Deal not found" });
    }
    res.status(200).json({ message: "Deal deleted successfully" });
  } catch (error) {
    console.error("Error deleting deal:", error);
    res.status(500).json({ error: "Server error while deleting deal" });
  }
});

//get a deal by id
router.get("/:id", async (req, res) => {
  try {
    const deal = await PostRoundTripSchema.findById(req.params.id);
    if (!deal) {
      return res.status(404).json({ error: "Flight deal not found" });
    }
    res.json(deal);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});


module.exports = router;
