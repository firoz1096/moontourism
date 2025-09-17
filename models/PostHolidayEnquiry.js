const mongoose = require('mongoose');

//schema for saving an item for categories table
const PostHolidayEnquiry = new mongoose.Schema({
  destination: String,
  from: String,
  fromDate: Date,
  toDate: Date,
  room: Number,
  adult: Number,
  children: Number,
  infant: Number,
  name: String,
  email: String,
  phone: Number,
  requirements: String

}, { versionKey: false });



const PostHolidayEnq = mongoose.model("holiday_enquiry_mt", PostHolidayEnquiry) //"table name", Schema
module.exports = PostHolidayEnq