const PostVisaType = require("../models/PostVisaType");
const PostVisaInfo = require("../models/PostVisaInfo");

// Create a new Visa Type
exports.createVisaType = async (req, res) => {
  try {
    const {
      country,
      title,
      processingTime,
      stayPeriod,
      validity,
      entryType,
      fees,
      isActive
    } = req.body;

    // Find visa info by country
    const visaInfo = await PostVisaInfo.findOne({ country });
    if (!visaInfo) {
      return res.status(404).json({ success: false, message: "Visa Info not found for this country" });
    }

    // Create visa type
    const newVisaType = await PostVisaType.create({
      visaInfoId: visaInfo._id,
      title,
      processingTime,
      stayPeriod,
      validity,
      entryType,
      fees,
      isActive
    });

    res.status(201).json({
      success: true,
      message: "Visa type created successfully",
      data: newVisaType
    });
  } catch (error) {
    console.error("Error creating visa type:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// Optional: Get all visa types by country
exports.getVisaTypesByCountry = async (req, res) => {
  try {
    const { country } = req.params;

    const visaInfo = await PostVisaInfo.findOne({ country });
    if (!visaInfo) return res.status(404).json({ success: false, message: "Country not found" });

    const visaTypes = await PostVisaType.find({ visaInfoId: visaInfo._id });
    res.status(200).json({ success: true, data: visaTypes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};
