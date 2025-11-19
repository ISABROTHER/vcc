import React, { useState, useEffect, useRef } from 'react';
import { Castle, Waves, Heart, Users } from 'lucide-react';

export default function WhyVisit() {
  const [isInView, setIsInView] = useState(false);
  const headingRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.5 }
    );

    if (headingRef.current) observer.observe(headingRef.current);
    return () => headingRef.current && observer.unobserve(headingRef.current);
  }, []);

  const reasons = [
    {
      icon: Castle,
      title: 'Rich heritage',
      // Updated with a Castle/Fort image
      image: 'https://images.unsplash.com/photo-1599576838376-44f8cb81e30d?q=80&w=1000&auto=format&fit=crop', 
      description:
        'Walk through Cape Coast and Elmina castles with local guides who share real stories about the transatlantic slave trade and the people who lived through it.',
    },
    {
      icon: Waves,
      title: 'Life on the coastline',
      // Updated with a Coastline/Fishing Boats image
      image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=1000&auto=format&fit=crop', 
      description:
        'Watch fishermen launch their boats at sunrise, relax on quiet beaches, and take boat rides along a shoreline that has carried centuries of journeys.',
    },
    {
      icon: Heart,
      title: 'A homecoming for the diaspora',
      // Updated with an image evoking connection/return (hands/people)
      image: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=1000&auto=format&fit=crop', 
      description:
        'Many in the African diaspora come here to stand where their ancestors last stood, walk through the Door of No Return, and quietly say, “I am back.”',
    },
    {
      icon: Users,
      title: 'Living culture and everyday life',
      // Updated with a Culture/Drumming/Festival image
      image: 'https://images.unsplash.com/photo-1545259742-b4fd8fea67e4?q=80&w=1000&auto=format&fit=crop', 
      description:
        'Join festivals, hear drums and hymns in the same streets, taste home-cooked food, and meet the families who keep Cape Coast’s traditions alive.',
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HEADING — SAME STYLE AS "Your guide to discovering Cape Coast" */}
        <div className="text-center mb-14" ref={headingRef}>
          <div className="group inline-block mb-5">
            <h2 className="text-[28px] sm:text-[34px] font-normal text-slate-900 leading-tight font-playwrite">
              Why Visit Cape Coast?
            </h2>

            {/* Underline animation */}
            <div
              className={`
                mx-auto mt-3 h-[3px]
                bg-amber-500 rounded-full
                transition-all duration-700 ease-out
                ${isInView ? 'animate-[breath_4s_ease-in-out_infinite]' : 'w-0 opacity-0'}
              `}
            ></div>
          </div>

          {/* Keyframes for underline */}
          <style>
            {`
              @keyframes breath {
                0% { width: 10%; opacity: 0.6; }
                50% { width: 75%; opacity: 1; }
                100% { width: 10%; opacity: 0.6; }
              }
            `}
          </style>

          {/* Subtext — smaller, readable */}
          <p className="mt-1 text-sm sm:text-base text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Because families still live beside the castles, the ocean still carries the stories,
            and visitors come to stand where their ancestors once stood.
          </p>
        </div>

        {/* GRID — BEST MODERN DESIGN, 2 CARDS PER ROW ON MOBILE, 4 ON LARGE */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason, index) => (
            <article
              key={index}
              className="group relative flex flex-col rounded-3xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-shadow duration-300 border border-slate-100"
            >
              {/* IMAGE WITH OVERLAY + ICON + TITLE */}
              <div className="relative h-32 sm:h-44 w-full overflow-hidden">
                <img
                  src={reason.image}
                  alt={reason.title}
                  loading="lazy"
                  className="h-full w-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.opacity = '0';
                  }}
                />

                {/* Gradient overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Icon + title over image */}
                <div className="absolute inset-x-3 bottom-3 flex items-center gap-2">
                  <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white/90 backdrop-blur">
                    <reason.icon className="h-4 w-4 sm:h-5 sm:w-5 text-slate-900" />
                  </div>
                  <h3 className="text-[11px] sm:text-sm font-semibold tracking-tight text-white">
                    {reason.title}
                  </h3>
                </div>
              </div>

              {/* DESCRIPTION */}
              <div className="p-3 sm:p-4">
                <p className="text-[10px] sm:text-sm text-slate-700 leading-snug">
                  {reason.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}