import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Clock, DollarSign } from 'lucide-react';

interface Experience {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  duration: string;
  image_url: string;
  featured: boolean;
}

export default function Experiences() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchExperiences();
  }, []);

  async function fetchExperiences() {
    const { data } = await supabase
      .from('experiences')
      .select('*')
      .order('featured', { ascending: false })
      .order('created_at', { ascending: false });

    if (data) setExperiences(data);
  }

  const categories = ['all', 'tours', 'cultural', 'castle', 'adventure', 'food', 'creative'];

  const filteredExperiences = selectedCategory === 'all'
    ? experiences
    : experiences.filter(exp => exp.category === selectedCategory);

  return (
    <section id="experiences" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
            Experiences & Tours
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Book unforgettable adventures and cultural experiences
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
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredExperiences.map(experience => (
            <div
              key={experience.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition group"
            >
              <<div className="relative h-64 overflow-hidden">
  <img
    src={hotel.image_url}
    alt={hotel.name}
    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
  />
</div>
                {experience.featured && (
                  <span className="absolute top-4 left-4 bg-amber-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Featured
                  </span>
                )}
              </div>
              <div className="p-6">
                <span className="inline-block bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-sm font-semibold mb-3 capitalize">
                  {experience.category}
                </span>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{experience.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{experience.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock size={18} />
                    <span>{experience.duration}</span>
                  </div>
                  <div className="flex items-center gap-1 text-blue-900 font-bold">
                    <DollarSign size={18} />
                    <span>{experience.price}</span>
                  </div>
                </div>
                <button className="w-full bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-800 transition font-semibold">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredExperiences.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No experiences found in this category yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}
