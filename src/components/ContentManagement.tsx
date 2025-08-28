"use client";
export default function ContentManagement() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      {/* Header section, consistent with other pages */}
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
      </header>

      <main className="container mx-auto p-6 md:p-12">
        <h1 className="text-4xl md:text-5xl font-serif font-light mb-8">
          Content
        </h1>

        {/* To-do list section */}
        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">To-do list</h2>
            <a href="#" className="text-sm text-green-700 hover:underline">See full plan</a>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Check unread messages, comments and other things that may require your attention.
          </p>
          
          <div className="bg-gray-100 p-4 rounded-lg border border-gray-200">
            <p className="font-bold">Weekly plan <span className="text-sm text-gray-500 font-normal">・ 2 days left</span></p>
            <p className="text-sm text-gray-600 mt-1 mb-4">
              Set your business up for success by completing recommended tasks.
            </p>
            <p className="font-semibold text-sm mb-2">Complete at least 5 tasks to finish this plan.</p>
            
            <div className="w-full bg-gray-300 h-2 rounded-full mb-4">
              <div className="bg-green-700 h-2 rounded-full" style={{ width: '14.28%' }}></div>
            </div>
            
            <p className="text-sm text-gray-500 mb-4">1 of 7 tasks completed</p>

            <div className="flex flex-wrap gap-4">
              <div className="bg-white p-3 rounded-lg border border-gray-300">
                <p className="text-sm font-semibold">Publish one story on Instagram</p>
                <span className="text-sm text-gray-500">0/1</span>
              </div>
              <div className="bg-white p-3 rounded-lg border border-gray-300">
                <p className="text-sm font-semibold">Publish 4 posts on Facebook</p>
                <span className="text-sm text-gray-500">2/6</span>
              </div>
              <div className="bg-white p-3 rounded-lg border border-gray-300">
                <p className="text-sm font-semibold">Publish one post on Instagram</p>
                <span className="text-sm text-gray-500">0/1</span>
              </div>
            </div>
          </div>
        </section>

        {/* Manage marketing content section */}
        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
          <h2 className="text-xl font-bold mb-2">Manage your marketing content</h2>
          <p className="text-sm text-gray-600 mb-6">
            Set your recent and upcoming posts, stories and ads, and schedule content to plan ahead.
          </p>
          
          <div className="bg-gray-100 p-4 rounded-lg border border-gray-200">
            <h3 className="text-lg font-bold mb-2">Create an ad from your high-performing posts</h3>
            <p className="text-sm text-gray-600 mb-4">
              Edit the daily budget and goal to view estimated advertising results
            </p>
            
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-4">
              <div className="md:w-1/3">
                <p className="font-semibold text-sm">Ad goal</p>
                <button className="w-full mt-2 bg-white px-4 py-2 rounded-lg border border-gray-300 text-left">
                  Get more Page likes
                </button>
              </div>
              
              <div className="md:w-1/3">
                <div className="w-full h-32 bg-gray-300 rounded-lg">
                  {/* Placeholder for the ad image */}
                </div>
              </div>

              <div className="md:w-1/3">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">Jul 29, 2025, 8:36 AM</p>
                  <button className="text-sm text-green-700 hover:underline">Change post</button>
                </div>
                <p className="font-bold mt-1">Metfone WiFi</p>
                <p className="text-sm text-gray-600">
                  <span className="text-xs">...</span> Contact Me: http://...
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Add new content/product section */}
        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
          <h2 className="text-xl font-bold mb-2">Add New Content or Product</h2>
          <p className="text-sm text-gray-600 mb-6">
            Create new posts, products, or stories to share with your audience.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg border border-gray-200">
            <form className="space-y-4">
              <div>
                <label htmlFor="content-title" className="block text-sm font-semibold text-gray-700">Title</label>
                <input
                  type="text"
                  id="content-title"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-700 focus:ring-green-700"
                  placeholder="Enter a title"
                />
              </div>
              <div>
                <label htmlFor="content-description" className="block text-sm font-semibold text-gray-700">Description</label>
                <textarea
                  id="content-description"
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-700 focus:ring-green-700"
                  placeholder="Enter a description"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-green-700 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-800 transition-colors"
              >
                Create
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
