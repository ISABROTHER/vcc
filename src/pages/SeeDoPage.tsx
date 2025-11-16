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
  Search, // Changed from SearchX
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
      { name: "Kids’ history tours", icon: BookOpen },
    ],
    tags: ['Adventure'],
  },
];

// Extra meta for nicer cards (images + descriptions)
const experienceMeta: Record<
  string,
  Partial<
    Pick<
      IExperience,
      'imageUrl' | 'description' | 'location' | 'duration' | 'bestFor'
    >
  >
> = {
  'Cape Coast Castle (UNESCO Site)': {
    imageUrl:
      'https://images.unsplash.com/photo-1526481280695-3c687fd543c0?auto=format&fit=crop&w=1200&q=80',
    description:
      'Walk through centuries of history at one of West Africa’s most important UNESCO World Heritage Sites.',
    location: 'Cape Coast city centre',
    duration: '1.5–2 hours',
    bestFor: 'History lovers · Heritage travellers',
  },
  'Elmina Castle': {
    imageUrl:
      'https://images.unsplash.com/photo-1598961889904-1568a6314054?auto=format&fit=crop&w=1200&q=80',
    description:
      'Explore one of the oldest European-built structures in sub-Saharan Africa on the shores of Elmina.',
    location: 'Elmina, 20–30 mins from Cape Coast',
    duration: '1.5–2 hours',
    bestFor: 'Heritage · Culture · Groups',
  },
  'Kakum National Park (Canopy Walk)': {
    imageUrl:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    description:
      'Experience the famous canopy walkway suspended above lush rainforest in Kakum.',
    location: 'Kakum area, 45–60 mins from Cape Coast',
    duration: 'Half day',
    bestFor: 'Families · Nature lovers · Adventure seekers',
  },
  'Fort William Lighthouse': {
    imageUrl:
      'https://images.unsplash.com/photo-1525939864511-4886a631b4a3?auto=format&fit=crop&w=1200&q=80',
    description:
      'Climb towards panoramic views over Cape Coast and its historic shoreline.',
    location: 'Cape Coast hilltop',
    duration: '1–1.5 hours',
    bestFor: 'Photography · Sunset views',
  },
  'Assin Manso Ancestral Slave River': {
    imageUrl:
      'https://images.unsplash.com/photo-1544989164-31dc3c645987?auto=format&fit=crop&w=1200&q=80',
    description:
      'A deeply moving memorial site linked to the transatlantic slave trade and diaspora history.',
    location: 'Assin Manso, inland from Cape Coast',
    duration: 'Half day',
    bestFor: 'Heritage · Reflection',
  },
  'Beaches & coastlines': {
    imageUrl:
      'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1200&q=80',
    description:
      'Relax along golden beaches, fishing villages, and coastal viewpoints near Cape Coast.',
    location: 'Cape Coast and Elmina coastline',
    duration: 'Flexible',
    bestFor: 'Relaxation · Couples · Families',
  },
  'Heritage & History Tours': {
    imageUrl:
      'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80',
    description:
      'Curated guided tours linking castles, memorial sites, and local stories.',
    location: 'Cape Coast · Elmina · Assin Manso',
    duration: 'Half or full day',
    bestFor: 'Groups · Study tours',
  },
  'Kakum Forest Hikes': {
    imageUrl:
      'https://images.unsplash.com/photo-1533636721434-0e2d61030955?auto=format&fit=crop&w=1200&q=80',
    description:
      'Forest trails beneath the canopy with birdsong, fresh air and local guides.',
    location: 'Kakum National Park',
    duration: 'Half day',
    bestFor: 'Active travellers · Nature lovers',
  },
  'Coastal Boat Rides': {
    imageUrl:
      'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1200&q=80',
    description:
      'Gentle boat rides along the coast or lagoons with views of fishing life.',
    location: 'Coastal areas near Cape Coast & Elmina',
    duration: '1–2 hours',
    bestFor: 'Couples · Small groups',
  },
  'Cultural Experiences (drumming, cooking)': {
    imageUrl:
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    description:
      'Hands-on drumming, dance or cooking sessions with local instructors.',
    location: 'Cape Coast area',
    duration: '2–3 hours',
    bestFor: 'Groups · Culture seekers',
  },
  'Fishing Village Visits': {
    imageUrl:
      'https://images.unsplash.com/photo-1509099863731-ef4bff19e808?auto=format&fit=crop&w=1200&q=80',
    description:
      'Visit active fishing communities, watch boat landings and learn about coastal life.',
    location: 'Villages along the Cape Coast–Elmina stretch',
    duration: '2–3 hours',
    bestFor: 'Curious travellers · Photographers',
  },
  'Storytelling & Night Tours': {
    imageUrl:
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=80',
    description:
      'Evening stories, legends and guided night walks for a different side of Cape Coast.',
    location: 'Cape Coast area',
    duration: 'Evening · 1.5–2 hours',
    bestFor: 'Adults · Small groups',
  },
  'Diaspora Return/Naming Ceremonies': {
    imageUrl:
      'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1200&q=80',
    description:
      'Meaningful, personalised ceremonies connecting diaspora visitors with local traditions.',
    location: 'Cape Coast & surrounding communities',
    duration: 'Custom',
    bestFor: 'Diaspora visitors · Families',
  },
  'Beach activities': {
    imageUrl:
      'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1200&q=80',
    description:
      'Play, relax or walk along the sand with easy access to local food and music.',
    location: 'Cape Coast beaches',
    duration: 'Flexible',
    bestFor: 'Families · Friends',
  },
  'Nature photography': {
    imageUrl:
      'https://images.unsplash.com/photo-1496482475496-a91f31e0386a?auto=format&fit=crop&w=1200&q=80',
    description:
      'Capture forest, coast and cityscapes with guidance on the best viewpoints.',
    location: 'Kakum · Coastline · City viewpoints',
    duration: 'Half day',
    bestFor: 'Photographers · Creatives',
  },
  'Bird watching': {
    imageUrl:
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80',
    description:
      'Early morning birding with guides who know the calls and hotspots.',
    location: 'Kakum and nearby forests',
    duration: 'Morning · 2–4 hours',
    bestFor: 'Birders · Nature lovers',
  },
  'Eco trails': {
    imageUrl:
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80',
    description:
      'Walk eco-conscious trails with opportunities to learn about conservation.',
    location: 'Forested areas near Kakum & villages',
    duration: 'Half day',
    bestFor: 'Eco travellers',
  },
  'Picnics & adventure experiences': {
    imageUrl:
      'https://images.unsplash.com/photo-1478146059778-339e08d1844e?auto=format&fit=crop&w=1200&q=80',
    description:
      'Combine relaxed picnics with light adventure activities in scenic spots.',
    location: 'Beaches · Forest edges',
    duration: 'Half day',
    bestFor: 'Families · Friends',
  },
  'Festivals & events': {
    imageUrl:
      'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=1200&q=80',
    description:
      'Join local festivals, durbars and special events when they are in season.',
    location: 'Cape Coast & Central Region',
    duration: 'Varies',
    bestFor: 'Culture lovers',
  },
  'Art markets': {
    imageUrl:
      'https://images.unsplash.com/photo-1509099863731-ef4bff19e808?auto=format&fit=crop&w=1200&q=80',
    description:
      'Browse paintings, crafts and handmade pieces from local artists.',
    location: 'Cape Coast art centres',
    duration: '1–2 hours',
    bestFor: 'Shoppers · Art lovers',
  },
  Museums: {
    imageUrl:
      'https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?auto=format&fit=crop&w=1200&q=80',
    description:
      'Visit local museums that share stories of history, culture and everyday life.',
    location: 'Cape Coast area',
    duration: '1–2 hours',
    bestFor: 'History · Education',
  },
  'Local craft shops': {
    imageUrl:
      'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1200&q=80',
    description:
      'Support artisans by purchasing beads, textiles, carvings and souvenirs.',
    location: 'Cape Coast & nearby towns',
    duration: 'Flexible',
    bestFor: 'Shoppers · Visitors',
  },
  'Live performances': {
    imageUrl:
      'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1200&q=80',
    description:
      'Enjoy music, dance and theatre showcasing local talent and rhythms.',
    location: 'Venues in Cape Coast',
    duration: 'Evening',
    bestFor: 'Nightlife · Culture',
  },
  'Beach picnics': {
    imageUrl:
      'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80',
    description:
      'Simple, relaxed picnics by the sea with family or friends.',
    location: 'Beaches near Cape Coast',
    duration: 'Flexible',
    bestFor: 'Families · Couples',
  },
  'Botel crocodile pond': {
    imageUrl:
      'https://images.unsplash.com/photo-1504198458649-3128b932f49b?auto=format&fit=crop&w=1200&q=80',
    description:
      'Visit the popular crocodile pond experience linked with a lakeside hotel.',
    location: 'Hans Cottage Botel area',
    duration: '1–2 hours',
    bestFor: 'Families · Curious visitors',
  },
  "Kids’ history tours": {
    imageUrl:
      'https://images.unsplash.com/photo-1519458246479-6acae7536988?auto=format&fit=crop&w=1200&q=80',
    description:
      'Child-friendly tours that introduce history through stories and age-appropriate stops.',
    location: 'Castles & museums',
    duration: '1.5–2 hours',
    bestFor: 'Families · Schools',
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

// Experience Card Component — everything on the picture, only buttons on top of image
const ExperienceCard: React.FC<ExperienceCardProps> = ({
  experience,
  inTripPlan,
  onToggleTrip,
}) => {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg hover:border-amber-200">
      <div className="relative aspect-[3/4] w-full overflow-hidden">
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
            <h2 className="text-sm sm:text-base font-semibold text-white leading-tight line-clamp-2">
              {experience.name}
            </h2>
            <p className="mt-1 text-[11px] sm:text-xs text-slate-100/90 line-clamp-2">
              {experience.description}
            </p>

            {/* Buttons row */}
            <div className="mt-2 flex items-center gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onToggleTrip();
                }}
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
      <Search className="h-8 w-8 text-slate-400" />
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
            Explore powerful history, coastal life, rainforest adventures and
            cultural experiences — all within Cape Coast and the Central Region.
          </p>
        </div>

        {/* Search + Filters */}
        <section className="mb-10 sm:mb-12">
          <div className="rounded-2xl border border-slate-200 bg-white/95 p-4 sm:p-5 shadow-sm">
            {/* Search */}
            <div className="mb-4 sm:mb-5">
              <label className="mb-2 block text-sm font-medium text-slate-800">
                Search experiences
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                  <Search className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name, area or keywords (castle, beach, forest, culture)..."
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
                  Add experiences to your trip plan to keep track of what you&apos;d
                  like to see and do while in Cape Coast.
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