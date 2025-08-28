"use client";
import React, { useState } from 'react';

// Placeholder data for news/post items
const newsItems = [
  { id: 1, title: 'New Harvest of Organic Kale', date: '2023-10-26', description: 'We have a fresh batch of organic kale, harvested this morning from our local farms. Get it while it\'s crisp and green!' },
  { id: 2, title: 'Tips for a Sustainable Kitchen', date: '2023-10-25', description: 'Learn how to reduce food waste and make your kitchen more eco-friendly with these simple tips.' },
  { id: 3, title: 'Meet Our Farmer of the Month', date: '2023-10-24', description: 'This month, we are highlighting Sarah, who has been growing our delicious carrots for over 10 years.' },
  { id: 4, title: 'Holiday Recipes with a Twist', date: '2023-10-23', description: 'Prepare for the holidays with these unique and healthy recipes featuring our fresh produce.' },
  { id: 5, title: 'Why Seasonal Eating Matters', date: '2023-10-22', description: 'Eating seasonally is not only better for the environment but also for your health. Find out why.' },
  { id: 6, title: 'Behind the Scenes at World Peas', date: '2023-10-21', description: 'Take a peek at how we grow and prepare our produce before it gets to your basket.' },
];

export default function NewsAndPostsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');

  const filteredItems = newsItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = filterDate ? item.date === filterDate : true;
    return matchesSearch && matchesDate;
  });

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">

      <main className="container mx-auto p-6 md:p-12">


        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0 sm:space-x-4">
        <h1 className="text-2xl font-bold mb-6">News and Posts</h1>
        <div className='flex items-center space-x-4'>
          <input
            type="text"
            placeholder="Search posts..."
            className="w-full sm:w-auto px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <input
            type="date"
            className="w-full sm:w-auto px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          /></div>
        </div>
        
        {/* Grid of news/post cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              {/* Image Placeholder */}
              <div className="w-full h-40 bg-gray-300 rounded-lg mb-4"></div>
              
              {/* Content */}
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.date}</p>
                <p className="text-sm text-gray-700">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
