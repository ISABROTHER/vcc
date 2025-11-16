import { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';

// All category data
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
    <section className="relative bg-slate-900">
      {/* HERO IMAGE BLOCK – BERGEN STYLE */}
      <div className="relative h-[380px] sm:h-[440px] md:h-[520px] lg:h-[560px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.pexels.com/photos/7412067/pexels-photo-7412067.jpeg?auto=compress&cs=tinysrgb&w=1920)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/10" />

        {/* Floating white card at bottom left */}
        <div className="relative mx-auto flex h-full max-w-6xl items-end px-4 pb-8 sm:px-6 sm:pb-10 lg:px-8 lg:pb-12">
          <div className="inline-flex max-w-xl flex-col rounded-3xl bg-white/95 px-5 py-4 shadow-[0_20px_60px_rgba(15,23,42,0.45)] sm:px-7 sm:py-6">
            <p className="text-xs font-semibold tracking-[0.22em] text-slate-500 uppercase">
              Cape Coast, Ghana
            </p>
            <h1 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-900">
              The Heritage City of Cape Coast
            </h1>
            <p className="mt-1.5 text-sm sm:text-base leading-snug text-slate-700">
              Castles, beaches, festivals and a city shaped by history, return and hope.
            </p>
          </div>
        </div>
      </div>

      {/* SEARCH BAR BLOCK – LIKE BERGEN BLUE BAR */}
      <div className="relative">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="-mt-8 sm:-mt-10 lg:-mt-12 pb-8 sm:pb-10">
            <div className="rounded-3xl bg-[#375A9E] px-4 py-6 sm:px-8 sm:py-8 shadow-[0_24px_50px_rgba(15,23,42,0.40)]">
              <h2 className="text-center sm:text-left text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-5">
                Search what&apos;s happening
              </h2>

              <div className="bg-white/95 rounded-2xl p-2 sm:p-3">
                <div className="flex flex-col md:flex-row items-center w-full gap-2 md:gap-3">
                  {/* Inputs group */}
                  <div className="flex-1 flex flex-col md:flex-row w-full rounded-lg bg-white shadow-inner overflow-hidden">
                    {/* Month */}
                    <div className="relative flex-1">
                      <select
                        className="w-full bg-white text-gray-900 font-medium focus:outline-none appearance-none cursor-pointer p-3 md:p-3 md:pl-4 text-center md:text-left hover:bg-slate-50 transition-colors"
                      >
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
                      <ChevronDown
                        size={16}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                      />
                    </div>

                    {/* Divider */}
                    <div className="w-full md:w-px h-px md:h-10 bg-gray-200 md:my-auto" />

                    {/* Category */}
                    <div className="relative flex-1">
                      <select
                        className={`w-full text-gray-900 font-medium focus:outline-none appearance-none cursor-pointer p-3 md:p-3 text-center md:text-left transition-colors ${
                          selectedCategory ? 'bg-white' : 'bg-white'
                        } hover:bg-slate-50`}
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

                    {/* Divider */}
                    <div className="w-full md:w-px h-px md:h-10 bg-gray-200 md:my-auto" />

                    {/* Specific Item */}
                    <div className="relative flex-1">
                      <select
                        className={`w-full font-medium focus:outline-none appearance-none p-3 md:p-3 text-center md:text-left transition-colors ${
                          !selectedCategory
                            ? 'bg-slate-50 text-gray-500 cursor-not-allowed'
                            : 'bg-white text-gray-900 cursor-pointer hover:bg-slate-50'
                        }`}
                        disabled={!selectedCategory || specificOptions.length === 0}
                      >
                        <option value="">Any Item</option>
                        {specificOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        size={16}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                      />
                    </div>
                  </div>

                  {/* Search button */}
                  <button className="bg-amber-400 text-slate-900 px-4 py-3 rounded-lg hover:bg-amber-500 active:bg-amber-600 transition flex items-center justify-center gap-2 font-semibold w-full md:w-auto shadow-md">
                    <Search size={20} />
                    <span className="md:hidden">Search</span>
                    <span className="hidden md:inline">Find &amp; book activities</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>      
    </section>
  );
}
