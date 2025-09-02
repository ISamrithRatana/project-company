"use client";
import Link from "next/link";
import Image from "next/image";

export default function Navigation() {
  return (
    <header className="sticky top-0 left-0 right-0 z-50 w-full flex items-center justify-between bg-white px-8 py-4 shadow-sm">
      <Link href="/" className="flex items-center space-x-2">
        <span className="text-3xl font-bold tracking-tight">Cloud</span>
      </Link>

      {/* Search bar in the middle */}
      <div className="flex max-w-md mx-8 ">
        <input
          type="text"
          placeholder="Search for produce..."
          className="w-full rounded-full border border-gray-300 bg-gray-100 px-4 py-2 text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-700 transition-colors"
        />
      </div>

      {/* Navigation links and basket button on the right */}
      <div className="flex items-center space-x-8 text-lg font-medium text-gray-600">
        <nav className="flex items-center space-x-8">
          <Link href="/" className="hover:text-blue-500">Add</Link>
          <Link href="/news" className="hover:text-blue-500">Edit</Link>
          <Link href="/product" className="hover:text-blue-500">Delete</Link>
          <Link href="/contact" className="hover:text-blue-500">Export</Link>
          <Link href="/company" className="hover:text-blue-500">Details</Link>
        </nav>
      </div>
    </header>
  );
}
