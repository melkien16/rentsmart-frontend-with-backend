import mongoose from "mongoose";

const collateralSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // One collateral per user
    },
    collateralType: {
      type: String,
      enum: ["ID", "Property", "Cash", "Other"],
      required: true,
      default: "ID",
    },
    description: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true, // Used to validate against rental requirements
    },
    documents: [
      {
        url: { type: String, required: true },
        fileType: { type: String, enum: ["image", "pdf"], default: "image" },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Collateral = mongoose.model("Collateral", collateralSchema);
export default Collateral;
