import { useState } from 'react';
import { MapPin, Star } from 'lucide-react';

// NEW: All your static data, categorized and enhanced with placeholders
const allAccommodations = [
  // 1. Hotels
  {
    name: 'Ridge Royal Hotel',
    description: 'Premium business & leisure hotel with pool and conference rooms.',
    category: 'hotels',
    price_range: 'GHS 1200-2000',
    rating: 4.8,
    image_url: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    name: 'Lemon Beach Resort',
    description: 'Boutique, beachfront resort, very popular with tourists.',
    category: 'hotels',
    price_range: 'GHS 900-1500',
    rating: 4.7,
    image_url: 'https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    name: 'Elmina Beach Resort',
    description: 'Large hotel with stunning oceanfront views, pool, and event spaces.',
    category: 'hotels',
    price_range: 'GHS 800-1300',
    rating: 4.2,
    image_url: 'https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  // 2. Guest Houses
  {
    name: 'Brynx Haven Guest House',
    description: 'Clean, modern, and friendly pricing, located in a quiet area.',
    category: 'guest_houses',
    price_range: 'GHS 400-600',
    rating: 4.5,
    image_url: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    name: 'Mighty Victory Hotel',
    description: 'Popular with academic visitors and families. Affordable, convenient location.',
    category: 'guest_houses',
    price_range: 'GHS 350-550',
    rating: 4.0,
    image_url: 'https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    name: 'Prospect Lodge',
    description: 'Comfortable rooms in a peaceful environment. Good for couples.',
    category: 'guest_houses',
    price_range: 'GHS 450-700',
    rating: 4.3,
    image_url: 'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  // 3. Beachfront Lodges
  {
    name: 'Brenu Beach Lodge',
    description: 'One of the best beach lodges near Cape Coast. Calm, quiet, ocean view cabins.',
    category: 'beachfront',
    price_range: 'GHS 500-800',
    rating: 4.6,
    image_url: 'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    name: 'Coconut Grove Beach Resort',
    description: 'Very popular coastal hotel with a large pool, lawns, and beachfront rooms.',
    category: 'beachfront',
    price_range: 'GHS 900-1600',
    rating: 4.4,
    image_url: 'https://images.pexels.com/photos/2096983/pexels-photo-2096983.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    name: 'Oasis Beach Resort',
    description: 'Backpacker lodge with beachfront rooms and an amazing beach bar vibe.',
    category: 'beachfront',
    price_range: 'GHS 200-500',
    rating: 4.1,
    image_url: 'https://images.pexels.com/photos/1320686/pexels-photo-1320686.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  // 4. Airbnb & Vacation Rentals
  {
    name: 'Kískaikkaa Villa',
    description: 'Modern, entire villa, very good for groups with a stylish interior.',
    category: 'airbnb',
    price_range: 'GHS 2500-4000',
    rating: 4.9,
    image_url: 'https://images.pexels.com/photos/4172877/pexels-photo-4172877.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    name: 'Atlantic Blue Beach Apartment',
    description: 'Beautiful beachfront apartment, perfect for long stays.',
    category: 'airbnb',
    price_range: 'GHS 1000-1800',
    rating: 4.8,
    image_url: 'https://images.pexels.com/photos/3144580/pexels-photo-3144580.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    name: 'Cape Coast Family Stay Airbnb',
    description: 'Entire home, fully serviced. Great for families or small teams.',
    category: 'airbnb',
    price_range: 'GHS 800-1400',
    rating: 4.6,
    image_url: 'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  // 5. Boutique & Heritage Stays
  {
    name: 'One Africa Guest House',
    description: 'African heritage-themed lodge, popular with diaspora travelers.',
    category: 'boutique',
    price_range: 'GHS 500-900',
    rating: 4.5,
    image_url: 'https://images.pexels.com/photos/6782473/pexels-photo-6782473.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    name: 'Baobab Guesthouse',
    description: 'Social enterprise accommodation with great food and a cultural feel.',
    category: 'boutique',
    price_range: 'GHS 400-700',
    rating: 4.6,
    image_url: 'https://images.pexels.com/photos/161758/governor-s-mansion-montgomery-alabama-grand-staircase-161758.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    name: 'Almond Tree Guest House',
    description: 'Peaceful, boutique-style stay with a beautiful garden and ocean view.',
    category: 'boutique',
    price_range: 'GHS 600-1000',
    rating: 4.7,
    image_url: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  // 6. Budget Stays
  {
    name: 'Hans Cottage Botel',
    description: 'Famous nature lodge with a crocodile pond, popular with backpackers.',
    category: 'budget',
    price_range: 'GHS 250-450',
    rating: 3.9,
    image_url: 'https://images.pexels.com/photos/70441/pexels-photo-70441.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    name: 'Fairhill Guest House',
    description: 'Very affordable, simple rooms. Good for students & travellers on a budget.',
    category: 'budget',
    price_range: 'GHS 200-350',
    rating: 3.8,
    image_url: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    name: 'Ebusua Hostel (City)',
    description: 'Budget-friendly with a student vibe and easy access to town.',
    category: 'budget',
    price_range: 'GHS 150-300',
    rating: 3.7,
    image_url: 'https://images.pexels.com/photos/1267438/pexels-photo-1267438.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

// NEW: Updated filter categories to match your list
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

  // UPDATED: Filtering now happens on the static 'allAccommodations' array
  const filteredHotels = selectedCategory === 'all'
    ? allAccommodations
    : allAccommodations.filter(hotel => hotel.category === selectedCategory);

  return (
    <section id="hotels" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
            Hotels & Accommodation
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find the perfect place to stay during your visit
          </p>
        </div>

        {/* UPDATED: Filter buttons now map from your new categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full capitalize transition ${
                selectedCategory === category
                  ? 'bg-blue-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.replace('_', ' ')}
            </button>
          ))}
        </div>

        {/* UPDATED: This now maps over your static data */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredHotels.map(hotel => (
            <div
              key={hotel.name} // Use name as key since ID is gone
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition group"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={hotel.image_url}
                  alt={hotel.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                  <Star size={16} className="text-amber-500 fill-amber-500" />
                  <span className="text-sm font-semibold">{hotel.rating.toFixed(1)}</span>
                </div>
              </div>
              <div className="p-6">
                <span className="inline-block bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-sm font-semibold mb-3 capitalize">
                  {hotel.category.replace('_', ' ')}
                </span>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{hotel.name}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{hotel.description}</p>
                <div className="flex items-center gap-2 text-gray-600 mb-4">
                  <MapPin size={18} />
                  <span>Cape Coast</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-blue-900 font-bold text-lg">{hotel.price_range}</span>
                  <span className="text-gray-500 text-sm">per night</span>
                </div>
                <button className="w-full bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-800 transition font-semibold">
                  Check Availability
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredHotels.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No accommodations found in this category yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}