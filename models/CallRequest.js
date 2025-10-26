const mongoose = require('mongoose');

//schema for saving an item for categories table
const CallRequestEnquiry = new mongoose.Schema({
    callFor: String,
    product: String,
    name: String,
    email: String,
    phone: Number,
    createdAt: {
        type: Date,
        default: Date.now,
    }
   

}, { versionKey: false });



const CallRequestEnq = mongoose.model("call_request_mt", CallRequestEnquiry) //"table name", Schema
module.exports = CallRequestEnq