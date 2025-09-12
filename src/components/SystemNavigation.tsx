"use client";

import Link from "next/link";

export default function Navigation() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <span className="text-2xl md:text-3xl font-bold tracking-tight text-blue-700">
            Cloud
          </span>
        </Link>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 justify-center px-6">
          <input
            type="text"
            placeholder="Search for produce..."
            className="w-full max-w-md rounded-full border border-gray-200 bg-gray-100 px-4 py-2 text-sm md:text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-sm transition"
          />
        </div>

        {/* Nav Links */}
        <nav className="flex items-center space-x-6 text-sm md:text-base font-medium text-gray-600">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Add
          </Link>
          <Link href="/news" className="hover:text-blue-600 transition-colors">
            Edit
          </Link>
          <Link href="/product" className="hover:text-blue-600 transition-colors">
            Delete
          </Link>
          <Link href="/contact" className="hover:text-blue-600 transition-colors">
            Export
          </Link>
          <Link href="/company" className="hover:text-blue-600 transition-colors">
            Details
          </Link>
        </nav>
      </div>
    </header>
  );
}
