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

  const sections = [
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
      {/* Sticky Bottom Nav – pure white */}
      <nav className="fixed inset-x-0 bottom-0 z-40 md:hidden bg-white border-t border-slate-300 shadow-[0_-6px_20px_rgba(0,0,0,0.15)]">
        <div
          className="mx-auto max-w-5xl px-2 py-2"
          style={{
            paddingBottom: 'env(safe-area-inset-bottom, 6px)',
          }}
        >
          <div className="flex items-stretch justify-between gap-1">
            {quickItems.map((item) => {
              const active = isActive(item.to);
              return (
                <Link
                  key={item.label}
                  to={item.to}
                  className="flex flex-1 flex-col items-center justify-center text-[11px] font-medium text-slate-900"
                >
                  <div
                    className={[
                      'mb-1 flex h-14 w-14 items-center justify-center rounded-md transition-all duration-200',
                      item.color,
                      active ? 'ring-2 ring-slate-900/80 scale-105' : 'hover:scale-105',
                    ].join(' ')}
                  >
                    <item.icon
                      className="h-5 w-5 text-slate-900"
                      strokeWidth={1.7}
                    />
                  </div>
                  <span className={active ? 'font-semibold text-slate-950' : ''}>
                    {item.label}
                  </span>
                </Link>
              );
            })}

            {/* Menu Button */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="flex flex-1 flex-col items-center justify-center text-[11px] font-medium text-slate-900"
            >
              <div className="mb-1 flex h-14 w-14 items-center justify-center bg-slate-100 rounded-md hover:scale-105 transition">
                <Menu className="h-5 w-5 text-slate-900" strokeWidth={1.7} />
              </div>
              <span>Menu</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Full-screen Mobile Menu with sections, animation, active highlight */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white md:hidden flex flex-col">
          {/* Top bar */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 shadow-sm">
            <span className="text-xs font-semibold tracking-[0.22em] uppercase text-slate-500">
              Cape Coast
            </span>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 hover:bg-slate-50 transition"
            >
              <X className="h-5 w-5 text-slate-900" />
            </button>
          </div>

          {/* Menu content */}
          <div className="menu-overlay flex-1 overflow-y-auto px-4 pt-4 pb-24">
            {sections.map((section) => (
              <div key={section.title} className="mb-6">
                <p className="mb-2 text-xs font-semibold tracking-[0.18em] uppercase text-slate-500">
                  {section.title}
                </p>
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const active = isActive(item.to);
                    return (
                      <Link
                        key={item.label}
                        to={item.to}
                        onClick={() => setIsMenuOpen(false)}
                        className={[
                          'flex items-center justify-between rounded-xl px-3 py-4 transition',
                          active ? 'bg-slate-50' : 'hover:bg-slate-50',
                        ].join(' ')}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={[
                              'flex h-9 w-9 items-center justify-center rounded-full border',
                              active
                                ? 'border-slate-900'
                                : 'border-slate-300',
                            ].join(' ')}
                          >
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
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default BottomNav;
