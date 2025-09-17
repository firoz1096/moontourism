const mongoose = require('mongoose');

//schema for saving an item for categories table
const ContactInfo = new mongoose.Schema({
  address: String,
  email: String,
  phone: String,
  workingHours: String,
  mapEmbedUrl: String,
  facebookUrl: String,
  twitterUrl: String,
  instagramUrl: String,
  tiktokUrl: String,
  youtubeUrl: String,
  linkedinUrl: String,

}, { versionKey: false });



const ContactInfoSchema = mongoose.model("contact_page_mts", ContactInfo) //"table name", Schema
module.exports = ContactInfoSchema