const express = require("express");
const router = express.Router();
const TermsInfoSchema = require("../models/TermConditionsInfo");


// Get contact info
router.get("/terms-info", async (_req, res) => {
  try {
    const termInfo = await TermsInfoSchema.findOne(); // only one record
    res.json(termInfo);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch contact info" });
  }
});


router.put("/terms-info/:id", async (req, res) => {
  try {
    const updatedInfo = await TermsInfoSchema.findByIdAndUpdate(
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
