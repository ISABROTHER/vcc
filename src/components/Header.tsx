import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full border-b bg-white fixed top-0 left-0 z-50">
      {/* Top bar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-900 tracking-tight">
          Visit Cape Coast
        </div>

        {/* Desktop menu */}
        <nav className="hidden gap-8 text-sm font-medium lg:flex">
          <a href="#experiences" className="hover:text-blue-900 transition">
            Experiences
          </a>
          <a href="#heritage" className="hover:text-blue-900 transition">
            Heritage
          </a>
          <a href="#hotels" className="hover:text-blue-900 transition">
            Hotels
          </a>
          <a href="#events" className="hover:text-blue-900 transition">
            Events
          </a>
          <a href="#plan" className="hover:text-blue-900 transition">
            Plan Your Trip
          </a>

          <button className="bg-amber-500 text-white px-6 py-2 rounded-full font-semibold shadow-sm hover:bg-amber-600 transition">
            Book Now
          </button>
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="inline-flex items-center rounded-full border px-3 py-2 lg:hidden"
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      {menuOpen && (
        <div className="mx-auto block w-full max-w-7xl px-4 pb-4 lg:hidden">
          <div className="flex flex-col gap-2 rounded-2xl border bg-white p-4 shadow-md">
            <a
              href="#experiences"
              onClick={() => setMenuOpen(false)}
              className="w-full rounded-xl px-4 py-2 text-left text-sm font-medium hover:bg-gray-100"
            >
              Experiences
            </a>
            <a
              href="#heritage"
              onClick={() => setMenuOpen(false)}
              className="w-full rounded-xl px-4 py-2 text-left text-sm font-medium hover:bg-gray-100"
            >
              Heritage
            </a>
            <a
              href="#hotels"
              onClick={() => setMenuOpen(false)}
              className="w-full rounded-xl px-4 py-2 text-left text-sm font-medium hover:bg-gray-100"
            >
              Hotels
            </a>
            <a
              href="#events"
              onClick={() => setMenuOpen(false)}
              className="w-full rounded-xl px-4 py-2 text-left text-sm font-medium hover:bg-gray-100"
            >
              Events
            </a>
            <a
              href="#plan"
              onClick={() => setMenuOpen(false)}
              className="w-full rounded-xl px-4 py-2 text-left text-sm font-medium hover:bg-gray-100"
            >
              Plan Your Trip
            </a>

            <button className="w-full bg-amber-500 text-white px-4 py-3 rounded-xl font-semibold shadow hover:bg-amber-600 transition">
              Book Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
