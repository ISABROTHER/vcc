import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import {
  Calendar,
  MapPin,
  Heart,
  Users,
  BookOpen,
  PartyPopper,
  School,
  Palmtree,
} from 'lucide-react';

// --- Data for new static sections ---
const majorFestivals = [
  {
    title: 'Fetu Afahye',
    description:
      'The major traditional festival of Cape Coast, with a durbar of chiefs and vibrant processions.',
    icon: PartyPopper,
    image:
      'https://images.pexels.com/photos/17911681/pexels-photo-17911681/free-photo-of-a-man-in-a-traditional-ghanaian-kente-cloth.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    title: 'PANAFEST & Emancipation',
    description:
      'A biennial global event attracting the African diaspora for heritage, arts, and cultural celebration.',
    icon: Heart,
    image:
      'https://images.pexels.com/photos/11197657/pexels-photo-11197657.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    title: 'Bakatue Festival (Elmina)',
    description:
      'A colourful festival to open the fishing season, held in nearby Elmina on the first Tuesday of July.',
    icon: Users,
    image:
      'https://images.pexels.com/photos/3579069/pexels-photo-3579069.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

const otherEvents = [
  {
    title: 'University & Youth Events',
    description:
      'Experience the vibrant energy of UCC Hall Weeks, student concerts, and inter-school festivals.',
    icon: School,
  },
  {
    title: 'Diaspora & Heritage Events',
    description:
      'Participate in naming ceremonies, heritage vigils, and "Beyond the Return" activities.',
    icon: BookOpen,
  },
  {
    title: 'Beach & Lifestyle',
    description:
      'Enjoy beach carnivals, seafood pop-ups, surfing lessons, and live DJ nights on the coast.',
    icon: Palmtree,
  },
  {
    title: 'Artisan & Creative Markets',
    description:
      'Discover local talent at creative expos, fashion shows, and artisan craft markets.',
    icon: MapPin,
  },
];
// --- End of new data ---

interface Event {
  id: string;
  title: string;
  description: string;
  event_date: string;
  location: string;
  image_url: string;
}

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    const { data } } = await supabase
      .from('events')
      .select('*')
      .gte('event_date', new Date().toISOString())
      .order('event_date', { ascending: true });

    if (data) setEvents(data);
  }

  return (
    <section id="events" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. Page Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
            Events & Festivals
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From major traditional festivals to vibrant beach parties, discover
            the rhythm of Cape Coast.
          </p>
        </div>

        {/* 2. Major Festivals Section (NEW) */}
        <div className="mb-20">
          <h3 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4 text-center">
            Major Festivals
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto text-center mb-12">
            These are the unmissable, large-scale events that define the
            region's culture.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {majorFestivals.map((festival) => (
              <div
                key={festival.title}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition group"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={festival.image}
                    alt={festival.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <festival.icon size={28} className="text-amber-400 mb-2" />
                    <h3 className="text-2xl font-bold text-white">
                      {festival.title}
                    </h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600">{festival.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Other Event Types Section (NEW) */}
        <div className="mb-20">
          <h3 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4 text-center">
            The Vibe of the City
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto text-center mb-12">
            Beyond the major festivals, there is always something happening.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {otherEvents.map((event) => (
              <div
                key={event.title}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                  <event.icon className="text-blue-900" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {event.title}
                </h3>
                <p className="text-gray-600">{event.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Upcoming Events Calendar (Original Supabase section) */}
        <div>
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
              Upcoming Event Calendar
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Specific dates for upcoming events. Add your event by contacting
              us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.image_url}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {event.description}
                  </p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar size={18} />
                      <span>
                        {new Date(event.event_date).toLocaleDateString(
                          'en-US',
                          {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          }
                        )}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin size={18} />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <button className="w-full bg-amber-500 text-white py-3 rounded-lg hover:bg-amber-600 transition font-semibold">
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>

          {events.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No upcoming events at the moment. Check back soon!
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}