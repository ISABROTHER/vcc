import { Send } from 'lucide-react';

export default function CallToAction() {
  return (
    <section className="bg-blue-800 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Ready to Start Your Adventure?
        </h2>
        <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10">
          Your unforgettable Cape Coast experience is just a click away. Book your tours,
          find the perfect place to stay, and plan your trip today.
        </p>
        <button className="bg-amber-500 text-white px-10 py-4 rounded-lg hover:bg-amber-600 transition font-semibold text-lg flex items-center justify-center gap-2 mx-auto">
          <span>Book Your Trip Now</span>
          <Send size={20} />
        </button>
      </div>
    </section>
  );
}