// ContactUs.tsx
// This component creates a contact page with a two-column layout,
// featuring contact information and a "fill up the form" section,
// based on the provided image.
export default function ContactUs() {
  return (
      <main className="container mx-auto p-6 md:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left section: Contact information */}
          <div className="p-4">
            <h1 className="text-4xl md:text-5xl font-serif font-light mb-2">Coverage</h1>
            <p className="text-gray-600 mb-8">
              Handles customer inquiries and information management.
            </p>

            <div className="space-y-8">
              {/* Office Address */}
              <div className="flex items-start space-x-4">
                {/* Placeholder for location icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <h3 className="font-bold text-lg">Our Office Address</h3>
                  <p className="text-sm text-gray-600">
                    Building No. 199, Mao Tse Toung Bldv. (St.245), Sangkat Toul Svay Prey 2, Khan Boeung Keng Kang, Phnom Penh, Kingdom of Cambodia.
                  </p>
                </div>
              </div>

              {/* Call Us */}
              <div className="flex items-start space-x-4">
                {/* Placeholder for phone icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <h3 className="font-bold text-lg">Call Us Anytime</h3>
                  <p className="text-sm text-gray-600">
                    +855 979007097
                  </p>
                </div>
              </div>

              {/* Send an email */}
              <div className="flex items-start space-x-4">
                {/* Placeholder for email icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <h3 className="font-bold text-lg">Send An Email</h3>
                  <p className="text-sm text-gray-600">
                    info_customercare@metfone.com.kh / pr.vtz@metfone.com.kh
                  </p>
                </div>
              </div>

              {/* Social links */}
              <div className="flex items-start space-x-4">
                {/* Placeholder for social icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <div>
                  <h3 className="font-bold text-lg">Social</h3>
                  <div className="flex space-x-4 mt-2">
                    {/* Placeholders for social media icons */}
                    <div className="w-8 h-8 rounded-full bg-red-600"></div>
                    <div className="w-8 h-8 rounded-full bg-red-600"></div>
                    <div className="w-8 h-8 rounded-full bg-red-600"></div>
                    <div className="w-8 h-8 rounded-full bg-red-600"></div>
                    <div className="w-8 h-8 rounded-full bg-red-600"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right section: Contact form */}
          <div className="p-6 md:p-8 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold mb-2">Fill Up The Form</h2>
            <p className="text-sm text-gray-500 mb-6">
              Your email address will not be published. Required fields are marked *
            </p>

            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="text-gray-600">Your Name*</label>
                <input
                  type="text"
                  id="name"
                  className="w-full mt-1 p-2 rounded border border-gray-300 focus:ring-2 focus:ring-red-600 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="email" className="text-gray-600">Email Address*</label>
                <input
                  type="email"
                  id="email"
                  className="w-full mt-1 p-2 rounded border border-gray-300 focus:ring-2 focus:ring-red-600 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="message" className="text-gray-600">Enter Your Message Here</label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full mt-1 p-2 rounded border border-gray-300 focus:ring-2 focus:ring-red-600 focus:border-transparent"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-700 transition-colors"
              >
                Get In Touch
              </button>
            </form>
          </div>
        </div>
      </main>
  );
}
