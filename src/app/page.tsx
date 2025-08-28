"use client";
import { useState } from 'react';
import StayConnected from '@/components/StayConnected';
import Navigation from '@/components/Navigation/AppNavigation';

// It uses Tailwind CSS for styling. The Link component from Next.js has been
// replaced with a standard <a> tag to fix a compilation error.
export default function Homepage() {
  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      <Navigation />
      {/* Header section, consistent with the product page
      <header className="flex items-center justify-between p-4 border-b border-gray-200 sticky top-0 bg-white z-10">
        <div className="flex items-center space-x-6">
          <a href="/" className="text-xl font-bold">World Peas</a>
          <nav className="hidden md:flex space-x-4">
            <a href="/shop" className="hover:text-gray-600">Shop</a>
            <a href="/newsstand" className="hover:text-gray-600">Newsstand</a>
            <a href="/who-we-are" className="hover:text-gray-600">Who we are</a>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <a href="/my-profile" className="hover:text-gray-600">My profile</a>
          <a href="/basket" className="bg-green-700 text-white px-4 py-2 rounded-lg transition-colors hover:bg-green-600">Basket (3)</a>
        </div>
      </header> */}

      <main>
        {/* Hero section with the main tagline and a button */}

        <section className="flex flex-col items-center justify-center text-center p-8 md:p-24 bg-gray-50">
          <h1 className="text-4xl md:text-6xl font-serif font-light leading-tight max-w-4xl">
            We're farmers, purveyors, and eaters of organically grown food.
          </h1>
          <a href="/shop" className="mt-8 px-6 py-3 bg-green-700 text-white rounded-lg text-lg transition-colors hover:bg-green-600">
            Browse our shop
          </a>
        </section>

        {/* Section with two placeholder divs and a quote */}
        <section className="container mx-auto p-6 md:p-12 lg:flex lg:space-x-8 items-end">
          <div className="w-full lg:w-1/2 h-[50vh] bg-gray-300 rounded-lg shadow-md mb-6 lg:mb-0">
            {/* Placeholder for the first image */}
          </div>
          <div className="w-full lg:w-1/2 flex flex-col justify-end">
            <div className="w-full h-[50vh] bg-gray-300 rounded-lg shadow-md mb-4">
              {/* Placeholder for the second image */}
            </div>
            <p className="text-sm text-gray-500 text-right">
              Central California — The person who grew these was located in Central California and, ahem, hopefully very well-compensated.
            </p>
          </div>
        </section>

        {/* What We Believe section with text content */}
        <section className="container mx-auto p-6 md:p-12 grid md:grid-cols-2 gap-8 lg:gap-16 mt-12 border-t border-gray-200 pt-8">
          <div className="flex items-start">
            <h2 className="text-sm font-semibold text-gray-400">WHAT WE BELIEVE</h2>
          </div>
          <div className="text-lg space-y-6">
            <p>
              We believe in produce. Tasty produce. Produce like:
            </p>
            <p>
              Apples. Oranges. Limes. Lemons. Guavas. Carrots. Cucumbers. Jicamas. Cauliflowers. Brussels sprouts. Shallots. Japanese eggplants. Asparagus. Artichokes—Jerusalem artichokes, too. Radishes. Broccoli. Baby broccoli. Broccolini. Bok choy. Scallions. Ginger. Cherries. Raspberries. Cilantro. Parsley. Dill.
            </p>
            <p className="font-bold">
              What are we forgetting?
            </p>
            <p>
              Oh! Onions. Yams. Avocados. Lettuce. Arugula (to some, “rocket”). Persian cucumbers, in addition to aforementioned “normal” cucumbers. Artichokes. Zucchinis. Pumpkins. Squash (what about butternut, tall pumpkins). Sweet potatoes and potato-potatoes. Jackfruit. Monk fruit. Fruit of the Loom. Fruits of our labor, this website! Sorry. Pineapple. Mango. Gooseberries. Blackberries. Tomatoes. Heirloom tomatoes. Beets. Chives. Corn. Endive. Escarole, which, we swear, we’re vendors of organic produce, but if you asked us to describe what escaroles are...
            </p>
          </div>
        </section>
      </main>
      <StayConnected />
    </div>
  );
}
