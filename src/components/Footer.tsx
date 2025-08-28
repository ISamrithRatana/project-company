"use client";
export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-600 font-sans p-8 md:p-12 mt-12 rounded-t-xl">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand and Mission Statement */}
        <div>
          <h3 className="text-2xl font-bold tracking-tight text-green-700 mb-4">World Peas</h3>
          <p className="text-sm">
            We're farmers, purveyors, and eaters of organically grown food. We believe
            in transparency, sustainability, and deliciousness.
          </p>
        </div>

        {/* Shop Links */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-3">Shop</h4>
          <nav className="flex flex-col space-y-2 text-sm">
            <a href="/shop" className="hover:text-green-700 transition-colors">All Produce</a>
            <a href="#" className="hover:text-green-700 transition-colors">Seasonal</a>
            <a href="#" className="hover:text-green-700 transition-colors">Wholesale</a>
          </nav>
        </div>

        {/* Company Links */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-3">Company</h4>
          <nav className="flex flex-col space-y-2 text-sm">
            <a href="/who-we-are" className="hover:text-green-700 transition-colors">About Us</a>
            <a href="#" className="hover:text-green-700 transition-colors">Our Farms</a>
            <a href="#" className="hover:text-green-700 transition-colors">Careers</a>
            <a href="/newsstand" className="hover:text-green-700 transition-colors">Newsstand</a>
          </nav>
        </div>

        {/* Newsletter Signup */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-3">Stay in the loop</h4>
          <p className="text-sm mb-4">
            Get updates on new products and special offers.
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full rounded-l-full border border-gray-300 bg-white px-4 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-700"
            />
            <button className="rounded-r-full bg-green-700 px-6 py-2 text-sm font-semibold text-white hover:bg-green-800 transition-colors ">
              Sign Up
            </button>
          </div>
        </div>
      </div>

      {/* Footer bottom section with copyright and social links */}
      <div className="container mx-auto mt-8 pt-6 border-t border-gray-300 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} World Peas. All rights reserved.</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="#" className="hover:text-green-700 transition-colors">Twitter</a>
          <a href="#" className="hover:text-green-700 transition-colors">Instagram</a>
          <a href="#" className="hover:text-green-700 transition-colors">Facebook</a>
        </div>
      </div>
    </footer>
  );
}
