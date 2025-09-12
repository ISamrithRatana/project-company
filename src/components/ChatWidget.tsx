"use client";
import React, { useState } from "react";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: "bot" | "user"; text: string; time: string }[]>([
    { sender: "bot", text: "I&apos;m here to answer your Pre-sales, License & Customisation related queries for our templates.", time: "9:22 just now" },
  ]);
  const [input, setInput] = useState("");

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = () => {
    if (!input.trim()) return;

    const now = new Date();
    const time = now.getHours() + ":" + (now.getMinutes() < 10 ? "0" : "") + now.getMinutes();

    setMessages([...messages, { sender: "user", text: input, time }]);
    setInput("");
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-sans">
      {/* Main chat window */}
      <div
        className={`bg-white rounded-lg shadow-xl border border-gray-200 w-80 overflow-hidden transition-all duration-300 ease-in-out transform ${
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
        }`}
      >
        {/* Chat header */}
        <div className="flex items-center justify-between p-4 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-blue-500"></div>
            <div>
              <p className="font-semibold text-sm">Hi there,</p>
              <p className="text-xs text-gray-500">I&apos;m Abhi from ThemeSelection.</p>
            </div>
          </div>
          <button onClick={toggleChat} className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Chat message area */}
        <div className="p-4 space-y-4 text-sm h-64 overflow-y-auto">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-lg text-gray-700 ${msg.sender === "user" ? "bg-green-100 text-green-800 ml-auto w-fit" : "bg-gray-100"}`}
            >
              {msg.text}
              <br />
              <span className="text-xs text-gray-500">{msg.time}</span>
            </div>
          ))}
        </div>

        {/* Chat input area */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-grow p-2 rounded-md text-gray-600 placeholder:text-gray-600 border border-gray-300 focus:ring-green-700 focus:border-green-700 transition-colors"
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="p-2 bg-green-700 text-white rounded-md hover:bg-green-800 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Floating button */}
      <button
        onClick={toggleChat}
        className={`w-40 h-14 mt-4 bg-green-700 text-white rounded-full shadow-lg flex items-center justify-center transition-transform duration-300 ease-in-out transform hover:scale-110 ${
          isOpen ? "hidden" : ""
        }`}
      >
        Contact
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 pl-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>
    </div>
  );
}
