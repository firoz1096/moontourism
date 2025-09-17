const express = require("express");
const router = express.Router();
const aboutInfoSchema = require("../models/AboutUsInfo");


// Get contact info
router.get("/about-info", async (_req, res) => {
  try {
    const aboutInfo = await aboutInfoSchema.findOne(); // only one record
    res.json(aboutInfo);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch About info" });
  }
});


router.put("/about-info/:id", async (req, res) => {
  try {
    const updatedInfo = await aboutInfoSchema.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedInfo);
  } catch (err) {
    res.status(500).json({ error: "Failed to update About info" });
  }
});


module.exports = router;
