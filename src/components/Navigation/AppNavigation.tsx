//  component for the application

import Link from "next/link";

export default function Navigation() {
  return (
    <header className="fixed top-0 left-0 right-0 z-100 flex items-center justify-between bg-white px-8 py-4 shadow-sm">
      {/* Brand logo on the left */}
      <a href="/" className="text-3xl font-bold tracking-tight text-green-700">World Peas</a>

      {/* Search bar in the middle */}
      <div className="flex max-w-md mx-8 ">
        <input
          type="text"
          placeholder="Search for produce..."
          className="w-full rounded-l-full border border-gray-300 bg-gray-100 px-4 py-2 text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-700 transition-colors"
        />
        <button className="rounded-r-full bg-green-700 px-4 py-2 text-sm font-semibold text-white hover:bg-green-800 transition-colors">
              Search
        </button>
      </div>

      {/* Navigation links and basket button on the right */}
      <div className="flex items-center space-x-8 text-lg font-medium text-gray-600">
        <nav className="flex items-center space-x-8">
          <Link href="/" className="hover:text-green-700">Home</Link>
          <Link href="/news" className="hover:text-green-700">News</Link>
          <Link href="/product" className="hover:text-green-700">Product</Link>
          <Link href="/contact" className="hover:text-green-700">Contact Us</Link>
          <Link href="/about" className="hover:text-green-700">About Us</Link>
        </nav>
        <Link href="/login" className="rounded-full bg-green-700 px-6 py-2 font-semibold text-white shadow-md hover:bg-green-800 transition-colors">
          Login
        </Link>
      </div>
    </header>
  );
}
