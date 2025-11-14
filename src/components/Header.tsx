import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-yellow-600/95 border-b border-yellow-700 shadow-lg">
      {/* Top Bar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        
        {/* Logo */}
        <div className="text-2xl font-bold tracking-wide text-white">
          Visit <span className="text-black">Cape</span> Coast
        </div>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-10 text-sm font-medium">
          <a href="#experiences" className="text-white hover:text-black">Experiences</a>
          <a href="#heritage" className="text-white hover:text-black">Heritage</a>
          <a href="#hotels" className="text-white hover:text-black">Hotels</a>
          <a href="#events" className="text-white hover:text-black">Events</a>
          <a href="#plan" className="text-white hover:text-black">Plan Your Trip</a>

          {/* Book Button */}
          <button className="px-7 py-2.5 rounded-full font-semibold bg-black text-yellow-400 shadow-md hover:bg-gray-900">
            Book Now
          </button>
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="inline-flex items-center rounded-full border px-3 py-2 lg:hidden border-black bg-yellow-500 text-black"
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* MOBILE MENU — GOLD THEME */}
      <div
        className={`
          mx-auto w-full max-w-7xl px-6 lg:hidden overflow-hidden
          transition-all duration-300 ease-out
          ${menuOpen ? "max-h-[500px] opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-3"}
        `}
      >
        <div className="mt-4 flex flex-col gap-4 rounded-2xl border border-yellow-700 bg-yellow-500 p-6 shadow-xl">
          
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

          <button className="w-full bg-black text-yellow-400 px-4 py-3 rounded-xl font-semibold shadow-md">
            Book Now
          </button>
        </div>
      </div>
    </header>
  );
}
