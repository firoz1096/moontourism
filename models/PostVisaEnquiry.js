const mongoose = require('mongoose');

//schema for saving an item for categories table
const PostVisaEnquiry = new mongoose.Schema({
    country: String,
    email: String,
    phone: Number,
    visaType: String,
    travellers: Number,

}, { versionKey: false });


const PostVisaEnq = mongoose.model("visa_enquiry_mt", PostVisaEnquiry) //"table name", Schema
module.exports = PostVisaEnq