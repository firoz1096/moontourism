const mongoose = require('mongoose');

//schema for saving an item for categories table
const PostContactEnquiry = new mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    message: String

}, { versionKey: false });



const PostContactEnq = mongoose.model("contact_enquiry_mt", PostContactEnquiry) //"table name", Schema
module.exports = PostContactEnq