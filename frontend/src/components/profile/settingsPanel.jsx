import { useState } from "react";
import { Save, Bell, Lock, User, Edit2, X } from "lucide-react";

export default function SettingsPane() {
  const [editMode, setEditMode] = useState(false);

  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 234 567 8900",
  });

  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
  });

  const handleSaveAll = () => {
    console.log("Profile:", profile);
    console.log("Password:", password);
    console.log("Notifications:", notifications);
    setEditMode(false);
  };

  return (
    <div className="space-y-8 p-6 bg-gray-900 rounded-xl border border-white/10">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">Settings</h2>
        <button
          onClick={() => setEditMode((prev) => !prev)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
            editMode
              ? "bg-red-500/20 border border-red-500 text-red-400 hover:bg-red-500/30"
              : "bg-[#00FF99]/20 border border-[#00FF99] text-[#00FF99] hover:bg-[#00FF99]/30"
          }`}
        >
          {editMode ? <X size={18} /> : <Edit2 size={18} />}
          {editMode ? "Cancel" : "Edit Profile"}
        </button>
      </div>

      {/* Profile Information */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <User className="text-[#00FF99]" />
          <h3 className="text-lg font-semibold text-white">
            Profile Information
          </h3>
        </div>
        {!editMode ? (
          <div className="space-y-2 text-gray-300">
            <p>
              <span className="text-gray-400">Name:</span> {profile.name}
            </p>
            <p>
              <span className="text-gray-400">Email:</span> {profile.email}
            </p>
            <p>
              <span className="text-gray-400">Phone:</span> {profile.phone}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full px-4 py-2 bg-gray-800 border border-white/10 rounded-lg text-white"
            />
            <input
              type="email"
              value={profile.email}
              onChange={(e) =>
                setProfile({ ...profile, email: e.target.value })
              }
              className="w-full px-4 py-2 bg-gray-800 border border-white/10 rounded-lg text-white"
            />
            <input
              type="tel"
              value={profile.phone}
              onChange={(e) =>
                setProfile({ ...profile, phone: e.target.value })
              }
              className="w-full px-4 py-2 bg-gray-800 border border-white/10 rounded-lg text-white"
            />
          </div>
        )}
      </section>

      {/* Change Password */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Lock className="text-[#00FF99]" />
          <h3 className="text-lg font-semibold text-white">Change Password</h3>
        </div>
        {!editMode ? (
          <p className="text-gray-400 italic">
            Password is hidden for security. Click edit to change it.
          </p>
        ) : (
          <div className="space-y-3">
            <input
              type="password"
              placeholder="Current Password"
              value={password.current}
              onChange={(e) =>
                setPassword({ ...password, current: e.target.value })
              }
              className="w-full px-4 py-2 bg-gray-800 border border-white/10 rounded-lg text-white"
            />
            <input
              type="password"
              placeholder="New Password"
              value={password.new}
              onChange={(e) =>
                setPassword({ ...password, new: e.target.value })
              }
              className="w-full px-4 py-2 bg-gray-800 border border-white/10 rounded-lg text-white"
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={password.confirm}
              onChange={(e) =>
                setPassword({ ...password, confirm: e.target.value })
              }
              className="w-full px-4 py-2 bg-gray-800 border border-white/10 rounded-lg text-white"
            />
          </div>
        )}
      </section>

      {/* Notification Preferences */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Bell className="text-[#00FF99]" />
          <h3 className="text-lg font-semibold text-white">
            Notification Preferences
          </h3>
        </div>
        {!editMode ? (
          <ul className="space-y-1 text-gray-300">
            {Object.keys(notifications).map((type) => (
              <li key={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}:{" "}
                <span
                  className={
                    notifications[type] ? "text-[#00FF99]" : "text-gray-500"
                  }
                >
                  {notifications[type] ? "Enabled" : "Disabled"}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="space-y-2">
            {Object.keys(notifications).map((type) => (
              <label
                key={type}
                className="flex items-center gap-3 text-gray-300"
              >
                <input
                  type="checkbox"
                  checked={notifications[type]}
                  onChange={() =>
                    setNotifications((prev) => ({
                      ...prev,
                      [type]: !prev[type],
                    }))
                  }
                  className="w-5 h-5 accent-[#00FF99]"
                />
                {type.charAt(0).toUpperCase() + type.slice(1)} Notifications
              </label>
            ))}
          </div>
        )}
      </section>

      {/* Save Button */}
      {editMode && (
        <div className="flex justify-end">
          <button
            onClick={handleSaveAll}
            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-[#00FF99] text-black font-semibold hover:bg-[#00FF99]/90 transition-all duration-300"
          >
            <Save size={18} /> Save All Changes
          </button>
        </div>
      )}
    </div>
  );
}
