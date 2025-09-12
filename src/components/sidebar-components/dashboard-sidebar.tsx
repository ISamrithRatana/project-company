"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Navigation items
const navItems = [
  { name: "Home", href: "/home", icon: "🏠" },
  { name: "Notifications", href: "/dashboard", icon: "🔔" },
  { name: "Ads Manager", href: "/dashboard", icon: "📈" },
  { name: "Inbox", href: "/dashboard", icon: "💬" },
  { name: "Content", href: "/dashboard", icon: "📝" },
  { name: "Planner", href: "/dashboard", icon: "📅" },
  { name: "Ads", href: "/dashboard", icon: "📣" },
  { name: "Insights", href: "/dashboard", icon: "📊" },
  { name: "Audiences", href: "/dashboard", icon: "👥" },
  { name: "All tools", href: "/dashboard", icon: "🛠️" },
];

const bottomNavItems = [
  { name: "Search", href: "/dashboard", icon: "🔍" },
  { name: "Settings", href: "/dashboard", icon: "⚙️" },
  { name: "Help", href: "/dashboard", icon: "❓" },
];

// Reusable NavItem
interface NavItemProps {
  name: string;
  href: string;
  icon: string;
  isActive?: boolean;
}

function NavItem({ name, href, icon, isActive }: NavItemProps) {
  return (
    <Link
      href={href}
      className={`flex items-center space-x-3 p-3 rounded-lg text-sm font-medium transition-colors ${
        isActive
          ? "bg-green-700 text-white shadow-sm"
          : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      <span className="text-lg">{icon}</span>
      <span className="truncate">{name}</span>
      {name === "Audiences" && (
        <span className="ml-auto text-xs text-gray-400">↗</span>
      )}
    </Link>
  );
}

// Main Sidebar
export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex bg-gray-100">
      <aside className="w-64 bg-white shadow-lg flex flex-col justify-between h-screen">
        {/* Top Section */}
        <div className="flex flex-col h-full">
          {/* Logo / Account */}
          <div className="flex items-center space-x-2 p-4 border-b border-gray-200">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex-shrink-0"></div>
            <select className="flex-grow bg-transparent text-sm font-semibold focus:outline-none">
              <option>Home Internet, ...</option>
            </select>
          </div>

          {/* Main Navigation */}
          <nav className="mt-4 flex-1 overflow-y-auto px-2 space-y-1">
            {navItems.map((item) => (
              <NavItem
                key={item.name}
                {...item}
                isActive={pathname === item.href}
              />
            ))}
          </nav>
        </div>

        {/* Bottom Navigation */}
        <div className="px-2 py-4 border-t border-gray-200">
          <div className="mb-2 text-xs font-semibold text-gray-500">Edit</div>
          <nav className="space-y-1">
            {bottomNavItems.map((item) => (
              <NavItem
                key={item.name}
                {...item}
                isActive={pathname === item.href}
              />
            ))}
          </nav>
        </div>
      </aside>
    </div>
  );
}
