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
    <section className="py-16 sm:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HEADING MATCHING "Your guide to discovering Cape Coast" */}
        <div className="text-center mb-12 sm:mb-16" ref={headingRef}>
          <div className="group inline-block mb-5">
            <h2 className="text-[28px] sm:text-[38px] font-normal text-slate-900 leading-tight font-playwrite">
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

          {/* Smaller, traditional, readable sub text */}
          <p className="mt-2 text-sm sm:text-base text-gray-700 max-w-3xl mx
