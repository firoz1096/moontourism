const mongoose = require('mongoose');

// Schema for saving holiday deals
const PostHolidayDeals = new mongoose.Schema({
  category: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    shortDes: { type: String, required: true, maxlength: 250 },
    overview: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    noOfDays: { type: Number, required: true, min: 1 },
    inclusions: { type: [String], default: [] },
    exclusions: { type: [String], default: [] },
    termsConditions: { type: String, maxlength: 5000 },
    thumbnail: {
      type: String,
      required: true,
      match: [/^.+\.(jpg|jpeg|png|webp|gif)$/, "Invalid image path"],
    },
    gallery: {
      type: [String],
      default: [],
      validate: {
        validator: (arr) =>
          arr.every((url) => /^.+\.(jpg|jpeg|png|webp|gif)$/.test(url)),
        message: "Invalid image path in gallery",
      },
    },

}, { versionKey: false });

const PostHolidayDealschema = mongoose.model("holiday_deals_mt", PostHolidayDeals); 
module.exports = PostHolidayDealschema;
