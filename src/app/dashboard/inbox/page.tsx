"use client";
import React, { useState } from "react";
import Link from "next/link";

// Placeholder data for messages
const messages = [
  {
    id: 1,
    sender: "John Doe",
    subject: "New order notification",
    snippet: "Your order #12345 has been shipped...",
    date: "10:30 AM",
    read: false,
    content:
      "Hi, just a quick update! Your order #12345 has been shipped and is on its way. You can track your package using the link below...",
  },
  {
    id: 2,
    sender: "World Peas Team",
    subject: "Welcome to the dashboard!",
    snippet: "Explore new features and tools to manage...",
    date: "Yesterday",
    read: true,
    content:
      "Welcome to the new and improved World Peas dashboard! We have added new features to help you manage your content more efficiently...",
  },
  {
    id: 3,
    sender: "Jane Smith",
    subject: "Question about an item",
    snippet: "I have a question about the organic ginger...",
    date: "3 days ago",
    read: false,
    content:
      "Hello, I was wondering about the origin of your organic ginger. Is it locally sourced? Thanks!",
  },
];

export default function InboxPage() {
  const [selectedMessage, setSelectedMessage] = useState(messages[0]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-gray-200 sticky top-0 bg-white z-10">
        <div className="flex items-center space-x-6">
          <Link href="/" className="text-xl font-bold">
            World Peas
          </Link>
          <nav className="hidden md:flex space-x-4">
            <Link href="/shop" className="hover:text-gray-600">
              Shop
            </Link>
            <Link href="/" className="hover:text-gray-600">
              Newsstand
            </Link>
            <Link href="/" className="hover:text-gray-600">
              Who we are
            </Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/" className="hover:text-gray-600">
            My profile
          </Link>
          <Link
            href="/"
            className="bg-green-700 text-white px-4 py-2 rounded-lg transition-colors hover:bg-green-600"
          >
            Basket (3)
          </Link>
        </div>
      </header>

      <main className="container mx-auto p-6 md:p-12">
        <h1 className="text-4xl md:text-5xl font-serif font-light mb-8">
          Inbox
        </h1>

        <div className="flex flex-col lg:flex-row bg-white rounded-lg shadow-sm border border-gray-200 min-h-[60vh]">
          {/* Message List Sidebar */}
          <div className="w-full lg:w-1/3 border-r border-gray-200 overflow-y-auto">
            <div className="p-4 border-b border-gray-200 font-semibold text-lg">
              Messages
            </div>
            <ul>
              {messages.map((message) => (
                <li
                  key={message.id}
                  onClick={() => setSelectedMessage(message)}
                  className={`relative p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors ${
                    selectedMessage.id === message.id ? "bg-gray-100" : ""
                  }`}
                >
                  <p
                    className={`font-semibold ${
                      message.read ? "text-gray-500" : "text-gray-800"
                    }`}
                  >
                    {message.sender}
                  </p>
                  <p className="text-sm font-medium">{message.subject}</p>
                  <p className="text-xs text-gray-500 truncate">{message.snippet}</p>
                  <span className="absolute top-4 right-4 text-xs text-gray-500">
                    {message.date}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Message Content Panel */}
          <div className="flex-1 p-6 overflow-y-auto">
            {selectedMessage ? (
              <div>
                <h2 className="text-2xl font-bold mb-2">{selectedMessage.subject}</h2>
                <div className="flex items-center space-x-3 text-sm text-gray-600 mb-6">
                  <span className="font-semibold">{selectedMessage.sender}</span>
                  <span>-</span>
                  <span>{selectedMessage.date}</span>
                </div>
                <p className="text-gray-700 leading-relaxed">{selectedMessage.content}</p>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <p>Select a message to read.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
