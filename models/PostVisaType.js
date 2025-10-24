const mongoose = require("mongoose");

const visaTypeSchema = new mongoose.Schema(
  {
    visaInfoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "visa_info_mt",
      required: [true, "Visa Info reference is required"],
      index: true
    },
    title: { 
      type: String, 
      required: [true, "Visa type title is required"],
      trim: true,
      maxLength: [100, "Title cannot exceed 100 characters"]
    },
    processingTime: { 
      type: Number, 
      required: [true, "Processing time is required"],
      min: [0, "Processing time cannot be negative"],
      set: value => Math.round(value)
    },
    stayPeriod: { 
      type: Number, 
      required: [true, "Stay period is required"],
      min: [0, "Stay period cannot be negative"]
    },
    validity: { 
      type: Number, 
      required: [true, "Validity is required"],
      min: [0, "Validity cannot be negative"]
    },
    entryType: { 
      type: String, 
      required: [true, "Entry type is required"],
      enum: ["Single", "Multiple", "Double"],
      trim: true
    },
fees: { 
  type: Number, 
  required: [true, "Fees are required"],
  min: [0, "Fees cannot be negative"],
  set: value => parseFloat(Number(value).toFixed(2)) // ✅ fixed
},

    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

visaTypeSchema.virtual("processingTimeDisplay").get(function() {
  return `${this.processingTime} days`;
});

visaTypeSchema.virtual("stayPeriodDisplay").get(function() {
  return `${this.stayPeriod} days`;
});

visaTypeSchema.index({ visaInfoId: 1, title: 1 });

module.exports = mongoose.model("visa_deals_mt", visaTypeSchema);
