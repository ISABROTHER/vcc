import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-200 shadow-sm">
      {/* Top Bar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        
        {/* Logo */}
        <div className="text-2xl font-semibold tracking-wide text-black">
          Visit <span className="text-yellow-600">Cape</span> Coast
        </div>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-10 text-sm font-medium">
          <a href="#experiences" className="text-black hover:text-yellow-600">Experiences</a>
          <a href="#heritage" className="text-black hover:text-yellow-600">Heritage</a>
          <a href="#hotels" className="text-black hover:text-yellow-600">Hotels</a>
          <a href="#events" className="text-black hover:text-yellow-600">Events</a>
          <a href="#plan" className="text-black hover:text-yellow-600">Plan Your Trip</a>

          {/* Desktop Book Button */}
          <button className="px-7 py-2.5 rounded-full font-semibold bg-yellow-600 text-white hover:bg-yellow-700 shadow-md">
            Book Now
          </button>
        </nav>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="inline-flex items-center rounded-full border border-gray-300 px-3 py-2 lg:hidden bg-gray-100 text-black"
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* MOBILE DROPDOWN — 50% SLOWER */}
      <div
        className={`
          mx-auto w-full max-w-7xl px-6 lg:hidden overflow-hidden
          transition-all duration-700 
          ease-[cubic-bezier(0.25,1,0.5,1)]
          ${menuOpen ? "max-h-[700px]" : "max-h-0"}
        `}
      >
        <div
          className={`
            mt-3 rounded-2xl border border-yellow-500/40 
            bg-yellow-300/20 backdrop-blur-md
            shadow-xl p-6 flex flex-col gap-4

            transform transition-all duration-700 
            ease-[cubic-bezier(0.25,1,0.5,1)]

            ${menuOpen 
              ? "opacity-100 translate-y-0 scale-100" 
              : "opacity-0 -translate-y-5 scale-95"}
          `}
        >
          <a
            href="#experiences"
            onClick={() => setMenuOpen(false)}
            className="w-full rounded-xl px-4 py-3 text-left text-base font-medium text-black"
          >
            Experiences
          </a>

          <a
            href="#heritage"
            onClick={() => setMenuOpen(false)}
            className="w-full rounded-xl px-4 py-3 text-left text-base font-medium text-black"
          >
            Heritage
          </a>

          <a
            href="#hotels"
            onClick={() => setMenuOpen(false)}
            className="w-full rounded-xl px-4 py-3 text-left text-base font-medium text-black"
          >
            Hotels
          </a>

          <a
            href="#events"
            onClick={() => setMenuOpen(false)}
            className="w-full rounded-xl px-4 py-3 text-left text-base font-medium text-black"
          >
            Events
          </a>

          <a
            href="#plan"
            onClick={() => setMenuOpen(false)}
            className="w-full rounded-xl px-4 py-3 text-left text-base font-medium text-black"
          >
            Plan Your Trip
          </a>

          {/* Mobile Book Button */}
          <button className="w-full bg-black text-yellow-400 px-4 py-3 rounded-xl font-semibold shadow-md">
            Book Now
          </button>
        </div>
      </div>
    </header>
  );
}
