import React, { useState, useEffect, useRef } from 'react';
import { Castle, Waves, Heart, Users } from 'lucide-react';

export default function WhyVisit() {
  const [isInView, setIsInView] = useState(false);
  const headingRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        } else {
          setIsInView(false);
        }
      },
      { threshold: 0.5 }
    );

    if (headingRef.current) {
      observer.observe(headingRef.current);
    }

    return () => {
      if (headingRef.current) {
        observer.unobserve(headingRef.current);
      }
    };
  }, []);

  const reasons = [
    {
      icon: Castle,
      title: 'Rich heritage',
      description:
        'Walk through Cape Coast and Elmina castles with local guides who share real stories about the transatlantic slave trade and the people who lived through it.',
    },
    {
      icon: Waves,
      title: 'Life on the coastline',
      description:
        'Watch fishermen launch their boats at sunrise, relax on quiet beaches, and take boat rides along a shoreline that has carried centuries of journeys.',
    },
    {
      icon: Heart,
      title: 'A homecoming for the diaspora',
      description:
        'Many in the African diaspora come here to stand where their ancestors last stood, walk through the Door of No Return, and quietly say, “I am back.”',
    },
    {
      icon: Users,
      title: 'Living culture and everyday life',
      description:
        'Join festivals, hear drums and hymns in the same streets, taste home-cooked food, and meet the families who keep Cape Coast’s traditions alive.',
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HEADING MATCHING "Your guide to discovering Cape Coast" */}
        <div className="text-center mb-14" ref={headingRef}>
          <div className="group inline-block mb-5">
            <h2 className="text-[28px] sm:text-[34px] font-normal text-slate-900 leading-tight font-playwrite">
              Why Visit Cape Coast?
            </h2>

            <div
              className={`
                mx-auto mt-3 h-[3px]
                bg-amber-500 rounded-full
                transition-all duration-700 ease-out
                ${isInView ? 'animate-[breath_4s_ease-in-out_infinite]' : 'w-0 opacity-0'}
              `}
            ></div>
          </div>

          <style>
            {`
              @keyframes breath {
                0% { width: 10%; opacity: 0.6; }
                50% { width: 75%; opacity: 1; }
                100% { width: 10%; opacity: 0.6; }
              }
            `}
          </style>

          {/* Smaller, traditional, readable sub font */}
          <p className="mt-1 text-sm sm:text-base text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Because families still live beside the castles, the ocean still carries the stories,
            and visitors come to stand where their ancestors once stood.
          </p>
        </div>

        {/* GRID: 2 cards per row on mobile, then up to 4 on large screens */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-lg transition-shadow text-center border border-slate-100"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-blue-50 rounded-full mb-4 sm:mb-5">
                <reason.icon className="text-blue-900" size={28} />
              </div>
              <h3 className="text-sm sm:text-lg font-semibold text-gray-900 mb-2">
                {reason.title}
              </h3>
              <p className="text-[11px] sm:text-sm text-gray-700 leading-snug">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
