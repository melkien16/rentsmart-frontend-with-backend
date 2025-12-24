import mongoose from "mongoose";

const loginHistorySchema = new mongoose.Schema({
  device: { type: String, required: true },
  location: { type: String },
  date: { type: Date, default: Date.now },
});

const paymentMethodSchema = new mongoose.Schema({
  type: { type: String, enum: ["card", "bank"], required: true },
  provider: { type: String },
  accountNumber: { type: String },
  accountName: { type: String },
});

const settingsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    notifications: {
      email: {
        enabled: { type: Boolean, default: true },
        description: { type: String, default: "Receive updates via email" },
      },
      sms: {
        enabled: { type: Boolean, default: false },
        description: {
          type: String,
          default: "Receive updates via text message",
        },
      },
      device: {
        enabled: { type: Boolean, default: true },
        description: { type: String, default: "Receive updates in the app" },
      },
    },

    paymentMethods: [paymentMethodSchema],

    visibility: {
      publicProfile: { type: Boolean, default: true },
      showEmail: { type: Boolean, default: false },
      showPhone: { type: Boolean, default: false },
    },

    security: {
      twoStepVerification: { type: Boolean, default: false },
      twoFactorAuth: {
        enabled: { type: Boolean, default: false },
        method: {
          type: String,
          enum: ["email", "sms", "authenticator"],
          default: "email",
        },
      },
      passwordLastChanged: { type: Date, default: new Date("2024-02-15") },
    },

    loginHistory: [loginHistorySchema],
  },
  {
    timestamps: true,
  }
);

const Settings = mongoose.model("Settings", settingsSchema);

export default Settings;
