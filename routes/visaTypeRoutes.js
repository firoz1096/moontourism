const express = require("express");
const mongoose = require("mongoose");
const PostVisaType = require("../models/PostVisaType");
const PostVisaInfo = require("../models/PostVisaInfo");

const router = express.Router();

/**
 * @desc  Create new visa type
 * @route POST /api/visa-type
 */
router.post("/", async (req, res) => {
  try {
    const {
      visaInfoId,
      title,
      processingTime,
      stayPeriod,
      validity,
      entryType,
      fees,
      isActive,
    } = req.body;

    // Validation
    if (!visaInfoId || !mongoose.Types.ObjectId.isValid(visaInfoId)) {
      return res.status(400).json({ success: false, error: "Invalid or missing visaInfoId" });
    }

    if (!title || !title.trim()) {
      return res.status(400).json({ success: false, error: "Visa type title is required" });
    }

    if (processingTime === undefined || isNaN(Number(processingTime))) {
      return res.status(400).json({ success: false, error: "Processing time is required and must be a number" });
    }

    if (stayPeriod === undefined || isNaN(Number(stayPeriod))) {
      return res.status(400).json({ success: false, error: "Stay period is required and must be a number" });
    }

    if (validity === undefined || isNaN(Number(validity))) {
      return res.status(400).json({ success: false, error: "Validity is required and must be a number" });
    }

    if (fees === undefined || isNaN(Number(fees))) {
      return res.status(400).json({ success: false, error: "Fees are required and must be a number" });
    }

    // Prepare payload
    const payload = {
      visaInfoId,
      title: title.trim(),
      processingTime: Math.round(Number(processingTime)),
      stayPeriod: Math.round(Number(stayPeriod)),
      validity: Math.round(Number(validity)),
      entryType: entryType || "Single",
      fees: parseFloat(Number(fees).toFixed(2)),
      isActive: isActive !== undefined ? isActive : true,
    };

    const newVisaType = await PostVisaType.create(payload);

    res.status(201).json({
      success: true,
      message: "Visa type created successfully",
      data: newVisaType,
    });
  } catch (error) {
    console.error("Visa Type Creation Error:", error);
    res.status(500).json({
      success: false,
      error: "Server error creating visa type",
    });
  }
});

/**
 * @desc  Get visa types for a specific country
 * @route GET /api/visa-type/:country
 */
router.get("/:country", async (req, res) => {
  try {
    const { country } = req.params;

    const visaInfo = await PostVisaInfo.findOne({ country });
    if (!visaInfo) {
      return res.status(404).json({
        success: false,
        message: `Visa info not found for ${country}`,
      });
    }

    const visaTypes = await PostVisaType.find({ visaInfoId: visaInfo._id });
    res.status(200).json({ success: true, data: visaTypes });
  } catch (error) {
    console.error("Visa Type Fetch Error:", error);
    res.status(500).json({ success: false, error: "Server error fetching visa types" });
  }
});

/**
 * @desc  Get all visa types grouped by country
 * @route GET /api/visa-type
 */
router.get("/", async (req, res) => {
  try {
    const visaInfos = await PostVisaInfo.find().sort({ country: 1 });

    const result = await Promise.all(
      visaInfos.map(async (info) => {
        const visaTypes = await PostVisaType.find({ visaInfoId: info._id });

        return {
          country: info.country,
          region: info.region,
          visaInfo: {
            _id: info._id,
            thumbnail: info.thumbnail,
        
          },
          visaTypes,
        };
      })
    );

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("Error fetching all visa types:", error);
    res.status(500).json({ success: false, error: "Server error fetching all visa types" });
  }
});




router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: "Invalid visa type ID" });
    }

    const updatedVisaType = await PostVisaType.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedVisaType) {
      return res.status(404).json({ success: false, error: "Visa type not found" });
    }

    res.status(200).json({
      success: true,
      message: "Visa type updated successfully",
      data: updatedVisaType,
    });
  } catch (error) {
    console.error("Visa Type Update Error:", error);
    res.status(500).json({ success: false, error: "Server error updating visa type" });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: "Invalid visa type ID" });
    }

    const deletedVisaType = await PostVisaType.findByIdAndDelete(id);

    if (!deletedVisaType) {
      return res.status(404).json({ success: false, error: "Visa type not found" });
    }

    res.status(200).json({
      success: true,
      message: "Visa type deleted successfully",
    });
  } catch (error) {
    console.error("Visa Type Deletion Error:", error);
    res.status(500).json({ success: false, error: "Server error deleting visa type" });
  }
});



module.exports = router;
