import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Landmark,
  UtensilsCrossed,
  Bed,
  Search,
  Menu,
  X,
  Info,
  Ticket,
  ChevronRight,
} from 'lucide-react';

const BottomNav: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const quickItems = [
    { label: 'See & do', to: '/see-do', icon: Landmark, color: 'bg-amber-100' },
    { label: 'Eat & drink', to: '/eat-drink', icon: UtensilsCrossed, color: 'bg-teal-100' },
    { label: 'Accommodation', to: '/accommodation', icon: Bed, color: 'bg-rose-100' },
    { label: 'Search', to: '/search', icon: Search, color: 'bg-slate-100' },
  ];

  const menuSections = [
    {
      title: 'Explore',
      items: [
        { label: 'See & do', to: '/see-do', icon: Landmark },
        { label: 'Eat & drink', to: '/eat-drink', icon: UtensilsCrossed },
        { label: 'Accommodation', to: '/accommodation', icon: Bed },
      ],
    },
    {
      title: 'Plan your stay',
      items: [
        { label: 'Tourist information', to: '/tourist-info', icon: Info },
        { label: 'Booking', to: '/booking', icon: Ticket },
      ],
    },
  ];

  const isActive = (path: string) =>
    location.pathname.startsWith(path) && path !== '/';

  return (
    <>
      {/* Sticky Bottom Navigation */}
      <nav className="fixed inset-x-0 bottom-0 z-40 md:hidden bg-white border-t border-slate-300 shadow-[0_-6px_20px_rgba(0,0,0,0.12)]">
        <div
          className="mx-auto max-w-5xl px-2 py-2"
          style={{ paddingBottom: 'env(safe-area-inset-bottom, 6px)' }}
        >
          <div className="flex items-stretch justify-between gap-1">
            {quickItems.map((item) => {
              const active = isActive(item.to);
              return (
                <Link
                  key={item.label}
                  to={item.to}
                  className="flex flex-1 flex-col items-center justify-center text-[11px] font-medium"
                >
                  <div
                    className={`mb-1 flex h-14 w-14 items-center justify-center rounded-md ${item.color}
                      transition-all duration-150 ${active ? 'ring-2 ring-slate-900 scale-105' : 'hover:scale-105'}`}
                  >
                    <item.icon className="h-5 w-5 text-slate-900" />
                  </div>
                  <span
                    className={active ? 'font-semibold text-slate-950' : 'text-slate-900'}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}

            {/* Menu Button */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="flex flex-1 flex-col items-center justify-center text-[11px] font-medium"
            >
              <div className="mb-1 flex h-14 w-14 items-center justify-center rounded-md bg-slate-100 hover:scale-105 transition">
                <Menu className="h-5 w-5 text-slate-900" />
              </div>
              <span className="text-slate-900">Menu</span>
            </button>
          </div>
        </div>
      </nav>

      {/* HALF-SCREEN BOTTOM SHEET MENU – all content in view, no scrolling */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Bottom sheet */}
          <div className="fixed inset-x-0 bottom-0 z-50 h-[60vh] bg-white rounded-t-3xl shadow-2xl animate-slideUp flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
              <span className="text-xs font-semibold tracking-[0.22em] uppercase text-slate-500">
                Cape Coast
              </span>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="h-9 w-9 flex items-center justify-center rounded-full border border-slate-300"
              >
                <X className="h-5 w-5 text-slate-900" />
              </button>
            </div>

            {/* Menu content – NO SCROLL, fits inside 60vh */}
            <div className="px-5 pt-3 pb-4 space-y-5 flex-1">
              {menuSections.map((section) => (
                <div key={section.title}>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] mb-2 text-slate-500">
                    {section.title}
                  </p>
                  <div className="space-y-1.5">
                    {section.items.map((item) => {
                      const active = isActive(item.to);
                      return (
                        <Link
                          key={item.label}
                          to={item.to}
                          onClick={() => setIsMenuOpen(false)}
                          className={`flex items-center justify-between px-3 py-3 rounded-xl transition ${
                            active ? 'bg-slate-50' : 'hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-center gap-3.5">
                            <div
                              className={`flex h-9 w-9 items-center justify-center rounded-full border ${
                                active ? 'border-slate-900' : 'border-slate-300'
                              }`}
                            >
                              <item.icon className="h-4 w-4 text-slate-900" />
                            </div>
                            <span className="text-base font-medium">
                              {item.label}
                            </span>
                          </div>
                          <ChevronRight className="h-4 w-4 text-slate-400" />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default BottomNav;
