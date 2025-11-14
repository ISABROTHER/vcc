import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white border-b border-gray-200 fixed top-0 left-0 z-50">
      {/* Luxury Top Bar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        
        {/* Luxury Serif Logo */}
        <div className="font-serif text-3xl font-semibold text-black tracking-wide">
          Visit <span className="text-yellow-600">Cape</span> Coast
        </div>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-10 text-sm font-medium">
          <a href="#experiences" className="text-gray-800 hover:text-black">
            Experiences
          </a>
          <a href="#heritage" className="text-gray-800 hover:text-black">
            Heritage
          </a>
          <a href="#hotels" className="text-gray-800 hover:text-black">
            Hotels
          </a>
          <a href="#events" className="text-gray-800 hover:text-black">
            Events
          </a>
          <a href="#plan" className="text-gray-800 hover:text-black">
            Plan Your Trip
          </a>

          {/* Luxury Book Button */}
          <button className="bg-yellow-600 text-white px-7 py-2.5 rounded-full font-semibold shadow-md border border-yellow-700">
            Book Now
          </button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="inline-flex items-center rounded-full border px-3 py-2 lg:hidden"
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* MOBILE DROPDOWN — Luxury Spacing */}
      {menuOpen && (
        <div className="mx-auto block w-full max-w-7xl px-6 lg:hidden">
          <div className="mt-7 flex flex-col gap-4 rounded-2xl border bg-white p-6 shadow-lg">
            
            <a
              href="#experiences"
              onClick={() => setMenuOpen(false)}
              className="w-full rounded-xl px-4 py-3 text-left text-base font-medium text-gray-900"
            >
              Experiences
            </a>

            <a
              href="#heritage"
              onClick={() => setMenuOpen(false)}
              className="w-full rounded-xl px-4 py-3 text-left text-base font-medium text-gray-900"
            >
              Heritage
            </a>

            <a
              href="#hotels"
              onClick={() => setMenuOpen(false)}
              className="w-full rounded-xl px-4 py-3 text-left text-base font-medium text-gray-900"
            >
              Hotels
            </a>

            <a
              href="#events"
              onClick={() => setMenuOpen(false)}
              className="w-full rounded-xl px-4 py-3 text-left text-base font-medium text-gray-900"
            >
              Events
            </a>

            <a
              href="#plan"
              onClick={() => setMenuOpen(false)}
              className="w-full rounded-xl px-4 py-3 text-left text-base font-medium text-gray-900"
            >
              Plan Your Trip
            </a>

            {/* Luxury Book Button Mobile */}
            <button className="w-full bg-yellow-600 text-white px-4 py-3 rounded-xl font-semibold shadow border border-yellow-700">
              Book Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
