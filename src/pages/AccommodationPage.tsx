import { useState } from 'react';
import { Link } from 'react-router-dom';
import { allAccommodations, FacilityIcon } from '../data/hotelData.tsx';

export default function AccommodationPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Accommodation' },
    { id: 'hotel_and_guest_house', label: 'Hotels & Guest Houses' },
    { id: 'beachfront', label: 'Beachfront' },
    { id: 'airbnb', label: 'Vacation Rentals' },
    { id: 'cultural', label: 'Cultural Stays' },
  ];

  const filteredAccommodations = selectedCategory === 'all'
    ? allAccommodations
    : allAccommodations.filter(hotel => hotel.category === selectedCategory);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Accommodation
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Find the perfect place to stay, from luxury resorts to cozy guesthouses,
            all offering world-class hospitality.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-yellow-600 text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-yellow-600 hover:text-yellow-600'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAccommodations.map(hotel => (
            <Link
              key={hotel.id}
              to={`/accommodation/${hotel.id}`}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={hotel.image_url}
                  alt={hotel.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-yellow-600 transition">
                  {hotel.name}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{hotel.description}</p>
                <div className="space-y-2">
                  {hotel.facilities.slice(0, 3).map((facility) => (
                    <div key={facility} className="flex items-center text-sm text-gray-600">
                      <FacilityIcon facility={facility} />
                      <span>{facility}</span>
                    </div>
                  ))}
                  {hotel.facilities.length > 3 && (
                    <div className="text-sm text-yellow-600 font-medium">
                      +{hotel.facilities.length - 3} more facilities
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredAccommodations.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No accommodations found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}