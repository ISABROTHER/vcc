import { Search, Calendar, ChevronDown, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/7412067/pexels-photo-7412067.jpeg?auto=compress&cs=tinysrgb&w=1920)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/70 to-blue-900/50"></div>
      </div>

      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Discover Cape Coast
        </h1>
        <p className="text-xl md:text-2xl mb-12 text-blue-50">
          Where heritage meets the ocean. Experience Ghana's coastal gem.
        </p>

        {/* START: Improved Search Box */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-4 max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Dropdown Container */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full md:w-auto">
              {/* Month Dropdown */}
              <div className="relative w-full">
                <Calendar
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-700 pointer-events-none"
                />
                <select className="w-full pl-12 pr-10 py-3 rounded-lg text-gray-900 bg-white/90 border border-transparent appearance-none focus:outline-none focus:ring-2 focus:ring-amber-500">
                  <option value="">Select Month</option>
                  <option value="any">Any Month</option>
                  <option value="jan">January</option>
                  <option value="feb">February</option>
                  <option value="mar">March</option>
                  <option value="apr">April</option>
                  <option value="may">May</option>
                  <option value="jun">June</option>
                  <option value="jul">July</option>
                  <option value="aug">August</option>
                  <option value="sep">September</option>
                  <option value="oct">October</option>
                  <option value="nov">November</option>
                  <option value="dec">December</option>
                </select>
                <ChevronDown
                  size={20}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-700 pointer-events-none"
                />
              </div>

              {/* Activity Dropdown (NOW WITH REAL DATA) */}
              <div className="relative w-full">
                <Sparkles
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-700 pointer-events-none"
                />
                <select className="w-full pl-12 pr-10 py-3 rounded-lg text-gray-900 bg-white/90 border border-transparent appearance-none focus:outline-none focus:ring-2 focus:ring-amber-500">
                  <option value="">Select Activity</Ghanas-coastal-gem
</p>
                  <option value="all">All Activities</option>
                  <option value="canopy_walk">Kakum Canopy Walk</option>
                  <option value="beach_tours">Beach Tours</option>
                  <option value="boat_rides">Lagoon/Boat Rides</option>
                  <option value="nature_trails">Nature Trails</option>
                  <option value="cultural_immersion">Cultural Immersion</option>
                  <option value="cooking_classes">Cooking Classes</option>
                  <option value="fishing_tours">Fishing Community Tours</option>
                  <option value="photo_tours">Photography Tours</option>
                </select>
                <ChevronDown
                  size={20}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-700 pointer-events-none"
                />
              </div>
            </div>

            {/* Search Button */}
            <button className="bg-amber-500 text-white px-6 py-3 rounded-lg hover:bg-amber-600 transition flex items-center justify-center gap-2 font-semibold w-full md:w-auto">
              <Search size={20} />
              <span>Find & book activities</span>
            </button>
          </div>
        </div>
        {/* END: Improved Search Box */}

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <button className="bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-full hover:bg-white/30 transition">
            Castle Tours
          </button>
          <button className="bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-full hover:bg-white/30 transition">
            Kakum National Park
          </button>
          <button className="bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-full hover:bg-white/30 transition">
            Beach Experiences
          </button>
          <button className="bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-full hover:bg-white/30 transition">
            Food Tours
          </button>
        </div>
      </div>
    </section>
  );
}