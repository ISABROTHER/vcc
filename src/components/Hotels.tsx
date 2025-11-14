import { useState } from 'react';
import { MapPin, Star } from 'lucide-react';

// All your static data, categorized
const allAccommodations = [
  // 1. Hotels
  {
    name: 'Ridge Royal Hotel',
    description: 'Premium business & leisure hotel with pool and conference rooms.',
    category: 'hotels',
    price_range: 'GHS 1200-2000',
    rating: 4.8,
    image_url:
      'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    name: 'Lemon Beach Resort',
    description: 'Boutique, beachfront resort, very popular with tourists.',
    category: 'hotels',
    price_range: 'GHS 900-1500',
    rating: 4.7,
    image_url:
      'https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    name: 'Elmina Beach Resort',
    description:
      'Large hotel with stunning oceanfront views, pool, and event spaces.',
    category: 'hotels',
    price_range: 'GHS 800-1300',
    rating: 4.2,
    image_url:
      'https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  // 2. Guest Houses
  {
    name: 'Brynx Haven Guest House',
    description: 'Clean, modern, and friendly pricing, located in a quiet area.',
    category: 'guest_houses',
    price_range: 'GHS 400-600',
    rating: 4.5,
    image_url:
      'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    name: 'Mighty Victory Hotel',
    description:
      'Popular with academic visitors and families. Affordable, convenient location.',
    category: 'guest_houses',
    price_range: 'GHS 350-550',
    rating: 4.0,
    image_url:
      'https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    name: 'Prospect Lodge',
    description:
      'Comfortable rooms in a peaceful environment. Good for couples.',
    category: 'guest_houses',
    price_range: 'GHS 450-700',
    rating: 4.3,
    image_url:
      'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  // 3. Beachfront Lodges
  {
    name: 'Brenu Beach Lodge',
    description:
      'One of the best beach lodges near Cape Coast. Calm, quiet, ocean view cabins.',
    category: 'beachfront',
    price_range: 'GHS 500-800',
    rating: 4.6,
    image_url:
      'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    name: 'Coconut Grove Beach Resort',
    description:
      'Very popular coastal hotel with a large pool, lawns, and beachfront rooms.',
    category: 'beachfront',
    price_range: 'GHS 900-1600',
    rating: 4.4,
    image_url:
      'https://images.pexels.com/photos/2096983/pexels-photo-2096983.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    name: 'Oasis Beach Resort',
    description:
      'Backpacker lodge with beachfront rooms and an amazing beach bar vibe.',
    category: 'beachfront',
    price_range: 'GHS 200-500',
    rating: 4.1,
    image_url:
      'https://images.pexels.com/photos/1320686/pexels-photo-1320686.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  // 4. Airbnb & Vacation Rentals
  {
    name: 'Kískaikkaa Villa',
    description:
      'Modern, entire villa, very good for groups with a stylish interior.',
    category: 'airbnb',
    price_range: 'GHS 2500-4000',
    rating: 4.9,
    image_url:
      'https://images.pexels.com/photos/4172877/pexels-photo-4172877.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    name: 'Atlantic Blue Beach Apartment',
    description:
      'Beautiful beachfront apartment, perfect for long stays.',
    category: 'airbnb',
    price_range: 'GHS 1000-1800',
    rating: 4.8,
    image_url:
      'https://images.pexels.com/photos/3144580/pexels-photo-3144580.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    name: 'Cape Coast Family Stay Airbnb',
    description:
      'Entire home, fully serviced. Great for families or small teams.',
    category: 'airbnb',
    price_range: 'GHS 800-1400',
    rating: 4.6,
    image_url:
      'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  // 5. Boutique & Heritage Stays
  {
    name: 'One Africa Guest House',
    description:
      'African heritage-themed lodge, popular with diaspora travelers.',
    category: 'boutique',
    price_range: 'GHS 500-900',
    rating: 4.5,
    image_url:
      'https://images.pexels.com/photos/6782473/pexels-photo-6782473.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    name: 'Baobab Guesthouse',
    description:
      'Social enterprise accommodation with great food and a cultural feel.',
    category: 'boutique',
    price_range: 'GHS 400-700',
    rating: 4.6,
    image_url:
      'https://images.pexels.com/photos/161758/governor-s-mansion-montgomery-alabama-grand-staircase-161758.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    name: 'Almond Tree Guest House',
    description:
      'Peaceful, boutique-style stay with a beautiful garden and ocean view.',
    category: 'boutique',
    price_range: 'GHS 600-1000',
    rating: 4.7,
    image_url:
      'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  // 6. Budget Stays
  {
    name: 'Hans Cottage Botel',
    description:
      'Famous nature lodge with a crocodile pond, popular with backpackers.',
    category: 'budget',
    price_range: 'GHS 250-450',
    rating: 3.9,
    image_url:
      'https://images.pexels.com/photos/70441/pexels-photo-70441.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    name: 'Fairhill Guest House',
    description:
      'Very affordable, simple rooms. Good for students & travellers on a budget.',
    category: 'budget',
    price_range: 'GHS 200-350',
    rating: 3.8,
    image_url:
      'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    name: 'Ebusua Hostel (City)',
    description:
      'Budget-friendly with a student vibe and easy access to town.',
    category: 'budget',
    price_range: 'GHS 150-300',
    rating: 3.7,
    image_url:
      'https://images.pexels.com/photos/1267438/pexels-photo-1267438.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

// Filter categories
const categories = [
  'all',
  'hotels',
  'guest_houses',
  'beachfront',
  'airbnb',
  'boutique',
  'budget',
];

export default function Hotels() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredHotels =
    selectedCategory === 'all'
      ? allAccommodations
      : allAccommodations.filter((hotel) => hotel.category === selectedCategory);

  return (
    <section
      id="hotels"
      className="relative py-16 sm:py-20 bg-gradient-to-b from-blue-50 via-white to-blue-50"
    >
      {/* subtle background accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-blue-200/40 blur-3xl" />
        <div className="absolute bottom-0 -left-10 h-40 w-40 rounded-full bg-blue-100/40 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12">
          <p className="inline-flex items-center rounded-full bg-blue-100/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-blue-900 mb-4 shadow-sm">
            Stay in Cape Coast
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-900 mb-3 sm:mb-4">
            Hotels & Accommodation
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl md:max-w-3xl mx-auto">
            From beachfront resorts to budget-friendly guest houses, discover
            verified places to stay for every kind of traveler.
          </p>
        </div>

        {/* Filters + summary */}
        <div className="mb-8 sm:mb-10">
          <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3 mb-4">
            {categories.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-sm sm:text-base capitalize border transition-all duration-200 shadow-sm ${
                    isActive
                      ? 'bg-blue-900 text-white border-blue-900 shadow-md scale-[1.02]'
                      : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {category.replace('_', ' ')}
                </button>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs sm:text-sm text-gray-500">
            <span className="font-medium text-gray-700">
              Showing {filteredHotels.length}{' '}
              {selectedCategory === 'all'
                ? 'stays in Cape Coast'
                : `${selectedCategory.replace('_', ' ')} options`}
            </span>
            <span className="hidden sm:inline-flex items-center gap-1">
              <span className="h-1 w-1 rounded-full bg-gray-300" />
              Tap a card to explore. Details vary by property.
            </span>
          </div>
        </div>

        {/* Card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
          {filteredHotels.map((hotel) => (
            <article
              key={hotel.name}
              className="group bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-md hover:shadow-2xl border border-gray-100 transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              <div className="relative h-52 sm:h-56 md:h-60 overflow-hidden">
                <img
                  src={hotel.image_url}
                  alt={hotel.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

                <div className="absolute top-3 right-3">
                  <div className="bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                    <Star size={14} className="text-amber-500 fill-amber-500" />
                    <span className="text-xs font-semibold text-gray-800">
                      {hotel.rating.toFixed(1)}
                    </span>
                  </div>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2">
                  <div className="flex flex-col">
                    <span className="inline-flex items-center rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-blue-900 shadow-sm">
                      {hotel.category.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="hidden sm:flex items-center gap-1 rounded-full bg-black/40 px-3 py-1 text-xs text-white">
                    <MapPin size={14} />
                    <span>Cape Coast</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col flex-1 p-4 sm:p-5 md:p-6">
                <header className="mb-3 sm:mb-4">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 line-clamp-1">
                    {hotel.name}
                  </h3>
                  <p className="text-xs font-semibold text-blue-900 uppercase tracking-wide mb-1.5">
                    About this stay
                  </p>
                  <p className="text-sm sm:text-[15px] text-gray-600 line-clamp-3">
                    {hotel.description}
                  </p>
                </header>

                <div className="flex items-center gap-2 text-gray-600 text-sm mb-3 sm:mb-4">
                  <div className="flex items-center gap-1.5">
                    <MapPin size={16} className="text-blue-800" />
                    <span>Cape Coast</span>
                  </div>
                  <span className="hidden sm:inline-flex h-1 w-1 rounded-full bg-gray-300" />
                  <span className="hidden sm:inline-flex text-gray-500">
                    Central location • Easy access to attractions
                  </span>
                </div>

                <div className="mt-auto">
                  <button className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-900 text-white py-2.5 sm:py-3 text-sm sm:text-[15px] font-semibold shadow-md hover:bg-blue-800 hover:shadow-lg active:scale-[0.98] transition-all">
                    Read more
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredHotels.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No accommodations found in this category yet.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
