const mongoose = require("mongoose");

const PostBlogCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, trim: true },
  },
  { timestamps: true }
);

// ✅ Register model with a clear name
const Category = mongoose.model("Category", PostBlogCategorySchema);
module.exports = Category;
