const express = require("express");
const router = express.Router();
const PostFlightEnq = require("../models/PostFlightEnquiry"); 


//post flight enquiry
router.post("/", async (req, res) => {
  try {
    const flightEnquiry = await PostFlightEnq.create(req.body);
    res.json(flightEnquiry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//get flight enquiry
router.get("/", async (_req, res) => {
  try {
    const enquiries = await PostFlightEnq.find();
    res.json(enquiries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




module.exports = router;
