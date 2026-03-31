import { useState, useMemo } from 'react';
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Music,
  Drum,
  Star,
  Filter,
  ChevronDown,
  Ticket,
  Heart,
  Share2,
  ArrowRight,
} from 'lucide-react';

type MonthFilter = 'all' | 'jan' | 'feb' | 'mar' | 'apr' | 'may' | 'jun' | 'jul' | 'aug' | 'sep' | 'oct' | 'nov' | 'dec';
type CategoryFilter = 'all' | 'festival' | 'cultural' | 'music' | 'diaspora' | 'religious' | 'community';

interface EventData {
  id: string;
  name: string;
  tagline: string;
  description: string;
  date: string;
  month: MonthFilter;
  duration: string;
  location: string;
  category: CategoryFilter;
  image: string;
  highlights: string[];
  tip: string;
  isFeatured?: boolean;
  attendance?: string;
}

const EVENTS: EventData[] = [
  {
    id: 'fetu-afahye',
    name: 'Oguaa Fetu Afahye',
    tagline: 'The heartbeat of Cape Coast',
    description:
      'The most important festival of the Oguaa Traditional Area, celebrated on the first Saturday of September. Chiefs, queen mothers and thousands of locals parade through the streets in full regalia. Expect drumming, dancing, libation pouring and a powerful durbar of chiefs.',
    date: 'First Saturday of September',
    month: 'sep',
    duration: '1 week of events, main durbar on Saturday',
    location: 'Victoria Park & Cape Coast Township',
    category: 'festival',
    image: 'https://images.pexels.com/photos/17911681/pexels-photo-17911681/free-photo-of-a-man-in-a-traditional-ghanaian-kente-cloth.jpeg?auto=compress&cs=tinysrgb&w=800',
    highlights: [
      'Grand durbar of chiefs in full regalia',
      'Street processions with drumming and dancing',
      'Traditional libation and purification rites',
      'Beauty pageants and cultural competitions',
      'Food and craft markets throughout the week',
    ],
    tip: 'Arrive early on Saturday to get a good viewing spot at Victoria Park. Wear white or traditional cloth to blend in with the celebrations.',
    isFeatured: true,
    attendance: '50,000+',
  },
  {
    id: 'bakatue',
    name: 'Bakatue Festival',
    tagline: 'Opening of the lagoon',
    description:
      'Celebrated by the people of Elmina, Bakatue marks the ritual opening of the Benya Lagoon for fishing. It is one of the oldest festivals in Ghana, with roots going back centuries. The festival includes a colourful regatta on the lagoon, net casting ceremonies and a grand durbar.',
    date: 'First Tuesday of July',
    month: 'jul',
    duration: '3 days',
    location: 'Elmina, Benya Lagoon',
    category: 'festival',
    image: 'https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=800',
    highlights: [
      'Ritual opening of Benya Lagoon for fishing season',
      'Colourful boat regatta with decorated canoes',
      'Traditional net-casting ceremony',
      'Durbar of Elmina chiefs',
      'Street processions through Elmina town',
    ],
    tip: 'Head to the Elmina lagoon bridge early morning for the best view of the boat regatta. The castles are also open for free tours during the festival.',
    isFeatured: true,
    attendance: '30,000+',
  },
  {
    id: 'panafest',
    name: 'PANAFEST (Pan-African Festival)',
    tagline: 'Africa\'s homecoming celebration',
    description:
      'A biennial Pan-African theatre and cultural festival that brings together Africans and people of African descent from across the globe. It features theatre performances, poetry, music, lectures and the powerful "Through the Door of Return" ceremony at Cape Coast Castle.',
    date: 'Late July / Early August (biennial, even years)',
    month: 'jul',
    duration: '2 weeks',
    location: 'Cape Coast Castle, UCC, various venues',
    category: 'diaspora',
    image: 'https://images.pexels.com/photos/3171770/pexels-photo-3171770.jpeg?auto=compress&cs=tinysrgb&w=800',
    highlights: [
      '"Through the Door of Return" ceremony at Cape Coast Castle',
      'International theatre and dance performances',
      'Pan-African poetry and literary readings',
      'Academic lectures on African history and identity',
      'Grand cultural night with music from across Africa',
    ],
    tip: 'Book accommodation well in advance — hotels fill up across Cape Coast and Elmina. The castle ceremonies are profoundly moving; bring tissues.',
    isFeatured: true,
    attendance: '20,000+',
  },
  {
    id: 'emancipation-day',
    name: 'Emancipation Day',
    tagline: 'Remembrance and reconnection',
    description:
      'Held on August 1st annually, Emancipation Day commemorates the abolition of slavery in the British Empire. The event centres on the castles of Cape Coast and Elmina, with candlelight vigils, wreath-laying ceremonies and a symbolic "pilgrimage" through the dungeons.',
    date: 'August 1st',
    month: 'aug',
    duration: '1 day (events throughout the week)',
    location: 'Cape Coast Castle & Elmina Castle',
    category: 'diaspora',
    image: 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=800',
    highlights: [
      'Candlelight procession through Cape Coast streets',
      'Wreath-laying at the Door of No Return',
      'Dungeon tour with historical narration',
      'Cultural performances and speeches',
      'Reversal of Middle Passage symbolic ceremony',
    ],
    tip: 'The candlelight vigil at the castle is an unforgettable experience. Wear comfortable shoes for the walk and bring a camera for the procession.',
    attendance: '10,000+',
  },
  {
    id: 'christmas-cape-coast',
    name: 'Christmas in Cape Coast',
    tagline: 'A coastal Christmas like no other',
    description:
      'Cape Coast comes alive during Christmas with beach parties, church concerts, family reunions and open-air food markets. Many diaspora Ghanaians return home for the holidays, creating a warm and festive atmosphere across the city.',
    date: 'December 20 – January 2',
    month: 'dec',
    duration: '2 weeks',
    location: 'Citywide — beaches, churches, markets',
    category: 'community',
    image: 'https://images.pexels.com/photos/3171837/pexels-photo-3171837.jpeg?auto=compress&cs=tinysrgb&w=800',
    highlights: [
      'Beach parties at Oasis, Coconut Grove and local beaches',
      'Christmas Eve church services with choral performances',
      'Open-air food markets with local delicacies',
      'Family reunions and homecoming celebrations',
      'New Year\'s Eve countdown events',
    ],
    tip: 'Book your accommodation by October — Cape Coast hotels sell out completely during the Christmas/New Year period.',
    attendance: '100,000+',
  },
  {
    id: 'easter-celebrations',
    name: 'Easter Celebrations',
    tagline: 'Faith meets the coast',
    description:
      'Easter in Cape Coast is marked by powerful church services, beach outings and family gatherings. The city\'s many historic churches — some dating back to the colonial era — host special services, and the beaches fill up on Easter Monday.',
    date: 'March/April (varies)',
    month: 'apr',
    duration: '4 days (Good Friday to Easter Monday)',
    location: 'Churches citywide, beaches',
    category: 'religious',
    image: 'https://images.pexels.com/photos/2774570/pexels-photo-2774570.jpeg?auto=compress&cs=tinysrgb&w=800',
    highlights: [
      'Special church services in historic colonial-era churches',
      'Processions through Cape Coast old town',
      'Easter Monday beach picnics',
      'Family gatherings and feasts',
    ],
    tip: 'Visit the Anglican or Methodist churches in old Cape Coast for a uniquely historic Easter experience with beautiful choral music.',
    attendance: '30,000+',
  },
  {
    id: 'kakum-conservation',
    name: 'Kakum Conservation Week',
    tagline: 'Celebrate the rainforest',
    description:
      'An annual week of activities promoting conservation awareness at Kakum National Park. Features guided night walks, birdwatching tours, tree planting, school education programs and canopy walk specials.',
    date: 'May (varies)',
    month: 'may',
    duration: '1 week',
    location: 'Kakum National Park',
    category: 'community',
    image: 'https://images.pexels.com/photos/957024/forest-trees-perspective-bright-957024.jpeg?auto=compress&cs=tinysrgb&w=800',
    highlights: [
      'Special guided night walks through the rainforest',
      'Sunrise birdwatching expeditions',
      'Community tree planting events',
      'Discounted canopy walk tickets',
      'Photography workshops in the forest',
    ],
    tip: 'Book the night walk in advance — it\'s the most popular event and spots fill up quickly. Bring insect repellent and a good torch.',
    attendance: '5,000+',
  },
  {
    id: 'oguaa-carnival',
    name: 'Oguaa Cape Coast Street Carnival',
    tagline: 'Dance through the streets',
    description:
      'A more recent addition to Cape Coast\'s cultural calendar, the street carnival brings music, colourful costumes, dance troupes and floats through the main streets of the city. It celebrates the youthful energy and creativity of Cape Coast.',
    date: 'October (varies)',
    month: 'oct',
    duration: '1 day',
    location: 'Cape Coast main streets',
    category: 'music',
    image: 'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=800',
    highlights: [
      'Colourful costume parades through town',
      'Live music stages with local and national artists',
      'Dance competitions between local groups',
      'Food vendors and craft stalls along the route',
      'Evening after-party with DJ sets',
    ],
    tip: 'Wear bright colours and comfortable shoes — you\'ll want to dance! The best viewing spots are along the main Cape Coast-Elmina road.',
    attendance: '15,000+',
  },
];

const monthLabels: Record<MonthFilter, string> = {
  all: 'All months',
  jan: 'January', feb: 'February', mar: 'March', apr: 'April',
  may: 'May', jun: 'June', jul: 'July', aug: 'August',
  sep: 'September', oct: 'October', nov: 'November', dec: 'December',
};

const categoryLabels: Record<CategoryFilter, string> = {
  all: 'All events',
  festival: 'Traditional festivals',
  cultural: 'Cultural events',
  music: 'Music & carnival',
  diaspora: 'Diaspora events',
  religious: 'Religious',
  community: 'Community',
};

const categoryIcons: Record<CategoryFilter, React.ElementType> = {
  all: Star,
  festival: Drum,
  cultural: Users,
  music: Music,
  diaspora: Heart,
  religious: Star,
  community: Users,
};

export default function EventsPage() {
  const [monthFilter, setMonthFilter] = useState<MonthFilter>('all');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);
  const [savedEvents, setSavedEvents] = useState<string[]>([]);

  const featured = EVENTS.filter((e) => e.isFeatured);

  const filtered = useMemo(() => {
    return EVENTS.filter((e) => {
      if (monthFilter !== 'all' && e.month !== monthFilter) return false;
      if (categoryFilter !== 'all' && e.category !== categoryFilter) return false;
      return true;
    });
  }, [monthFilter, categoryFilter]);

  const toggleSave = (id: string) => {
    setSavedEvents((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Hero */}
      <div className="relative bg-slate-900 text-white overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'url(https://images.pexels.com/photos/17911681/pexels-photo-17911681/free-photo-of-a-man-in-a-traditional-ghanaian-kente-cloth.jpeg?auto=compress&cs=tinysrgb&w=1200)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <p className="text-xs font-semibold tracking-[0.2em] text-amber-400 uppercase mb-3">
            Events & Festivals
          </p>
          <h1 className="text-3xl sm:text-5xl font-bold mb-4 max-w-2xl">
            Experience the rhythm of Cape Coast
          </h1>
          <p className="text-slate-300 max-w-xl text-base sm:text-lg leading-relaxed">
            From ancient festivals honouring chiefs and ancestors to Pan-African homecoming
            celebrations, Cape Coast's calendar is alive with culture, music and meaning all year round.
          </p>
        </div>
      </div>

      {/* Featured Events — horizontal scroll on mobile */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
          {featured.map((event) => (
            <div
              key={event.id}
              className="snap-start flex-shrink-0 w-[85vw] sm:w-80 bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-100 hover:shadow-xl transition-shadow"
            >
              <div className="relative h-40 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-amber-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Featured
                </div>
                <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full flex items-center gap-1.5">
                  <Calendar size={12} /> {event.date}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-slate-900 text-lg mb-1">{event.name}</h3>
                <p className="text-amber-600 text-xs font-medium mb-2 italic">{event.tagline}</p>
                <p className="text-slate-600 text-sm line-clamp-2 mb-3">{event.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-slate-500 text-xs">
                    <MapPin size={12} /> {event.location.split(',')[0]}
                  </div>
                  {event.attendance && (
                    <div className="flex items-center gap-1 text-slate-500 text-xs">
                      <Users size={12} /> {event.attendance}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="flex flex-wrap gap-3 items-center mb-2">
          <Filter size={16} className="text-slate-400" />
          <span className="text-sm font-medium text-slate-600">Filter by:</span>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {(Object.keys(categoryLabels) as CategoryFilter[]).map((cat) => {
            const Icon = categoryIcons[cat];
            return (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  categoryFilter === cat
                    ? 'bg-slate-900 text-white'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                <Icon size={12} />
                {categoryLabels[cat]}
              </button>
            );
          })}
        </div>
        <div className="flex flex-wrap gap-2 mb-8">
          {(Object.keys(monthLabels) as MonthFilter[]).map((m) => (
            <button
              key={m}
              onClick={() => setMonthFilter(m)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                monthFilter === m
                  ? 'bg-amber-500 text-white'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-amber-50'
              }`}
            >
              {monthLabels[m]}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="text-sm text-slate-500 mb-6">
          Showing {filtered.length} event{filtered.length !== 1 ? 's' : ''}
          {monthFilter !== 'all' ? ` in ${monthLabels[monthFilter]}` : ''}
          {categoryFilter !== 'all' ? ` · ${categoryLabels[categoryFilter]}` : ''}
        </p>

        {/* Event Cards */}
        <div className="space-y-4">
          {filtered.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-100">
              <Calendar size={40} className="mx-auto text-slate-300 mb-4" />
              <p className="text-slate-600 font-medium">No events found for this filter</p>
              <p className="text-slate-400 text-sm mt-1">Try a different month or category</p>
            </div>
          ) : (
            filtered.map((event) => {
              const isExpanded = expandedEvent === event.id;
              const isSaved = savedEvents.includes(event.id);
              return (
                <div
                  key={event.id}
                  className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row">
                    {/* Image */}
                    <div className="sm:w-56 h-48 sm:h-auto flex-shrink-0 overflow-hidden">
                      <img
                        src={event.image}
                        alt={event.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-5 sm:p-6">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div>
                          <h3 className="font-bold text-lg text-slate-900">{event.name}</h3>
                          <p className="text-amber-600 text-xs font-medium italic">{event.tagline}</p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <button
                            onClick={() => toggleSave(event.id)}
                            className={`p-2 rounded-full transition ${
                              isSaved ? 'bg-red-50 text-red-500' : 'bg-slate-100 text-slate-400 hover:text-red-400'
                            }`}
                          >
                            <Heart size={16} fill={isSaved ? 'currentColor' : 'none'} />
                          </button>
                        </div>
                      </div>

                      <p className="text-slate-600 text-sm mb-3 line-clamp-2">{event.description}</p>

                      {/* Meta */}
                      <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} className="text-amber-500" /> {event.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} className="text-amber-500" /> {event.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin size={12} className="text-amber-500" /> {event.location.split(',')[0]}
                        </span>
                        {event.attendance && (
                          <span className="flex items-center gap-1">
                            <Users size={12} className="text-amber-500" /> {event.attendance}
                          </span>
                        )}
                      </div>

                      {/* Expand toggle */}
                      <button
                        onClick={() => setExpandedEvent(isExpanded ? null : event.id)}
                        className="flex items-center gap-1 text-sm font-semibold text-amber-600 hover:text-amber-700 transition"
                      >
                        {isExpanded ? 'Show less' : 'View details & tips'}
                        <ChevronDown
                          size={16}
                          className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                        />
                      </button>

                      {/* Expanded details */}
                      {isExpanded && (
                        <div className="mt-4 pt-4 border-t border-slate-100 animate-fadeIn">
                          <h4 className="text-sm font-bold text-slate-800 mb-2">Highlights</h4>
                          <ul className="space-y-1.5 mb-4">
                            {event.highlights.map((h, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                                <Star size={12} className="text-amber-400 mt-0.5 flex-shrink-0" />
                                {h}
                              </li>
                            ))}
                          </ul>

                          <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
                            <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">
                              Local tip
                            </p>
                            <p className="text-sm text-amber-800">{event.tip}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Annual Calendar Overview */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Annual Event Calendar</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {(['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'] as MonthFilter[]).map((m) => {
            const count = EVENTS.filter((e) => e.month === m).length;
            const hasEvents = count > 0;
            return (
              <button
                key={m}
                onClick={() => { setMonthFilter(m); window.scrollTo({ top: 400, behavior: 'smooth' }); }}
                className={`relative rounded-xl p-4 text-center transition-all ${
                  hasEvents
                    ? 'bg-white border border-slate-200 hover:border-amber-400 hover:shadow-md cursor-pointer'
                    : 'bg-slate-100 text-slate-400 cursor-default'
                }`}
              >
                <p className={`text-sm font-bold ${hasEvents ? 'text-slate-900' : 'text-slate-400'}`}>
                  {monthLabels[m].slice(0, 3)}
                </p>
                {hasEvents && (
                  <p className="text-xs text-amber-600 font-medium mt-1">
                    {count} event{count > 1 ? 's' : ''}
                  </p>
                )}
                {!hasEvents && <p className="text-xs mt-1">—</p>}
              </button>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Don't miss out</h2>
          <p className="text-slate-300 max-w-lg mx-auto mb-6">
            Cape Coast festivals sell out accommodation fast. Plan ahead — book your stay and
            save your favourite events now.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="/accommodation"
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded-full transition"
            >
              Book accommodation <ArrowRight size={18} />
            </a>
            {savedEvents.length > 0 && (
              <span className="inline-flex items-center gap-2 bg-white/10 text-white font-medium px-6 py-3 rounded-full">
                <Heart size={16} className="text-red-400" /> {savedEvents.length} saved
              </span>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
