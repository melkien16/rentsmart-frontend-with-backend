import mongoose from "mongoose";

const messageSchema = mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", // Reference to the sender (User model)
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", // Reference to the receiver (User model)
    },
    message: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false, // Whether the message has been read or not
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Will create 'createdAt' and 'updatedAt' fields automatically
  }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
