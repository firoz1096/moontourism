const mongoose = require('mongoose');

// Schema for saving Umrah deals
const PostUmrahDeals = new mongoose.Schema({
    hotelRating: { 
    type: Number, 
    required: true, 
    enum: [1, 2, 3, 4, 5],  // only allows these values
    },
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

const PostUmrahDealschema = mongoose.model("umrah_deals_mt", PostUmrahDeals); 
module.exports = PostUmrahDealschema;
