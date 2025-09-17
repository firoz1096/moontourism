const mongoose = require('mongoose');

const PostSubscribe = new mongoose.Schema(

{
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email address",
      ],
    },
    status: {
      type: String,
      enum: ["subscribed", "unsubscribed"],
      default: "subscribed",
    },
    source: {
      type: String,
      default: "website",
    },
  },
  { timestamps: true }


);

const PostSusbcribeSchema = mongoose.model("subscribe_mt", PostSubscribe); 
module.exports = PostSusbcribeSchema;
