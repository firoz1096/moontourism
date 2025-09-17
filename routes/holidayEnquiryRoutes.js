const express = require("express");
const router = express.Router();
const PostHolidayEnq = require("../models/PostHolidayEnquiry");



// --- post Holiday Enquiry ---
router.post("/", async (req, res) => {
  try {
    const holidayEnquiry = await PostHolidayEnq.create(req.body);
    res.json(holidayEnquiry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- get Holiday Enquiry ---
router.get("/", async (_req, res) => {
  try {
    const enquiries = await PostHolidayEnq.find();
    res.json(enquiries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
