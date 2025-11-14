import { Search } from 'lucide-react';

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

        <div className="bg-white rounded-2xl shadow-2xl p-4 max-w-3xl mx-auto">
          {/* On mobile (flex-col): 
            - The grid div stacks on top.
            - The button stacks below.
            - Inside the grid div, grid-cols-2 places the dropdowns side-by-side.
            
            On desktop (md:flex-row):
            - The grid div is on the left (flex-1).
            - The button is on the right.
            - Inside the grid div, grid-cols-2 places the dropdowns side-by-side.
          */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* START: Updated dropdown inputs */}
            <div className="flex-1 grid grid-cols-2 gap-4">
              <select className="w-full px-4 py-3 rounded-lg text-gray-800 bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
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

              <select className="w-full px-4 py-3 rounded-lg text-gray-800 bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Select Activity</option>
                <option value="all">All Activities</option>
                <option value="tours">Tours</option>
                <option value="cultural">Cultural</option>
                <option value="castle">Castle</option>
                <option value="adventure">Adventure</option>
                <option value="food">Food</option>
                <option value="creative">Creative</option>
              </select>
            </div>
            {/* END: Updated dropdown inputs (Popularity/Order removed) */}

            {/* Updated button */}
            <button className="bg-amber-500 text-white px-6 py-3 rounded-lg hover:bg-amber-600 transition flex items-center justify-center gap-2 font-semibold">
              <Search size={20} />
              <span>Find & book activities</span>
            </button>
          </div>
        </div>

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