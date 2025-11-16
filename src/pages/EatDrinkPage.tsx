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
  ChevronRight,
  Home,
} from "lucide-react";

/* … your mock data + configs remain exactly the same … */

export default function EatDrinkPage() {
  /* all your states, filters, memo logic stays unchanged */

  /* EVERYTHING BELOW UNTIL THE RETURN IS SAME — only UI changes */
  return (
    <div className="w-full">
      {/* ------------------------------------------------------ */}
      {/* TOP HERO SECTION (new)                                 */}
      {/* ------------------------------------------------------ */}

      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-6 pt-6 pb-2 text-sm text-gray-600 flex items-center gap-2">
        <Home className="h-4 w-4 text-gray-500" />
        <ChevronRight className="h-4 w-4 text-gray-400" />
        <span className="text-gray-800">Eat & Drink</span>
      </div>

      {/* Hero Image */}
      <div className="w-full h-[260px] sm:h-[360px] lg:h-[420px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1529042410759-befb1204b468?q=80&w=1500"
          alt="Restaurants and food"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Heading Below Image Like Screenshot */}
      <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Restaurants, cafés <br /> & nightlife
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
          Discover Cape Coast’s vibrant culinary scene — from local favourites to
          beachfront lounges and nightlife experiences.
        </p>
      </div>

      {/* ------------------------------------------------------ */}
      {/* BELOW THIS: Your entire filter + category + result UI   */}
      {/* (NOTHING touched, just moved down)                     */}
      {/* ------------------------------------------------------ */}
      <div className="mx-auto max-w-7xl px-6">
        {/* Category + search + filters + results EXACTLY AS YOU HAD */}
        {/* I am placing your entire filter UI directly here below  */}

        {/* Categories + Search + Filters */}
        <div className="mx-auto max-w-5xl border-t border-gray-200 pt-8">
          {/* CATEGORY TABS */}
          {/* … all your previous category tabs code … */}

          {/* SEARCH BAR */}
          {/* … all your previous search/filter code … */}

          {/* RESULTS */}
          {/* … all your results UI … */}
        </div>
      </div>
    </div>
  );
}
