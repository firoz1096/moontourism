const mongoose = require("mongoose");


const faqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, default: "" },
});

const VisaInfoSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
      trim: true,
      unique: true, // ✅ Enforces uniqueness at DB level
      index: true
    },
    
    documentsRequired: { type: String },
    faqs: [faqSchema],
    region: { type: String },
    thumbnail: {
      type: String,
      required: true,
      match: [/\.(jpg|jpeg|png|webp|gif)$/i, "Invalid image path"],
    },
    visaSampleCopy: {
      type: String,
      required: true,
      match: [/\.(jpg|jpeg|png|webp|gif)$/i, "Invalid image path"],
    },

  },
  { timestamps: true }
);

// Optional: explicit compound index if needed
VisaInfoSchema.index({ country: 1 }, { unique: true });

const PostVisaInfo = mongoose.model("visa_info_mt", VisaInfoSchema);
module.exports = PostVisaInfo;
