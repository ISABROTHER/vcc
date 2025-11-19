import { useState, useEffect } from 'react';
import { Search, ChevronDown, MapPin, Calendar, Sparkles } from 'lucide-react';

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

const backgroundImages = [
  'https://images.pexels.com/photos/7412067/pexels-photo-7412067.jpeg?auto=compress&cs=tinysrgb&w=1920',
  'https://images.pexels.com/photos/3155726/pexels-photo-3155726.jpeg?auto=compress&cs=tinysrgb&w=1920',
  'https://images.pexels.com/photos/3889742/pexels-photo-3889742.jpeg?auto=compress&cs=tinysrgb&w=1920',
];

const featuredExperiences = [
  { icon: MapPin, text: '50+ Unique Destinations' },
  { icon: Calendar, text: 'Year-Round Adventures' },
  { icon: Sparkles, text: 'Authentic Experiences' },
];

export default function Hero() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [specificOptions, setSpecificOptions] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

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
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {backgroundImages.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 transition-opacity duration-2000 ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/50 to-slate-900/70"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/40 to-transparent"></div>
        </div>
      ))}

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {backgroundImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentImageIndex
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`View image ${index + 1}`}
          />
        ))}
      </div>

      <div className={`relative z-10 text-center text-white px-4 max-w-5xl mx-auto transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span className="text-sm font-medium">Discover Ghana's Coastal Treasure</span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
          <span className="block">Discover</span>
          <span className="block bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 bg-clip-text text-transparent">
            Cape Coast
          </span>
        </h1>

        <p className="text-xl md:text-2xl lg:text-3xl mb-8 text-slate-100 font-light max-w-3xl mx-auto leading-relaxed">
          Where heritage meets the ocean. Experience Ghana's coastal gem through authentic culture, pristine beaches, and unforgettable adventures.
        </p>

        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {featuredExperiences.map((item, index) => (
            <div
              key={index}
              className={`flex items-center gap-2 text-slate-200 transition-all duration-500 delay-${index * 100}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="p-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                <item.icon className="w-5 h-5" />
              </div>
              <span className="text-sm md:text-base font-medium">{item.text}</span>
            </div>
          ))}
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-3 max-w-5xl mx-auto border border-white/20 hover:border-white/30 transition-all duration-300">
          <div className="flex flex-col lg:flex-row items-center gap-3">
            <div className="flex-1 flex flex-col md:flex-row w-full rounded-xl bg-white shadow-lg overflow-hidden">
              <div className="relative flex-1 group">
                <select className="w-full bg-white text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-amber-400 appearance-none cursor-pointer px-4 py-4 md:py-5 transition-all hover:bg-slate-50">
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
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none transition-transform group-hover:translate-y-[-40%]" size={18} />
              </div>

              <div className="w-full md:w-px h-px md:h-auto bg-slate-200"></div>

              <div className="relative flex-1 group">
                <select
                  className={`w-full text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-amber-400 appearance-none cursor-pointer px-4 py-4 md:py-5 transition-all hover:bg-slate-50 ${
                    selectedCategory ? 'bg-amber-50' : 'bg-white'
                  }`}
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                >
                  <option value="">All Categories</option>
                  <option value="activities">Activities</option>
                  <option value="attractions">Attractions</option>
                  <option value="culture">Culture & Events</option>
                  <option value="shopping">Shopping</option>
                  <option value="food">Food & Drink</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none transition-transform group-hover:translate-y-[-40%]" size={18} />
              </div>

              <div className="w-full md:w-px h-px md:h-auto bg-slate-200"></div>

              <div className="relative flex-1 group">
                <select
                  className={`w-full font-semibold focus:outline-none focus:ring-2 focus:ring-amber-400 appearance-none px-4 py-4 md:py-5 transition-all ${
                    !selectedCategory
                      ? 'bg-slate-50 text-slate-400 cursor-not-allowed'
                      : 'bg-white text-slate-900 cursor-pointer hover:bg-slate-50'
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
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none transition-transform group-hover:translate-y-[-40%]" size={18} />
              </div>
            </div>

            <button className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-4 md:py-5 rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all duration-300 flex items-center justify-center gap-3 font-bold text-base w-full lg:w-auto shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 group">
              <Search className="transition-transform group-hover:scale-110" size={22} />
              <span className="lg:hidden">Search</span>
              <span className="hidden lg:inline whitespace-nowrap">Find Experiences</span>
            </button>
          </div>
        </div>

        <p className="mt-6 text-sm text-slate-300">
          Join thousands of travelers discovering authentic Cape Coast
        </p>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
    </section>
  );
}