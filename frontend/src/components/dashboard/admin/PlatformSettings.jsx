import React, { useState } from "react";

import {
  DollarSign,
  Shield,
  Settings,
  Bell,
  Check,
  Database,
  Palette
} from "lucide-react";

import { settingsData } from "../mockAdminData";

const PlatformSettings = () => {
  const [settings, setSettings] = useState(settingsData);
  const [activeTab, setActiveTab] = useState("general");
  const [saved, setSaved] = useState(false);

  const handleSettingChange = (section, key, value) => {
    setSettings({
      ...settings,
      [section]: {
        ...settings[section],
        [key]: value,
      },
    });
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const getTabIcon = (tabId) => {
    switch (tabId) {
      case "general":
        return Settings;
      case "fees":
        return DollarSign;
      case "security":
        return Shield;
      case "appearance":
        return Palette;
      case "notifications":
        return Bell;
      case "integrations":
        return Database;
      default:
        return Settings;
    }
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-purple-400/10 via-pink-400/10 to-indigo-400/10 rounded-2xl border border-white/10 p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white flex items-center gap-3">
              <Settings className="w-8 h-8 text-purple-400" />
              Platform Settings
            </h2>
            <p className="text-gray-300 mt-2">
              Configure platform-wide settings and preferences with advanced
              controls
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className={`px-6 py-2 rounded-xl transition-all duration-200 flex items-center gap-2 font-semibold ${
                saved
                  ? "bg-green-400 text-black"
                  : "bg-purple-400 text-black hover:bg-purple-500"
              }`}
            >
              {saved ? (
                <Check className="w-4 h-4" />
              ) : (
                <Settings className="w-4 h-4" />
              )}
              {saved ? "Saved!" : "Save Changes"}
            </button>
          </div>
        </div>
      </div>

      {/* Settings Tabs */}
      <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
        <div className="border-b border-white/10">
          <nav className="flex space-x-8 px-6 overflow-x-auto">
            {[
              { id: "general", label: "General", icon: Settings },
              { id: "fees", label: "Fees & Pricing", icon: DollarSign },
              { id: "security", label: "Security", icon: Shield },
              { id: "appearance", label: "Appearance", icon: Palette },
              { id: "notifications", label: "Notifications", icon: Bell },
              { id: "integrations", label: "Integrations", icon: Database },
            ].map((tab) => {
              const TabIcon = getTabIcon(tab.id);
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center gap-2 whitespace-nowrap ${
                    activeTab === tab.id
                      ? "border-purple-400 text-purple-400"
                      : "border-transparent text-gray-400 hover:text-white"
                  }`}
                >
                  <TabIcon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === "general" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <Settings className="w-6 h-6 text-purple-400" />
                <h3 className="text-xl font-semibold text-white">
                  General Settings
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Platform Name
                    </label>
                    <input
                      type="text"
                      value={settings.general.platformName}
                      onChange={(e) =>
                        handleSettingChange(
                          "general",
                          "platformName",
                          e.target.value
                        )
                      }
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      value={settings.general.contactEmail}
                      onChange={(e) =>
                        handleSettingChange(
                          "general",
                          "contactEmail",
                          e.target.value
                        )
                      }
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Support Phone
                    </label>
                    <input
                      type="text"
                      value={settings.general.supportPhone}
                      onChange={(e) =>
                        handleSettingChange(
                          "general",
                          "supportPhone",
                          e.target.value
                        )
                      }
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Timezone
                    </label>
                    <select
                      value={settings.general.timezone}
                      onChange={(e) =>
                        handleSettingChange(
                          "general",
                          "timezone",
                          e.target.value
                        )
                      }
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50"
                    >
                      <option value="UTC-5">UTC-5 (Eastern)</option>
                      <option value="UTC-6">UTC-6 (Central)</option>
                      <option value="UTC-7">UTC-7 (Mountain)</option>
                      <option value="UTC-8">UTC-8 (Pacific)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Currency
                    </label>
                    <select
                      value={settings.general.currency}
                      onChange={(e) =>
                        handleSettingChange(
                          "general",
                          "currency",
                          e.target.value
                        )
                      }
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50"
                    >
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                      <option value="CAD">CAD (C$)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Language
                    </label>
                    <select
                      value={settings.general.language}
                      onChange={(e) =>
                        handleSettingChange(
                          "general",
                          "language",
                          e.target.value
                        )
                      }
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50"
                    >
                      <option value="English">English</option>
                      <option value="Spanish">Spanish</option>
                      <option value="French">French</option>
                      <option value="German">German</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                  <div>
                    <h4 className="text-white font-medium">Maintenance Mode</h4>
                    <p className="text-gray-400 text-sm">
                      Temporarily disable platform access
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.general.maintenanceMode}
                      onChange={(e) =>
                        handleSettingChange(
                          "general",
                          "maintenanceMode",
                          e.target.checked
                        )
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-400"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                  <div>
                    <h4 className="text-white font-medium">
                      Registration Enabled
                    </h4>
                    <p className="text-gray-400 text-sm">
                      Allow new user registrations
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.general.registrationEnabled}
                      onChange={(e) =>
                        handleSettingChange(
                          "general",
                          "registrationEnabled",
                          e.target.checked
                        )
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-400"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === "fees" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <DollarSign className="w-6 h-6 text-green-400" />
                <h3 className="text-xl font-semibold text-white">
                  Fees & Pricing
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Platform Fee (%)
                    </label>
                    <input
                      type="number"
                      value={settings.fees.platformFee}
                      onChange={(e) =>
                        handleSettingChange(
                          "fees",
                          "platformFee",
                          parseFloat(e.target.value)
                        )
                      }
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Transaction Fee (%)
                    </label>
                    <input
                      type="number"
                      value={settings.fees.transactionFee}
                      onChange={(e) =>
                        handleSettingChange(
                          "fees",
                          "transactionFee",
                          parseFloat(e.target.value)
                        )
                      }
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Minimum Payout ($)
                    </label>
                    <input
                      type="number"
                      value={settings.fees.minimumPayout}
                      onChange={(e) =>
                        handleSettingChange(
                          "fees",
                          "minimumPayout",
                          parseFloat(e.target.value)
                        )
                      }
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/50"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Late Fee (%)
                    </label>
                    <input
                      type="number"
                      value={settings.fees.lateFee}
                      onChange={(e) =>
                        handleSettingChange(
                          "fees",
                          "lateFee",
                          parseFloat(e.target.value)
                        )
                      }
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Cancellation Fee (%)
                    </label>
                    <input
                      type="number"
                      value={settings.fees.cancellationFee}
                      onChange={(e) =>
                        handleSettingChange(
                          "fees",
                          "cancellationFee",
                          parseFloat(e.target.value)
                        )
                      }
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Insurance Fee (%)
                    </label>
                    <input
                      type="number"
                      value={settings.fees.insuranceFee}
                      onChange={(e) =>
                        handleSettingChange(
                          "fees",
                          "insuranceFee",
                          parseFloat(e.target.value)
                        )
                      }
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/50"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-6 h-6 text-blue-400" />
                <h3 className="text-xl font-semibold text-white">
                  Security Settings
                </h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                  <div>
                    <h4 className="text-white font-medium">
                      Two-Factor Authentication
                    </h4>
                    <p className="text-gray-400 text-sm">
                      Require 2FA for all admin accounts
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.security.twoFactorAuth}
                      onChange={(e) =>
                        handleSettingChange(
                          "security",
                          "twoFactorAuth",
                          e.target.checked
                        )
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-400"></div>
                  </label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Session Timeout (hours)
                    </label>
                    <input
                      type="number"
                      value={settings.security.sessionTimeout}
                      onChange={(e) =>
                        handleSettingChange(
                          "security",
                          "sessionTimeout",
                          parseInt(e.target.value)
                        )
                      }
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Max Login Attempts
                    </label>
                    <input
                      type="number"
                      value={settings.security.maxLoginAttempts}
                      onChange={(e) =>
                        handleSettingChange(
                          "security",
                          "maxLoginAttempts",
                          parseInt(e.target.value)
                        )
                      }
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Password Min Length
                    </label>
                    <input
                      type="number"
                      value={settings.security.passwordMinLength}
                      onChange={(e) =>
                        handleSettingChange(
                          "security",
                          "passwordMinLength",
                          parseInt(e.target.value)
                        )
                      }
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50"
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                    <div>
                      <h4 className="text-white font-medium">
                        Strong Passwords
                      </h4>
                      <p className="text-gray-400 text-sm">
                        Require complex passwords
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.security.requireStrongPasswords}
                        onChange={(e) =>
                          handleSettingChange(
                            "security",
                            "requireStrongPasswords",
                            e.target.checked
                          )
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-400"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "appearance" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <Palette className="w-6 h-6 text-pink-400" />
                <h3 className="text-xl font-semibold text-white">
                  Appearance Settings
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Theme
                    </label>
                    <select
                      value={settings.appearance.theme}
                      onChange={(e) =>
                        handleSettingChange(
                          "appearance",
                          "theme",
                          e.target.value
                        )
                      }
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-400/50"
                    >
                      <option value="dark">Dark</option>
                      <option value="light">Light</option>
                      <option value="auto">Auto</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Primary Color
                    </label>
                    <input
                      type="color"
                      value={settings.appearance.primaryColor}
                      onChange={(e) =>
                        handleSettingChange(
                          "appearance",
                          "primaryColor",
                          e.target.value
                        )
                      }
                      className="w-full h-12 rounded-xl bg-white/10 border border-white/20 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-400/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Accent Color
                    </label>
                    <input
                      type="color"
                      value={settings.appearance.accentColor}
                      onChange={(e) =>
                        handleSettingChange(
                          "appearance",
                          "accentColor",
                          e.target.value
                        )
                      }
                      className="w-full h-12 rounded-xl bg-white/10 border border-white/20 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-400/50"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Logo URL
                    </label>
                    <input
                      type="text"
                      value={settings.appearance.logoUrl}
                      onChange={(e) =>
                        handleSettingChange(
                          "appearance",
                          "logoUrl",
                          e.target.value
                        )
                      }
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-400/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Favicon URL
                    </label>
                    <input
                      type="text"
                      value={settings.appearance.faviconUrl}
                      onChange={(e) =>
                        handleSettingChange(
                          "appearance",
                          "faviconUrl",
                          e.target.value
                        )
                      }
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-400/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Custom CSS
                    </label>
                    <textarea
                      value={settings.appearance.customCSS}
                      onChange={(e) =>
                        handleSettingChange(
                          "appearance",
                          "customCSS",
                          e.target.value
                        )
                      }
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-400/50"
                      placeholder="Enter custom CSS..."
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <Bell className="w-6 h-6 text-yellow-400" />
                <h3 className="text-xl font-semibold text-white">
                  Notification Settings
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                    <div>
                      <h4 className="text-white font-medium">Email Alerts</h4>
                      <p className="text-gray-400 text-sm">
                        Receive email notifications
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.notifications.emailAlerts}
                        onChange={(e) =>
                          handleSettingChange(
                            "notifications",
                            "emailAlerts",
                            e.target.checked
                          )
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                    <div>
                      <h4 className="text-white font-medium">SMS Alerts</h4>
                      <p className="text-gray-400 text-sm">
                        Receive SMS notifications
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.notifications.smsAlerts}
                        onChange={(e) =>
                          handleSettingChange(
                            "notifications",
                            "smsAlerts",
                            e.target.checked
                          )
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                    <div>
                      <h4 className="text-white font-medium">
                        Push Notifications
                      </h4>
                      <p className="text-gray-400 text-sm">
                        Receive push notifications
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.notifications.pushNotifications}
                        onChange={(e) =>
                          handleSettingChange(
                            "notifications",
                            "pushNotifications",
                            e.target.checked
                          )
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
                    </label>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                    <div>
                      <h4 className="text-white font-medium">
                        Marketing Emails
                      </h4>
                      <p className="text-gray-400 text-sm">
                        Receive promotional emails
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.notifications.marketingEmails}
                        onChange={(e) =>
                          handleSettingChange(
                            "notifications",
                            "marketingEmails",
                            e.target.checked
                          )
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                    <div>
                      <h4 className="text-white font-medium">System Updates</h4>
                      <p className="text-gray-400 text-sm">
                        Receive system update notifications
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.notifications.systemUpdates}
                        onChange={(e) =>
                          handleSettingChange(
                            "notifications",
                            "systemUpdates",
                            e.target.checked
                          )
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                    <div>
                      <h4 className="text-white font-medium">
                        Security Alerts
                      </h4>
                      <p className="text-gray-400 text-sm">
                        Receive security notifications
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.notifications.securityAlerts}
                        onChange={(e) =>
                          handleSettingChange(
                            "notifications",
                            "securityAlerts",
                            e.target.checked
                          )
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "integrations" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <Database className="w-6 h-6 text-indigo-400" />
                <h3 className="text-xl font-semibold text-white">
                  Integration Settings
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                    <div>
                      <h4 className="text-white font-medium">Stripe Payment</h4>
                      <p className="text-gray-400 text-sm">
                        Enable Stripe payment processing
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.integrations.stripeEnabled}
                        onChange={(e) =>
                          handleSettingChange(
                            "integrations",
                            "stripeEnabled",
                            e.target.checked
                          )
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-400"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                    <div>
                      <h4 className="text-white font-medium">PayPal Payment</h4>
                      <p className="text-gray-400 text-sm">
                        Enable PayPal payment processing
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.integrations.paypalEnabled}
                        onChange={(e) =>
                          handleSettingChange(
                            "integrations",
                            "paypalEnabled",
                            e.target.checked
                          )
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-400"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                    <div>
                      <h4 className="text-white font-medium">
                        Google Analytics
                      </h4>
                      <p className="text-gray-400 text-sm">
                        Enable Google Analytics tracking
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.integrations.googleAnalytics}
                        onChange={(e) =>
                          handleSettingChange(
                            "integrations",
                            "googleAnalytics",
                            e.target.checked
                          )
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-400"></div>
                    </label>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                    <div>
                      <h4 className="text-white font-medium">Facebook Pixel</h4>
                      <p className="text-gray-400 text-sm">
                        Enable Facebook Pixel tracking
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.integrations.facebookPixel}
                        onChange={(e) =>
                          handleSettingChange(
                            "integrations",
                            "facebookPixel",
                            e.target.checked
                          )
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-400"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                    <div>
                      <h4 className="text-white font-medium">
                        Slack Integration
                      </h4>
                      <p className="text-gray-400 text-sm">
                        Enable Slack notifications
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.integrations.slackWebhook !== ""}
                        onChange={(e) =>
                          handleSettingChange(
                            "integrations",
                            "slackWebhook",
                            e.target.checked ? "webhook-url" : ""
                          )
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-400"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                    <div>
                      <h4 className="text-white font-medium">
                        Zapier Integration
                      </h4>
                      <p className="text-gray-400 text-sm">
                        Enable Zapier automation
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.integrations.zapierEnabled}
                        onChange={(e) =>
                          handleSettingChange(
                            "integrations",
                            "zapierEnabled",
                            e.target.checked
                          )
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-400"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlatformSettings