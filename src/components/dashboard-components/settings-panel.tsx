"use client";

import { useState } from "react";

export default function SettingsPanel() {
  const [darkMode, setDarkMode] = useState(false);
  const [emailAlerts, setEmailAlerts] = useState(true);

  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow">
      <h2 className="text-lg font-bold mb-4">Settings</h2>
      <div className="space-y-4 text-gray-300">
        {/* Dark Mode Toggle */}
        <div className="flex items-center justify-between">
          <span>Dark Mode</span>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`px-3 py-1 rounded-lg text-sm font-semibold ${
              darkMode ? "bg-gray-600" : "bg-gray-700"
            }`}
          >
            {darkMode ? "On" : "Off"}
          </button>
        </div>

        {/* Email Alerts */}
        <div className="flex items-center justify-between">
          <span>Email Alerts</span>
          <button
            onClick={() => setEmailAlerts(!emailAlerts)}
            className={`px-3 py-1 rounded-lg text-sm font-semibold ${
              emailAlerts ? "bg-gray-600" : "bg-gray-700"
            }`}
          >
            {emailAlerts ? "Enabled" : "Disabled"}
          </button>
        </div>
      </div>
    </div>
  );
}
