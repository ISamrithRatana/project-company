"use client";

export default function ActivityFeed() {
  const activities = [
    { id: 1, text: "Alice created a new report", time: "2h ago" },
    { id: 2, text: "Bob updated user permissions", time: "5h ago" },
    { id: 3, text: "Charlie deleted a file", time: "1d ago" },
    { id: 4, text: "System backup completed", time: "2d ago" },
  ];

  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow">
      <h2 className="text-lg font-bold mb-4">Recent Activity</h2>
      <ul className="space-y-3">
        {activities.map((a) => (
          <li
            key={a.id}
            className="flex items-center space-x-3 text-gray-300"
          >
            <div className="w-2 h-2 rounded-full bg-gray-500"></div>
            <span>{a.text}</span>
            <span className="text-sm text-gray-500 ml-auto">{a.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
