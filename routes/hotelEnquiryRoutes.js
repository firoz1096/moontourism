const express = require("express");
const router = express.Router();
const PostHotelEnq = require("../models/PostHotelEnquiry"); 


//post hotel enquiry
router.post("/", async (req, res) => {
  try {
    const hotelEnquiry = await PostHotelEnq.create(req.body);
    res.json(hotelEnquiry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//get hotel enquiry
router.get("/", async (_req, res) => {
  try {
    const enquiries = await PostHotelEnq.find();
    res.json(enquiries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
