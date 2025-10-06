import asyncHandler from "../middleware/asyncHandler.js";
import Settings from "../models/userSettingsModel.js";

// @desc    Get settings by user ID
// @route   GET /api/settings
// @access  Private
const getSettingsByUserId = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const settings = await Settings.findOne({ user: userId }).populate(
    "user",
    "name email phone"
  );

  if (!settings) {
    res.status(404);
    throw new Error("Settings not found");
  }

  res.json(settings);
});

// @desc    Create default settings for a new user
// @route   POST /api/settings/
// @access  Private
const createUserSettings = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const existingSettings = await Settings.findOne({ user: userId });

  if (existingSettings) {
    res.status(400);
    throw new Error("Settings already exist for this user");
  }

  const settings = new Settings({
    user: userId,
    notifications: {
      email: { enabled: true },
      sms: { enabled: false },
      push: { enabled: true },
    },
    visibility: {
      publicProfile: true,
      showEmail: false,
      showPhone: false,
    },
    security: {
      twoStepVerification: false,
      twoFactorAuth: { enabled: false, method: "email" },
      passwordLastChanged: new Date(),
    },
  });

  const createdSettings = await settings.save();
  res.status(201).json(createdSettings);
});

// @desc    Update notification preferences
// @route   PUT /api/settings/notifications
// @access  Private
const updateNotifications = asyncHandler(async (req, res) => {
  const { email, sms, push } = req.body;
  const userId = req.user._id;
  const settings = await Settings.findOne({ user: userId });

  if (!settings) {
    res.status(404);
    throw new Error("Settings not found");
  }

  settings.notifications.email.enabled =
    email ?? settings.notifications.email.enabled;
  settings.notifications.sms.enabled =
    sms ?? settings.notifications.sms.enabled;
  settings.notifications.push.enabled =
    push ?? settings.notifications.push.enabled;

  const updated = await settings.save();
  res.json(updated.notifications);
});

// @desc    Update profile visibility settings
// @route   PUT /api/settings/visibility
// @access  Private
const updateVisibility = asyncHandler(async (req, res) => {
  const { publicProfile, showEmail, showPhone } = req.body;
  const userId = req.user._id;
  const settings = await Settings.findOne({ user: userId });

  if (!settings) {
    res.status(404);
    throw new Error("Settings not found");
  }

  settings.visibility.publicProfile =
    publicProfile ?? settings.visibility.publicProfile;
  settings.visibility.showEmail = showEmail ?? settings.visibility.showEmail;
  settings.visibility.showPhone = showPhone ?? settings.visibility.showPhone;

  const updated = await settings.save();
  res.json(updated.visibility);
});

// @desc    Update security settings (2FA, password, etc.)
// @route   PUT /api/settings/security
// @access  Private
const updateSecuritySettings = asyncHandler(async (req, res) => {
  const { twoStepVerification, twoFactorAuth } = req.body;
  const userId = req.user._id;
  const settings = await Settings.findOne({ user: userId });

  if (!settings) {
    res.status(404);
    throw new Error("Settings not found");
  }

  if (typeof twoStepVerification === "boolean") {
    settings.security.twoStepVerification = twoStepVerification;
  }

  if (twoFactorAuth) {
    settings.security.twoFactorAuth.enabled =
      twoFactorAuth.enabled ?? settings.security.twoFactorAuth.enabled;
    settings.security.twoFactorAuth.method =
      twoFactorAuth.method ?? settings.security.twoFactorAuth.method;
  }

  const updated = await settings.save();
  res.json(updated.security);
});

// @desc    Add a new payment method
// @route   POST /api/settings/payment-methods
// @access  Private
const addPaymentMethod = asyncHandler(async (req, res) => {
  const { provider, accountLast4, isDefault } = req.body;
  const userId = req.user._id
  const settings = await Settings.findOne({ user: userId });

  if (!settings) {
    res.status(404);
    throw new Error("Settings not found");
  }

  const newMethod = {
    provider,
    accountLast4,
    isDefault: isDefault ?? false,
  };

  // If this is set as default, unset others
  if (isDefault) {
    settings.paymentMethods.forEach((m) => (m.isDefault = false));
  }

  settings.paymentMethods.push(newMethod);
  const updated = await settings.save();
  res.status(201).json(updated.paymentMethods);
});

// @desc    Change password timestamp (for tracking)
// @route   PUT /api/settings/change-password
// @access  Private
const updatePasswordChangeDate = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const settings = await Settings.findOne({ user: userId });

  if (!settings) {
    res.status(404);
    throw new Error("Settings not found");
  }

  settings.security.passwordLastChanged = new Date();
  const updated = await settings.save();
  res.json({
    message: "Password change timestamp updated",
    passwordLastChanged: updated.security.passwordLastChanged,
  });
});

// @desc    Log a new login history entry
// @route   POST /api/settings/login-history
// @access  Private
const addLoginHistory = asyncHandler(async (req, res) => {
  const { device, location } = req.body;
  const userId = req.user._id
  const settings = await Settings.findOne({ user: userId });

  if (!settings) {
    res.status(404);
    throw new Error("Settings not found");
  }

  settings.loginHistory.unshift({
    device,
    location,
    date: new Date(),
  });

  // Keep last 10 login entries
  if (settings.loginHistory.length > 10) {
    settings.loginHistory = settings.loginHistory.slice(0, 10);
  }

  const updated = await settings.save();
  res.status(201).json(updated.loginHistory);
});

// @desc    Get all user settings (Admin only)
// @route   GET /api/settings/all-settings
// @access  Private/Admin
const getAllSettings = asyncHandler(async (req, res) => {
  const settings = await Settings.find({})
    .populate("user", "name email")
    .sort({ createdAt: -1 });

  if (!settings) {
    res.status(404);
    throw new Error("No settings found");
  }

  res.json(settings);
});

export {
  getSettingsByUserId,
  createUserSettings,
  updateNotifications,
  updateVisibility,
  updateSecuritySettings,
  addPaymentMethod,
  updatePasswordChangeDate,
  addLoginHistory,
  getAllSettings,
};
