import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-blue-900">Visit Cape Coast</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#experiences" className="text-gray-700 hover:text-blue-900 transition">Experiences</a>
            <a href="#heritage" className="text-gray-700 hover:text-blue-900 transition">Heritage</a>
            <a href="#hotels" className="text-gray-700 hover:text-blue-900 transition">Hotels</a>
            <a href="#events" className="text-gray-700 hover:text-blue-900 transition">Events</a>
            <a href="#plan" className="text-gray-700 hover:text-blue-900 transition">Plan Your Trip</a>
            <button className="bg-amber-500 text-white px-6 py-2 rounded-full hover:bg-amber-600 transition">
              Book Now
            </button>
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-3">
            <a href="#experiences" className="block text-gray-700 hover:text-blue-900 transition">Experiences</a>
            <a href="#heritage" className="block text-gray-700 hover:text-blue-900 transition">Heritage</a>
            <a href="#hotels" className="block text-gray-700 hover:text-blue-900 transition">Hotels</a>
            <a href="#events" className="block text-gray-700 hover:text-blue-900 transition">Events</a>
            <a href="#plan" className="block text-gray-700 hover:text-blue-900 transition">Plan Your Trip</a>
            <button className="w-full bg-amber-500 text-white px-6 py-2 rounded-full hover:bg-amber-600 transition">
              Book Now
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
