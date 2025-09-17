const mongoose = require('mongoose');

// Schema for saving flight deals
const PostFlightDeals = new mongoose.Schema({
  country: {              // <---- Added for filtering deals by country
    type: String,
    required: true,       // ensure each deal has a country

    //only allow values from this list. enum is a validator for strings.
    enum: ["India", "Pakistan", "Gulf Countries"], // optional: restrict values
  },
  tripType: String,
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
  startsOn: String,
  endsOn: String,
  airline: {
    airlinename: String,
    airlinecode: String,
  },
  travelClass: String,
  price: Number,
  imagePath: String,
}, { versionKey: false });

const PostFlightDealSchema = mongoose.model("flight_deals_mt", PostFlightDeals); 
module.exports = PostFlightDealSchema;
