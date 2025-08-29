"use client";
import Link from "next/link";
import React, { useState } from "react";
import Placeholder from "@/components/HomeComponents/Placeholder";


// Navigation configuration
const navItems = [
  { name: "Home" },
  { name: "Khalibre Platform" },
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
  { name: "Resources" },
  { name: "Company" },
  { name: "English", dropdown: ["English", "Khmer"] },
];

// Example content mapping
const pageContent: Record<string, React.ReactNode> = {
  Home: (
    <div className="bg-white p-10 rounded-xl shadow-md text-center space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">
        Helping organizations work energetically together for maximum impact
      </h2>
      <p className="text-lg text-gray-600">
        We achieve this through a capacity building platform for digital
        transformation.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <FeatureBox title="Digital acceleration accelerator" />
        <FeatureBox title="Engagement and communities" />
      </div>
    </div>
  ),
  "Khalibre Platform": (
    <Placeholder title="Khalibre Platform" text="Platform details here..." />
  ),
  Capabilities: (
    <div className="bg-white p-8 rounded-xl shadow-md">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">
        Digital Transformation Accelerator
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {navItems
          .find((item) => item.name === "Capabilities")
          ?.dropdown?.map((cap, i) => (
            <div
              key={i}
              className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <h3 className="text-lg font-semibold text-gray-800">{cap}</h3>
              <p className="text-sm text-gray-600">
                Short description for {cap}.
              </p>
            </div>
          ))}
      </div>
    </div>
  ),
  Resources: <Placeholder title="Resources" text="Knowledge base, docs..." />,
  Company: <Placeholder title="Company" text="About us content..." />,
  English: <Placeholder title="English" text="Language content..." />,
};

// Small reusable component for placeholder sections


// Small reusable component for feature boxes
function FeatureBox({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-40 h-40 bg-gray-200 rounded-lg flex items-center justify-center shadow-inner">
        <p className="text-gray-500 text-sm">Graph Placeholder</p>
      </div>
      <p className="mt-3 text-gray-700">{title}</p>
    </div>
  );
}

export default function App() {
  const [activeLink, setActiveLink] = useState("Home");
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-white shadow sticky top-0 z-50">
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
              <li key={item.name} className="relative group">
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

                {/* Dropdown menu */}
                {item.dropdown && (
                  <div className="absolute hidden group-hover:block mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black/10">
                    <div className="py-1">
                      {item.dropdown.map((sub, idx) => (
                        <a
                          key={idx}
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
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

      {/* Page content */}
      <main className="flex-grow max-w-7xl mx-auto px-6 py-10">
        {pageContent[activeLink]}
      </main>
    </div>
  );
}
