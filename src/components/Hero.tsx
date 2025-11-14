import { useState } from 'react';
import { Search, Calendar, ChevronDown, Layers, List } from 'lucide-react';

// This new object holds all your real data, perfectly organized.
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
  // We add 'state' to manage the dropdowns
  const [selectedCategory, setSelectedCategory] = useState('');
  const [specificOptions, setSpecificOptions] = useState<string[]>([]);

  // This function runs when you change the "Main Category"
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    setSelectedCategory(category);

    if (category && allCategories[category as keyof typeof allCategories]) {
      // Set the third dropdown's options based on the new category
      setSpecificOptions(allCategories[category as keyof typeof allCategories]);
    } else {
      // Reset the third dropdown if "Select Category" is chosen
      setSpecificOptions([]);
    }
  };

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
            {/* Dropdown Container: 3 cols on desktop, 1 on mobile */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              {/* 1. Month Dropdown */}
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

              {/* 2. Main Category Dropdown */}
              <div className="relative w-full">
                <Layers
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-700 pointer-events-none"
                />
                <select
                  className="w-full pl-12 pr-10 py-3 rounded-lg text-gray-900 bg-white/90 border border-transparent appearance-none focus:outline-none focus:ring-2 focus:ring-amber-500"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                >
                  <option value="">Select Category</option>
                  <option value="activities">Activities</option>
                  <option value="attractions">Attractions</option>
                  <option value="culture">Culture & Events</option>
                  <option value="shopping">Shopping</option>
                  <option value="food">Food & Drink</option>
                </select>
                <ChevronDown
                  size={20}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-700 pointer-events-none"
                />
              </div>

              {/* 3. Specific Item Dropdown (Dynamic) */}
              <div className="relative w-full">
                <List
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-700 pointer-events-none"
                />
                <select
                  className="w-full pl-12 pr-10 py-3 rounded-lg text-gray-900 bg-white/90 border border-transparent appearance-none focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-50"
                  disabled={!selectedCategory || specificOptions.length === 0}
                >
                  <option value="">Select Specific Item</option>
                  {specificOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
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
              <span className="md:hidden lg:inline">Find activities</span>
            </button>
          </div>
        </div>
        {/* END: Improved Search Box */}
      </div>
    </section>
  );
}