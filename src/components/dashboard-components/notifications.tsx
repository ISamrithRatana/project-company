"use client";

export default function Notifications() {
  const notifications = [
    { id: 1, text: "New user signed up", time: "5m ago" },
    { id: 2, text: "Database backup completed", time: "1h ago" },
    { id: 3, text: "Server restarted", time: "3h ago" },
    { id: 4, text: "New message from support", time: "1d ago" },
  ];

  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow">
      <h2 className="text-lg font-bold mb-4">Notifications</h2>
      <ul className="space-y-3">
        {notifications.map((n) => (
          <li
            key={n.id}
            className="flex items-center justify-between p-2 rounded-lg bg-gray-700 text-gray-200"
          >
            <span>{n.text}</span>
            <span className="text-sm text-gray-400">{n.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
