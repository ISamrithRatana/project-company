'use client'
import React from 'react';

const navItems = [
  { name: 'Home', href: '/home', icon: '🏠' },
  { name: 'Notifications', href: '/dashboard/notifications', icon: '🔔' },
  { name: 'Ads Manager', href: '/dashboard/ads-manager', icon: '📈' },
  { name: 'Inbox', href: '/dashboard/inbox', icon: '💬' },
  { name: 'Content', href: '/dashboard/content', icon: '📝' },
  { name: 'Planner', href: '/dashboard/planner', icon: '📅' },
  { name: 'Ads', href: '/dashboard/ads', icon: '📣' },
  { name: 'Insights', href: '/dashboard/insights', icon: '📊' },
  { name: 'Audiences', href: '/dashboard/audiences', icon: '👥' },
  { name: 'All tools', href: '/dashboard/all-tools', icon: '🛠️' },
];

const bottomNavItems = [
  { name: 'Search', href: '/dashboard/search', icon: '🔍' },
  { name: 'Settings', href: '/dashboard/settings', icon: '⚙️' },
  { name: 'Help', href: '/dashboard/help', icon: '❓' },
];

export default function Sidebar() {
  return (
    <div className="flex bg-gray-100">
      {/* Sidebar container */}
      <aside className="w-64 bg-white p-4 shadow-lg flex flex-col justify-between">
        {/* Top section of the sidebar */}
        <div>
          {/* Logo and account dropdown */}
          <div className="flex items-center space-x-2 pb-4 border-b border-gray-200">
            {/* Placeholder for logo */}
            <div className="w-8 h-8 rounded-full bg-blue-500"></div>
            <select className="flex-grow bg-transparent text-sm font-semibold focus:outline-none">
              <option>Home Internet, ...</option>
            </select>
          </div>

          {/* Main navigation links */}
          <nav className="mt-4 space-y-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-3 p-3 rounded-lg ${
                  item.name === 'Home' ? 'bg-green-700 text-white' : 'text-gray-700 hover:bg-gray-100 transition-colors'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.name}</span>
                {item.name === 'Audiences' && (
                  <span className="ml-auto text-sm text-gray-400">↗</span>
                )}
              </a>
            ))}
          </nav>
        </div>

        {/* Bottom section of the sidebar */}
        <div>
          <div className="p-3 mt-4 border-t border-gray-200 text-sm font-semibold text-gray-500">
            Edit
          </div>
          <nav className="space-y-1">
            {bottomNavItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.name}</span>
              </a>
            ))}
          </nav>
        </div>
      </aside>
      
    </div>
  );
}
