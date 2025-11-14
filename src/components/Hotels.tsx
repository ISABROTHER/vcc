import { useState } from 'react';
import { MapPin } from 'lucide-react';
import { allAccommodations } from '../data/hotelData'; // 1. Import data from new file
import { Link } from 'react-router-dom'; // 2. Import Link

// Updated filter categories to match your list
const categories = [
  'all',
  'hotel_and_guest_house',
  'beachfront',
  'airbnb',
  'cultural',
];

export default function Hotels() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Filtering happens on the static 'allAccommodations' array
  const filteredHotels =
    selectedCategory === 'all'
      ? allAccommodations
      : allAccommodations.filter(
          (hotel) => hotel.category === selectedCategory
        );

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

        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full capitalize transition ${
                selectedCategory === category
                  ? 'bg-blue-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.replace(/_/g, ' ')}
            </button>
          ))}
        </div>

        {/* Grid maps static data */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredHotels.map((hotel) => (
            <div
              key={hotel.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition group"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={hotel.image_url}
                  alt={hotel.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
              </div>
              <div className="p-6">
                <span className="inline-block bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-sm font-semibold mb-3 capitalize">
                  {hotel.category.replace(/_/g, ' ')}
                </span>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {hotel.name}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {hotel.description}
                </p>
                <div className="flex items-center gap-2 text-gray-600 mb-4">
                  <MapPin size={18} />
                  <span>{hotel.contact.address}</span>
                </div>
                {/* 3. Button is now a Link to the new page */}
                <Link
                  to={`/hotels/${hotel.id}`}
                  className="w-full bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-800 transition font-semibold block text-center"
                >
                  Read More
                </Link>
              </div>
            </div>
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
      {/* 4. All Modal code is REMOVED */}
    </section> 
  );
}