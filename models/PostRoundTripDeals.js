const mongoose = require('mongoose');

// Schema for saving flight deals
const PostRoundTripDeals = new mongoose.Schema({
  country: {              // <---- Added for filtering deals by country
    type: String,
    required: true,       // ensure each deal has a country

    //only allow values from this list. enum is a validator for strings.
    enum: ["Asia", "Middle East", "Africa"], // optional: restrict values
  },
 
  fromCity: {
    city: String,
    citycode: String,
    airport: String,
  },
  toCity: {
    city: String,
    citycode: String,
    airport: String,
  },
  price: Number,

}, { versionKey: false });

const PostRoundTripSchema = mongoose.model("roundtrip_deals_mt", PostRoundTripDeals); 
module.exports = PostRoundTripSchema;
