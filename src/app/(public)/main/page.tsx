"use client";
import React from 'react';
// The main component that defines the page layout.
export default function DynamicLayout() {
    return (
        <>
            {/* The main content container. Its left padding is adjusted to match the collapsed sidebar,
              and it has a transition to smoothly shift when the sidebar expands. */}
            <div className="flex flex-col min-h-screen pl-16 md:pl-20 group-hover:pl-64 bg-gray-100 font-sans transition-all duration-300">
                <div className="flex flex-1 gap-6 overflow-hidden">
                    <main className="flex-col overflow-y-auto flex">
                        <header className="h-16 bg-white shadow-md rounded-lg p-4">
                            <div className="container mx-auto h-full flex items-center">
                                <span className="font-bold text-xl text-gray-800">Your Website</span>
                            </div>
                        </header>
                        {/* Main Content Column (Pink in the image) */}
                        <section className="flex-1 bg-pink-200 rounded-lg p-6 mt-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Main Content Area</h2>
                            <p className="text-gray-600">
                                This is the primary area for your page&apos;s content. You can add your components here, such as a dashboard, a list of items, or a form. The `bg-pink-200` is for visual representation, matching your provided image.
                            </p>
                        </section>
                    </main>
                    {/* Right Column */}
                    <section className="w-64 bg-gray-300 rounded-lg p-4 hidden md:block">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Right Column</h3>
                        <p className="text-sm text-gray-600">
                            This area can be used for extra information, quick links, or a sidebar widget. It will be hidden on smaller screens.
                        </p>
                    </section>
                </div>
            </div>
        </>
    );
}
