import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Filter, X, ChevronDown, ChevronRight } from 'lucide-react';
import { allAccommodations } from '../data/hotelData.tsx';

type Accommodation = (typeof allAccommodations)[number];
type AccommodationId = Accommodation['id'];

export default function AccommodationPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [amenityFilters, setAmenityFilters] = useState<string[]>([]);
  const [tripPlanIds, setTripPlanIds] = useState<AccommodationId[]>([]);
  const [galleryHotel, setGalleryHotel] = useState<Accommodation | null>(null);
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(12);
  const [mobileFilterTab, setMobileFilterTab] = useState<'stay' | 'amenities'>(
    'stay',
  );
  const [showAllAmenities, setShowAllAmenities] = useState(false);

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

  const visibleAccommodations = useMemo(
    () => filteredAccommodations.slice(0, visibleCount),
    [filteredAccommodations, visibleCount],
  );

  const tripHotels = useMemo(
    () =>
      allAccommodations.filter((hotel) =>
        tripPlanIds.includes(hotel.id),
      ),
    [tripPlanIds],
  );

  const visibleAmenities = showAllAmenities
    ? amenityChips
    : amenityChips.slice(0, 8);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        {/* Header */}
        <header className="mx-auto max-w-3xl text-center mb-10 sm:mb-12">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-amber-600 mb-3">
            Stay in Cape Coast
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900">
            Places to stay
          </h1>
          <p className="mt-5 text-base sm:text-lg leading-relaxed text-slate-600">
            Cape Coast offers a diverse range of accommodation, from beachfront
            escapes to cozy guest houses and vacation rentals, making it easy to
            combine memorable days out with a good night&apos;s rest.
          </p>
        </header>

        {/* Filters block: search + categories + amenities */}
        <section className="mb-12">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 lg:p-7 shadow-sm">
            {/* Search */}
            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-slate-800">
                Search
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                  <Filter className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setVisibleCount(12);
                  }}
                  placeholder="Search by name, area or facilities..."
                  className="w-full rounded-lg border border-slate-300 bg-white pl-10 pr-4 py-2.5 text-sm text-slate-800 outline-none transition focus:border-amber-500 focus:ring-1 focus:ring-amber-300 placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Mobile toggle for Stay type / Amenities */}
            <div className="mb-4 flex justify-center sm:hidden">
              <div className="inline-flex rounded-full bg-slate-100 p-1">
                <button
                  type="button"
                  onClick={() => setMobileFilterTab('stay')}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold ${
                    mobileFilterTab === 'stay'
                      ? 'bg-white shadow-sm text-slate-900'
                      : 'text-slate-600'
                  }`}
                >
                  Stay type
                </button>
                <button
                  type="button"
                  onClick={() => setMobileFilterTab('amenities')}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold ${
                    mobileFilterTab === 'amenities'
                      ? 'bg-white shadow-sm text-slate-900'
                      : 'text-slate-600'
                  }`}
                >
                  Amenities
                </button>
              </div>
            </div>

            {/* Stay type */}
            <div
              className={`mb-6 ${
                mobileFilterTab !== 'stay' ? 'hidden sm:block' : ''
              }`}
            >
              <p className="mb-2 text-sm font-medium text-slate-800">
                Stay type
              </p>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setSelectedCategory(category.id);
                      setVisibleCount(12);
                    }}
                    className={`rounded-full px-4 sm:px-5 py-1.5 text-sm font-medium transition border ${
                      selectedCategory === category.id
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-white text-slate-700 border-slate-300 hover:border-amber-500 hover:text-amber-700'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div
              className={`${mobileFilterTab !== 'amenities' ? 'hidden sm:block' : ''}`}
            >
              <p className="mb-2 text-sm font-medium text-slate-800">
                Amenities
              </p>
              <div className="flex gap-2 sm:gap-3 overflow-x-auto sm:flex-wrap sm:overflow-visible pb-1 -mx-1 sm:mx-0 px-1 sm:px-0">
                {visibleAmenities.map((amenity) => {
                  const active = amenityFilters.includes(amenity);
                  return (
                    <button
                      key={amenity}
                      type="button"
                      onClick={() => {
                        toggleAmenityFilter(amenity);
                        setVisibleCount(12);
                      }}
                      className={`inline-flex items-center gap-2 flex-shrink-0 rounded-full px-4 py-1.5 text-sm font-medium border transition ${
                        active
                          ? 'border-amber-500 bg-amber-50 text-amber-700'
                          : 'border-slate-300 bg-white text-slate-700 hover:border-amber-400 hover:text-amber-700'
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
              {amenityChips.length > 8 && (
                <div className="mt-2">
                  <button
                    type="button"
                    onClick={() => setShowAllAmenities((prev) => !prev)}
                    className="text-xs font-medium text-amber-700 hover:text-amber-900"
                  >
                    {showAllAmenities ? 'Show fewer filters' : 'Show all filters'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Main layout: list + sidebar */}
        <main className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,0.9fr)] lg:items-start">
          {/* List view */}
          <section>
            <div className="grid grid-cols-1 gap-8 sm:gap-10 md:grid-cols-2">
              {visibleAccommodations.map((hotel) => {
                const inTrip = tripPlanIds.includes(hotel.id);

                return (
                  <Link
                    key={hotel.id}
                    to={`/accommodation/${hotel.id}`}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg"
                  >
                    {/* Image / overlay */}
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
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-transparent" />
                      <div className="absolute left-4 right-4 bottom-4 flex justify-between gap-3">
                        <div className="max-w-[80%] rounded-lg bg-black/80 px-3 py-2.5">
                          <p className="text-lg sm:text-xl font-bold text-white leading-tight">
                            {hotel.name}
                          </p>
                          <p className="mt-1 text-[10px] sm:text-[11px] font-medium text-amber-300 tracking-wide flex items-center gap-1">
                            <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-300" />
                            Verified by Visit Cape Coast
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Card body */}
                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      {hotel.description && (
                        <p className="text-xs sm:text-sm font-medium text-slate-700 mb-3 leading-relaxed uppercase line-clamp-3">
                          {hotel.description}
                        </p>
                      )}

                      {/* Actions */}
                      <div className="mt-4 flex items-center gap-3 border-t border-slate-200 pt-4">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleTripPlan(hotel.id);
                          }}
                          className={`inline-flex items-center rounded-full px-4 py-1.5 text-xs sm:text-sm font-semibold border transition ${
                            inTrip
                              ? 'border-emerald-600 bg-emerald-50 text-emerald-700'
                              : 'border-slate-300 bg-white text-slate-700 hover:border-emerald-600 hover:text-emerald-700'
                          }`}
                        >
                          {inTrip ? 'In trip plan' : 'Add to trip plan'}
                        </button>

                        <span className="ml-auto inline-flex items-center gap-1 rounded-full border border-slate-300 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-600 transition group-hover:border-amber-500 group-hover:text-amber-700">
                          View details
                          <ChevronRight className="h-3 w-3" />
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Load more button */}
            {visibleCount < filteredAccommodations.length && (
              <div className="mt-10 flex justify-center">
                <button
                  type="button"
                  onClick={() => setVisibleCount((prev) => prev + 12)}
                  className="rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:border-amber-500 hover:text-amber-700"
                >
                  Show more stays
                </button>
              </div>
            )}

            {filteredAccommodations.length === 0 && (
              <div className="mt-12 rounded-2xl border border-slate-200 bg-white py-10 px-6 text-center shadow-sm">
                <p className="text-sm font-semibold text-slate-900">
                  No accommodations found.
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  Try changing your filters or search to discover more places to
                  stay in Cape Coast.
                </p>
              </div>
            )}
          </section>

          {/* Trip plan sidebar */}
          <aside className="space-y-8 lg:sticky lg:top-24">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
                Trip plan
              </p>
              {tripHotels.length === 0 ? (
                <p className="text-sm text-slate-600 leading-relaxed">
                  Add stays to your trip plan to keep track of the places you&apos;d
                  like to stay in Cape Coast.
                </p>
              ) : (
                <div className="space-y-3">
                  {tripHotels.map((hotel) => (
                    <div
                      key={hotel.id}
                      className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3"
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
                          Added to your stay ideas.
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
                </div>
              )}
            </div>
          </aside>
        </main>

        {/* FAQ */}
        <section className="mt-14">
          <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
              Accommodation in Cape Coast — FAQ
            </p>
            <div className="divide-y divide-slate-200">
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
                      <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                        {item.answer}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>

      {/* Gallery modal */}
      {galleryHotel && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60">
          <div className="relative w-full max-w-3xl rounded-2xl bg-slate-900 p-3 sm:p-4">
            <button
              type="button"
              onClick={() => setGalleryHotel(null)}
              className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-slate-100 hover:bg-black"
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
