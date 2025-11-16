import { useEffect, useMemo, useState } from "react";
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
} from "lucide-react";

type ViewMode = "map" | "list" | "split";
type CategoryId = "all" | "bar" | "cafe" | "restaurant";
type MonthFilterId = "any" | "jan-mar" | "apr-jun" | "jul-sep" | "oct-dec";
type LocationFilterId = "any" | "cape-coast" | "elmina" | "abura" | "other";

const PLACES = [
  {
    id: 1,
    name: "Becky Kay Restaurant & Bar",
    type: "restaurant" as const,
    locationId: "cape-coast" as const,
    locationLabel: "Cape Coast",
    monthTags: ["any"],
    imageUrl:
      "https://images.unsplash.com/photo-1521017432531-fbd92d768814?q=80&w=1200",
    description:
      "Modern restaurant and bar in Cape Coast serving local and continental dishes in a cosy setting.",
  },
  {
    id: 2,
    name: "Da Breeze Bar & Restaurant",
    type: "bar" as const,
    locationId: "cape-coast" as const,
    locationLabel: "Cape Coast",
    monthTags: ["any", "jul-sep"],
    imageUrl:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200",
    description:
      "Beachfront bar and restaurant with sea views, chilled music and fresh grilled favourites.",
  },
  {
    id: 3,
    name: "Castle Beach Restaurant",
    type: "restaurant" as const,
    locationId: "cape-coast" as const,
    locationLabel: "Cape Coast",
    monthTags: ["any"],
    imageUrl:
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1200",
    description:
      "Seafood and Ghanaian meals right by the ocean, a short walk from Cape Coast Castle.",
  },
  {
    id: 4,
    name: "Lemon Lounge",
    type: "restaurant" as const,
    locationId: "cape-coast" as const,
    locationLabel: "Cape Coast",
    monthTags: ["any", "oct-dec"],
    imageUrl:
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1200",
    description:
      "Stylish lounge with cocktails, sharing plates and a relaxed evening atmosphere.",
  },
  {
    id: 5,
    name: "Emperor Ital Joint",
    type: "restaurant" as const,
    locationId: "cape-coast" as const,
    locationLabel: "Cape Coast",
    monthTags: ["any"],
    imageUrl:
      "https://images.unsplash.com/photo-1546793665-c74683f339c1?q=80&w=1200",
    description:
      "Plant-based and ital-inspired meals, fresh juices and relaxed vibes in Cape Coast.",
  },
  {
    id: 6,
    name: "Sasakawa Restaurant",
    type: "restaurant" as const,
    locationId: "cape-coast" as const,
    locationLabel: "Cape Coast",
    monthTags: ["any", "jan-mar"],
    imageUrl:
      "https://images.unsplash.com/photo-1421622548261-c45bfe178854?q=80&w=1200",
    description:
      "Classic spot combining local Ghanaian dishes with simple continental favourites.",
  },
  {
    id: 7,
    name: "Oguaa Basiaba Tasty Cuisine",
    type: "restaurant" as const,
    locationId: "cape-coast" as const,
    locationLabel: "Cape Coast",
    monthTags: ["any", "apr-jun"],
    imageUrl:
      "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?q=80&w=1200",
    description:
      "Budget-friendly local eatery serving Fufu, Banku, Red-Red and other Ghanaian favourites.",
  },
  {
    id: 8,
    name: "New Life Café",
    type: "cafe" as const,
    locationId: "cape-coast" as const,
    locationLabel: "Cape Coast",
    monthTags: ["any"],
    imageUrl:
      "https://images.unsplash.com/photo-1485808191679-5f86510681a2?q=80&w=1200",
    description:
      "Casual café with light meals, snacks and drinks, ideal for small meetups and study sessions.",
  },
  {
    id: 9,
    name: "Cape Cafe & Restaurant",
    type: "cafe" as const,
    locationId: "cape-coast" as const,
    locationLabel: "Cape Coast",
    monthTags: ["any", "jul-sep"],
    imageUrl:
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1200",
    description:
      "A mix of café and restaurant, offering breakfast plates, coffees and hearty main dishes.",
  },
  {
    id: 10,
    name: "Coast to Coast Pub n Grill",
    type: "bar" as const,
    locationId: "cape-coast" as const,
    locationLabel: "Cape Coast",
    monthTags: ["any", "oct-dec"],
    imageUrl:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200",
    description:
      "Lively pub and grill with cold drinks, grilled meat and football on TV.",
  },
  {
    id: 11,
    name: "Cape Coast Coffee House",
    type: "cafe" as const,
    locationId: "cape-coast" as const,
    locationLabel: "Cape Coast",
    monthTags: ["any"],
    imageUrl:
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1200",
    description:
      "Specialty coffee, pastries and light bites in a cosy, modern café interior.",
  },
  {
    id: 12,
    name: "Community Gardens Bar & Restaurant",
    type: "bar" as const,
    locationId: "cape-coast" as const,
    locationLabel: "Cape Coast",
    monthTags: ["any", "jan-mar"],
    imageUrl:
      "https://images.unsplash.com/photo-1544123944-22f26348c1e5?q=80&w=1200",
    description:
      "Garden-style venue with outdoor seating, music and a mix of drinks and grilled food.",
  },
  {
    id: 13,
    name: "Sahara Pub & Restaurant",
    type: "bar" as const,
    locationId: "cape-coast" as const,
    locationLabel: "Cape Coast",
    monthTags: ["any"],
    imageUrl:
      "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=1200",
    description:
      "Popular pub and restaurant for nightlife, drinks and late-evening meals.",
  },
  {
    id: 14,
    name: "Shipyard Café & Bar",
    type: "bar" as const,
    locationId: "cape-coast" as const,
    locationLabel: "Cape Coast",
    monthTags: ["any", "apr-jun"],
    imageUrl:
      "https://images.unsplash.com/photo-1521017432531-fbd92d768814?q=80&w=1200",
    description:
      "Trendy spot with cocktails, quick bites and a modern indoor–outdoor feel.",
  },
  {
    id: 15,
    name: "Lush on the Coast Restaurant & Bar",
    type: "bar" as const,
    locationId: "cape-coast" as const,
    locationLabel: "Cape Coast",
    monthTags: ["any"],
    imageUrl:
      "https://images.unsplash.com/photo-1521017432540-1f1a6c5e52a0?q=80&w=1200",
    description:
      "Chic restaurant and bar for date nights, celebrations and group hangouts by the coast.",
  },
];

const CATEGORY_CONFIG: { id: CategoryId; label: string; icon: any }[] = [
  { id: "all", label: "All categories", icon: Heart },
  { id: "bar", label: "Bar & pub", icon: Martini },
  { id: "cafe", label: "Café", icon: Coffee },
  { id: "restaurant", label: "Restaurant", icon: ChefHat },
];

const MONTH_OPTIONS: { id: MonthFilterId; label: string }[] = [
  { id: "any", label: "Any time" },
  { id: "jan-mar", label: "Jan – Mar" },
  { id: "apr-jun", label: "Apr – Jun" },
  { id: "jul-sep", label: "Jul – Sep" },
  { id: "oct-dec", label: "Oct – Dec" },
];

const LOCATION_OPTIONS: { id: LocationFilterId; label: string }[] = [
  { id: "any", label: "Any location" },
  { id: "cape-coast", label: "Cape Coast" },
  { id: "elmina", label: "Elmina" },
  { id: "abura", label: "Abura" },
  { id: "other", label: "Around Cape Coast" },
];

const isCategoryId = (value: string | null): value is CategoryId =>
  !!value && ["all", "bar", "cafe", "restaurant"].includes(value);

const isMonthFilterId = (value: string | null): value is MonthFilterId =>
  !!value && ["any", "jan-mar", "apr-jun", "jul-sep", "oct-dec"].includes(value);

const isLocationFilterId = (value: string | null): value is LocationFilterId =>
  !!value &&
  ["any", "cape-coast", "elmina", "abura", "other"].includes(value);

const isViewMode = (value: string | null): value is ViewMode =>
  !!value && ["map", "list", "split"].includes(value);

export default function EatDrinkPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryId>("all");
  const [activeView, setActiveView] = useState<ViewMode>("list");
  const [isMonthOpen, setIsMonthOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [monthFilter, setMonthFilter] = useState<MonthFilterId>("any");
  const [locationFilter, setLocationFilter] = useState<LocationFilterId>("any");
  const [isLoading, setIsLoading] = useState(false);

  const selectedMonthLabel =
    MONTH_OPTIONS.find((m) => m.id === monthFilter)?.label ?? "Any time";
  const selectedLocationLabel =
    LOCATION_OPTIONS.find((l) => l.id === locationFilter)?.label ?? "Any location";

  const hasActiveFilters =
    searchQuery.trim().length > 0 ||
    activeCategory !== "all" ||
    monthFilter !== "any" ||
    locationFilter !== "any";

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);

    const q = params.get("q");
    const cat = params.get("cat");
    const month = params.get("month");
    const loc = params.get("loc");
    const view = params.get("view");

    if (q) setSearchQuery(q);
    if (isCategoryId(cat)) setActiveCategory(cat);
    if (isMonthFilterId(month)) setMonthFilter(month);
    if (isLocationFilterId(loc)) setLocationFilter(loc);
    if (isViewMode(view)) setActiveView(view);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);

    if (searchQuery) params.set("q", searchQuery);
    else params.delete("q");

    if (activeCategory !== "all") params.set("cat", activeCategory);
    else params.delete("cat");

    if (monthFilter !== "any") params.set("month", monthFilter);
    else params.delete("month");

    if (locationFilter !== "any") params.set("loc", locationFilter);
    else params.delete("loc");

    if (activeView !== "list") params.set("view", activeView);
    else params.delete("view");

    const queryString = params.toString();
    const newUrl = queryString
      ? `${window.location.pathname}?${queryString}`
      : window.location.pathname;

    window.history.replaceState(null, "", newUrl);
  }, [searchQuery, activeCategory, monthFilter, locationFilter, activeView]);

  useEffect(() => {
    setIsLoading(true);
    const id = window.setTimeout(() => {
      setIsLoading(false);
    }, 250);
    return () => window.clearTimeout(id);
  }, [searchQuery, activeCategory, monthFilter, locationFilter]);

  const filteredPlaces = useMemo(() => {
    return PLACES.filter((place) => {
      if (activeCategory !== "all" && place.type !== activeCategory) {
        return false;
      }

      if (monthFilter !== "any" && !place.monthTags.includes(monthFilter)) {
        return false;
      }

      if (locationFilter !== "any" && place.locationId !== locationFilter) {
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
      place.name.toLowerCase().includes(query)
    ).slice(0, 5);
  }, [searchQuery]);

  const handleClearAll = () => {
    setSearchQuery("");
    setActiveCategory("all");
    setMonthFilter("any");
    setLocationFilter("any");
  };

  return (
    <div className="w-full bg-white">
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

        {/* Highlight cards – clickable, warmer Cape Coast colours */}
        <section
          aria-label="Featured food and drink experiences"
          className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3"
        >
          {/* All categories */}
          <button
            type="button"
            onClick={() => setActiveCategory("all")}
            className="relative h-60 w-full overflow-hidden rounded-xl text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1500"
              className="h-full w-full object-cover"
              alt="The taste of Cape Coast"
            />
            <div className="absolute bottom-0 left-0 w-[85%] rounded-tr-xl bg-amber-50/95 p-4 border-t border-r border-amber-100">
              <h3 className="font-semibold text-gray-900">
                The taste of Cape Coast
              </h3>
              <p className="text-sm text-gray-700">
                Discover authentic traditions and local ingredients.
              </p>
              <p className="mt-1 text-xs font-medium text-amber-700">
                View all categories →
              </p>
            </div>
          </button>

          {/* Restaurant / affordable */}
          <button
            type="button"
            onClick={() => setActiveCategory("restaurant")}
            className="relative h-60 w-full overflow-hidden rounded-xl text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <img
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1500"
              className="h-full w-full object-cover"
              alt="Easy & affordable"
            />
            <div className="absolute bottom-0 left-0 w-[85%] rounded-tr-xl bg-amber-50/95 p-4 border-t border-r border-amber-100">
              <h3 className="font-semibold text-gray-900">Easy &amp; affordable</h3>
              <p className="text-sm text-gray-700">
                Recommendations for low-cost, simple, friendly spots.
              </p>
              <p className="mt-1 text-xs font-medium text-amber-700">
                Show restaurants →
              </p>
            </div>
          </button>

          {/* Bar & pub */}
          <button
            type="button"
            onClick={() => setActiveCategory("bar")}
            className="relative h-60 w-full overflow-hidden rounded-xl text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <img
              src="https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1500"
              className="h-full w-full object-cover"
              alt="Bars, pubs and nightlife"
            />
            <div className="absolute bottom-0 left-0 w-[85%] rounded-tr-xl bg-amber-50/95 p-4 border-t border-r border-amber-100">
              <h3 className="font-semibold text-gray-900">
                Bars, pubs &amp; nightlife
              </h3>
              <p className="text-sm text-gray-700">
                Social spots for drinks, dancing and good company.
              </p>
              <p className="mt-1 text-xs font-medium text-amber-700">
                Show bars &amp; pubs →
              </p>
            </div>
          </button>

          {/* Café */}
          <button
            type="button"
            onClick={() => setActiveCategory("cafe")}
            className="relative h-60 w-full overflow-hidden rounded-xl text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <img
              src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1500"
              className="h-full w-full object-cover"
              alt="Coffee & cake"
            />
            <div className="absolute bottom-0 left-0 w-[85%] rounded-tr-xl bg-amber-50/95 p-4 border-t border-r border-amber-100">
              <h3 className="font-semibold text-gray-900">Coffee &amp; cake</h3>
              <p className="text-sm text-gray-700">
                Perfect for brunch, pastries or chilled café moments.
              </p>
              <p className="mt-1 text-xs font-medium text-amber-700">
                Show cafés →
              </p>
            </div>
          </button>

          {/* Restaurant – vegan/veg */}
          <button
            type="button"
            onClick={() => setActiveCategory("restaurant")}
            className="relative h-60 w-full overflow-hidden rounded-xl text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <img
              src="https://images.unsplash.com/photo-1604908177225-df3b3f0c39eb?q=80&w=1500"
              className="h-full w-full object-cover"
              alt="Vegan & vegetarian dishes"
            />
            <div className="absolute bottom-0 left-0 w-[85%] rounded-tr-xl bg-amber-50/95 p-4 border-t border-r border-amber-100">
              <h3 className="font-semibold text-gray-900">
                Vegan &amp; vegetarian
              </h3>
              <p className="text-sm text-gray-700">
                Healthy and creative plant-based options around town.
              </p>
              <p className="mt-1 text-xs font-medium text-amber-700">
                Show restaurants →
              </p>
            </div>
          </button>

          {/* Restaurant – all restaurants */}
          <button
            type="button"
            onClick={() => setActiveCategory("restaurant")}
            className="relative h-60 w-full overflow-hidden rounded-xl text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <img
              src="https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=1500"
              className="h-full w-full object-cover"
              alt="All restaurants overview"
            />
            <div className="absolute bottom-0 left-0 w-[85%] rounded-tr-xl bg-amber-50/95 p-4 border-t border-r border-amber-100">
              <h3 className="font-semibold text-gray-900">All restaurants</h3>
              <p className="text-sm text-gray-700">
                Full overview of every place to eat in Cape Coast.
              </p>
              <p className="mt-1 text-xs font-medium text-amber-700">
                Show restaurants →
              </p>
            </div>
          </button>
        </section>
      </main>

      {/* Main content: search, filters, results */}
      <section
        aria-label="Search and filter food and drink places"
        className="mx-auto max-w-7xl px-6 pb-24 sm:pb-32"
      >
        <div className="mx-auto max-w-5xl border-t border-gray-200 pt-8">
          {/* Category tabs */}
          <div
            className="flex items-end gap-8 overflow-x-auto pb-3 text-sm"
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
                  className={`flex flex-col items-center gap-1 whitespace-nowrap pb-2 transition-colors ${
                    isActive
                      ? "text-gray-900"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Icon className="h-6 w-6" aria-hidden="true" />
                  <span className="text-xs sm:text-sm">{cat.label}</span>
                  {isActive && (
                    <span className="mt-1 h-0.5 w-8 rounded-full bg-amber-600" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Divider */}
          <div className="h-px w-full bg-gray-200" />

          {/* Search + dropdown filters + view mode */}
          <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="flex-1 space-y-3">
              {/* Search bar with suggestions */}
              <div className="relative">
                <div className="flex w-full overflow-hidden rounded-full border border-gray-300 bg-white shadow-sm transition hover:shadow-md focus-within:ring-2 focus-within:ring-amber-500/50">
                  <input
                    type="text"
                    placeholder="Search restaurants, cafés and bars..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 px-5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none"
                    aria-label="Search restaurants, cafés and bars"
                  />
                  <button
                    type="button"
                    className="mr-1 my-1 flex items-center justify-center rounded-full bg-amber-600 px-4 text-white transition hover:bg-amber-700"
                    aria-label="Search"
                  >
                    <Search className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>

                {/* Autocomplete suggestions */}
                {searchQuery.trim().length > 1 && searchSuggestions.length > 0 && (
                  <ul
                    className="absolute z-20 mt-1 w-full overflow-hidden rounded-xl border border-gray-200 bg-white text-sm shadow-lg"
                    role="listbox"
                    aria-label="Search suggestions"
                  >
                    {searchSuggestions.map((place) => (
                      <li key={place.id}>
                        <button
                          type="button"
                          className="flex w-full items-start justify-between px-4 py-2 text-left text-gray-800 hover:bg-gray-50"
                          onMouseDown={() => setSearchQuery(place.name)}
                        >
                          <span>{place.name}</span>
                          <span className="ml-2 text-xs text-gray-500">
                            {place.locationLabel}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Dropdown filters */}
              <div className="space-y-3 md:flex md:flex-wrap md:gap-3 md:space-y-0">
                {/* Months */}
                <div className="relative w-full md:w-auto md:min-w-[200px]">
                  <button
                    type="button"
                    onClick={() => {
                      setIsMonthOpen((prev) => !prev);
                      setIsLocationOpen(false);
                    }}
                    className="flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-700 shadow-sm transition hover:bg-gray-50"
                    aria-haspopup="listbox"
                    aria-expanded={isMonthOpen}
                  >
                    <span className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-amber-600" aria-hidden="true" />
                      <span>
                        {monthFilter === "any" ? "Months" : selectedMonthLabel}
                      </span>
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 text-gray-500 transition-transform ${
                        isMonthOpen ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                  {isMonthOpen && (
                    <div className="absolute z-10 mt-1 w-full rounded-xl border border-gray-200 bg-white py-1 text-sm shadow-lg">
                      {MONTH_OPTIONS.map((m) => (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => {
                            setMonthFilter(m.id);
                            setIsMonthOpen(false);
                          }}
                          className="flex w-full items-center justify-between px-3 py-2 text-left text-gray-700 transition hover:bg-amber-50"
                          role="option"
                          aria-selected={monthFilter === m.id}
                        >
                          <span>{m.label}</span>
                          {monthFilter === m.id && (
                            <Check
                              className="h-4 w-4 text-amber-600"
                              aria-hidden="true"
                            />
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Location */}
                <div className="relative w-full md:w-auto md:min-w-[200px]">
                  <button
                    type="button"
                    onClick={() => {
                      setIsLocationOpen((prev) => !prev);
                      setIsMonthOpen(false);
                    }}
                    className="flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-700 shadow-sm transition hover:bg-gray-50"
                    aria-haspopup="listbox"
                    aria-expanded={isLocationOpen}
                  >
                    <span className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-amber-600" aria-hidden="true" />
                      <span>
                        {locationFilter === "any"
                          ? "Location"
                          : selectedLocationLabel}
                      </span>
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 text-gray-500 transition-transform ${
                        isLocationOpen ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                  {isLocationOpen && (
                    <div className="absolute z-10 mt-1 w-full rounded-xl border border-gray-200 bg-white py-1 text-sm shadow-lg">
                      {LOCATION_OPTIONS.map((loc) => (
                        <button
                          key={loc.id}
                          type="button"
                          onClick={() => {
                            setLocationFilter(loc.id);
                            setIsLocationOpen(false);
                          }}
                          className="flex w-full items-center justify-between px-3 py-2 text-left text-gray-700 transition hover:bg-amber-50"
                          role="option"
                          aria-selected={locationFilter === loc.id}
                        >
                          <span>{loc.label}</span>
                          {locationFilter === loc.id && (
                            <Check
                              className="h-4 w-4 text-amber-600"
                              aria-hidden="true"
                            />
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Selected filter chips */}
              {hasActiveFilters && (
                <div className="flex flex-wrap items-center gap-2 pt-1 text-xs sm:text-sm">
                  <span className="text-gray-500">Filters:</span>
                  {searchQuery.trim() && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-amber-800 hover:bg-amber-100"
                    >
                      <span>Search: {searchQuery}</span>
                      <span className="text-amber-500" aria-hidden="true">
                        ×
                      </span>
                    </button>
                  )}
                  {activeCategory !== "all" && (
                    <button
                      type="button"
                      onClick={() => setActiveCategory("all")}
                      className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-amber-800 hover:bg-amber-100"
                    >
                      <span>
                        Category:{" "}
                        {
                          CATEGORY_CONFIG.find((c) => c.id === activeCategory)
                            ?.label
                        }
                      </span>
                      <span className="text-amber-500" aria-hidden="true">
                        ×
                      </span>
                    </button>
                  )}
                  {monthFilter !== "any" && (
                    <button
                      type="button"
                      onClick={() => setMonthFilter("any")}
                      className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-amber-800 hover:bg-amber-100"
                    >
                      <span>Month: {selectedMonthLabel}</span>
                      <span className="text-amber-500" aria-hidden="true">
                        ×
                      </span>
                    </button>
                  )}
                  {locationFilter !== "any" && (
                    <button
                      type="button"
                      onClick={() => setLocationFilter("any")}
                      className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-amber-800 hover:bg-amber-100"
                    >
                      <span>Location: {selectedLocationLabel}</span>
                      <span className="text-amber-500" aria-hidden="true">
                        ×
                      </span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleClearAll}
                    className="ml-auto text-xs font-medium text-gray-500 underline-offset-2 hover:text-gray-700 hover:underline"
                  >
                    Clear all
                  </button>
                </div>
              )}
            </div>

            {/* View mode toggle */}
            <div
              className="flex items-center justify-start gap-6 text-sm text-gray-600 md:justify-end"
              aria-label="Change view mode"
            >
              <button
                type="button"
                onClick={() => setActiveView("map")}
                className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 transition-colors hover:bg-amber-50 hover:text-gray-900 ${
                  activeView === "map"
                    ? "bg-amber-100 text-gray-900"
                    : "text-gray-700"
                }`}
              >
                <MapIcon className="h-4 w-4" aria-hidden="true" />
                <span>Map</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveView("list")}
                className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 transition-colors hover:bg-amber-50 hover:text-gray-900 ${
                  activeView === "list"
                    ? "bg-amber-600 text-white"
                    : "text-gray-700"
                }`}
              >
                <ListIcon className="h-4 w-4" aria-hidden="true" />
                <span>List</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveView("split")}
                className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 transition-colors hover:bg-amber-50 hover:text-gray-900 ${
                  activeView === "split"
                    ? "bg-amber-100 text-gray-900"
                    : "text-gray-700"
                }`}
              >
                <LayoutGrid className="h-4 w-4" aria-hidden="true" />
                <span>Split</span>
              </button>
            </div>
          </div>

          {/* Results section */}
          <div className="mt-8 space-y-4">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <p>
                {isLoading
                  ? "Loading places…"
                  : filteredPlaces.length === 0
                  ? "No places found"
                  : `${filteredPlaces.length} place${
                      filteredPlaces.length === 1 ? "" : "s"
                    } found`}
              </p>
            </div>

            {isLoading ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-gray-50 animate-pulse"
                  >
                    <div className="h-40 w-full bg-gray-200" />
                    <div className="p-4 space-y-3">
                      <div className="h-3 w-3/4 rounded bg-gray-200" />
                      <div className="h-3 w-1/2 rounded bg-gray-200" />
                      <div className="h-3 w-full rounded bg-gray-200" />
                      <div className="h-3 w-5/6 rounded bg-gray-200" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredPlaces.length === 0 ? (
              <div className="rounded-xl border border-dashed border-amber-200 bg-amber-50 px-6 py-10 text-center">
                <p className="text-sm font-medium text-gray-800">
                  No places match your search.
                </p>
                <p className="mt-2 text-sm text-gray-600">
                  Try removing a filter or searching for something different.
                </p>
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={handleClearAll}
                    className="mt-4 inline-flex items-center rounded-full bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-700"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredPlaces.map((place) => {
                  const typeLabel =
                    place.type === "bar"
                      ? "Bar & pub"
                      : place.type === "cafe"
                      ? "Café"
                      : "Restaurant";

                  return (
                    <article
                      key={place.id}
                      className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
                    >
                      {/* Image holder */}
                      <div className="relative h-40 w-full overflow-hidden">
                        <img
                          src={place.imageUrl}
                          alt={place.name}
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute left-3 top-3 rounded-full bg-gray-900/80 px-3 py-1 text-xs text-white shadow-sm">
                          {typeLabel} • {place.locationLabel}
                        </div>
                      </div>

                      {/* Text content */}
                      <div className="flex flex-1 flex-col p-4">
                        <h2 className="text-sm font-semibold text-gray-900">
                          {place.name}
                        </h2>
                        <p className="mt-2 line-clamp-3 text-sm text-gray-600">
                          {place.description}
                        </p>

                        <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                          <span>
                            {place.monthTags.includes("any")
                              ? "Open all year"
                              : "Seasonal availability"}
                          </span>
                          <button
                            type="button"
                            className="rounded-full px-3 py-1 text-xs font-medium text-amber-700 ring-1 ring-amber-200 hover:bg-amber-50"
                          >
                            View details
                          </button>
                        </div>
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
