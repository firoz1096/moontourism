const mongoose = require('mongoose');


const AboutInfo = new mongoose.Schema({
  aboutUs: String,

}, { versionKey: false });



const aboutInfoSchema = mongoose.model("about_page_mts", AboutInfo) //"table name", Schema
module.exports = aboutInfoSchema