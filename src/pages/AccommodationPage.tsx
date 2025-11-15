import {
  MapPin,
  Camera,
  Star,
  Users,
  TreePine,
  Palette,
  Ship,
  Drum,
  Sun,
  Waves as Swimmer,
  Bird,
  ShoppingBag,
  Ticket,
  Smile,
  BookOpen,
  SearchX,
} from 'lucide-react';
import React, { useState, useMemo } from 'react';

// Define types for clarity
interface IListItem {
  name: string;
  icon: React.ElementType;
}

interface ICategory {
  title: string;
  icon: React.ElementType;
  items: IListItem[];
  tags: string[]; // Tags for filtering
}

// Data for the page
const allCategories: ICategory[] = [
  {
    title: 'Top Attractions',
    icon: Star,
    items: [
      { name: 'Cape Coast Castle (UNESCO Site)', icon: MapPin },
      { name: 'Elmina Castle', icon: MapPin },
      { name: 'Kakum National Park (Canopy Walk)', icon: TreePine },
      { name: 'Fort William Lighthouse', icon: MapPin },
      { name: 'Assin Manso Ancestral Slave River', icon: MapPin },
      { name: 'Beaches & coastlines', icon: Sun },
    ],
    tags: ['Castles', 'Adventure'],
  },
  {
    title: 'Tours & Experiences',
    icon: Users,
    items: [
      { name: 'Heritage & History Tours', icon: BookOpen },
      { name: 'Kakum Forest Hikes', icon: TreePine },
      { name: 'Coastal Boat Rides', icon: Ship },
      { name: 'Cultural Experiences (drumming, cooking)', icon: Drum },
      { name: 'Fishing Village Visits', icon: Users },
      { name: 'Storytelling & Night Tours', icon: BookOpen },
      { name: 'Diaspora Return/Naming Ceremonies', icon: Users },
    ],
    tags: ['Tours', 'Cultural', 'Adventure'],
  },
  {
    title: 'Outdoor & Nature',
    icon: Camera,
    items: [
      { name: 'Beach activities', icon: Swimmer },
      { name: 'Nature photography', icon: Camera },
      { name: 'Bird watching', icon: Bird },
      { name: 'Eco trails', icon: TreePine },
      { name: 'Picnics & adventure experiences', icon: Sun },
    ],
    tags: ['Adventure'],
  },
  {
    title: 'Arts & Culture',
    icon: Palette,
    items: [
      { name: 'Festivals & events', icon: Ticket },
      { name: 'Art markets', icon: ShoppingBag },
      { name: 'Museums', icon: BookOpen },
      { name: 'Local craft shops', icon: ShoppingBag },
      { name: 'Live performances', icon: Drum },
    ],
    tags: ['Cultural', 'Creative'],
  },
  {
    title: 'Family Activities',
    icon: Smile,
    items: [
      { name: 'Beach picnics', icon: Sun },
      { name: 'Botel crocodile pond', icon: Swimmer },
      { name: 'Museums', icon: BookOpen },
      { name: 'Kids’ history tours', icon: BookOpen },
    ],
    tags: ['Adventure'],
  },
];

// Filter categories
const filterOptions = [
  'All',
  'Tours',
  'Cultural',
  'Castles',
  'Adventure',
  'Food',
  'Creative',
];

// Reusable Category Card Component
const CategoryCard: React.FC<{ category: ICategory }> = ({ category }) => (
  <div className="group relative bg-white/95 border border-slate-100 rounded-2xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:border-amber-500/60">
    <div className="p-6 sm:p-7">
      <div className="flex items-center gap-4 mb-6">
        <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 border border-amber-100 transition-transform duration-300 group-hover:scale-110 group-hover:bg-amber-100">
          <category.icon className="w-6 h-6 text-amber-500" />
        </div>
        <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
          {category.title}
        </h2>
      </div>
      <ul className="space-y-2.5">
        {category.items.map((item) => (
          <li
            key={item.name}
            className="flex items-center gap-3 rounded-xl px-3 py-2 transition-colors duration-200 hover:bg-slate-50"
          >
            <item.icon className="w-5 h-5 text-slate-400 flex-shrink-0" />
            <span className="text-sm sm:text-base text-slate-700">
              {item.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

// Horizontal Filter Bar Component
const FilterBar: React.FC<{
  selected: string;
  onSelect: (category: string) => void;
}> = ({ selected, onSelect }) => (
  <div className="mb-10 sm:mb-12">
    <div className="overflow-x-auto pb-2">
      <div className="inline-flex min-w-full justify-center sm:justify-start">
        <div className="flex w-full max-w-full gap-2 sm:gap-3 bg-white/70 border border-slate-100 rounded-full p-1 shadow-sm">
          {filterOptions.map((filter) => (
            <button
              key={filter}
              onClick={() => onSelect(filter)}
              className={`
                flex-1 sm:flex-none flex-shrink-0 px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold
                transition-all duration-200 whitespace-nowrap
                ${
                  selected === filter
                    ? 'bg-slate-900 text-white shadow-md shadow-slate-300/50'
                    : 'bg-transparent text-slate-700 hover:bg-slate-50 hover:border-slate-200'
                }
              `}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// No Results Component
const NoResults = () => (
  <div className="text-center py-16 px-6 bg-white/95 rounded-2xl border border-slate-100 shadow-sm">
    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-50 border border-slate-100">
      <SearchX className="h-8 w-8 text-slate-400" />
    </div>
    <h3 className="mt-5 text-2xl font-semibold text-slate-900">
      No Activities Found
    </h3>
    <p className="mt-2 text-base text-slate-500 max-w-md mx-auto">
      Try selecting a different category, or check back later for more ways to
      explore Cape Coast.
    </p>
  </div>
);

export default function SeeDoPage() {
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filteredCategories = useMemo(() => {
    if (selectedFilter === 'All') {
      return allCategories;
    }
    return allCategories.filter((category) =>
      category.tags.includes(selectedFilter),
    );
  }, [selectedFilter]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-14 sm:py-20 lg:px-8">
        {/* Page Header */}
        <div className="mx-auto max-w-3xl text-center mb-12 sm:mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-500 mb-3">
            Discover Cape Coast
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl bg-gradient-to-r from-slate-900 via-amber-600 to-slate-900 bg-clip-text text-transparent">
            See &amp; Do
          </h1>
          <p className="mt-5 text-base sm:text-lg leading-7 sm:leading-8 text-slate-600 max-w-2xl mx-auto">
            Explore vibrant culture, powerful history, beaches, castles, and
            unforgettable experiences — all within Cape Coast and its
            surroundings.
          </p>
        </div>

        {/* Filter Bar */}
        <FilterBar selected={selectedFilter} onSelect={setSelectedFilter} />

        {/* Grid Layout or No Results */}
        {filteredCategories.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredCategories.map((category) => (
              <CategoryCard key={category.title} category={category} />
            ))}
          </div>
        ) : (
          <NoResults />
        )}
      </div>
    </div>
  );
}
