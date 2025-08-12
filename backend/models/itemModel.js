import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    priceUnit: {
      type: String,
      default: "day",
    },
    rating: {
      type: Number,
      default: 0,
    },
    reviews: {
      type: Number,
      default: 0,
    },
    location: {
      type: String,
      required: true,
    },
    availability: {
      type: String,
      default: "Available", // Options: "Available", "Available Soon", "Rented"
    },
    category: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
        default: "https://via.placeholder.com/300?text=No+Image",
      },
    ],
    features: [
      {
        type: String,
      },
    ],
    rules: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Item = mongoose.model("Item", itemSchema);

export default Item;


