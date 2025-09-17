const express = require("express");
const router = express.Router();
const PostFlightDealSchema = require("../models/PostFlightDeals");


// --- Post Flight Deals ---
router.post("/", async (req, res) => {
  try {
    const flightDeal = await PostFlightDealSchema.create(req.body);
    res.json(flightDeal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// GET all flight deals (with optional country filter)
// http://localhost:5000/api/flight-deals?country=India
router.get("/", async (req, res) => {
  try {
    const { country } = req.query;

    let query = {};
    if (country) {
      query.country = country; // filter by country if query param exists
    }

    const deals = await PostFlightDealSchema.find(query).sort({ price: 1 }); // sort by price (optional)
    res.status(200).json(deals);

  } catch (error) {
    console.error("Error fetching flight deals:", error);
    res.status(500).json({ error: "Server error while fetching deals" });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const deal = await PostFlightDealSchema.findById(req.params.id);
    if (!deal) {
      return res.status(404).json({ error: "Flight deal not found" });
    }
    res.json(deal);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});




module.exports = router;
