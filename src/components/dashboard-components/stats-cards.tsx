"use client";

export default function StatsCards() {
  const stats = [
    { title: "Users", value: "1,250" },
    { title: "Sales", value: "$23,400" },
    { title: "Reports", value: "145" },
    { title: "Errors", value: "12" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="bg-gray-800 rounded-lg p-4 shadow text-center"
        >
          <div className="text-2xl font-bold">{stat.value}</div>
          <div className="text-gray-400">{stat.title}</div>
        </div>
      ))}
    </div>
  );
}
