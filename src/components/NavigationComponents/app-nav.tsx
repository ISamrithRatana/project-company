"use client";
import Link from "next/link";

export default function Navigation() {
  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-3xl font-extrabold tracking-tight text-green-700"
        >
          World Peas
        </Link>

        {/* Search bar */}
        <div className="flex max-w-md flex-1 mx-8">
          <input
            type="text"
            placeholder="Search for produce..."
            className="w-full rounded-l-full border border-gray-300 bg-gray-50 px-4 py-2 text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-700 transition-colors"
          />
          <button className="rounded-r-full bg-green-700 px-5 py-2 text-sm font-semibold text-white hover:bg-green-800 transition-colors">
            Search
          </button>
        </div>

        {/* Navigation links */}
        <nav className="flex items-center space-x-8 text-base font-medium">
          <Link
            href="/"
            className="text-gray-700 hover:text-green-700 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/news"
            className="text-gray-700 hover:text-green-700 transition-colors"
          >
            News
          </Link>
          <Link
            href="/shop"
            className="text-gray-700 hover:text-green-700 transition-colors"
          >
            Shop
          </Link>
          <Link
            href="/contact"
            className="text-gray-700 hover:text-green-700 transition-colors"
          >
            Contact Us
          </Link>
          <Link
            href="/company"
            className="text-gray-700 hover:text-green-700 transition-colors"
          >
            Company
          </Link>
          <Link
            href="/login"
            className="rounded-full bg-green-700 px-6 py-2 text-white font-semibold shadow-sm hover:bg-green-800 transition-colors"
          >
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
}
