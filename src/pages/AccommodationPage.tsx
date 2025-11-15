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

  const filteredAccommodations =
    selectedCategory === 'all'
      ? allAccommodations
      : allAccommodations.filter((hotel) => hotel.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-14 sm:py-20 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-10 sm:mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-500 mb-3">
            Stay in Cape Coast
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
            Accommodation
          </h1>
          <p className="mt-5 text-base sm:text-lg leading-7 sm:leading-8 text-slate-600">
            Find the perfect place to stay &mdash; from beachfront stays and boutique
            hotels to cozy guesthouses and vacation rentals.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-10 sm:mb-12">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 bg-white/80 border border-slate-100 rounded-full px-2.5 py-2 shadow-sm">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap
                  ${
                    selectedCategory === category.id
                      ? 'bg-slate-900 text-white shadow-md shadow-slate-300/40'
                      : 'bg-transparent text-slate-700 hover:bg-slate-50'
                  }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredAccommodations.map((hotel) => (
            <Link
              key={hotel.id}
              to={`/accommodation/${hotel.id}`}
              className="group relative bg-white/95 rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1 hover:border-amber-500/60 transition-all duration-300 flex flex-col"
            >
              <div className="relative h-56 sm:h-64 overflow-hidden">
                <img
                  src={hotel.image_url}
                  alt={hotel.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3">
                  <div className="max-w-[70%]">
                    <p className="line-clamp-1 text-xs font-medium uppercase tracking-wide text-white/80">
                      Cape Coast Area
                    </p>
                    <p className="mt-0.5 line-clamp-1 text-sm font-semibold text-white">
                      {hotel.name}
                    </p>
                  </div>
                  <span className="inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-800 shadow-sm">
                    View stay
                  </span>
                </div>
              </div>

              <div className="p-5 sm:p-6 flex flex-col flex-1">
                <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2 group-hover:text-amber-600 transition-colors">
                  {hotel.name}
                </h3>
                <p className="text-sm sm:text-[15px] text-slate-600 mb-4 line-clamp-2">
                  {hotel.description}
                </p>

                <div className="mt-auto space-y-2">
                  {hotel.facilities.slice(0, 3).map((facility) => (
                    <div
                      key={facility}
                      className="flex items-center gap-2 text-xs sm:text-sm text-slate-600"
                    >
                      <FacilityIcon facility={facility} />
                      <span className="truncate">{facility}</span>
                    </div>
                  ))}
                  {hotel.facilities.length > 3 && (
                    <div className="text-xs sm:text-sm text-amber-600 font-medium">
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
            <div className="inline-flex items-center justify-center rounded-full bg-white border border-slate-100 px-4 py-2 mb-4 shadow-sm">
              <span className="text-sm font-semibold text-slate-700">
                No results for this category
              </span>
            </div>
            <p className="text-slate-500 text-base">
              No accommodations found in this category. Try another filter to
              explore more stays in Cape Coast.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
