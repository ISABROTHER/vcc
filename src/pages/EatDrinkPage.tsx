import { useMemo, useState } from "react";
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
    name: "Castle View Restaurant",
    type: "restaurant" as const,
    locationId: "cape-coast" as const,
    locationLabel: "Cape Coast",
    monthTags: ["any"],
    description: "Seafood and local dishes with views towards Cape Coast Castle.",
  },
  {
    id: 2,
    name: "Oasis Beach Bar",
    type: "bar" as const,
    locationId: "cape-coast" as const,
    locationLabel: "Cape Coast",
    monthTags: ["any", "jul-sep"],
    description: "Beachfront bar with live music, cocktails and a relaxed vibe.",
  },
  {
    id: 3,
    name: "Elmina Harbour Café",
    type: "cafe" as const,
    locationId: "elmina" as const,
    locationLabel: "Elmina",
    monthTags: ["any", "jan-mar"],
    description: "Casual café near the harbour, perfect for coffee and light bites.",
  },
  {
    id: 4,
    name: "Abura Garden Spot",
    type: "restaurant" as const,
    locationId: "abura" as const,
    locationLabel: "Abura",
    monthTags: ["any", "apr-jun"],
    description: "Garden-style dining with local favourites and grilled options.",
  },
  {
    id: 5,
    name: "Lagoon Night Lounge",
    type: "bar" as const,
    locationId: "other" as const,
    locationLabel: "Around Cape Coast",
    monthTags: ["any", "oct-dec"],
    description: "Late-night lounge with DJ sets and small plates.",
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

export default function EatDrinkPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryId>("all");
  const [activeView, setActiveView] = useState<ViewMode>("list");
  const [isMonthOpen, setIsMonthOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [monthFilter, setMonthFilter] = useState<MonthFilterId>("any");
  const [locationFilter, setLocationFilter] = useState<LocationFilterId>("any");

  const selectedMonthLabel =
    MONTH_OPTIONS.find((m) => m.id === monthFilter)?.label ?? "Any time";
  const selectedLocationLabel =
    LOCATION_OPTIONS.find((l) => l.id === locationFilter)?.label ?? "Any location";

  const hasActiveFilters =
    searchQuery.trim().length > 0 ||
    activeCategory !== "all" ||
    monthFilter !== "any" ||
    locationFilter !== "any";

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

  const handleClearAll = () => {
    setSearchQuery("");
    setActiveCategory("all");
    setMonthFilter("any");
    setLocationFilter("any");
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
      {/* Heading */}
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Eat &amp; Drink
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Explore the rich culinary scene of Cape Coast, from fresh seafood to
          local delicacies and fine dining.
        </p>
      </div>

      {/* Filters block */}
      <div className="mx-auto mt-12 max-w-5xl border-t border-gray-200 pt-8">
        {/* Category tabs */}
        <div className="flex items-end gap-8 overflow-x-auto pb-3 text-sm">
          {CATEGORY_CONFIG.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`flex flex-col items-center gap-1 whitespace-nowrap pb-2 transition-colors ${
                  isActive
                    ? "text-gray-900"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Icon className="h-6 w-6" />
                <span className="text-xs sm:text-sm">{cat.label}</span>
                {isActive && (
                  <span className="mt-1 h-0.5 w-8 rounded-full bg-gray-900" />
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
            {/* Search bar */}
            <div className="flex w-full overflow-hidden rounded-md border border-gray-300 bg-white shadow-sm transition hover:shadow-md focus-within:ring-2 focus-within:ring-gray-900/10">
              <input
                type="text"
                placeholder="Search activities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none"
              />
              <button
                type="button"
                className="flex items-center justify-center border-l border-gray-300 bg-gray-50 px-4 transition hover:bg-gray-100"
              >
                <Search className="h-4 w-4 text-gray-700" />
              </button>
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
                  className="flex w-full items-center justify-between rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-700 shadow-sm transition hover:bg-gray-50"
                >
                  <span className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {monthFilter === "any" ? "Months" : selectedMonthLabel}
                    </span>
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-gray-500 transition-transform ${
                      isMonthOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isMonthOpen && (
                  <div className="absolute z-10 mt-1 w-full rounded-md border border-gray-200 bg-white py-1 text-sm shadow-lg">
                    {MONTH_OPTIONS.map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => {
                          setMonthFilter(m.id);
                          setIsMonthOpen(false);
                        }}
                        className="flex w-full items-center justify-between px-3 py-2 text-left text-gray-700 transition hover:bg-gray-50"
                      >
                        <span>{m.label}</span>
                        {monthFilter === m.id && (
                          <Check className="h-4 w-4 text-gray-900" />
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
                  className="flex w-full items-center justify-between rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-700 shadow-sm transition hover:bg-gray-50"
                >
                  <span className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
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
                  />
                </button>
                {isLocationOpen && (
                  <div className="absolute z-10 mt-1 w-full rounded-md border border-gray-200 bg-white py-1 text-sm shadow-lg">
                    {LOCATION_OPTIONS.map((loc) => (
                      <button
                        key={loc.id}
                        type="button"
                        onClick={() => {
                          setLocationFilter(loc.id);
                          setIsLocationOpen(false);
                        }}
                        className="flex w-full items-center justify-between px-3 py-2 text-left text-gray-700 transition hover:bg-gray-50"
                      >
                        <span>{loc.label}</span>
                        {locationFilter === loc.id && (
                          <Check className="h-4 w-4 text-gray-900" />
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
                    className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-gray-700 hover:bg-gray-200"
                  >
                    <span>Search: {searchQuery}</span>
                    <span className="text-gray-500">×</span>
                  </button>
                )}
                {activeCategory !== "all" && (
                  <button
                    type="button"
                    onClick={() => setActiveCategory("all")}
                    className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-gray-700 hover:bg-gray-200"
                  >
                    <span>
                      Category:{" "}
                      {CATEGORY_CONFIG.find((c) => c.id === activeCategory)?.label}
                    </span>
                    <span className="text-gray-500">×</span>
                  </button>
                )}
                {monthFilter !== "any" && (
                  <button
                    type="button"
                    onClick={() => setMonthFilter("any")}
                    className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-gray-700 hover:bg-gray-200"
                  >
                    <span>Month: {selectedMonthLabel}</span>
                    <span className="text-gray-500">×</span>
                  </button>
                )}
                {locationFilter !== "any" && (
                  <button
                    type="button"
                    onClick={() => setLocationFilter("any")}
                    className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-gray-700 hover:bg-gray-200"
                  >
                    <span>Location: {selectedLocationLabel}</span>
                    <span className="text-gray-500">×</span>
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
          <div className="flex items-center justify-start gap-6 text-sm text-gray-600 md:justify-end">
            <button
              type="button"
              onClick={() => setActiveView("map")}
              className={`inline-flex items-center gap-2 transition-colors hover:text-gray-900 ${
                activeView === "map" ? "font-medium text-gray-900" : ""
              }`}
            >
              <MapIcon className="h-4 w-4" />
              <span>Map</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveView("list")}
              className={`inline-flex items-center gap-2 pb-1 transition-colors hover:text-gray-900 ${
                activeView === "list"
                  ? "border-b-2 border-gray-900 font-medium text-gray-900"
                  : "border-b-2 border-transparent"
              }`}
            >
              <ListIcon className="h-4 w-4" />
              <span>List</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveView("split")}
              className={`inline-flex items-center gap-2 transition-colors hover:text-gray-900 ${
                activeView === "split" ? "font-medium text-gray-900" : ""
              }`}
            >
              <LayoutGrid className="h-4 w-4" />
              <span>Split</span>
            </button>
          </div>
        </div>

        {/* Results section */}
        <div className="mt-8 space-y-4">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <p>
              {filteredPlaces.length === 0
                ? "No places found"
                : `${filteredPlaces.length} place${
                    filteredPlaces.length === 1 ? "" : "s"
                  } found`}
            </p>
          </div>

          {filteredPlaces.length === 0 ? (
            <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-center">
              <p className="text-sm font-medium text-gray-800">
                No places match your search.
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Try removing a filter or searching for something different.
              </p>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={handleClearAll}
                  className="mt-4 inline-flex items-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-black"
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
                    className="flex h-full flex-col rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100">
                        <CategoryIcon className="h-4 w-4 text-gray-700" />
                      </div>
                      <div className="space-y-1">
                        <h2 className="text-sm font-semibold text-gray-900">
                          {place.name}
                        </h2>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
                          <span className="capitalize">
                            {place.type === "bar"
                              ? "Bar & pub"
                              : place.type === "cafe"
                              ? "Café"
                              : "Restaurant"}
                          </span>
                          <span>•</span>
                          <span className="inline-flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {place.locationLabel}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="mt-3 line-clamp-3 text-sm text-gray-600">
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
                        className="text-xs font-medium text-gray-900 underline-offset-2 hover:underline"
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
    </div>
  );
}
