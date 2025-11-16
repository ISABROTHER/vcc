import React from 'react';
import { Link } from 'react-router-dom';
import {
  Landmark,
  ChefHat,
  Car,
  Camera,
  Bed,
  HelpCircle,
  Calendar,
  Ticket,
} from 'lucide-react';

import Hero from '../components/Hero';
import WhyVisit from '../components/WhyVisit';
import Heritage from '../components/Heritage';
import Experiences from '../components/Experiences';
import Events from '../components/Events';
import CallToAction from '../components/CallToAction';

const gridItems = [
  {
    title: 'Attractions',
    icon: Landmark,
    href: '/see-do',
    color: 'bg-teal-100',
  },
  {
    title: 'Restaurants',
    icon: ChefHat,
    href: '/eat-drink',
    color: 'bg-amber-100',
  },
  {
    title: 'Transportation',
    icon: Car,
    href: '/tourist-info',
    color: 'bg-sky-100',
  },
  {
    title: 'Sightseeing',
    icon: Camera,
    href: '/see-do',
    color: 'bg-indigo-100',
  },
  {
    title: 'Accommodation',
    icon: Bed,
    href: '/accommodation',
    color: 'bg-rose-100',
  },
  {
    title: 'Ask the Expert',
    icon: HelpCircle,
    href: '/tourist-info',
    color: 'bg-lime-100',
  },
  {
    title: "What's On",
    icon: Calendar,
    href: '/see-do',
    color: 'bg-purple-100',
  },
  {
    title: 'Local Pass',
    icon: Ticket,
    href: '/partners',
    color: 'bg-orange-100',
  },
];

const EssentialExplorerGrid = () => {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="mb-8 sm:mb-10 text-center">
          <p className="text-xs font-semibold tracking-[0.22em] text-slate-500 uppercase">
            Plan your visit
          </p>
          <h2 className="mt-2 text-2xl sm:text-3xl font-semibold text-slate-900">
            Everything you need in one place
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
          {gridItems.map((item) => (
            <Link
              key={item.title}
              to={item.href}
              aria-label={item.title}
              className={`group flex aspect-[4/3] flex-col items-center justify-center ${item.color} transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,0.12)]`}
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-slate-900 bg-white/70 transition-transform duration-300 group-hover:scale-110">
                <item.icon className="h-9 w-9 text-slate-900" strokeWidth={1.7} />
              </div>
              <p className="mt-5 text-center text-sm sm:text-lg font-semibold tracking-tight text-slate-900">
                {item.title}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function HomePage() {
  return (
    <div className="bg-white">
      <Hero />
      <EssentialExplorerGrid />
      <WhyVisit />
      <Heritage />
      <Experiences />
      <Events />
      <CallToAction />
    </div>
  );
}
