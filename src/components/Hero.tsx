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
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
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

              {/* Activity Dropdown (NOW WITH REAL DATA & OPTGROUPS) */}
              <div className="relative w-full">
                <Sparkles
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-700 pointer-events-none"
                />
                <select className="w-full pl-12 pr-10 py-3 rounded-lg text-gray-900 bg-white/90 border border-transparent appearance-none focus:outline-none focus:ring-2 focus:ring-amber-500">
                  <option value="">Select Activity</option>
                  <option value="all">All Activities</option>

                  <optgroup label="Activities">
                    <option value="kakum_canopy_walk">Kakum Canopy Walk</option>
                    <option value="beach_tours">Beach Tours</option>
                    <option value="lagoon_boat_rides">Lagoon/Boat Rides</option>
                    <option value="nature_trails">Nature Trails</option>
                    <option value="cultural_immersion">Cultural Immersion</option>
                    <option value="cooking_classes">Cooking Classes (Local)</option>
                    <option value="fishing_community_tours">Fishing Community Tours</option>
                    <option value="photography_tours">Photography Tours</option>
                  </optgroup>

                  <optgroup label="Attractions & Landmarks">
                    <option value="cape_coast_castle">Cape Coast Castle</option>
                    <option value="elmina_castle">Elmina Castle</option>
                    <option value="kakum_national_park">Kakum National Park</option>
                    <option value="hans_cottage">Hans Cottage Crocodile Pond</option>
                    <option value="assin_manso_slave_river">Assin Manso Slave River</option>
                    <option value="fort_victoria">Fort Victoria</option>
                    <option value="fort_william_lighthouse">Fort William (Lighthouse)</option>
                    <option value="elmina_fishing_harbor">Elmina Fishing Harbor</option>
                    <option value="brenu_beach">Brenu Beach</option>
                    <option value="monkey_forest_resort">Monkey Forest Resort</option>
                  </optgroup>

                  <optgroup label="Culture & Events">
                    <option value="oguaa_fetu_afahye">Oguaa Fetu Afahye</option>
                    <option value="panafest">PANAFEST & Emancipation</option>
                    <option value="bakatue_festival">Bakatue Festival (Elmina)</option>
                    <option value="cultural_drumming_dance">Cultural Drumming & Dance</option>
                    <option value="local_artisan_markets">Local Artisan Markets</option>
                  </optgroup>

                  <optgroup label="Shopping">
                    <option value="cape_coast_cultural_centre">Cape Coast Cultural Centre</option>
                    <option value="kotokuraba_market">Kotokuraba Market</option>
                    <option value="art_wood_carving_shops">Art & Wood Carving Shops</option>
                  </optgroup>

                  <optgroup label="Eat & Drink">
                    <option value="akoo_house">Eat at: Akoo House</option>
                    <option value="hans_cottage_restaurant">Eat at: Hans Cottage</option>
                    <option value="oasis_beach_restaurant">Eat at: Oasis Beach</option>
                    <option value="local_chop_bars">Eat at: Local Chop Bars</option>
                    <option value="castle_cafe">Drink at: Castle Café</option>
                    <option value="oasis_nightlife">Nightlife: Oasis Nightlife</option>
                    <option value="beach_bars">Nightlife: Beach Bars</option>
                  </optgroup>
                </select>
                <ChevronDown
                  size={20}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-700 pointer-events-none"
                />
              </div>
            </div>

            {/* Search Button (full-width on mobile, auto-width on desktop) */}
            <button className="bg-amber-500 text-white px-6 py-3 rounded-lg hover:bg-amber-600 transition flex items-center justify-center gap-2 font-semibold w-full md:w-auto">
              <Search size={20} />
              <span>Find & book activities</span>
            </button>
          </div>
        </div>
        {/* END: Improved Search Box */}
      </div>
    </section>
  );
}