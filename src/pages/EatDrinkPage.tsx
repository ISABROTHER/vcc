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

interface IExperience {
  id: string;
  name: string;
  icon: React.ElementType;
  categoryTitle: string;
  tags: string[];
  imageUrl: string;
  description: string;
  location: string;
  duration: string;
  bestFor: string;
}

// Data for the page – now restaurants / bars
const allCategories: ICategory[] = [
  {
    title: 'Eat & Drink',
    icon: Smile,
    items: [
      { name: 'Becky Kay Restaurant & Bar', icon: MapPin },
      { name: 'Da Breeze Bar & Restaurant', icon: MapPin },
      { name: 'Castle Beach Restaurant', icon: MapPin },
      { name: 'Lemon Lounge', icon: MapPin },
      { name: 'Emperor Ital Joint', icon: MapPin },
      { name: 'Sasakawa Restaurant', icon: MapPin },
      { name: 'Oguaa Basiaba Tasty Cuisine', icon: MapPin },
      { name: 'New Life Café', icon: MapPin },
      { name: 'Cape Cafe & Restaurant', icon: MapPin },
      { name: 'Coast to Coast Pub n Grill', icon: MapPin },
      { name: 'Cape Coast Coffee House', icon: MapPin },
      { name: 'Community Gardens Bar & Restaurant', icon: MapPin },
      { name: 'Sahara Pub & Restaurant', icon: MapPin },
      { name: 'Shipyard Café & Bar', icon: MapPin },
      { name: 'Lush on the Coast Restaurant & Bar', icon: MapPin },
    ],
    tags: ['Food'],
  },
];

// Extra meta for nicer cards (images + locations)
const experienceMeta: Record<
  string,
  Partial<
    Pick<
      IExperience,
      'imageUrl' | 'description' | 'location' | 'duration' | 'bestFor'
    >
  >
> = {
  'Becky Kay Restaurant & Bar': {
    imageUrl:
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/50/20/5c/interior.jpg?w=1200&h=-1&s=1',
    location: 'Cape Coast',
  },
  'Da Breeze Bar & Restaurant': {
    imageUrl:
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/f6/79/b6/da-breeze-from-above.jpg?w=1200&h=-1&s=1',
    location: 'Cape Coast – Beachfront',
  },
  'Castle Beach Restaurant': {
    imageUrl:
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/03/a5/43/2c/castle-restaurant.jpg?w=1200&h=-1&s=1',
    location: 'Cape Coast Castle',
  },
  'Lemon Lounge': {
    imageUrl:
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/6c/3a/c5/lemon-lounge.jpg?w=1200&h=-1&s=1',
    location: 'Commercial Street, Cape Coast',
  },
  'Emperor Ital Joint': {
    imageUrl:
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/27/78/77/89/vegan-platter.jpg?w=1200&h=-1&s=1',
    location: 'Victoria Road',
  },
  'Sasakawa Restaurant': {
    imageUrl:
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/03/8b/da/44/sasakawa-seafood.jpg?w=1200&h=-1&s=1',
    location: 'Cape Coast',
  },
  'Oguaa Basiaba Tasty Cuisine': {
    imageUrl:
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/35/3c/9d/photo1jpg.jpg?w=1200&h=-1&s=1',
    location: 'Cape Coast',
  },
  'New Life Café': {
    imageUrl:
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/18/27/2b/49/outdoor-seating.jpg?w=1200&h=-1&s=1',
    location: 'Cape Coast',
  },
  'Cape Cafe & Restaurant': {
    imageUrl:
      'https://seekghana.com/wp-content/uploads/2021/05/cape-cafe-restaurant-ghana.jpg',
    location: 'Adj. Melcom, Cape Coast',
  },
  'Coast to Coast Pub n Grill': {
    imageUrl:
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/18/4e/fb/93/pub-area.jpg?w=1200&h=-1&s=1',
    location: 'Cape Coast',
  },
  'Cape Coast Coffee House': {
    imageUrl:
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/28/0c/7e/a5/interior.jpg?w=1200&h=-1&s=1',
    location: 'Cape Coast',
  },
  'Community Gardens Bar & Restaurant': {
    imageUrl:
      'https://tortoisepath.com/wp-content/uploads/2021/04/community-gardens-bar-restaurant.jpg',
    location: 'Cape Coast',
  },
  'Sahara Pub & Restaurant': {
    imageUrl:
      'https://scontent.cdninstagram.com/v/t51.29350-15/434487730_1139791624025233_1962534103158182481_n.jpg?stp=dst-jpg_e35_s1080x1080&_nc_ht=scontent.cdninstagram.com&_nc_cat=109&_nc_ohc=XXXX',
    location: 'Cape Coast',
  },
  'Shipyard Café & Bar': {
    imageUrl:
      'https://scontent.cdninstagram.com/v/t51.2885-15/441340617_1526279964970633_6912111383066022251_n.jpg?stp=dst-jpg_e35_s1080x1080&_nc_ht=scontent.cdninstagram.com&_nc_cat=103',
    location: 'Cape Coast',
  },
  'Lush on the Coast Restaurant & Bar': {
    imageUrl:
      'https://scontent.cdninstagram.com/v/t51.2885-15/441324904_398544569611268_9138072545394547879_n.jpg?stp=dst-jpg_e35_s1080x1080&_nc_ht=scontent.cdninstagram.com&_nc_cat=108',
    location: 'Cape Coast',
  },
};

const getExperienceMeta = (
  itemName: string,
): Omit<IExperience, 'id' | 'name' | 'icon' | 'categoryTitle' | 'tags'> => {
  const meta = experienceMeta[itemName] ?? {};
  return {
    imageUrl:
      meta.imageUrl ??
      'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80',
    description:
      meta.description ??
      'Discover an authentic Cape Coast experience curated by local partners.',
    location: meta.location ?? 'Cape Coast area',
    duration: meta.duration ?? 'Flexible',
    bestFor: meta.bestFor ?? 'All visitors',
  };
};

// Flatten categories into a list of experiences
const allExperiences: IExperience[] = allCategories.flatMap((category) =>
  category.items.map((item, index) => {
    const meta = getExperienceMeta(item.name);
    return {
      id: `${category.title}-${index}-${item.name}`,
      name: item.name,
      icon: item.icon,
      categoryTitle: category.title,
      tags: category.tags,
      ...meta,
    };
  }),
);

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

interface ExperienceCardProps {
  experience: IExperience;
  inTripPlan: boolean;
  onToggleTrip: () => void;
}

// Experience Card Component — portrait image, restaurant overlay
const ExperienceCard: React.FC<ExperienceCardProps> = ({
  experience,
  inTripPlan,
  onToggleTrip,
}) => {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg hover:border-amber-200">
      {/* Portrait: height longer than width */}
      <div className="relative aspect-[2/3] w-full overflow-hidden">
        <img
          src={experience.imageUrl}
          alt={experience.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Dark gradient */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent" />

        {/* Top category chip */}
        <div className="absolute left-4 right-4 top-3 flex items-center justify-between gap-2">
          <span className="inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-slate-800 shadow-sm">
            {experience.categoryTitle}
          </span>
        </div>

        {/* Bottom overlay: name, description, buttons */}
        <div className="absolute left-4 right-4 bottom-3">
          <div className="rounded-lg bg-black/80 px-3 py-2.5 backdrop-blur-sm">
            <h2 className="text-lg sm:text-xl font-bold text-white leading-tight line-clamp-2">
              {experience.name}
            </h2>
            <p className="mt-1 text-[11px] sm:text-xs text-slate-100/90 line-clamp-2">
              {experience.description}
            </p>

            {/* Buttons row */}
            <div className="mt-2 flex items-center gap-2">
              <button
                type="button"
                onClick={onToggleTrip}
                className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-[10px] sm:text-xs font-semibold border transition ${
                  inTripPlan
                    ? 'border-emerald-500 bg-emerald-50/90 text-emerald-900'
                    : 'border-slate-200 bg-white/95 text-slate-800 hover:border-emerald-500 hover:text-emerald-800'
                }`}
              >
                {inTripPlan ? 'In trip plan' : 'Add to trip plan'}
              </button>

              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white/95 px-3 py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-slate-700 transition hover:border-amber-400 hover:text-amber-700"
              >
                View details
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

// Horizontal Filter Bar Component
const FilterBar: React.FC<{
  selected: string;
  onSelect: (category: string) => void;
}> = ({ selected, onSelect }) => (
  <div className="mb-6 sm:mb-8">
    <div className="overflow-x-auto pb-1">
      <div className="inline-flex min-w-full justify-center sm:justify-start">
        <div className="flex w-full max-w-full gap-2 sm:gap-3">
          {filterOptions.map((filter) => (
            <button
              key={filter}
              onClick={() => onSelect(filter)}
              className={`
                flex-1 sm:flex-none flex-shrink-0 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold
                transition-all duration-200 whitespace-nowrap
                ${
                  selected === filter
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-amber-400'
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
  <div className="text-center py-16 px-6 bg-white/90 rounded-2xl border border-slate-100 shadow-sm">
    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-50 border border-slate-100">
      <SearchX className="h-8 w-8 text-slate-400" />
    </div>
    <h3 className="mt-5 text-2xl font-semibold text-slate-900">
      No Activities Found
    </h3>
    <p className="mt-2 text-base text-slate-500 max-w-md mx-auto">
      Try adjusting your filters or search to discover more ways to explore Cape
      Coast.
    </p>
  </div>
);

export default function SeeDoPage() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [tripPlanIds, setTripPlanIds] = useState<string[]>([]);

  const filteredExperiences = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return allExperiences.filter((exp) => {
      const matchesFilter =
        selectedFilter === 'All' || exp.tags.includes(selectedFilter);

      const matchesSearch =
        term === '' ||
        exp.name.toLowerCase().includes(term) ||
        exp.description.toLowerCase().includes(term) ||
        exp.location.toLowerCase().includes(term);

      return matchesFilter && matchesSearch;
    });
  }, [selectedFilter, searchTerm]);

  const tripPlanExperiences = useMemo(
    () => allExperiences.filter((exp) => tripPlanIds.includes(exp.id)),
    [tripPlanIds],
  );

  const toggleTripPlan = (id: string) => {
    setTripPlanIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-14 sm:py-20 lg:px-8">
        {/* Page Header */}
        <div className="mx-auto max-w-3xl text-center mb-10 sm:mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-500 mb-3">
            Discover Cape Coast
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-slate-900">
            See &amp; Do
          </h1>
          <p className="mt-5 text-base sm:text-lg leading-7 sm:leading-8 text-slate-600 max-w-2xl mx-auto">
            Explore where to eat, drink and unwind in Cape Coast — from beachfront bars to cozy cafés.
          </p>
        </div>

        {/* Search + Filters */}
        <section className="mb-10 sm:mb-12">
          <div className="rounded-2xl border border-slate-200 bg-white/95 p-4 sm:p-5 shadow-sm">
            {/* Search */}
            <div className="mb-4 sm:mb-5">
              <label className="mb-2 block text-sm font-medium text-slate-800">
                Search places to eat &amp; drink
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                  <SearchX className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name or area (Becky Kay, beachfront, café)..."
                  className="w-full rounded-xl border border-slate-300 bg-white pl-10 pr-4 py-2.5 text-sm text-slate-800 outline-none transition focus:border-amber-500 focus:ring-1 focus:ring-amber-300 placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Filter Bar */}
            <FilterBar
              selected={selectedFilter}
              onSelect={setSelectedFilter}
            />
          </div>
        </section>

        {/* Layout: experiences + trip plan */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.8fr)_minmax(0,0.9fr)] lg:items-start">
          {/* Experiences grid */}
          <section>
            {filteredExperiences.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-2 xl:grid-cols-3">
                {filteredExperiences.map((exp) => (
                  <ExperienceCard
                    key={exp.id}
                    experience={exp}
                    inTripPlan={tripPlanIds.includes(exp.id)}
                    onToggleTrip={() => toggleTripPlan(exp.id)}
                  />
                ))}
              </div>
            ) : (
              <NoResults />
            )}
          </section>

          {/* Trip plan sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-24">
            <div className="rounded-2xl border border-slate-200 bg-white/95 p-5 shadow-sm">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
                Trip plan
              </p>
              {tripPlanExperiences.length === 0 ? (
                <p className="text-sm text-slate-600 leading-relaxed">
                  Add restaurants and cafés to your trip plan to remember where you&apos;d like to eat and relax in Cape Coast.
                </p>
              ) : (
                <div className="space-y-3">
                  {tripPlanExperiences.map((exp) => (
                    <div
                      key={exp.id}
                      className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3"
                    >
                      <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg bg-slate-100">
                        <img
                          src={exp.imageUrl}
                          alt={exp.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-slate-900">
                          {exp.name}
                        </p>
                        <p className="truncate text-xs text-slate-500">
                          {exp.location}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => toggleTripPlan(exp.id)}
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
        </div>
      </div>
    </div>
  );
}
