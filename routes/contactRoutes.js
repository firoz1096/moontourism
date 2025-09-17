const express = require("express");
const router = express.Router();
const ContactInfoSchema = require("../models/ContactInfo");


// Get contact info
router.get("/contact-info", async (_req, res) => {
  try {
    const contactInfo = await ContactInfoSchema.findOne(); // only one record
    res.json(contactInfo);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch contact info" });
  }
});


router.put("/contact-info/:id", async (req, res) => {
  try {
    const updatedInfo = await ContactInfoSchema.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedInfo);
  } catch (err) {
    res.status(500).json({ error: "Failed to update contact info" });
  }
});


module.exports = router;
