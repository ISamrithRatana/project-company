"use client";
import Link from "next/link";
import React, { useState } from "react";

// Navigation configuration (same as yours; shorten if you want)
const navItems = [
  {
    name: "Home",
    dropdown: [
      "Onboarding",
      "Compliance Training",
      "Portals/Sites",
      "Associations",
      "Certification and CPD",
      "Engagement & Personalized Learning",
      "Commerce",
      "People Management",
      "Sales & Cost-Efficient Training",
    ],
  },
  {
    name: "Khalibre Platform",
    dropdown: [
      "Onboarding",
      "Compliance Training",
      "Portals/Sites",
      "Associations",
      "Certification and CPD",
      "Engagement & Personalized Learning",
      "Commerce",
      "People Management",
      "Sales & Cost-Efficient Training",
    ],
  },
  {
    name: "Capabilities",
    dropdown: [
      "Onboarding",
      "Compliance Training",
      "Portals/Sites",
      "Associations",
      "Certification and CPD",
      "Engagement & Personalized Learning",
      "Commerce",
      "People Management",
      "Sales & Cost-Efficient Training",
    ],
  },
  {
    name: "Resources",
    dropdown: [
      "Onboarding",
      "Compliance Training",
      "Portals/Sites",
      "Associations",
      "Certification and CPD",
      "Engagement & Personalized Learning",
      "Commerce",
      "People Management",
      "Sales & Cost-Efficient Training",
    ],
  },
  {
    name: "Company",
    dropdown: [
      "Onboarding",
      "Compliance Training",
      "Portals/Sites",
      "Associations",
      "Certification and CPD",
      "Engagement & Personalized Learning",
      "Commerce",
      "People Management",
      "Sales & Cost-Efficient Training",
    ],
  },
  {
    name: "English",
    dropdown: [
      "Onboarding",
      "Compliance Training",
      "Portals/Sites",
      "Associations",
      "Certification and CPD",
      "Engagement & Personalized Learning",
      "Commerce",
      "People Management",
      "Sales & Cost-Efficient Training",
    ],
  },
];

export default function App() {
  const [activeLink, setActiveLink] = useState("Home");

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-white shadow sticky top-0 z-50 ">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-blue-600 text-white font-bold text-xl px-2 py-1 rounded-md">
              Khalibre
            </div>
            <span className="text-lg font-semibold text-gray-800">
              Capacity Building Platform
            </span>
          </div>

          {/* Navigation */}
          <ul className="flex space-x-6 items-center">
            {navItems.map((item) => (
              // IMPORTANT: remove `relative` here
              <li key={item.name} className="group">
                {/* Dropdown trigger or link */}
                {item.dropdown ? (
                  <button
                    className={`font-medium px-3 py-2 rounded-md transition-colors ${
                      activeLink === item.name
                        ? "text-blue-600"
                        : "text-gray-700 hover:text-blue-600"
                    }`}
                    onClick={() => setActiveLink(item.name)}
                  >
                    {item.name}
                    <svg
                      className="ml-1 inline h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                ) : (
                  <Link
                    href="#"
                    className={`font-medium px-3 py-2 rounded-md transition-colors ${
                      activeLink === item.name
                        ? "text-blue-600"
                        : "text-gray-700 hover:text-blue-600"
                    }`}
                    onClick={() => setActiveLink(item.name)}
                  >
                    {item.name}
                  </Link>
                )}

                {/* Full-width Dropdown menu anchored to the <nav> */}
                {item.dropdown && (
                  <div className="absolute left-0 right-0 hidden w-full group-hover:block bg-white shadow-lg ring-1 ring-black/10">
                    <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6">
                      {item.dropdown.map((sub, idx) => (
                        <a
                          key={idx}
                          href="#"
                          className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition"
                          onClick={() => setActiveLink(item.name)}
                        >
                          {sub}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
}
