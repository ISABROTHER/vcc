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
} from "lucide-react";

export default function EatDrinkPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Eat & Drink
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
          <button className="flex flex-col items-center gap-1 whitespace-nowrap border-b-2 border-gray-900 pb-2 font-semibold text-gray-900">
            <Heart className="h-6 w-6" />
            <span>All categories</span>
          </button>
          <button className="flex flex-col items-center gap-1 whitespace-nowrap pb-2 text-gray-700 hover:text-gray-900">
            <Martini className="h-6 w-6" />
            <span>Bar &amp; pub</span>
          </button>
          <button className="flex flex-col items-center gap-1 whitespace-nowrap pb-2 text-gray-700 hover:text-gray-900">
            <Coffee className="h-6 w-6" />
            <span>Café</span>
          </button>
          <button className="flex flex-col items-center gap-1 whitespace-nowrap pb-2 text-gray-700 hover:text-gray-900">
            <ChefHat className="h-6 w-6" />
            <span>Restaurant</span>
          </button>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-gray-200" />

        {/* Search + filters + view mode */}
        <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="flex-1 space-y-3">
            {/* Search bar */}
            <div className="flex w-full overflow-hidden rounded-lg border border-gray-300 bg-white shadow-sm transition hover:shadow-md focus-within:ring-2 focus-within:ring-gray-900/5">
              <input
                type="text"
                placeholder="Search activities..."
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
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-700 shadow-sm transition hover:bg-gray-50 md:w-auto md:min-w-[200px]"
              >
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Months</span>
                </span>
                <ChevronDown className="h-4 w-4" />
              </button>

              <button
                type="button"
                className="flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-700 shadow-sm transition hover:bg-gray-50 md:w-auto md:min-w-[200px]"
              >
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>Location</span>
                </span>
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* View mode toggle */}
          <div className="flex items-center justify-start gap-6 text-sm text-gray-600 md:justify-end">
            <button
              type="button"
              className="inline-flex items-center gap-2 hover:text-gray-900"
            >
              <MapIcon className="h-4 w-4" />
              <span>Map</span>
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 border-b-2 border-gray-900 pb-1 font-medium text-gray-900"
            >
              <ListIcon className="h-4 w-4" />
              <span>List</span>
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 hover:text-gray-900"
            >
              <LayoutGrid className="h-4 w-4" />
              <span>Split</span>
            </button>
          </div>
        </div>

        {/* Result count */}
        <p className="mt-6 text-sm text-gray-600">68 products loaded</p>
      </div>
    </div>
  );
}
