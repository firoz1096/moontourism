
const express = require("express");
const PostVisaType = require("../models/PostVisaType");
const PostVisaInfo = require("../models/PostVisaInfo");

const router = express.Router();


router.post("/", async (req, res) => {
  try {
    const { country, thumbnail, visaSampleCopy, documentsRequired, faqs, region } = req.body;

    if (!country || !thumbnail || !region) {
      return res.status(400).json({
        success: false,
        error: "Country, thumbnail, and region are required",
      });
    }

    const existing = await PostVisaInfo.findOne({ country });
    if (existing) {
      return res.status(400).json({
        success: false,
        error: `Visa info for ${country} already exists`,
      });
    }

    const newVisaInfo = new PostVisaInfo({
      country,
      region,
      thumbnail,
      visaSampleCopy: visaSampleCopy || "",
      documentsRequired: documentsRequired || "",
      faqs: Array.isArray(faqs) ? faqs : [],
     
    });

    const savedVisaInfo = await newVisaInfo.save();

    res.status(201).json({
      success: true,
      message: "Visa info created successfully",
      data: savedVisaInfo,
    });
  } catch (error) {
    console.error("Visa Info Creation Error:", error);
    res.status(500).json({
      success: false,
      error: "Server error creating visa info",
    });
  }
});



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
    res.status(200).json({
      success: true,
      data: visaTypes,
    });
  } catch (error) {
    console.error("Visa Type Fetch Error:", error);
    res.status(500).json({
      success: false,
      error: "Server error fetching visa types",
    });
  }
});


//Get all visa types grouped by country
router.get("/", async (req, res) => {
  try {
    const visaInfos = await PostVisaInfo.find().sort({ country: 1 });

    const result = await Promise.all(
      visaInfos.map(async (info) => {
        const visaTypes = await PostVisaType.find({ visaInfoId: info._id });

        return {
          country: info.country,
          visaInfo: {
            _id: info._id,
            thumbnail: info.thumbnail,
            region: info.region,
            visaSampleCopy: info.visaSampleCopy,
            documentsRequired: info.documentsRequired,
            faqs: info.faqs,
         
          },
          visaTypes,
        };
      })
    );

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Error fetching all visa types:", error);
    res.status(500).json({
      success: false,
      error: "Server error fetching all visa types",
    });
  }
});



// GET visa info by ID
router.get("/id/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const visaInfo = await PostVisaInfo.findById(id);
    if (!visaInfo) {
      return res.status(404).json({ success: false, message: "Visa info not found" });
    }

    const visaTypes = await PostVisaType.find({ visaInfoId: visaInfo._id });

    res.status(200).json({
      success: true,
      data: {
        country: visaInfo.country,
        visaInfo: {
          _id: visaInfo._id,
          thumbnail: visaInfo.thumbnail,
          region: visaInfo.region,
          visaSampleCopy: visaInfo.visaSampleCopy,
          documentsRequired: visaInfo.documentsRequired,
          faqs: visaInfo.faqs,
        },
        // visaTypes,
      },
    });
  } catch (error) {
    console.error("Error fetching visa info by ID:", error);
    res.status(500).json({ success: false, error: "Server error fetching visa info" });
  }
});



// ================== PUT /api/visa-info/:id ==================
// Update visa info by ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { country, thumbnail, visaSampleCopy, documentsRequired, faqs } = req.body;

  try {
    const visaInfo = await PostVisaInfo.findById(id);
    if (!visaInfo) {
      return res.status(404).json({ success: false, error: "Visa info not found" });
    }

    // Update fields
    if (country) visaInfo.country = country;
    if (thumbnail) visaInfo.thumbnail = thumbnail;
    if (visaSampleCopy) visaInfo.visaSampleCopy = visaSampleCopy;
    if (documentsRequired !== undefined) visaInfo.documentsRequired = documentsRequired;
    if (faqs !== undefined) visaInfo.faqs = Array.isArray(faqs) ? faqs : visaInfo.faqs;
    

    const updatedVisaInfo = await visaInfo.save();

    res.status(200).json({
      success: true,
      message: "Visa info updated successfully",
      data: updatedVisaInfo,
    });
  } catch (error) {
    console.error("Visa Info Update Error:", error);
    res.status(500).json({ success: false, error: "Server error updating visa info" });
  }
});

// ================== DELETE /api/visa-info/:id ==================
// Delete visa info by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await PostVisaInfo.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, error: "Visa info not found" });
    }

    res.status(200).json({
      success: true,
      message: "Visa info deleted successfully",
    });
  } catch (error) {
    console.error("Visa Info Delete Error:", error);
    res.status(500).json({ success: false, error: "Server error deleting visa info" });
  }
});



module.exports = router;
