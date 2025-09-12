"use client";

export default function DataTable() {
  const data = [
    { id: 1, name: "Alice", role: "Admin", status: "Active" },
    { id: 2, name: "Bob", role: "User", status: "Inactive" },
    { id: 3, name: "Charlie", role: "Manager", status: "Active" },
  ];

  return (
    <div className="bg-gray-800 rounded-lg shadow p-4">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-gray-400 border-b border-gray-600">
            <th className="p-3">Name</th>
            <th className="p-3">Role</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr
              key={row.id}
              className="hover:bg-gray-700 transition text-gray-100"
            >
              <td className="p-3">{row.name}</td>
              <td className="p-3">{row.role}</td>
              <td className="p-3">{row.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
