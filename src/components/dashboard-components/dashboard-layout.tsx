"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Dashboard", href: "/" },
  { name: "Users", href: "/" },
  { name: "Reports", href: "/" },
  { name: "Settings", href: "/" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 flex flex-col p-4">
        {/* Logo */}
        <h1 className="text-2xl font-bold mb-6">MyApp</h1>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={`/${item.href}`}
              className={`block px-3 py-2 rounded-lg transition ${
                pathname === item.href
                  ? "bg-gray-700 text-white font-semibold"
                  : "text-gray-400 hover:bg-gray-700 hover:text-white"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Sidebar button */}
        <button className="mt-6 bg-gray-700 hover:bg-gray-600 py-2 rounded-lg">
          + New Item
        </button>
      </aside>

      {/* Main section */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="flex items-center justify-between bg-gray-800 px-6 py-4 shadow">
          {/* Left controls */}
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Search..."
              className="px-3 py-1 rounded bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none"
            />
            <button className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded">
              Filter
            </button>
          </div>

          {/* Center logo / title */}
          <div className="text-xl font-bold">Dashboard</div>

          {/* Right icons */}
          <div className="flex items-center space-x-3">
            <button className="w-8 h-8 rounded-full bg-gray-700"></button>
            <button className="w-8 h-8 rounded-full bg-gray-700"></button>
            <button className="w-8 h-8 rounded-full bg-gray-700"></button>
            <button className="w-8 h-8 rounded-full bg-gray-700"></button>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 bg-gray-700 p-6 overflow-auto rounded-t-xl space-y-6">
          {children}
        </main>
      </div>
    </div>
  );
}
