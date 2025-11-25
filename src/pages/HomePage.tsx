import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Landmark,
  ChefHat,
  Car,
  Bed,
  HelpCircle,
  Banknote,
  ArrowRight,
} from 'lucide-react';

import Hero from '../components/Hero';
import WhyVisit from '../components/WhyVisit';
import Heritage from '../components/Heritage';
import CallToAction from '../components/CallToAction';
import BottomNav from '../components/BottomNav';

const gridItems = [
  {
    title: 'Attractions & Tours',
    description: 'Castles, beaches, museums, and guided experiences.',
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
    title: 'Banks & ATMs',
    description: 'Find local banks, ATMs and currency exchange.',
    icon: Banknote,
    href: '/banks',
    color: 'bg-amber-100',
  },
  {
    title: 'Transportation',
    description: 'How to get around Cape Coast with ease.',
    icon: Car,
    href: '/transportation',
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
  const [isInView, setIsInView] = useState(false);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsInView(true);
      },
      { threshold: 0.5 }
    );

    if (headingRef.current) observer.observe(headingRef.current);
    return () => {
      if (headingRef.current) observer.unobserve(headingRef.current);
    };
  }, []);

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="mb-8 sm:mb-10 text-center" ref={headingRef}>
          <div className="group inline-block mb-6">
            <h2 className="text-[28px] sm:text-[38px] font-normal text-slate-900 leading-tight font-playwrite">
              Your guide to discovering Cape Coast
            </h2>
            <div
              className={`mx-auto mt-3 h-[3px] bg-amber-500 rounded-full transition-all duration-700 ease-out ${
                isInView ? 'animate-[breath_4s_ease-in-out_infinite]' : 'w-0 opacity-0'
              }`}
            ></div>
          </div>
          <style>
            {`@keyframes breath { 0% { width: 10%; opacity: 0.6; } 50% { width: 75%; opacity: 1; } 100% { width: 10%; opacity: 0.6; } }`}
          </style>
          <p className="text-xs font-semibold tracking-[0.22em] text-slate-500 uppercase mt-2">
            Plan your Cape Coast trip
          </p>
          <h3 className="text-xl sm:text-2xl font-medium text-slate-900 mt-2">
            Start with the essentials.
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3 sm:gap-6">
          {gridItems.map((item) => (
            <Link
              key={item.title}
              to={item.href}
              aria-label={item.title}
              className={`group relative flex flex-col items-center justify-center rounded-2xl px-4 py-6 sm:px-6 sm:py-8 ${item.color} transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_18px_40px_rgba(15,23,42,0.12)]`}
            >
              <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full border-2 border-slate-900 bg-white/80 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3 animate-pulse sm:animate-none">
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
      </div>
    </section>
  );
};

// NEW: A concise Highlights section to replace the long list
const FeaturedHighlights = () => {
  const highlights = [
    {
      id: 1,
      title: "Cape Coast Castle",
      category: "History",
      image: "https://images.unsplash.com/photo-1526481280695-3c687fd543c0?auto=format&fit=crop&w=800&q=80",
      description: "A UNESCO World Heritage site and a poignant symbol of history."
    },
    {
      id: 2,
      title: "Kakum Canopy Walk",
      category: "Adventure",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
      description: "Walk above the rainforest on one of Africa's few canopy walkways."
    },
    {
      id: 3,
      title: "Oguaa Fetu Afahye",
      category: "Culture",
      image: "https://images.pexels.com/photos/17911681/pexels-photo-17911681/free-photo-of-a-man-in-a-traditional-ghanaian-kente-cloth.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Experience the vibrant annual festival with chiefs, drumming and dance."
    }
  ];

  return (
    <section className="py-16 bg-slate-50 border-t border-slate-200">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Trending Now</h2>
            <p className="text-slate-600 mt-2">Top rated experiences in Cape Coast</p>
          </div>
          <Link to="/see-do" className="hidden sm:flex items-center gap-2 text-amber-600 font-semibold hover:text-amber-700">
            View all activities <ArrowRight size={20} />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {highlights.map((item) => (
            <Link key={item.id} to="/see-do" className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition">
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-slate-900">
                  {item.category}
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 line-clamp-2 mb-4">{item.description}</p>
                <span className="text-sm font-semibold text-amber-600 group-hover:underline">
                  Learn more
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
           <Link to="/see-do" className="inline-flex items-center gap-2 text-amber-600 font-semibold">
            View all activities <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default function HomePage() {
  return (
    <div className="bg-white pb-20">
      <Hero />
      <EssentialExplorerGrid />
      <WhyVisit />
      <Heritage />
      <FeaturedHighlights />
      <CallToAction />
      <BottomNav />
    </div>
  );
}