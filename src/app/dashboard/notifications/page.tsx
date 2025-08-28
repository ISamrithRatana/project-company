'use client';
import React, { useState } from 'react';

// Placeholder data for notifications
const initialNotifications = [
  {
    id: 1,
    message: 'Your order #12345 has been shipped and is on its way.',
    time: '2 hours ago',
    read: false,
  },
  {
    id: 2,
    message: 'Welcome to the World Peas dashboard! Explore new features.',
    time: 'Yesterday',
    read: true,
  },
  {
    id: 3,
    message: 'The new heirloom tomatoes are now in stock!',
    time: '2 days ago',
    read: false,
  },
  {
    id: 4,
    message: 'You have a new message in your inbox from Jane Smith.',
    time: '3 days ago',
    read: true,
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications);

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((n) => ({ ...n, read: true }))
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800 font-sans">
      <main className="container mx-auto p-6 md:p-12">
        <div className="flex items-end space-x-4 mb-8">
          <h1 className="text-4xl md:text-5xl font-serif font-light">Notifications</h1>
          <p className="text-lg text-gray-500">({notifications.filter(n => !n.read).length} unread)</p>
        </div>

        <div className="flex justify-end mb-4">
          <button
            onClick={markAllAsRead}
            className="text-sm text-green-700 hover:underline disabled:text-gray-400"
            disabled={notifications.every(n => n.read)}
          >
            Mark all as read
          </button>
        </div>

        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`flex items-start space-x-4 p-4 rounded-lg shadow-sm transition-colors ${
                notification.read ? 'bg-gray-100 text-gray-500' : 'bg-white text-gray-800 border border-green-200'
              }`}
            >
              <div className="flex-shrink-0 mt-1">
                {/* Placeholder for icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 ${notification.read ? 'text-gray-400' : 'text-green-700'}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <p className={`font-medium ${notification.read ? 'text-gray-500' : 'text-gray-800'}`}>
                  {notification.message}
                </p>
                <p className="text-xs mt-1 text-gray-400">{notification.time}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
