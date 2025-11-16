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
    {
      label: 'See & do',
      to: '/see-do',
      icon: Landmark,
      color: 'bg-amber-100',
    },
    {
      label: 'Eat & drink',
      to: '/eat-drink',
      icon: UtensilsCrossed,
      color: 'bg-teal-100',
    },
    {
      label: 'Accommodation',
      to: '/accommodation',
      icon: Bed,
      color: 'bg-rose-100',
    },
    {
      label: 'Search',
      to: '/search',
      icon: Search,
      color: 'bg-slate-100',
    },
  ];

  const menuItems = [
    {
      label: 'See & do',
      to: '/see-do',
      icon: Landmark,
    },
    {
      label: 'Eat & drink',
      to: '/eat-drink',
      icon: UtensilsCrossed,
    },
    {
      label: 'Accommodation',
      to: '/accommodation',
      icon: Bed,
    },
    {
      label: 'Tourist information',
      to: '/tourist-info',
      icon: Info,
    },
    {
      label: 'Booking',
      to: '/booking',
      icon: Ticket,
    },
  ];

  const isActive = (path: string) =>
    location.pathname.startsWith(path) && path !== '/';

  return (
    <>
      {/* Sticky bottom bar – mobile only */}
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-5xl items-stretch justify-between px-1.5 py-1.5">
          {quickItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="flex flex-1 flex-col items-center justify-center text-[10px] font-medium text-slate-900"
            >
              <div
                className={`mb-1 flex h-12 w-12 items-center justify-center ${item.color} rounded-sm`}
              >
                <item.icon
                  className="h-5 w-5 text-slate-900"
                  strokeWidth={1.6}
                />
              </div>
              <span
                className={
                  isActive(item.to) ? 'font-semibold text-slate-950' : ''
                }
              >
                {item.label}
              </span>
            </Link>
          ))}

          {/* Menu / Close button */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            className="flex flex-1 flex-col items-center justify-center text-[10px] font-medium text-slate-900"
          >
            <div className="mb-1 flex h-12 w-12 items-center justify-center bg-slate-100 rounded-sm">
              <Menu className="h-5 w-5 text-slate-900" strokeWidth={1.6} />
            </div>
            <span>Menu</span>
          </button>
        </div>
      </nav>

      {/* Full-screen mobile menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white md:hidden">
          {/* Top bar */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200">
            <div className="text-sm font-semibold tracking-[0.22em] uppercase text-slate-500">
              Cape Coast
            </div>
            <button
              type="button"
              onClick={() => setIsMenuOpen(false)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 text-slate-900"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Menu list */}
          <div className="px-4 pt-4 pb-24 space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-between rounded-xl px-3 py-3.5 hover:bg-slate-50"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-300">
                    <item.icon
                      className="h-4 w-4 text-slate-900"
                      strokeWidth={1.7}
                    />
                  </div>
                  <span className="text-base font-medium text-slate-900">
                    {item.label}
                  </span>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-400" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default BottomNav;
