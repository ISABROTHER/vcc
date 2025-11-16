import { useState } from "react";
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

export default function EatDrinkPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeView, setActiveView] = useState<"map" | "list" | "split">("list");
  const [isMonthOpen, setIsMonthOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<string>("Months");
  const [selectedLocation, setSelectedLocation] = useState<string>("Location");

  const categories = [
    { id: "all", label: "All categories", icon: Heart },
    { id: "bar", label: "Bar & pub", icon: Martini },
    { id: "cafe", label: "Café", icon: Coffee },
    { id: "restaurant", label: "Restaurant", icon: ChefHat },
  ];

  const months = ["Any time", "Jan – Mar", "Apr – Jun", "Jul – Sep", "Oct – Dec"];
  const locations = ["Any location", "Cape Coast", "Elmina", "Abura", "Others"];

  return (
    <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
      {/* Page heading */}
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Eat &amp; Drink
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Explore the rich culinary scene of Cape Coast, from fresh seafood to
          local delicacies and fine dining.
        </p>
      </div>

      {/* Categories + Search + Filters */}
      <div className="mx-auto mt-12 max-w-5xl border-t border-gray-200 pt-8">
        {/* Category tabs */}
        <div className="flex items-end gap-8 overflow-x-auto pb-3 text-sm">
          {categories.map((cat) => {
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

        {/* Search + filters + view mode */}
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

            {/* Filters */}
            <div className="space-y-3 md:flex md:flex-wrap md:gap-3 md:space-y-0">
              {/* Months dropdown */}
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
                    <span>{selectedMonth}</span>
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-gray-500 transition-transform ${
                      isMonthOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isMonthOpen && (
                  <div className="absolute z-10 mt-1 w-full rounded-md border border-gray-200 bg-white py-1 text-sm shadow-lg">
                    {months.map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => {
                          setSelectedMonth(m === "Any time" ? "Months" : m);
                          setIsMonthOpen(false);
                        }}
                        className="flex w-full items-center justify-between px-3 py-2 text-left text-gray-700 transition hover:bg-gray-50"
                      >
                        <span>{m}</span>
                        {selectedMonth === m && (
                          <Check className="h-4 w-4 text-gray-900" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Location dropdown */}
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
                    <span>{selectedLocation}</span>
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-gray-500 transition-transform ${
                      isLocationOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isLocationOpen && (
                  <div className="absolute z-10 mt-1 w-full rounded-md border border-gray-200 bg-white py-1 text-sm shadow-lg">
                    {locations.map((loc) => (
                      <button
                        key={loc}
                        type="button"
                        onClick={() => {
                          setSelectedLocation(
                            loc === "Any location" ? "Location" : loc
                          );
                          setIsLocationOpen(false);
                        }}
                        className="flex w-full items-center justify-between px-3 py-2 text-left text-gray-700 transition hover:bg-gray-50"
                      >
                        <span>{loc}</span>
                        {selectedLocation === loc && (
                          <Check className="h-4 w-4 text-gray-900" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
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

        {/* Result count – static placeholder until real data is connected */}
        <p className="mt-6 text-sm text-gray-600">68 products loaded</p>
      </div>
    </div>
  );
}
