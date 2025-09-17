const mongoose = require('mongoose');

//schema for saving an item for categories table
const TermsInfo = new mongoose.Schema({
  termsAndConditions: String,

}, { versionKey: false });



const TermsInfoSchema = mongoose.model("term_page_mts", TermsInfo) //"table name", Schema
module.exports = TermsInfoSchema