import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { MapPin, Star } from 'lucide-react';

interface Hotel {
  id: string;
  name: string;
  description: string;
  category: string;
  price_range: string;
  image_url: string;
  featured: boolean;
}

export default function Hotels() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchHotels();
  }, []);

  async function fetchHotels() {
    const { data } = await supabase
      .from('hotels')
      .select('*')
      .order('featured', { ascending: false })
      .order('created_at', { ascending: false });

    if (data) setHotels(data);
  }

  const categories = ['all', 'hotel', 'guest_house', 'beach', 'budget'];

  const filteredHotels = selectedCategory === 'all'
    ? hotels
    : hotels.filter(hotel => hotel.category === selectedCategory);

  return (
    <section id="hotels" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
            Hotels & Accommodation
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find the perfect place to stay during your visit
          </T
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full capitalize transition ${
                selectedCategory === category
                  ? 'bg-blue-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.replace('_', ' ')}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredHotels.map(hotel => (
            <div
              key={hotel.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition group"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={hotel.image_url}
                  alt={hotel.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
                {hotel.featured && (
                  <span className="absolute top-4 left-4 bg-amber-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Featured
                  </span>
                )}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                  <Star size={16} className="text-amber-500 fill-amber-500" />
                  <span className="text-sm font-semibold">4.5</span>
                </div>
              </div>
              <div className="p-6">
                <span className="inline-block bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-sm font-semibold mb-3 capitalize">
                  {hotel.category.replace('_', ' ')}
                </span>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{hotel.name}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{hotel.description}</p>
                <div className="flex items-center gap-2 text-gray-600 mb-4">
                  <MapPin size={18} />
                  <span>Cape Coast</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-blue-900 font-bold text-lg">{hotel.price_range}</span>
                  <span className="text-gray-500 text-sm">per night</span>
                </div>
                <button className="w-full bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-800 transition font-semibold">
                  Check Availability
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredHotels.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No accommodations found in this category yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}