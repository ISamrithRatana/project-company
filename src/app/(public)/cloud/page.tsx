"use client";
import React, { useState } from 'react';

// Placeholder data for the file list
const files = [
  { name: 'java.doc', modified: 'May 13', fileSize: '<> items', sharing: 'Private' },
  { name: 'Kotlin', modified: 'May 17', fileSize: '1 item', sharing: 'Private' },
  { name: 'Lesson_Metfone', modified: 'September 9, 2...', fileSize: '37 items', sharing: 'Private' },
  { name: 'linux', modified: 'December 4, 20...', fileSize: '39 items', sharing: 'Private' },
  { name: 'PHPCode', modified: 'May 15', fileSize: '2 items', sharing: 'Private' },
  { name: 'PyCode', modified: 'May 15', fileSize: '26 items', sharing: 'Private' },
  { name: 'Ratana', modified: 'May 22, 2024', fileSize: '1 item', sharing: 'Private' },
  { name: 'Scans', modified: 'December 12, 2...', fileSize: '1 item', sharing: 'Private' },
];

export default function CloudServicePage() {
  const [activeTab, setActiveTab] = useState('My files');
  const [sortOrder, setSortOrder] = useState('Name');

  const handleSort = (key: keyof typeof files[0]) => {
    setSortOrder(key);
    // Add sorting logic here if needed
    console.log(`Sorting by: ${key}`);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white shadow-lg flex flex-col justify-between">
        <div className="p-4">
          <div className="flex items-center justify-between pb-4 border-b border-gray-200 mb-4">
            <span className="font-bold text-xl">OneDrive</span>
            <button className="text-gray-500 hover:text-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          
          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-full font-semibold flex items-center justify-center space-x-2 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            <span>Create or upload</span>
          </button>
          
          <nav className="space-y-1">
            {['Home', 'My files', 'Photos', 'Shared', 'Recycle bin'].map(item => (
              <a
                key={item}
                href="#"
                onClick={() => setActiveTab(item)}
                className={`flex items-center space-x-3 p-3 rounded-lg ${
                  activeTab === item ? 'bg-blue-100 text-blue-800 font-semibold' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span>{item}</span>
              </a>
            ))}
          </nav>

          <div className="mt-8 border-t border-gray-200 pt-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <p className="text-gray-700">Storage</p>
              <button className="text-blue-600 hover:underline">Get more storage</button>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-red-500 h-2.5 rounded-full" style={{ width: '72%' }}></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              3.6 GB used of 5 GB (72%)
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8">
        {/* Search and Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">{activeTab}</h1>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Search everything"
              className="px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* File List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr >
                  {['Name', 'Modified', 'File size', 'Sharing'].map(header => (
                    <th
                      key={header}
                      onClick={() => handleSort(header as keyof typeof files[0])}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {files.map((file, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {file.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {file.modified}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {file.fileSize}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {file.sharing}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
