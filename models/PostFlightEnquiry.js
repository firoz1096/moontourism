const mongoose = require('mongoose');

//schema for saving an item for categories table
const PostFlightEnquiry = new mongoose.Schema({
    fromDestination: String,
    toDestination: String,
    departureDate: Date,
    returnDate: Date,
    adult: Number,
    children: Number,
    infant: Number,
    tripType: String,
    flightClass: String,
    airlineName: String,
    name: String,
    email: String,
    phone: Number,
    message: String

}, { versionKey: false });



const PostFlightEnq = mongoose.model("flight_enquiry_mt", PostFlightEnquiry) //"table name", Schema
module.exports = PostFlightEnq