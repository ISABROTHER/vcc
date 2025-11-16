import { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';

const allCategories = {
  activities: [
    'Kakum Canopy Walk',
    'Beach Tours',
    'Lagoon/Boat Rides',
    'Nature Trails',
    'Cultural Immersion',
    'Cooking Classes (Local)',
    'Fishing Community Tours',
    'Photography Tours',
  ],
  attractions: [
    'Cape Coast Castle',
    'Elmina Castle',
    'Kakum National Park',
    'Hans Cottage Crocodile Pond',
    'Assin Manso Slave River',
    'Fort Victoria',
    'Fort William (Lighthouse)',
    'Elmina Fishing Harbor',
    'Brenu Beach',
    'Monkey Forest Resort',
  ],
  culture: [
    'Oguaa Fetu Afahye',
    'PANAFEST & Emancipation',
    'Bakatue Festival (Elmina)',
    'Cultural Drumming & Dance',
    'Local Artisan Markets',
  ],
  shopping: [
    'Cape Coast Cultural Centre',
    'Kotokuraba Market',
    'Art & Wood Carving Shops',
  ],
  food: [
    'Eat at: Akoo House',
    'Eat at: Hans Cottage',
    'Eat at: Oasis Beach',
    'Eat at: Local Chop Bars',
    'Drink at: Castle Café',
    'Nightlife: Oasis Nightlife',
    'Nightlife: Beach Bars',
  ],
};

export default function Hero() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [specificOptions, setSpecificOptions] = useState<string[]>([]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    setSelectedCategory(category);

    if (category && allCategories[category as keyof typeof allCategories]) {
      setSpecificOptions(allCategories[category as keyof typeof allCategories]);
    } else {
      setSpecificOptions([]);
    }
  };

  return (
    <section className="relative w-full bg-slate-900">
      {/* Hero image area */}
      <div className="relative h-[60vh] min-h-[380px] sm:h-[70vh] md:h-[80vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/7412067/pexels-photo-7412067.jpeg?auto=compress&cs=tinysrgb&w=1920')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />

        <div className="relative h-full flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight">
              Discover Cape Coast
            </h1>
            <p className="mt-4 text-white/90 text-lg sm:text-xl md:text-2xl">
              Where heritage meets the ocean – Ghana’s coastal gem awaits.
            </p>
          </div>
        </div>
      </div>

      {/* Search bar section immediately below hero */}
      <div className="bg-[#375A9E] py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-white text-xl sm:text-2xl font-semibold mb-4 text-center md:text-left">
            Search what’s happening
          </h2>
          <div className="bg-white rounded-2xl p-4 shadow-lg">
            <div className="flex flex-col md:flex-row items-center gap-3">
              <div className="flex-1 flex flex-col md:flex-row w-full bg-white rounded-lg overflow-hidden shadow-inner">
                <div className="flex-1">
                  <select className="w-full p-3 text-gray-900 font-medium appearance-none focus:outline-none cursor-pointer">
                    <option value="">Any Month</option>
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
                </div>
                <div className="w-full md:w-px h-px md:h-10 bg-gray-200"></div>
                <div className="flex-1 relative">
                  <select
                    className={`w-full p-3 text-gray-900 font-medium appearance-none focus:outline-none cursor-pointer ${
                      selectedCategory ? '' : 'opacity-90'
                    }`}
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                  >
                    <option value="">All Categories</option>
                    <option value="activities">Activities</option>
                    <option value="attractions">Attractions</option>
                    <option value="culture">Culture &amp; Events</option>
                    <option value="shopping">Shopping</option>
                    <option value="food">Food &amp; Drink</option>
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                  />
                </div>
                <div className="w-full md:w-px h-px md:h-10 bg-gray-200"></div>
                <div className="flex-1">
                  <select
                    className={`w-full p-3 font-medium appearance-none focus:outline-none ${
                      !selectedCategory
                        ? 'text-gray-500 cursor-not-allowed bg-gray-100'
                        : 'text-gray-900'
                    }`}
                    disabled={!selectedCategory}
                  >
                    <option value="">Any Item</option>
                    {specificOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button className="bg-amber-500 text-white px-4 py-3 rounded-lg hover:bg-amber-600 transition font-semibold flex items-center justify-center gap-2 w-full md:w-auto">
                <Search size={20} />
                <span className="hidden md:inline">Find &amp; book activities</span>
                <span className="md:hidden">Search</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
