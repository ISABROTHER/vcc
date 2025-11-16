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
        <h1 className="bg-gradient-to-r from-emerald-600 via-amber-500 to-rose-500 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-6xl">
          Eat &amp; Drink
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Explore the rich culinary scene of Cape Coast, from fresh seafood to
          local delicacies and fine dining.
        </p>
      </div>

      {/* Categories + Search + Filters */}
      <div className="mx-auto mt-12 max-w-5xl rounded-2xl bg-white/80 p-5 shadow-sm ring-1 ring-gray-100 backdrop-blur-sm sm:p-7">
        {/* Category tabs */}
        <div className="flex items-end gap-4 overflow-x-auto pb-3 text-sm">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`group flex flex-col items-center gap-1 whitespace-nowrap rounded-full px-3 pb-2 pt-1 text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-gray-900 text-white shadow-sm"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/80 shadow-sm transition-transform duration-200 group-hover:scale-110">
                  <Icon
                    className={`h-4 w-4 ${
                      isActive ? "text-amber-500" : "text-gray-700"
                    }`}
                  />
                </span>
                <span>{cat.label}</span>
                {isActive && (
                  <span className="mt-0.5 h-0.5 w-6 rounded-full bg-amber-400" />
                )}
              </button>
            );
          })}
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

        {/* Search + filters + view mode */}
        <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="flex-1 space-y-3">
            {/* Search bar */}
            <div className="group flex w-full overflow-hidden rounded-full border border-gray-200 bg-white shadow-[0_6px_18px_rgba(15,23,42,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(15,23,42,0.12)] focus-within:ring-2 focus-within:ring-emerald-500/70">
              <input
                type="text"
                placeholder="Search activities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none"
              />
              <button
                type="button"
                className="flex items-center justify-center border-l border-gray-200 bg-gradient-to-r from-emerald-500 to-amber-500 px-4 text-white transition group-hover:brightness-110"
              >
                <Search className="h-4 w-4" />
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
                  className="flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 shadow-[0_4px_12px_rgba(15,23,42,0.06)] transition hover:-translate-y-0.5 hover:bg-gray-50 hover:shadow-[0_10px_24px_rgba(15,23,42,0.12)]"
                >
                  <span className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50">
                      <Calendar className="h-4 w-4 text-emerald-600" />
                    </span>
                    <span>{selectedMonth}</span>
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-gray-500 transition-transform ${
                      isMonthOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isMonthOpen && (
                  <div className="animate-fadeIn absolute z-10 mt-2 w-full overflow-hidden rounded-xl border border-gray-100 bg-white py-1 text-sm shadow-2xl">
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
                          <Check className="h-4 w-4 text-emerald-600" />
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
                  className="flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 shadow-[0_4px_12px_rgba(15,23,42,0.06)] transition hover:-translate-y-0.5 hover:bg-gray-50 hover:shadow-[0_10px_24px_rgba(15,23,42,0.12)]"
                >
                  <span className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-50">
                      <MapPin className="h-4 w-4 text-amber-500" />
                    </span>
                    <span>{selectedLocation}</span>
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-gray-500 transition-transform ${
                      isLocationOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isLocationOpen && (
                  <div className="animate-fadeIn absolute z-10 mt-2 w-full overflow-hidden rounded-xl border border-gray-100 bg-white py-1 text-sm shadow-2xl">
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
                          <Check className="h-4 w-4 text-amber-500" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* View mode toggle */}
          <div className="flex items-center justify-start gap-3 text-sm text-gray-600 md:justify-end">
            <div className="inline-flex rounded-full border border-gray-200 bg-white p-1 shadow-sm">
              <button
                type="button"
                onClick={() => setActiveView("map")}
                className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium transition ${
                  activeView === "map"
                    ? "bg-gray-900 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <MapIcon className="h-4 w-4" />
                <span>Map</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveView("list")}
                className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium transition ${
                  activeView === "list"
                    ? "bg-gray-900 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <ListIcon className="h-4 w-4" />
                <span>List</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveView("split")}
                className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium transition ${
                  activeView === "split"
                    ? "bg-gray-900 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <LayoutGrid className="h-4 w-4" />
                <span>Split</span>
              </button>
            </div>
          </div>
        </div>

        {/* Result count – still static until you connect real data */}
        <p className="mt-6 text-sm text-gray-600">
          <span className="rounded-full bg-emerald-50 px-2 py-1 text-emerald-700">
            68 products loaded
          </span>
        </p>
      </div>
    </div>
  );
}
