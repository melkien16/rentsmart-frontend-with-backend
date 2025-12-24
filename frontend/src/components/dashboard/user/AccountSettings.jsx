import { useState } from "react";

import {
  Package,
  Shield,
  DollarSign,
  Star,
  Edit,
  Trash2,
  Plus,
  X,
  User,
  CreditCard,
  Camera,
  Bell,
  Settings,
  Lock,
  Save,
} from "lucide-react";

import { mockAccountData } from "../mockUserData";

const AccountSettings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [profileData, setProfileData] = useState(mockAccountData.profile);
  const [preferences, setPreferences] = useState(
    mockAccountData.profile.preferences
  );

  const tabs = [
    { id: "profile", name: "Profile", icon: User },
    { id: "security", name: "Security", icon: Shield },
    { id: "notifications", name: "Notifications", icon: Bell },
    { id: "payment", name: "Payment Methods", icon: CreditCard },
    { id: "privacy", name: "Privacy", icon: Lock },
  ];

  const handleSaveProfile = () => {
    // In a real app, this would save to the backend
    console.log("Profile saved:", profileData);
  };

  const handleSavePreferences = () => {
    // In a real app, this would save to the backend
    console.log("Preferences saved:", preferences);
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-indigo-400/10 via-purple-400/10 to-pink-400/10 rounded-2xl border border-white/10 p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white flex items-center gap-3">
              <Settings className="w-8 h-8 text-indigo-400" />
              Account Settings
            </h2>
            <p className="text-gray-300 mt-2">
              Manage your profile, security, and preferences
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleSaveProfile}
              className="px-6 py-2 bg-indigo-400 text-black rounded-xl hover:bg-indigo-500 transition-all duration-200 flex items-center gap-2 font-semibold"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </div>
      </div>

      {/* Account Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1 bg-white/5 rounded-2xl border border-white/10 p-6">
          <div className="text-center mb-6">
            <div className="relative inline-block">
              <img
                src={profileData.avatar}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-white/10"
              />
              <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-indigo-400 rounded-full flex items-center justify-center hover:bg-indigo-500 transition-colors">
                <Camera className="w-4 h-4 text-black" />
              </button>
            </div>
            <h3 className="text-white font-semibold text-lg mt-4">
              {profileData.firstName} {profileData.lastName}
            </h3>
            <p className="text-gray-400">{profileData.email}</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Member since</span>
              <span className="text-white">March 2024</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Last login</span>
              <span className="text-white">
                {mockAccountData.security.lastLogin}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Two-factor</span>
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  mockAccountData.security.twoFactorEnabled
                    ? "bg-green-400/20 text-green-400 border border-green-400/30"
                    : "bg-red-400/20 text-red-400 border border-red-400/30"
                }`}
              >
                {mockAccountData.security.twoFactorEnabled
                  ? "Enabled"
                  : "Disabled"}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-indigo-400/20 to-indigo-600/20 rounded-2xl border border-indigo-400/30 p-6 hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-indigo-400 text-sm font-medium">
                  Active Listings
                </p>
                <p className="text-3xl font-bold text-white">3</p>
                <p className="text-indigo-400 text-sm flex items-center gap-1">
                  <Package className="w-4 h-4" />
                  Items for rent
                </p>
              </div>
              <div className="w-12 h-12 bg-indigo-400/20 rounded-xl flex items-center justify-center">
                <Package className="w-6 h-6 text-indigo-400" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-400/20 to-green-600/20 rounded-2xl border border-green-400/30 p-6 hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-400 text-sm font-medium">
                  Total Earnings
                </p>
                <p className="text-3xl font-bold text-white">$2,450</p>
                <p className="text-green-400 text-sm flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  This month
                </p>
              </div>
              <div className="w-12 h-12 bg-green-400/20 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-400/20 to-purple-600/20 rounded-2xl border border-purple-400/30 p-6 hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-400 text-sm font-medium">Rating</p>
                <p className="text-3xl font-bold text-white">4.8</p>
                <p className="text-purple-400 text-sm flex items-center gap-1">
                  <Star className="w-4 h-4" />
                  Out of 5
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-400/20 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Tabs */}
      <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
        {/* Tab Navigation */}
        <div className="flex border-b border-white/10 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                activeTab === tab.id
                  ? "text-indigo-400 border-b-2 border-indigo-400 bg-indigo-400/10"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.name}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === "profile" && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white mb-6">
                Profile Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-gray-400 text-sm">First Name</label>
                  <input
                    type="text"
                    value={profileData.firstName}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        firstName: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-indigo-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Last Name</label>
                  <input
                    type="text"
                    value={profileData.lastName}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        lastName: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-indigo-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Email</label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) =>
                      setProfileData({ ...profileData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-indigo-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Phone</label>
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) =>
                      setProfileData({ ...profileData, phone: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-indigo-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Date of Birth</label>
                  <input
                    type="date"
                    value={profileData.dateOfBirth}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        dateOfBirth: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-indigo-400 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-400 text-sm">Address</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <input
                    type="text"
                    placeholder="Street Address"
                    value={profileData.address.street}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        address: {
                          ...profileData.address,
                          street: e.target.value,
                        },
                      })
                    }
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-indigo-400 transition-colors"
                  />
                  <input
                    type="text"
                    placeholder="City"
                    value={profileData.address.city}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        address: {
                          ...profileData.address,
                          city: e.target.value,
                        },
                      })
                    }
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-indigo-400 transition-colors"
                  />
                  <input
                    type="text"
                    placeholder="State"
                    value={profileData.address.state}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        address: {
                          ...profileData.address,
                          state: e.target.value,
                        },
                      })
                    }
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-indigo-400 transition-colors"
                  />
                  <input
                    type="text"
                    placeholder="ZIP Code"
                    value={profileData.address.zipCode}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        address: {
                          ...profileData.address,
                          zipCode: e.target.value,
                        },
                      })
                    }
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-indigo-400 transition-colors"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white mb-6">
                Security Settings
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                  <div>
                    <h4 className="text-white font-semibold">
                      Two-Factor Authentication
                    </h4>
                    <p className="text-gray-400 text-sm">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <button
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                      mockAccountData.security.twoFactorEnabled
                        ? "bg-green-400 text-black hover:bg-green-500"
                        : "bg-gray-400 text-white hover:bg-gray-500"
                    }`}
                  >
                    {mockAccountData.security.twoFactorEnabled
                      ? "Enabled"
                      : "Enable"}
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                  <div>
                    <h4 className="text-white font-semibold">
                      Change Password
                    </h4>
                    <p className="text-gray-400 text-sm">
                      Last changed:{" "}
                      {mockAccountData.security.passwordLastChanged}
                    </p>
                  </div>
                  <button
                    onClick={() => setShowPasswordModal(true)}
                    className="px-4 py-2 bg-indigo-400 text-black rounded-lg hover:bg-indigo-500 transition-colors font-semibold"
                  >
                    Change
                  </button>
                </div>

                <div className="space-y-4">
                  <h4 className="text-white font-semibold">Login History</h4>
                  <div className="space-y-3">
                    {mockAccountData.security.loginHistory.map(
                      (login, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                        >
                          <div>
                            <p className="text-white text-sm">{login.device}</p>
                            <p className="text-gray-400 text-xs">
                              {login.location}
                            </p>
                          </div>
                          <span className="text-gray-400 text-xs">
                            {login.date}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white mb-6">
                Notification Preferences
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                  <div>
                    <h4 className="text-white font-semibold">
                      Email Notifications
                    </h4>
                    <p className="text-gray-400 text-sm">
                      Receive updates via email
                    </p>
                  </div>
                  <button
                    className={`w-12 h-6 rounded-full transition-colors ${
                      preferences.notifications.email
                        ? "bg-indigo-400"
                        : "bg-gray-400"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full transition-transform ${
                        preferences.notifications.email
                          ? "translate-x-6"
                          : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                  <div>
                    <h4 className="text-white font-semibold">
                      SMS Notifications
                    </h4>
                    <p className="text-gray-400 text-sm">
                      Receive updates via text message
                    </p>
                  </div>
                  <button
                    className={`w-12 h-6 rounded-full transition-colors ${
                      preferences.notifications.sms
                        ? "bg-indigo-400"
                        : "bg-gray-400"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full transition-transform ${
                        preferences.notifications.sms
                          ? "translate-x-6"
                          : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                  <div>
                    <h4 className="text-white font-semibold">
                      Push Notifications
                    </h4>
                    <p className="text-gray-400 text-sm">
                      Receive updates in the app
                    </p>
                  </div>
                  <button
                    className={`w-12 h-6 rounded-full transition-colors ${
                      preferences.notifications.push
                        ? "bg-indigo-400"
                        : "bg-gray-400"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full transition-transform ${
                        preferences.notifications.push
                          ? "translate-x-6"
                          : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "payment" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">
                  Payment Methods
                </h3>
                <button
                  onClick={() => setShowPaymentModal(true)}
                  className="px-4 py-2 bg-indigo-400 text-black rounded-lg hover:bg-indigo-500 transition-colors font-semibold flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Payment Method
                </button>
              </div>

              <div className="space-y-4">
                {mockAccountData.paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className="flex items-center justify-between p-4 bg-white/5 rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-400/20 rounded-lg flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-indigo-400" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold">
                          {method.brand} •••• {method.last4}
                        </h4>
                        <p className="text-gray-400 text-sm">
                          Expires {method.expiry}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {method.isDefault && (
                        <span className="px-2 py-1 bg-green-400/20 text-green-400 rounded-full text-xs font-semibold">
                          Default
                        </span>
                      )}
                      <button className="p-2 text-gray-400 hover:text-white transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-red-400 hover:text-red-300 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "privacy" && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white mb-6">
                Privacy Settings
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="text-gray-400 text-sm">
                    Profile Visibility
                  </label>
                  <select
                    value={preferences.privacy.profileVisibility}
                    onChange={(e) =>
                      setPreferences({
                        ...preferences,
                        privacy: {
                          ...preferences.privacy,
                          profileVisibility: e.target.value,
                        },
                      })
                    }
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-indigo-400 transition-colors"
                  >
                    <option value="public" className="bg-black/70">Public</option>
                    <option value="private" className="bg-black/70">Private</option>
                  </select>
                </div>

                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                  <div>
                    <h4 className="text-white font-semibold">
                      Show Email Address
                    </h4>
                    <p className="text-gray-400 text-sm">
                      Allow others to see your email
                    </p>
                  </div>
                  <button
                    className={`w-12 h-6 rounded-full transition-colors ${
                      preferences.privacy.showEmail
                        ? "bg-indigo-400"
                        : "bg-gray-400"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full transition-transform ${
                        preferences.privacy.showEmail
                          ? "translate-x-6"
                          : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                  <div>
                    <h4 className="text-white font-semibold">
                      Show Phone Number
                    </h4>
                    <p className="text-gray-400 text-sm">
                      Allow others to see your phone number
                    </p>
                  </div>
                  <button
                    className={`w-12 h-6 rounded-full transition-colors ${
                      preferences.privacy.showPhone
                        ? "bg-indigo-400"
                        : "bg-gray-400"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full transition-transform ${
                        preferences.privacy.showPhone
                          ? "translate-x-6"
                          : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-2xl border border-white/10 max-w-md w-full">
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">
                  Change Password
                </h3>
                <button
                  onClick={() => setShowPasswordModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <label className="text-gray-400 text-sm">
                  Current Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-indigo-400 transition-colors"
                  placeholder="Enter current password"
                />
              </div>
              <div>
                <label className="text-gray-400 text-sm">New Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-indigo-400 transition-colors"
                  placeholder="Enter new password"
                />
              </div>
              <div>
                <label className="text-gray-400 text-sm">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-indigo-400 transition-colors"
                  placeholder="Confirm new password"
                />
              </div>
              <div className="flex space-x-3">
                <button className="flex-1 px-4 py-2 bg-indigo-400 text-black rounded-lg hover:bg-indigo-500 transition-colors font-semibold">
                  Change Password
                </button>
                <button
                  onClick={() => setShowPasswordModal(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors font-semibold"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Payment Method Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-2xl border border-white/10 max-w-md w-full">
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">
                  Add Payment Method
                </h3>
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <label className="text-gray-400 text-sm">Card Number</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-indigo-400 transition-colors"
                  placeholder="1234 5678 9012 3456"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-400 text-sm">Expiry Date</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-indigo-400 transition-colors"
                    placeholder="MM/YY"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-sm">CVV</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-indigo-400 transition-colors"
                    placeholder="123"
                  />
                </div>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Cardholder Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-indigo-400 transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div className="flex space-x-3">
                <button className="flex-1 px-4 py-2 bg-indigo-400 text-black rounded-lg hover:bg-indigo-500 transition-colors font-semibold">
                  Add Card
                </button>
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors font-semibold"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountSettings