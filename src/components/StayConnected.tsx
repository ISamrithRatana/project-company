
export default function StayConnected() {
  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      <main className="container mx-auto p-6 md:p-12">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-12">
          Stay connected<br />
          your way
        </h1>

        <div className="flex flex-col lg:flex-row lg:space-x-8">
          {/* Left section: Metfone SIM promotion */}
          <div className="lg:w-1/2 p-6 md:p-8 rounded-lg  border-gray-200">
            <div className="flex items-center space-x-4 mb-4">
              {/* Placeholder for the SIM card icon */}
              <div className="w-10 h-10 bg-red-600 rounded-full"></div>
              <h2 className="text-2xl font-bold">Metfone SIM</h2>
            </div>
            <p className="text-gray-600 mb-6">
              Unlock endless connections with your Metfone SIM today
            </p>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start space-x-3">
                {/* Placeholder for the checkmark icon */}
                <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center">
                  &#10003;
                </div>
                <p>Broad coverage, strong signal wherever you go.</p>
              </li>
              <li className="flex items-start space-x-3">
                {/* Placeholder for the checkmark icon */}
                <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center">
                  &#10003;
                </div>
                <p>Easy to get, easy to active.</p>
              </li>
            </ul>

            <button className="bg-red-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-red-700 transition-colors">
              Learn more
            </button>
          </div>
          
          {/* Right section: Promotional image placeholder */}
          <div className="lg:w-1/2 mt-8 lg:mt-0">
            <div className="w-full h-96 md:h-[320px] bg-gray-300 rounded-lg">
              {/* Placeholder for the image of the woman with luggage */}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
