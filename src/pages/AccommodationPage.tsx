import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Map as MapIcon, List, Filter, X, ChevronDown } from 'lucide-react';
import { allAccommodations, FacilityIcon } from '../data/hotelData.tsx';

type Accommodation = (typeof allAccommodations)[number];
type AccommodationId = Accommodation['id'];

export default function AccommodationPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [amenityFilters, setAmenityFilters] = useState<string[]>([]);
  const [savedIds, setSavedIds] = useState<AccommodationId[]>([]);
  const [tripPlanIds, setTripPlanIds] = useState<AccommodationId[]>([]);
  const [compareIds, setCompareIds] = useState<AccommodationId[]>([]);
  const [galleryHotel, setGalleryHotel] = useState<Accommodation | null>(null);
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Accommodation' },
    { id: 'hotel_and_guest_house', label: 'Hotels & Guest Houses' },
    { id: 'beachfront', label: 'Beachfront' },
    { id: 'airbnb', label: 'Vacation Rentals' },
    { id: 'cultural', label: 'Cultural Stays' },
  ];

  const amenityChips = [
    'Free Wi-Fi',
    'Breakfast included',
    'Swimming pool',
    'Beach access',
    'Parking',
    'Air conditioning',
  ];

  const quickFilters = [
    { id: 'beachfront', label: 'Beachfront stays', categoryId: 'beachfront' },
    { id: 'luxury', label: 'Luxury & boutique', categoryId: 'hotel_and_guest_house' },
    { id: 'family', label: 'Family-friendly', categoryId: 'cultural' },
    { id: 'city', label: 'City centre', categoryId: 'hotel_and_guest_house' },
  ];

  const faqItems = [
    {
      id: 'types',
      question: 'What types of accommodation are available in Cape Coast?',
      answer:
        'You can choose from hotels, guest houses, beachfront stays, vacation rentals and cultural lodges, depending on your style and budget.',
    },
    {
      id: 'distance',
      question: 'How close are most stays to Cape Coast Castle and Kakum?',
      answer:
        'Many properties are within a short drive of Cape Coast Castle and within 45–60 minutes of Kakum National Park, making day trips easy.',
    },
    {
      id: 'wifi',
      question: 'Do most accommodations offer Wi-Fi and basic amenities?',
      answer:
        'Most listed properties provide essentials such as Wi-Fi, comfortable bedding, and private bathrooms. Some also offer breakfast, pools, and airport transfers.',
    },
  ];

  const toggleAmenityFilter = (amenity: string) => {
    setAmenityFilters((current) =>
      current.includes(amenity)
        ? current.filter((a) => a !== amenity)
        : [...current, amenity],
    );
  };

  const toggleSaved = (id: AccommodationId) => {
    setSavedIds((current) =>
      current.includes(id)
        ? current.filter((savedId) => savedId !== id)
        : [...current, id],
    );
  };

  const toggleTripPlan = (id: AccommodationId) => {
    setTripPlanIds((current) =>
      current.includes(id)
        ? current.filter((tripId) => tripId !== id)
        : [...current, id],
    );
  };

  const toggleCompare = (id: AccommodationId) => {
    setCompareIds((current) =>
      current.includes(id)
        ? current.filter((compareId) => compareId !== id)
        : [...current, id],
    );
  };

  const filteredAccommodations = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return allAccommodations.filter((hotel) => {
      const matchesCategory =
        selectedCategory === 'all' || hotel.category === selectedCategory;

      const matchesSearch =
        term === '' ||
        hotel.name.toLowerCase().includes(term) ||
        (hotel.description ?? '').toLowerCase().includes(term) ||
        (Array.isArray(hotel.facilities) &&
          hotel.facilities.some(
            (facility) => (facility ?? '').toLowerCase().includes(term),
          ));

      const matchesAmenities =
        amenityFilters.length === 0 ||
        (Array.isArray(hotel.facilities) &&
          amenityFilters.every((filter) =>
            hotel.facilities?.includes(filter),
          ));

      return matchesCategory && matchesSearch && matchesAmenities;
    });
  }, [selectedCategory, searchTerm, amenityFilters]);

  const tripHotels = useMemo(
    () =>
      allAccommodations.filter((hotel) =>
        tripPlanIds.includes(hotel.id),
      ),
    [tripPlanIds],
  );

  const compareHotels = useMemo(
    () =>
      allAccommodations.filter((hotel) =>
        compareIds.includes(hotel.id),
      ),
    [compareIds],
  );

  const getBadgesForHotel = (hotel: Accommodation): string[] => {
    const badges: string[] = [];

    if (hotel.category === 'beachfront') {
      badges.push('Beachfront');
    }
    if (hotel.category === 'cultural') {
      badges.push('Cultural stay');
    }
    if (hotel.category === 'hotel_and_guest_house') {
      badges.push('Top pick');
    }
    if (
      Array.isArray(hotel.facilities) &&
      hotel.facilities.some((f) => (f ?? '').toLowerCase().includes('family'))
    ) {
      badges.push('Great for families');
    }

    return badges;
  };

  const localInfoForHotel = (hotel: Accommodation): string => {
    if (hotel.category === 'beachfront') {
      return 'Ideal for beach lovers and sunset views.';
    }
    if (hotel.category === 'cultural') {
      return 'Perfect for guests seeking history and local culture.';
    }
    if (hotel.category === 'airbnb') {
      return 'Great for longer stays and independent travellers.';
    }
    return 'Easy access to Cape Coast highlights and attractions.';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-10 sm:mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-500 mb-3">
            Stay in Cape Coast
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
            Accommodation
          </h1>
          <p className="mt-5 text-base sm:text-lg leading-7 sm:leading-8 text-slate-600">
            Find the perfect place to stay — from beachfront escapes and heritage
            guest houses to modern vacation rentals, all curated by our destination
            team.
          </p>
        </div>

        {/* Search + View Toggle */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Search bar */}
          <div className="w-full md:max-w-xl">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-amber-50 text-[11px] font-semibold uppercase tracking-wide text-amber-700">
                  <Filter className="h-3.5 w-3.5" />
                </span>
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by hotel name, area, or facilities..."
                className="w-full rounded-full border border-slate-200 bg-white/90 pl-12 pr-4 py-2.5 text-sm sm:text-[15px] text-slate-800 shadow-sm outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
              />
            </div>
          </div>

          {/* View toggle */}
          <div className="inline-flex self-start md:self-auto rounded-full border border-slate-100 bg-white/80 p-1 shadow-sm">
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs sm:text-sm font-medium transition-all ${
                viewMode === 'list'
                  ? 'bg-slate-900 text-white shadow'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <List className="h-4 w-4" />
              List view
            </button>
            <button
              type="button"
              onClick={() => setViewMode('map')}
              className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs sm:text-sm font-medium transition-all ${
                viewMode === 'map'
                  ? 'bg-slate-900 text-white shadow'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <MapIcon className="h-4 w-4" />
              Map view
            </button>
          </div>
        </div>

        {/* Category filter */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-slate-900 text-white shadow-md shadow-slate-300/40'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-amber-500 hover:text-amber-700 hover:shadow-sm'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Quick filters */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Suggested filters
            </p>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {quickFilters.map((filter) => (
              <button
                key={filter.id}
                type="button"
                onClick={() => setSelectedCategory(filter.categoryId)}
                className={`flex-shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
                  selectedCategory === filter.categoryId
                    ? 'border-amber-500 bg-amber-50 text-amber-700'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-amber-400 hover:bg-amber-50/60 hover:text-amber-700'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Amenity chips */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Amenities
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {amenityChips.map((amenity) => {
              const active = amenityFilters.includes(amenity);
              return (
                <button
                  key={amenity}
                  type="button"
                  onClick={() => toggleAmenityFilter(amenity)}
                  className={`inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
                    active
                      ? 'border-amber-500 bg-amber-50 text-amber-700 shadow-sm'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-amber-400 hover:bg-amber-50/60 hover:text-amber-700'
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      active ? 'bg-amber-500' : 'bg-slate-300'
                    }`}
                  />
                  {amenity}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main content layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,0.9fr)] gap-8 lg:items-start">
          {/* List / Map view */}
          <div>
            {viewMode === 'list' ? (
              <>
                <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2">
                  {filteredAccommodations.map((hotel) => {
                    const badges = getBadgesForHotel(hotel);
                    const isSaved = savedIds.includes(hotel.id);
                    const inTrip = tripPlanIds.includes(hotel.id);
                    const inCompare = compareIds.includes(hotel.id);

                    return (
                      <Link
                        key={hotel.id}
                        to={`/accommodation/${hotel.id}`}
                        className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white/95 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/60 hover:shadow-2xl"
                      >
                        {/* Image / gallery trigger */}
                        <div
                          className="relative h-56 sm:h-64 cursor-pointer overflow-hidden"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setGalleryHotel(hotel);
                          }}
                        >
                          <img
                            src={hotel.image_url}
                            alt={hotel.name}
                            className="h-full w-full transform object-cover transition duration-500 group-hover:scale-110"
                          />
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                          <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3">
                            <div className="max-w-[70%]">
                              <p className="line-clamp-1 text-[11px] font-medium uppercase tracking-wide text-white/70">
                                Cape Coast • Curated stay
                              </p>
                              <p className="mt-0.5 line-clamp-1 text-sm font-semibold text-white">
                                {hotel.name}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                toggleSaved(hotel.id);
                              }}
                              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-amber-500 shadow-sm transition hover:scale-105 hover:bg-white"
                            >
                              <Heart
                                className={`h-4 w-4 ${
                                  isSaved ? 'fill-amber-500' : ''
                                }`}
                              />
                            </button>
                          </div>
                          {badges.length > 0 && (
                            <div className="absolute left-4 top-4 flex flex-wrap gap-1.5">
                              {badges.map((badge) => (
                                <span
                                  key={badge}
                                  className="rounded-full bg-amber-50/90 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-amber-700 shadow-sm"
                                >
                                  {badge}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Card body */}
                        <div className="flex flex-1 flex-col p-5 sm:p-6">
                          <div className="mb-3 flex items-start justify-between gap-2">
                            <h3 className="text-lg sm:text-xl font-semibold text-slate-900 group-hover:text-amber-700 transition-colors">
                              {hotel.name}
                            </h3>
                          </div>
                          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                            {localInfoForHotel(hotel)}
                          </p>
                          <p className="mb-4 text-sm sm:text-[15px] text-slate-600 line-clamp-2">
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
                              <div className="text-xs sm:text-sm font-medium text-amber-600">
                                +{hotel.facilities.length - 3} more facilities
                              </div>
                            )}
                          </div>

                          {/* Actions */}
                          <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                toggleTripPlan(hotel.id);
                              }}
                              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all ${
                                inTrip
                                  ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                                  : 'border-slate-200 bg-white text-slate-700 hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700'
                              }`}
                            >
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                              {inTrip ? 'In trip plan' : 'Add to trip plan'}
                            </button>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                toggleCompare(hotel.id);
                              }}
                              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all ${
                                inCompare
                                  ? 'border-slate-900 bg-slate-900 text-white'
                                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-900 hover:bg-slate-900 hover:text-white'
                              }`}
                            >
                              Compare
                            </button>

                            <span className="ml-auto hidden text-xs font-medium uppercase tracking-[0.18em] text-slate-400 sm:inline">
                              View details
                            </span>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>

                {filteredAccommodations.length === 0 && (
                  <div className="mt-10 rounded-2xl border border-slate-100 bg-white/95 py-12 px-6 text-center shadow-sm">
                    <p className="text-sm font-semibold text-slate-900">
                      No accommodations found.
                    </p>
                    <p className="mt-2 text-sm text-slate-500">
                      Try clearing some filters or adjusting your search to discover
                      more places to stay in Cape Coast.
                    </p>
                  </div>
                )}
              </>
            ) : (
              /* Map view */
              <div className="space-y-6">
                <div className="overflow-hidden rounded-2xl border border-slate-100 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 sm:p-6 shadow-md">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">
                        Map preview
                      </p>
                      <p className="mt-1 text-sm text-slate-100">
                        Pins represent stays filtered by your search and categories.
                      </p>
                    </div>
                    <MapIcon className="h-5 w-5 text-amber-400" />
                  </div>
                  <div className="relative h-64 rounded-xl bg-slate-900/60">
                    {/* Mock pins */}
                    <div className="absolute left-[15%] top-[30%]">
                      <div className="h-4 w-4 rounded-full bg-amber-400 shadow-lg shadow-amber-500/50" />
                    </div>
                    <div className="absolute left-[40%] top-[55%]">
                      <div className="h-3.5 w-3.5 rounded-full bg-amber-300 shadow-lg shadow-amber-500/40" />
                    </div>
                    <div className="absolute right-[20%] top-[35%]">
                      <div className="h-4 w-4 rounded-full bg-emerald-400 shadow-lg shadow-emerald-500/50" />
                    </div>
                    <div className="absolute right-[30%] bottom-[20%]">
                      <div className="h-3 w-3 rounded-full bg-sky-400 shadow-lg shadow-sky-500/50" />
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-white/95 p-4 sm:p-5 shadow-sm">
                  <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Stays in this area
                  </p>
                  <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                    {filteredAccommodations.map((hotel) => (
                      <Link
                        key={hotel.id}
                        to={`/accommodation/${hotel.id}`}
                        className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white/90 p-3 text-sm text-slate-700 transition hover:border-amber-500/70 hover:bg-amber-50/40"
                      >
                        <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg bg-slate-100">
                          <img
                            src={hotel.image_url}
                            alt={hotel.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-semibold text-slate-900">
                            {hotel.name}
                          </p>
                          <p className="mt-0.5 line-clamp-1 text-xs text-slate-500">
                            {localInfoForHotel(hotel)}
                          </p>
                        </div>
                        <MapPin className="h-4 w-4 flex-shrink-0 text-amber-500" />
                      </Link>
                    ))}

                    {filteredAccommodations.length === 0 && (
                      <p className="text-sm text-slate-500">
                        No stays match your current filters on the map.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Compare section */}
            {compareHotels.length > 0 && (
              <div className="mt-10 rounded-2xl border border-slate-100 bg-white/95 p-5 sm:p-6 shadow-sm">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Compare selected stays
                </p>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-slate-100">
                        <th className="pb-2 pr-4 font-semibold text-slate-500">
                          Stay
                        </th>
                        <th className="pb-2 pr-4 font-semibold text-slate-500">
                          Category
                        </th>
                        <th className="pb-2 pr-4 font-semibold text-slate-500">
                          Highlight
                        </th>
                        <th className="pb-2 pr-4 font-semibold text-slate-500">
                          Facilities (sample)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {compareHotels.map((hotel) => (
                        <tr
                          key={hotel.id}
                          className="border-b border-slate-100 last:border-0"
                        >
                          <td className="py-2 pr-4 text-slate-900">
                            {hotel.name}
                          </td>
                          <td className="py-2 pr-4 text-slate-600">
                            {hotel.category}
                          </td>
                          <td className="py-2 pr-4 text-slate-600">
                            {localInfoForHotel(hotel)}
                          </td>
                          <td className="py-2 pr-4 text-slate-600">
                            {hotel.facilities.slice(0, 3).join(' • ')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Right sidebar: trip plan + summary */}
          <div className="space-y-6 lg:sticky lg:top-24">
            {/* Trip plan card */}
            <div className="rounded-2xl border border-slate-100 bg-white/95 p-5 shadow-sm">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Trip plan
              </p>
              {tripHotels.length === 0 ? (
                <p className="text-sm text-slate-500">
                  Add stays to your trip plan to keep track of your favourite
                  options for Cape Coast.
                </p>
              ) : (
                <div className="space-y-3">
                  {tripHotels.map((hotel) => (
                    <div
                      key={hotel.id}
                      className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/80 p-3"
                    >
                      <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg bg-slate-100">
                        <img
                          src={hotel.image_url}
                          alt={hotel.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-slate-900">
                          {hotel.name}
                        </p>
                        <p className="truncate text-xs text-slate-500">
                          {localInfoForHotel(hotel)}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => toggleTripPlan(hotel.id)}
                        className="text-xs font-medium text-amber-700 hover:text-amber-900"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <p className="pt-1 text-xs text-slate-500">
                    You can share this list with your travel companions or your
                    destination manager later.
                  </p>
                </div>
              )}
            </div>

            {/* Small summary card */}
            <div className="rounded-2xl border border-slate-100 bg-white/95 p-5 shadow-sm">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Your selection
              </p>
              <div className="space-y-2 text-sm text-slate-700">
                <p>
                  <span className="font-semibold text-slate-900">
                    {filteredAccommodations.length}
                  </span>{' '}
                  stays match your filters.
                </p>
                <p>
                  <span className="font-semibold text-slate-900">
                    {savedIds.length}
                  </span>{' '}
                  saved to favourites.
                </p>
                <p>
                  <span className="font-semibold text-slate-900">
                    {compareIds.length}
                  </span>{' '}
                  selected for comparison.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ / SEO section */}
        <div className="mt-12 sm:mt-16">
          <div className="mx-auto max-w-3xl rounded-2xl border border-slate-100 bg-white/95 p-5 sm:p-6 shadow-sm">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Accommodation in Cape Coast — FAQ
            </p>
            <div className="divide-y divide-slate-100">
              {faqItems.map((item) => {
                const open = openFaq === item.id;
                return (
                  <div key={item.id} className="py-3">
                    <button
                      type="button"
                      onClick={() =>
                        setOpenFaq((current) =>
                          current === item.id ? null : item.id,
                        )
                      }
                      className="flex w-full items-center justify-between gap-2 text-left"
                    >
                      <span className="text-sm font-semibold text-slate-900">
                        {item.question}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 text-slate-500 transition-transform ${
                          open ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {open && (
                      <p className="mt-2 text-sm text-slate-600">
                        {item.answer}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky compare bar */}
      {compareIds.length >= 2 && (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/95 px-4 py-3 shadow-[0_-6px_24px_rgba(15,23,42,0.08)]">
          <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-2 sm:gap-3">
            <p className="text-xs sm:text-sm font-medium text-slate-800">
              Comparing{' '}
              <span className="font-semibold">{compareIds.length}</span> stays
              side by side.
            </p>
            <div className="hidden flex-1 flex-wrap items-center gap-1 text-xs text-slate-500 sm:flex">
              {compareHotels.map((hotel) => (
                <span
                  key={hotel.id}
                  className="rounded-full bg-slate-100 px-2 py-0.5"
                >
                  {hotel.name}
                </span>
              ))}
            </div>
            <div className="ml-auto flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCompareIds([])}
                className="text-xs font-medium text-slate-500 hover:text-slate-700"
              >
                Clear
              </button>
              <span className="hidden text-xs text-slate-500 sm:inline">
                Scroll to compare section above.
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Mobile sticky summary bar */}
      <div className="fixed inset-x-0 bottom-0 z-20 block border-t border-slate-200 bg-white/95 px-4 py-2.5 shadow-[0_-4px_18px_rgba(15,23,42,0.08)] sm:hidden">
        <div className="mx-auto flex max-w-3xl items-center justify-between text-[11px] font-medium text-slate-700">
          <span>
            {filteredAccommodations.length} stays • {savedIds.length} saved
          </span>
          <span>{tripPlanIds.length} in trip plan • {compareIds.length} in compare</span>
        </div>
      </div>

      {/* Gallery modal */}
      {galleryHotel && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-3xl rounded-2xl bg-slate-950/95 p-3 sm:p-4">
            <button
              type="button"
              onClick={() => setGalleryHotel(null)}
              className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-slate-100 shadow hover:bg-black/70"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="overflow-hidden rounded-xl bg-black">
              <img
                src={galleryHotel.image_url}
                alt={galleryHotel.name}
                className="max-h-[70vh] w-full object-contain"
              />
            </div>
            <div className="mt-3 flex items-center justify-between gap-2 px-1">
              <div>
                <p className="text-sm font-semibold text-slate-50">
                  {galleryHotel.name}
                </p>
                <p className="text-xs text-slate-300">
                  {localInfoForHotel(galleryHotel)}
                </p>
              </div>
              <span className="hidden text-xs font-medium uppercase tracking-[0.18em] text-slate-400 sm:inline">
                Click outside to close
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
