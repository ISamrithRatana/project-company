"use client";
import React, { useState } from 'react';
const products = [
  {
    id: 1,
    name: 'Heirloom tomato',
    price: '$5.99',
    unit: 'lb',
    origin: 'San Juan Capistrano, CA'
  },
  {
    id: 2,
    name: 'Organic ginger',
    price: '$12.99',
    unit: 'lb',
    origin: 'Huntington Beach, CA'
  },
  {
    id: 3,
    name: 'Organic lemon',
    price: '$2.99',
    unit: 'lb',
    origin: 'Oxnard, CA'
  },
  {
    id: 4,
    name: 'Fresh basil',
    price: '$3.50',
    unit: 'bunch',
    origin: 'Santa Maria, CA'
  },
  {
    id: 5,
    name: 'Red potatoes',
    price: '$4.25',
    unit: 'lb',
    origin: 'Bakersfield, CA'
  },
  {
    id: 6,
    name: 'Yellow onion',
    price: '$1.99',
    unit: 'lb',
    origin: 'Holtville, CA'
  }
];

// This is the main component for the page.
export default function Shop() {
  const [view, setView] = useState('grid'); // State to toggle between grid and list view

  // The main container for the entire page.
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      {/* Main content area */}
      <main className="container mx-auto px-8 pt-10">
        {/* Produce section header */}
        <div className="flex items-end justify-between border-b border-gray-200 pb-4">
          <div className="flex items-center space-x-4">
            <h2 className="text-5xl font-bold tracking-tight">Produce</h2>
            <div className="text-lg text-gray-500">Fresh — August 21, 2023</div>
          </div>

          {/* View options and sorting */}
          <div className="flex items-center space-x-2">
            <button className="rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-100">
              Default
            </button>
            <button className="rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-100">
              A-Z
            </button>
            <button className="rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-100">
              List view
            </button>
          </div>
        </div>

        {/* Product grid */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map(product => (
            <div key={product.id} className="rounded-3xl bg-white p-4 shadow-lg">
              {/* Blank div placeholder for the image */}
              <div className="aspect-square w-full rounded-2xl bg-gray-200"></div>
              <div className="mt-4">
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p className="mt-1 text-lg font-medium text-green-700">{product.price} / {product.unit}</p>
                <p className="mt-2 text-sm text-gray-500">Grown in {product.origin}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
