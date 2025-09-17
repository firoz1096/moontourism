const mongoose = require("mongoose");

const PostBlogEntrySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    content: { type: String, required: true },
    excerpt: { type: String, trim: true },
    coverImage: { type: String },

    location: {
      city: String,
      country: String,
    },

    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category", // ✅ Must match Category model name
      },
    ],

    tags: [{ type: String, trim: true }],

    isPublished: { type: Boolean, default: false },
    publishedAt: { type: Date },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// ✅ Register model with clear name
const Blog = mongoose.model("Blog", PostBlogEntrySchema);
module.exports = Blog;
