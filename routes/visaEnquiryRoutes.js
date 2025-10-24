const express = require("express");
const router = express.Router();
const PostVisaEnq = require("../models/PostVisaEnquiry");


// --- POST: Create Visa Enquiry ---
router.post("/", async (req, res) => {
  try {
    const postVisaEnq = await PostVisaEnq.create(req.body);
    res.status(201).json({
      success: true,
      data: postVisaEnq,
    });
  } catch (err) {
    console.error("❌ Error creating enquiry:", err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});


// --- GET: Fetch All Visa Enquiries ---
router.get("/", async (_req, res) => {
  try {
    const enquiries = await PostVisaEnq.find().sort({ _id: -1 }); // latest first
    res.json({
      success: true,
      data: enquiries,
    });
  } catch (err) {
    console.error("❌ Error fetching enquiries:", err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});


// --- PUT: Update Visa Enquiry by ID ---
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const updatedEnquiry = await PostVisaEnq.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedEnquiry) {
      return res.status(404).json({
        success: false,
        message: "Visa enquiry not found",
      });
    }

    res.json({
      success: true,
      message: "Visa enquiry updated successfully",
      data: updatedEnquiry,
    });
  } catch (err) {
    console.error("❌ Error updating enquiry:", err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});


// --- DELETE: Remove Visa Enquiry by ID ---
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await PostVisaEnq.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Visa enquiry not found",
      });
    }

    res.json({
      success: true,
      message: "Visa enquiry deleted successfully",
    });
  } catch (err) {
    console.error("❌ Error deleting enquiry:", err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});


// --- Export Router ---
module.exports = router;
