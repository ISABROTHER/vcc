import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Filter, X, ChevronDown } from 'lucide-react';
import { allAccommodations, FacilityIcon } from '../data/hotelData.tsx';

type Accommodation = (typeof allAccommodations)[number];
type AccommodationId = Accommodation['id'];

export default function AccommodationPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [amenityFilters, setAmenityFilters] = useState<string[]>([]);
  const [savedIds, setSavedIds] = useState<AccommodationId[]>([]);
  const [tripPlanIds, setTripPlanIds] = useState<AccommodationId[]>([]);
  const [galleryHotel, setGalleryHotel] = useState<Accommodation | null>(null);
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All accommodation' },
    { id: 'hotel_and_guest_house', label: 'Hotels & guest houses' },
    { id: 'beachfront', label: 'Beachfront stays' },
    { id: 'airbnb', label: 'Vacation rentals' },
    { id: 'cultural', label: 'Cultural stays' },
  ];

  const amenityChips = [
    'Free Wi-Fi',
    'Breakfast included',
    'Swimming pool',
    'Beach access',
    'Parking',
    'Air conditioning',
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
      question: 'How close are most stays to key attractions?',
      answer:
        'Many properties are within a short drive of Cape Coast Castle and within 45–60 minutes of Kakum National Park, making day trips easy to plan.',
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-10 sm:mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-500 mb-3">
            Stay in Cape Coast
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
            Places to stay
          </h1>
          <p className="mt-5 text-base sm:text-lg leading-7 sm:leading-8 text-slate-600">
            Cape Coast offers a diverse range of accommodation, from beachfront
            escapes to cozy guest houses and vacation rentals, making it easy to
            combine unforgettable experiences with a good night&apos;s rest.
          </p>
        </div>

        {/* Search */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
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
                placeholder="Search by name, area or facilities..."
                className="w-full rounded-full border border-slate-200 bg-white/90 pl-12 pr-4 py-2.5 text-sm sm:text-[15px] text-slate-800 shadow-sm outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
              />
            </div>
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

        {/* Main layout: list + sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,0.9fr)] gap-8 lg:items-start">
          {/* List view */}
          <div>
            <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2">
              {filteredAccommodations.map((hotel) => {
                const isSaved = savedIds.includes(hotel.id);
                const inTrip = tripPlanIds.includes(hotel.id);

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
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
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
                    </div>

                    {/* Card body – ONLY name, description, actions */}
                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <h3 className="text-lg sm:text-xl font-semibold text-slate-900 group-hover:text-amber-700 transition-colors">
                        {hotel.name}
                      </h3>
                      <p className="mt-2 text-sm sm:text-[15px] text-slate-600 line-clamp-3">
                        {hotel.description}
                      </p>

                      {/* Actions: Add to trip plan + View details */}
                      <div className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
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

                        <span className="ml-auto text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
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
                          Added to your Cape Coast stay ideas.
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
                    {tripPlanIds.length}
                  </span>{' '}
                  added to your trip plan.
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

      {/* Mobile sticky summary bar */}
      <div className="fixed inset-x-0 bottom-0 z-20 block border-t border-slate-200 bg-white/95 px-4 py-2.5 shadow-[0_-4px_18px_rgba(15,23,42,0.08)] sm:hidden">
        <div className="mx-auto flex max-w-3xl items-center justify-between text-[11px] font-medium text-slate-700">
          <span>
            {filteredAccommodations.length} stays • {savedIds.length} saved
          </span>
          <span>{tripPlanIds.length} in trip plan</span>
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
                  A curated place to stay in the Cape Coast area.
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
