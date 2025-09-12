"use client";
import React from 'react';
import Link from 'next/link';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      {/* Header section */}
      <header className="flex items-center justify-between p-4 border-b border-gray-200 sticky top-0 bg-white z-10">
        <div className="flex items-center space-x-6">
          <Link href="/" className="text-xl font-bold">World Peas</Link>
          <nav className="hidden md:flex space-x-4">
            <Link href="/shop" className="hover:text-gray-600">Shop</Link>
            <Link href="/" className="hover:text-gray-600">Newsstand</Link>
            <Link href="/dashboard/manage" className="hover:text-gray-600">Manage</Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/" className="hover:text-gray-600">My profile</Link>
          <Link href="/" className="bg-green-700 text-white px-4 py-2 rounded-lg transition-colors hover:bg-green-600">
            Basket (3)
          </Link>
        </div>
      </header>

      <main className="container mx-auto p-6 md:p-12">
        <h1 className="text-4xl md:text-5xl font-serif font-light mb-8">
          Welcome back, Jane Doe
        </h1>
        
        {/* Dashboard sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Orders */}
          <div className="lg:col-span-2 bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-2xl font-semibold mb-4">Recent Orders</h2>
            <div className="space-y-4">
              <div className="p-4 bg-white rounded-lg border border-gray-200">
                <p className="font-bold">Order #12345</p>
                <p className="text-sm text-gray-600">Delivered on August 19, 2023</p>
              </div>
              <div className="p-4 bg-white rounded-lg border border-gray-200">
                <p className="font-bold">Order #12344</p>
                <p className="text-sm text-gray-600">Delivered on August 15, 2023</p>
              </div>
            </div>
            <Link href="#" className="mt-4 inline-block text-green-700 hover:underline">View all orders</Link>
          </div>

          {/* Account Information */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-2xl font-semibold mb-4">Account Information</h2>
            <div className="space-y-2 text-gray-700">
              <p><strong>Name:</strong> Jane Doe</p>
              <p><strong>Email:</strong> jane.doe@example.com</p>
              <p><strong>Address:</strong> 123 Farm Lane, Anyville, CA 90210</p>
            </div>
            <Link href="#" className="mt-4 inline-block text-green-700 hover:underline">Edit profile</Link>
          </div>
        </div>

        {/* Favorite Products */}
        <div className="mt-8 bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-2xl font-semibold mb-4">Your Favorites</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <div className="bg-white p-4 rounded-lg border border-gray-200 flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-gray-300 rounded-full mb-2"></div>
              <p className="font-bold">Heirloom tomato</p>
              <p className="text-sm text-gray-600">$5.99 / lb</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200 flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-gray-300 rounded-full mb-2"></div>
              <p className="font-bold">Organic ginger</p>
              <p className="text-sm text-gray-600">$12.99 / lb</p>
            </div>
          </div>
          <Link href="#" className="mt-4 inline-block text-green-700 hover:underline">Browse all products</Link>
        </div>
      </main>
    </div>
  );
}
