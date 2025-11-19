import { Castle, Waves, Heart, Users } from 'lucide-react';

export default function WhyVisit() {
  const reasons = [
    {
      icon: Castle,
      title: 'Rich Heritage',
      description: 'Explore historic castles and learn about the transatlantic slave trade'
    },
    {
      icon: Waves, 
      title: 'Stunning Coastline',
      description: 'Beautiful beaches and coastal adventures await you'
    },
    {
      icon: Heart,
      title: 'Diaspora Connection',
      description: 'Trace your roots and connect with your ancestral homeland'
    },
    {
      icon: Users,
      title: 'Vibrant Culture',
      description: 'Experience festivals, traditions, and warm Ghanaian hospitality'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
            Why Visit Cape Coast?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A destination where history, culture, and natural beauty create unforgettable experiences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                <reason.icon className="text-blue-900" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{reason.title}</h3>
              <p className="text-gray-600">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
