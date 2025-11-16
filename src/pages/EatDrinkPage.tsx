import { useEffect, useMemo, useState } from 'react';
import {
  Heart,
  Martini,
  Coffee,
  ChefHat,
  Search,
  Calendar,
  MapPin,
  Map as MapIcon,
  List as ListIcon,
  LayoutGrid,
  ChevronDown,
  Check,
} from 'lucide-react';

type ViewMode = 'map' | 'list' | 'split';
type CategoryId = 'all' | 'bar' | 'cafe' | 'restaurant';
type MonthFilterId = 'any' | 'jan-mar' | 'apr-jun' | 'jul-sep' | 'oct-dec';
type LocationFilterId = 'any' | 'cape-coast' | 'elmina' | 'abura' | 'other';

const PLACES = [
  {
    id: 1,
    name: 'Castle View Restaurant',
    type: 'restaurant' as const,
    locationId: 'cape-coast' as const,
    locationLabel: 'Cape Coast',
    monthTags: ['any'],
    description: 'Seafood and local dishes with views towards Cape Coast Castle.',
  },
  {
    id: 2,
    name: 'Oasis Beach Bar',
    type: 'bar' as const,
    locationId: 'cape-coast' as const,
    locationLabel: 'Cape Coast',
    monthTags: ['any', 'jul-sep'],
    description: 'Beachfront bar with live music, cocktails and a relaxed vibe.',
  },
  {
    id: 3,
    name: 'Elmina Harbour Café',
    type: 'cafe' as const,
    locationId: 'elmina' as const,
    locationLabel: 'Elmina',
    monthTags: ['any', 'jan-mar'],
    description: 'Casual café near the harbour, perfect for coffee and light bites.',
  },
  {
    id: 4,
    name: 'Abura Garden Spot',
    type: 'restaurant' as const,
    locationId: 'abura' as const,
    locationLabel: 'Abura',
    monthTags: ['any', 'apr-jun'],
    description: 'Garden-style dining with local favourites and grilled options.',
  },
  {
    id: 5,
    name: 'Lagoon Night Lounge',
    type: 'bar' as const,
    locationId: 'other' as const,
    locationLabel: 'Around Cape Coast',
    monthTags: ['any', 'oct-dec'],
    description: 'Late-night lounge with DJ sets and small plates.',
  },
];

const CATEGORY_CONFIG: { id: CategoryId; label: string; icon: any }[] = [
  { id: 'all', label: 'All categories', icon: Heart },
  { id: 'bar', label: 'Bar & pub', icon: Martini },
  { id: 'cafe', label: 'Café', icon: Coffee },
  { id: 'restaurant', label: 'Restaurant', icon: ChefHat },
];

const MONTH_OPTIONS: { id: MonthFilterId; label: string }[] = [
  { id: 'any', label: 'Any time' },
  { id: 'jan-mar', label: 'Jan – Mar' },
  { id: 'apr-jun', label: 'Apr – Jun' },
  { id: 'jul-sep', label: 'Jul – Sep' },
  { id: 'oct-dec', label: 'Oct – Dec' },
];

const LOCATION_OPTIONS: { id: LocationFilterId; label: string }[] = [
  { id: 'any', label: 'Any location' },
  { id: 'cape-coast', label: 'Cape Coast' },
  { id: 'elmina', label: 'Elmina' },
  { id: 'abura', label: 'Abura' },
  { id: 'other', label: 'Around Cape Coast' },
];

const isCategoryId = (value: string | null): value is CategoryId =>
  !!value && ['all', 'bar', 'cafe', 'restaurant'].includes(value);

const isMonthFilterId = (value: string | null): value is MonthFilterId =>
  !!value && ['any', 'jan-mar', 'apr-jun', 'jul-sep', 'oct-dec'].includes(value);

const isLocationFilterId = (value: string | null): value is LocationFilterId =>
  !!value &&
  ['any', 'cape-coast', 'elmina', 'abura', 'other'].includes(value);

const isViewMode = (value: string | null): value is ViewMode =>
  !!value && ['map', 'list', 'split'].includes(value);

export default function EatDrinkPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');
  const [activeView, setActiveView] = useState<ViewMode>('list');
  const [isMonthOpen, setIsMonthOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [monthFilter, setMonthFilter] = useState<MonthFilterId>('any');
  const [locationFilter, setLocationFilter] = useState<LocationFilterId>('any');
  const [isLoading, setIsLoading] = useState(false);

  const selectedMonthLabel =
    MONTH_OPTIONS.find((m) => m.id === monthFilter)?.label ?? 'Any time';
  const selectedLocationLabel =
    LOCATION_OPTIONS.find((l) => l.id === locationFilter)?.label ??
    'Any location';

  const hasActiveFilters =
    searchQuery.trim().length > 0 ||
    activeCategory !== 'all' ||
    monthFilter !== 'any' ||
    locationFilter !== 'any';

  // Initialise filters from URL (shareable state)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);

    const q = params.get('q');
    const cat = params.get('cat');
    const month = params.get('month');
    const loc = params.get('loc');
    const view = params.get('view');

    if (q) setSearchQuery(q);
    if (isCategoryId(cat)) setActiveCategory(cat);
    if (isMonthFilterId(month)) setMonthFilter(month);
    if (isLocationFilterId(loc)) setLocationFilter(loc);
    if (isViewMode(view)) setActiveView(view);
  }, []);

  // Keep URL in sync with filters
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);

    if (searchQuery) params.set('q', searchQuery);
    else params.delete('q');

    if (activeCategory !== 'all') params.set('cat', activeCategory);
    else params.delete('cat');

    if (monthFilter !== 'any') params.set('month', monthFilter);
    else params.delete('month');

    if (locationFilter !== 'any') params.set('loc', locationFilter);
    else params.delete('loc');

    if (activeView !== 'list') params.set('view', activeView);
    else params.delete('view');

    const queryString = params.toString();
    const newUrl = queryString
      ? `${window.location.pathname}?${queryString}`
      : window.location.pathname;

    window.history.replaceState(null, '', newUrl);
  }, [searchQuery, activeCategory, monthFilter, locationFilter, activeView]);

  // Small loading state whenever filters/search change (UX only)
  useEffect(() => {
    setIsLoading(true);
    const id = window.setTimeout(() => {
      setIsLoading(false);
    }, 250);
    return () => window.clearTimeout(id);
  }, [searchQuery, activeCategory, monthFilter, locationFilter]);

  const filteredPlaces = useMemo(() => {
    return PLACES.filter((place) => {
      if (activeCategory !== 'all' && place.type !== activeCategory) {
        return false;
      }

      if (monthFilter !== 'any' && !place.monthTags.includes(monthFilter)) {
        return false;
      }

      if (locationFilter !== 'any' && place.locationId !== locationFilter) {
        return false;
      }

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const text =
          `${place.name} ${place.description} ${place.locationLabel}`.toLowerCase();
        if (!text.includes(query)) {
          return false;
        }
      }

      return true;
    });
  }, [activeCategory, monthFilter, locationFilter, searchQuery]);

  const searchSuggestions = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return PLACES.filter((place) =>
      place.name.toLowerCase().includes(query),
    ).slice(0, 5);
  }, [searchQuery]);

  const handleClearAll = () => {
    setSearchQuery('');
    setActiveCategory('all');
    setMonthFilter('any');
    setLocationFilter('any');
  };

  return (
    <div className="w-full bg-slate-50">
      {/* Hero image */}
      <div className="h-[260px] w-full overflow-hidden sm:h-[360px] lg:h-[420px]">
        <img
          src="https://images.unsplash.com/photo-1529042410759-befb1204b468?q=80&w=1500"
          alt="Restaurants and food"
          className="h-full w-full object-cover object-center"
        />
      </div>

      {/* Intro heading + description + highlight cards */}
      <main className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
        <header>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Restaurants, cafés &amp; nightlife
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            Discover Cape Coast’s vibrant food and drink scene – from local chop
            bars and cosy cafés to beachfront bars and late-night spots.
          </p>
        </header>

        {/* Highlight cards with entrance animations */}
        <section
          aria-label="Featured food and drink experiences"
          className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3"
        >
          {[
            {
              img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1500',
              title: 'The taste of Cape Coast',
              caption: 'Discover authentic traditions and local ingredients.',
            },
            {
              img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1500',
              title: 'Easy & affordable',
              caption: 'Recommendations for low-cost, simple, friendly spots.',
            },
            {
              img: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1500',
              title: 'Bars, pubs & nightlife',
              caption: 'Social spots for drinks, dancing and good company.',
            },
            {
              img: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1500',
              title: 'Coffee & cake',
              caption: 'Perfect for brunch, pastries or chilled café moments.',
            },
            {
              img: 'https://images.unsplash.com/photo-1604908177225-df3b3f0c39eb?q=80&w=1500',
              title: 'Vegan & vegetarian',
              caption: 'Healthy and creative plant-based options around town.',
            },
            {
              img: 'https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=1500',
              title: 'All restaurants',
              caption: 'Full overview of every place to eat in Cape Coast.',
            },
          ].map((card, idx) => (
            <article
              key={idx}
              className="relative h-60 w-full overflow-hidden rounded-lg
                scale-95 opacity-0 motion-safe:animate-[fadeIn_0.6s_ease-out_forwards]
                delay-[calc(100ms*var(--idx))] hover:scale-100 hover:-translate-y-1
                hover:shadow-lg transition-transform duration-300 ease-in-out"
              style={{ '--idx': idx } as any}
            >
              <img
                src={card.img}
                className="h-full w-full object-cover"
                alt={card.title}
              />
              <div className="absolute bottom-0 left-0 w-[85%] bg-[#D9F3F0] p-4">
                <h3 className="font-semibold text-gray-900">{card.title}</h3>
                <p className="text-sm text-gray-700">{card.caption}</p>
              </div>
            </article>
          ))}
        </section>
      </main>

      {/* Main content: search, filters, results */}
      <section
        aria-label="Search and filter food and drink places"
        className="mx-auto max-w-7xl px-6 pb-24 sm:pb-32"
      >
        <div className="mx-auto max-w-7xl border-t border-gray-200 pt-8">
          {/* Category tabs */}
          <div className="mb-6">
            <div className="overflow-x-auto pb-2 -mx-6 px-6">
              <div
                className="inline-flex space-x-3"
                role="tablist"
                aria-label="Food and drink categories"
              >
                {CATEGORY_CONFIG.map((cat) => {
                  const Icon = cat.icon;
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`flex-shrink-0 inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 border ${
                        isActive
                          ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                      }`}
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                      <span>{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Search + dropdown filters + view mode */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Search bar with suggestions */}
            <div className="relative flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search restaurants, bars, cafés..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-full border border-slate-200 bg-white py-3 pl-5 pr-14 text-sm text-slate-900 shadow-sm placeholder:text-slate-500 outline-none transition focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  aria-label="Search restaurants, cafés and bars"
                />
                <button
                  type="button"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full bg-slate-900 text-white transition hover:bg-slate-800"
                  aria-label="Search"
                >
                  <Search className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              {/* Autocomplete suggestions */}
              {searchQuery.trim().length > 1 && searchSuggestions.length > 0 && (
                <ul
                  className="absolute z-20 mt-1 w-full overflow-hidden rounded-xl border border-slate-200 bg-white text-sm shadow-lg motion-safe:animate-[fadeIn_0.3s_ease-out] translate-y-1"
                  role="listbox"
                  aria-label="Search suggestions"
                >
                  {searchSuggestions.map((place) => (
                    <li key={place.id}>
                      <button
                        type="button"
                        className="flex w-full items-start justify-between px-4 py-2.5 text-left text-slate-800 hover:bg-slate-50"
                        onMouseDown={() => setSearchQuery(place.name)}
                      >
                        <span>{place.name}</span>
                        <span className="ml-2 text-xs text-slate-500">
                          {place.locationLabel}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Filters + View */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-2">
              {/* Dropdown filters */}
              <div className="flex flex-1 items-center gap-2 sm:flex-none">
                {/* Months */}
                <div className="relative w-1/2 sm:w-auto">
                  <button
                    type="button"
                    onClick={() => {
                      setIsMonthOpen((prev) => !prev);
                      setIsLocationOpen(false);
                    }}
                    className="flex w-full items-center justify-between gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                    aria-haspopup="listbox"
                    aria-expanded={isMonthOpen}
                  >
                    <span className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" aria-hidden="true" />
                      <span>Months</span>
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 text-slate-500 transition-transform ${
                        isMonthOpen ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                  {isMonthOpen && (
                    <div className="absolute z-10 mt-1 w-full min-w-[200px] rounded-xl border border-slate-200 bg-white py-2 text-sm shadow-lg motion-safe:animate-[fadeIn_0.3s_ease-out]">
                      {MONTH_OPTIONS.map((m) => (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => {
                            setMonthFilter(m.id);
                            setIsMonthOpen(false);
                          }}
                          className="flex w-full items-center justify-between px-4 py-2 text-left text-slate-700 transition hover:bg-slate-50"
                          role="option"
                          aria-selected={monthFilter === m.id}
                        >
                          <span>{m.label}</span>
                          {monthFilter === m.id && (
                            <Check
                              className="h-4 w-4 text-slate-900"
                              aria-hidden="true"
                            />
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Location */}
                <div className="relative w-1/2 sm:w-auto">
                  <button
                    type="button"
                    onClick={() => {
                      setIsLocationOpen((prev) => !prev);
                      setIsMonthOpen(false);
                    }}
                    className="flex w-full items-center justify-between gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                    aria-haspopup="listbox"
                    aria-expanded={isLocationOpen}
                  >
                    <span className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" aria-hidden="true" />
                      <span>Location</span>
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 text-slate-500 transition-transform ${
                        isLocationOpen ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                  {isLocationOpen && (
                    <div className="absolute z-10 mt-1 w-full min-w-[200px] rounded-xl border border-slate-200 bg-white py-2 text-sm shadow-lg motion-safe:animate-[fadeIn_0.3s_ease-out]">
                      {LOCATION_OPTIONS.map((loc) => (
                        <button
                          key={loc.id}
                          type="button"
                          onClick={() => {
                            setLocationFilter(loc.id);
                            setIsLocationOpen(false);
                          }}
                          className="flex w-full items-center justify-between px-4 py-2 text-left text-slate-700 transition hover:bg-slate-50"
                          role="option"
                          aria-selected={locationFilter === loc.id}
                        >
                          <span>{loc.label}</span>
                          {locationFilter === loc.id && (
                            <Check
                              className="h-4 w-4 text-slate-900"
                              aria-hidden="true"
                            />
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* View mode toggle */}
              <div
                className="flex items-center justify-center rounded-full border border-slate-200 bg-white p-1.5 shadow-sm"
                aria-label="Change view mode"
              >
                <button
                  type="button"
                  onClick={() => setActiveView('map')}
                  className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    activeView === 'map'
                      ? 'bg-slate-100 text-slate-900'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  aria-pressed={activeView === 'map'}
                >
                  <MapIcon className="h-4 w-4" aria-hidden="true" />
                  <span className="hidden sm:inline">Map</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveView('list')}
                  className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    activeView === 'list'
                      ? 'bg-slate-100 text-slate-900'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  aria-pressed={activeView === 'list'}
                >
                  <ListIcon className="h-4 w-4" aria-hidden="true" />
                  <span className="hidden sm:inline">List</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveView('split')}
                  className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    activeView === 'split'
                      ? 'bg-slate-100 text-slate-900'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  aria-pressed={activeView === 'split'}
                >
                  <LayoutGrid className="h-4 w-4" aria-hidden="true" />
                  <span className="hidden sm:inline">Split</span>
                </button>
              </div>
            </div>
          </div>

          {/* Selected filter chips */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 pt-4 text-xs sm:text-sm">
              <span className="text-slate-500">Active filters:</span>
              {searchQuery.trim() && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="inline-flex items-center gap-1 rounded-full bg-slate-200 px-3 py-1 text-slate-700 hover:bg-slate-300"
                >
                  <span>Search: {searchQuery}</span>
                  <span className="text-slate-500" aria-hidden="true">
                    ×
                  </span>
                </button>
              )}
              {activeCategory !== 'all' && (
                <button
                  type="button"
                  onClick={() => setActiveCategory('all')}
                  className="inline-flex items-center gap-1 rounded-full bg-slate-200 px-3 py-1 text-slate-700 hover:bg-slate-300"
                >
                  <span>
                    {
                      CATEGORY_CONFIG.find((c) => c.id === activeCategory)
                        ?.label
                    }
                  </span>
                  <span className="text-slate-500" aria-hidden="true">
                    ×
                  </span>
                </button>
              )}
              {monthFilter !== 'any' && (
                <button
                  type="button"
                  onClick={() => setMonthFilter('any')}
                  className="inline-flex items-center gap-1 rounded-full bg-slate-200 px-3 py-1 text-slate-700 hover:bg-slate-300"
                >
                  <span>{selectedMonthLabel}</span>
                  <span className="text-slate-500" aria-hidden="true">
                    ×
                  </span>
                </button>
              )}
              {locationFilter !== 'any' && (
                <button
                  type="button"
                  onClick={() => setLocationFilter('any')}
                  className="inline-flex items-center gap-1 rounded-full bg-slate-200 px-3 py-1 text-slate-700 hover:bg-slate-300"
                >
                  <span>{selectedLocationLabel}</span>
                  <span className="text-slate-500" aria-hidden="true">
                    ×
                  </span>
                </button>
              )}
              <button
                type="button"
                onClick={handleClearAll}
                className="ml-auto text-xs font-medium text-slate-500 underline-offset-2 hover:text-slate-700 hover:underline"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Results section */}
          <div className="mt-8 space-y-4">
            <div className="flex items-center justify-between text-sm text-slate-600">
              <p>
                {isLoading
                  ? 'Loading places…'
                  : filteredPlaces.length === 0
                  ? 'No places found'
                  : `${filteredPlaces.length} place${
                      filteredPlaces.length === 1 ? '' : 's'
                    } loaded`}
              </p>
            </div>

            {isLoading ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex h-full flex-col rounded-lg border border-slate-200 bg-white p-4 animate-pulse"
                  >
                    <div className="flex items-start gap-3">
                      <div className="h-9 w-9 rounded-full bg-slate-200" />
                      <div className="flex-1 space-y-2">
                        <div className="h-3 w-3/4 rounded bg-slate-200" />
                        <div className="h-3 w-1/2 rounded bg-slate-200" />
                      </div>
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="h-3 w-full rounded bg-slate-200" />
                      <div className="h-3 w-5/6 rounded bg-slate-200" />
                      <div className="h-3 w-4/6 rounded bg-slate-200" />
                    </div>
                    <div className="mt-4 h-3 w-1/3 rounded bg-slate-200" />
                  </div>
                ))}
              </div>
            ) : filteredPlaces.length === 0 ? (
              <div className="rounded-lg border border-dashed border-slate-300 bg-white px-6 py-10 text-center">
                <p className="text-sm font-medium text-slate-800">
                  No places match your search.
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  Try removing a filter or searching for something different.
                </p>
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={handleClearAll}
                    className="mt-4 inline-flex items-center rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-black"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredPlaces.map((place) => {
                  const CategoryIcon =
                    CATEGORY_CONFIG.find((c) => c.id === place.type)?.icon ??
                    Heart;
                  return (
                    <article
                      key={place.id}
                      className="flex h-full flex-col rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-md"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-slate-100">
                          <CategoryIcon
                            className="h-4 w-4 text-slate-700"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="space-y-1">
                          <h2 className="text-sm font-semibold text-slate-900">
                            {place.name}
                          </h2>
                          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500">
                            <span className="capitalize">
                              {place.type === 'bar'
                                ? 'Bar & pub'
                                : place.type === 'cafe'
                                ? 'Café'
                                : 'Restaurant'}
                            </span>
                            <span aria-hidden="true">•</span>
                            <span className="inline-flex items-center gap-1">
                              <MapPin className="h-3 w-3" aria-hidden="true" />
                              {place.locationLabel}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="mt-3 line-clamp-3 text-sm text-slate-600 flex-1">
                        {place.description}
                      </p>
                      <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                        <span>
                          {place.monthTags.includes('any')
                            ? 'Open all year'
                            : 'Seasonal availability'}
                        </span>
                        <button
                          type="button"
                          className="text-xs font-medium text-slate-900 underline-offset-2 hover:underline"
                        >
                          View details
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}