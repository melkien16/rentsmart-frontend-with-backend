import mongoose from "mongoose";

const publicSubscriberSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const PublicSubscriber = mongoose.model(
  "PublicSubscriber",
  publicSubscriberSchema
);

export default PublicSubscriber;
