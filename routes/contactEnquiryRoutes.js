const express = require("express");
const router = express.Router();
const PostContactEnq = require("../models/PostContactEnquiry");



//contact enquiry
router.post("/", async (req, res) => {
  try {
    const contactEnquiry = await PostContactEnq.create(req.body);
    res.json(contactEnquiry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
