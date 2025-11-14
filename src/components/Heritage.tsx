import { MapPin, Heart, Users, BookOpen } from 'lucide-react';

export default function Heritage() {
  return (
    <section id="heritage" className="py-20 bg-gradient-to-br from-blue-900 to-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Heritage & Diaspora
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Connect with your roots and discover the profound history of Cape Coast
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold mb-6">The Castles</h3>
            <p className="text-blue-100 text-lg leading-relaxed">
              Cape Coast Castle and Elmina Castle stand as powerful monuments to history.
              These UNESCO World Heritage Sites tell the story of the transatlantic slave trade
              and serve as places of remembrance, education, and healing.
            </p>
            <p className="text-blue-100 text-lg leading-relaxed">
              Walk through the Door of No Return, visit the dungeons, and understand the
              resilience of the human spirit. These sites are essential stops for anyone
              seeking to understand African diaspora history.
            </p>
            <button className="bg-amber-500 text-white px-8 py-3 rounded-lg hover:bg-amber-600 transition font-semibold">
              Book Castle Tour
            </button>
          </div>

          <div className="relative h-96 rounded-xl overflow-hidden shadow-2xl">
            <img
              src="https://images.pexels.com/photos/5561923/pexels-photo-5561923.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Cape Coast Castle"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <MapPin className="mb-4" size={32} />
            <h4 className="text-xl font-bold mb-3">Return Journey</h4>
            <p className="text-blue-100">
              Guided programs for diaspora members returning to their ancestral homeland
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <Heart className="mb-4" size={32} />
            <h4 className="text-xl font-bold mb-3">Naming Ceremonies</h4>
            <p className="text-blue-100">
              Participate in traditional naming ceremonies and cultural celebrations
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <Users className="mb-4" size={32} />
            <h4 className="text-xl font-bold mb-3">Ancestry Tracing</h4>
            <p className="text-blue-100">
              Connect with local communities and explore your family history
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <BookOpen className="mb-4" size={32} />
            <h4 className="text-xl font-bold mb-3">Cultural Immersion</h4>
            <p className="text-blue-100">
              Deep dive into Ghanaian traditions, language, and way of life
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
