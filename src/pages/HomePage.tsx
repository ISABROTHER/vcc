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
    color: 'bg-teal-50',
    iconColor: 'text-teal-700',
  },
  {
    title: 'Restaurants',
    icon: ChefHat,
    href: '/eat-drink',
    color: 'bg-amber-50',
    iconColor: 'text-amber-700',
  },
  {
    title: 'Transportation',
    icon: Car,
    href: '/tourist-info',
    color: 'bg-sky-50',
    iconColor: 'text-sky-700',
  },
  {
    title: 'Sightseeing',
    icon: Camera,
    href: '/see-do',
    color: 'bg-indigo-50',
    iconColor: 'text-indigo-700',
  },
  {
    title: 'Accommodation',
    icon: Bed,
    href: '/accommodation',
    color: 'bg-rose-50',
    iconColor: 'text-rose-700',
  },
  {
    title: 'Ask the Expert',
    icon: HelpCircle,
    href: '/tourist-info',
    color: 'bg-lime-50',
    iconColor: 'text-lime-700',
  },
  {
    title: "What's On",
    icon: Calendar,
    href: '/see-do',
    color: 'bg-purple-50',
    iconColor: 'text-purple-700',
  },
  {
    title: 'Local Pass',
    icon: Ticket,
    href: '/partners',
    color: 'bg-orange-50',
    iconColor: 'text-orange-700',
  },
];

const EssentialExplorerGrid = () => {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-4 md:gap-8">
          {gridItems.map((item) => (
            <Link
              key={item.title}
              to={item.href}
              className={`group flex flex-col items-center justify-center rounded-2xl p-6 shadow-sm transition-all duration-300 ease-out hover:shadow-xl hover:-translate-y-1 ${item.color}`}
            >
              <div
                className={`flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-white transition-transform duration-300 group-hover:scale-110`}
              >
                <item.icon
                  className={`h-8 w-8 sm:h-10 sm:w-10 ${item.iconColor}`}
                  strokeWidth={1.5}
                />
              </div>
              <p className="mt-5 text-center text-sm sm:text-lg font-bold text-gray-900">
                {item.title}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
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