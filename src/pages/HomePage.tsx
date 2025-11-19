import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Landmark,
  ChefHat,
  Car,
  Bed,
  HelpCircle,
  Compass,
} from 'lucide-react';

import Hero from '../components/Hero';
import WhyVisit from '../components/WhyVisit';
import Heritage from '../components/Heritage';
import Experiences from '../components/Experiences';
import Events from '../components/Events';
import CallToAction from '../components/CallToAction';
import BottomNav from '../components/BottomNav';

// GRID DATA
const gridItems = [
  {
    title: 'Attractions',
    description: 'Castles, beaches, museums and other must-see places.',
    icon: Landmark,
    href: '/see-do',
    color: 'bg-amber-100',
  },
  {
    title: 'Accommodation',
    description: 'Hotels, guesthouses and unique local stays.',
    icon: Bed,
    href: '/accommodation',
    color: 'bg-teal-100',
  },
  {
    title: 'Food & Drinks',
    description: 'Local favourites, seafood spots, cafés and bars.',
    icon: ChefHat,
    href: '/eat-drink',
    color: 'bg-sky-100',
  },
  {
    title: 'Tours & Experiences',
    description: 'Guided tours, day trips and activities you can book.',
    icon: Compass,
    href: '/see-do',
    color: 'bg-amber-100',
  },
  {
    title: 'Transportation',
    description: 'How to get around Cape Coast with ease.',
    icon: Car,
    href: '/tourist-info',
    color: 'bg-teal-100',
  },
  {
    title: 'Ask the Expert',
    description: 'Get local help, tips and answers in one place.',
    icon: HelpCircle,
    href: '/tourist-info',
    color: 'bg-sky-100',
  },
];

const EssentialExplorerGrid = () => {
  return (
    <section className="bg-white px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
      <div className="mx-auto max-w-6xl text-center">

        {/* Main Heading — Premium Travel Style */}
        <h2 className="text-[28px] sm:text-[36px] font-light tracking-tight text-slate-900 leading-snug font-playwrite mb-3">
          Your guide to discovering Cape Coast
        </h2>

        <p className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-slate-500 uppercase">
          Plan your Cape Coast trip
        </p>

        <h3 className="text-lg sm:text-xl font-medium text-slate-900 mt-2">
          Start with the essentials.
        </h3>
      </div>

      {/* Modern Premium Grid */}
      <div className="mt-10 sm:mt-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
        {gridItems.map((item, index) => (
          <Link
            key={item.title}
            to={item.href}
            style={{ animationDelay: `${index * 80}ms` }}
            className={`
              group relative flex flex-col items-center justify-center
              rounded-2xl px-4 py-6 sm:px-6 sm:py-8 ${item.color}
              transition-all duration-500 ease-out
              hover:-translate-y-1 hover:scale-[1.03]
              hover:shadow-[0_18px_40px_rgba(15,23,42,0.10)]
              opacity-0 animate-fade-up
            `}
          >
            <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full border-[1.5px] border-slate-900 bg-white/80 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-2">
              <item.icon className="h-8 w-8 sm:h-9 sm:w-9 text-slate-900" strokeWidth={1.7} />
            </div>

            <p className="mt-4 text-center text-sm sm:text-lg font-semibold tracking-tight text-slate-900">
              {item.title}
            </p>

            <p className="mt-1.5 text-center text-[11px] sm:text-sm leading-snug text-slate-700/90 max-w-xs">
              {item.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);

  // Page fade-in
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 80);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={`
        bg-white pb-20 
        transition-opacity duration-700 ease-out
        ${isVisible ? 'opacity-100' : 'opacity-0'}
      `}
    >
      <Hero />
      <EssentialExplorerGrid />
      <WhyVisit />
      <Heritage />
      <Experiences />
      <Events />
      <CallToAction />
      <BottomNav />
    </div>
  );
}
