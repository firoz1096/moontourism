const mongoose = require('mongoose');

//schema for saving an item for categories table
const PostHotelEnquiry = new mongoose.Schema({
    destination: String,
    country: String,
    checkIn: Date,
    checkOut: Date,
    room: Number,
    adult: Number,
    children: Number,
    name: String,
    email: String,
    phone: Number,
    message: String

}, { versionKey: false });


const PostHotelEnq = mongoose.model("hotel_enquiry_mt", PostHotelEnquiry) //"table name", Schema
module.exports = PostHotelEnq