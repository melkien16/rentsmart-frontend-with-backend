import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true, // e.g., 'electronics', 'tools'
      lowercase: true,
      trim: true,
    },
    name: {
      type: String,
      required: true, // e.g., 'Electronics'
    },
    count: {
      type: Number,
      default: 0, // This can be incremented automatically based on items
    },
    image: {
      type: String,
      required: true, // e.g., '/images/categories/electronics.jpg'
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;
