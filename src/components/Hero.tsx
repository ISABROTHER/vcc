// path: src/components/Hero.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { Sparkles, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';

// Three high-quality images for the slideshow
const backgroundImages = [
  'https://v.imgi.no/eplj24ump5', // Cinematic banner
  'https://content.r9cdn.net/rimg/dimg/dd/30/25eecbb5-city-5989-174dc0226d1.jpg?crop=true&width=1366&height=768&xhint=1359&yhint=918', // Coast / Castle
  'https://www.adomonline.com/wp-content/uploads/2024/09/DSCF3019.jpg', // Festival / People
];

const SLIDE_INTERVAL = 9000; // 9 seconds

const Hero: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? backgroundImages.length - 1 : prev - 1
    );
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="relative isolate overflow-hidden bg-black text-white">
      {/* SLIDESHOW BACKGROUND */}
      <div className="relative h-[70vh] sm:h-[80vh] min-h-[460px] w-full">
        {backgroundImages.map((src, index) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-800 ease-out ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={src}
              alt="Cape Coast scene"
              className="h-full w-full object-cover"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-black/80" />
          </div>
        ))}

        {/* CONTENT */}
        <div className="relative z-10 h-full">
          <div className="mx-auto flex h-full max-w-6xl px-4 sm:px-6 lg:px-8">
            {/* Adjust position here: justify-start/center/end & items-start/center/end */}
            <div className="flex flex-col justify-center items-start max-w-xl gap-4 sm:gap-5">
              {/* Location pill */}
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] sm:text-xs font-medium tracking-[0.18em] uppercase text-slate-100 backdrop-blur">
                <MapPin className="h-3 w-3" />
                <span>Cape Coast • Ghana</span>
              </div>

              {/* MAIN HEADING */}
              <div className="leading-tight">
                <p className="text-[26px] sm:text-[32px] font-semibold tracking-tight">
                  Discover
                </p>
                <div className="inline-block">
                  <h1 className="text-[32px] sm:text-[42px] md:text-[48px] font-playwrite font-semibold tracking-[-0.03em]">
                    Cape Coast
                  </h1>
                  {/* Underline for main hero title */}
                  <div
                    className="
                      mx-auto mt-2 h-[3px]
                      bg-amber-400 rounded-full
                      w-[65%]
                    "
                  />
                </div>
              </div>

              {/* SUBTEXT – READABLE, TRADITIONAL SIZE */}
              <p className="text-xs sm:text-sm md:text-base text-slate-100/90 max-w-md leading-relaxed">
                A coastal city where castles stand above the ocean, families live beside history,
                and visitors come to reconnect with stories that began long before they were born.
              </p>

              {/* SMALL “WHY YOU’RE HERE” ROW */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-[11px] sm:text-xs text-slate-100/80">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/8 px-3 py-1">
                  <Sparkles className="h-3 w-3" />
                  <span>Heritage • Coastline • Culture</span>
                </div>
                <span className="hidden sm:inline text-slate-200/75">
                  Plan your city break in Cape Coast.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* SLIDE CONTROLS */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-3 sm:px-6">
          <button
            type="button"
            onClick={prevSlide}
            className="pointer-events-auto inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-black/45 hover:bg-black/70 text-white border border-white/15 transition"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            className="pointer-events-auto inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-black/45 hover:bg-black/70 text-white border border-white/15 transition"
            aria-label="Next image"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* DOT INDICATORS */}
        <div className="pointer-events-none absolute bottom-4 left-0 right-0 flex justify-center">
          <div className="pointer-events-auto inline-flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1">
            {backgroundImages.map((_, index) => (
              <span
                key={index}
                className={`h-1.5 w-1.5 rounded-full transition ${
                  index === currentImageIndex
                    ? 'bg-amber-400 w-3'
                    : 'bg-slate-300/60'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
