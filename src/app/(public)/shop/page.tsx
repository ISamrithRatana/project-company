"use client";
import React from 'react';

export default function App() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="container mx-auto pt-10 pb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
          Fresh Produce for a Healthy Life
        </h1>
        <p className="text-lg text-gray-600 text-center mb-12">
          Discover a world of fresh, organic, and delicious produce delivered
          right to your door.
        </p>

        {/* Example content section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center">
            <span className="text-6xl mb-4" role="img" aria-label="Apple">🍎</span>
            <h2 className="text-2xl font-semibold text-green-700 mb-2">Crisp Apples</h2>
            <p className="text-gray-600">
              Freshly picked from the orchard, perfect for a healthy snack.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center">
            <span className="text-6xl mb-4" role="img" aria-label="Carrot">🥕</span>
            <h2 className="text-2xl font-semibold text-green-700 mb-2">Organic Carrots</h2>
            <p className="text-gray-600">
              Sweet and crunchy, ideal for cooking or juicing.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center">
            <span className="text-6xl mb-4" role="img" aria-label="Broccoli">🥦</span>
            <h2 className="text-2xl font-semibold text-green-700 mb-2">Nutrient-rich Broccoli</h2>
            <p className="text-gray-600">
              A superfood packed with vitamins for your wellness.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center">
            <span className="text-6xl mb-4" role="img" aria-label="Grape">🍇</span>
            <h2 className="text-2xl font-semibold text-green-700 mb-2">Juicy Grapes</h2>
            <p className="text-gray-600">
              Seedless and sweet, great for snacking or desserts.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center">
            <span className="text-6xl mb-4" role="img" aria-label="Avocado">🥑</span>
            <h2 className="text-2xl font-semibold text-green-700 mb-2">Creamy Avocados</h2>
            <p className="text-gray-600">
              A must-have for salads, toasts, and smoothies.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center">
            <span className="text-6xl mb-4" role="img" aria-label="Strawberry">🍓</span>
            <h2 className="text-2xl font-semibold text-green-700 mb-2">Sweet Strawberries</h2>
            <p className="text-gray-600">
              Bursting with flavor, perfect for any treat.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}