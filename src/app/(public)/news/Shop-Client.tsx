"use client";
import React, { useState } from "react";
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  price: string;
  unit: string;
  origin: string;
  path:string;
}


export default function ShopClient({ products }: { products: Product[] }) {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sort, setSort] = useState<"default" | "az">("default");

  const sortedProducts =
    sort === "az"
      ? [...products].sort((a, b) => a.name.localeCompare(b.name))
      : products;

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <main className="container mx-auto px-8 pt-10">
        {/* Controls */}
        <div className="flex items-end justify-between border-b border-gray-200 pb-4">
          <h2 className="text-5xl font-bold">Produce</h2>
          <div className="flex items-center space-x-2 ">
            <button className="border px-3 py-1 bg-emerald-100 rounded-full" onClick={() => { setSort("default"); setView("grid"); }}>
              Default
            </button>
            <button className="border px-3 py-1 bg-emerald-100 rounded-full"  onClick={() => setSort("az")}>A-Z</button>
            <button className="border px-3 py-1 bg-emerald-100 rounded-full"  onClick={() => setView("list")}>List view</button>
          </div>
        </div>

        {/* Product list */}
        <div
          className={
            view === "grid"
              ? "mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
              : "mt-8 flex flex-col space-y-4"
          }
        >

        {sortedProducts.map((product) => (
          <div key={product.id} className="rounded-3xl bg-white p-4 shadow-lg">
            <Image
              src={`${product.path}/${product.id}.png`} // Corrected template literal and added file extension (assuming .jpg)
              alt={product.name} // Added alt text for accessibility
              className="aspect-square w-full rounded-2xl bg-gray-200"
              width={500} // Added width and height for better image optimization
              height={500}
            />
            <div className="mt-4">
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="mt-1 text-lg font-medium text-green-700">{product.price} / {product.unit}</p>
              <p className="mt-2 text-sm text-gray-500">Grown in {product.origin}</p>
              <button className='bg-blue-500 text-white mt-4 px-4 w-full py-2 rounded-full'>
                Click
              </button>
            </div>
          </div>
        ))}
        </div>
      </main>
    </div>
  );
}
