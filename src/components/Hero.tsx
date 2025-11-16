import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    image:
      'https://images.pexels.com/photos/7412067/pexels-photo-7412067.jpeg?auto=compress&cs=tinysrgb&w=1920',
    title: 'Discover Cape Coast',
    subtitle: 'Kombiner hav, historie og varme møter langs Ghanas kyst.',
  },
  {
    image:
      'https://images.pexels.com/photos/208745/pexels-photo-208745.jpeg?auto=compress&cs=tinysrgb&w=1920',
    title: 'Heritage by the Ocean',
    subtitle: 'Utforsk slott, strender og historier som formet verden.',
  },
  {
    image:
      'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1920',
    title: 'Evenings in Cape Coast',
    subtitle: 'Finn markeder, mat og opplevelser som skaper minner.',
  },
];

const Hero: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const activeSlide = slides[current];

  return (
    <section className="relative w-full bg-black">
      <div className="relative h-[60vh] min-h-[380px] sm:h-[70vh] md:h-[80vh] overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[1200ms] ease-out"
          style={{ backgroundImage: `url(${activeSlide.image})` }}
        />

        {/* Dark band overlay like Oslo hero */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />

        {/* Centered content */}
        <div className="relative flex h-full flex-col justify-center px-4 sm:px-8 lg:px-16">
          <div className="max-w-5xl">
            <h1 className="font-serif text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight">
              {activeSlide.title}
            </h1>
            <p className="mt-4 text-white text-lg sm:text-xl md:text-2xl max-w-3xl">
              {activeSlide.subtitle}
            </p>
          </div>
        </div>

        {/* Left / Right controls */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous slide"
          className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-md hover:bg-white transition"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          type="button"
          onClick={handleNext}
          aria-label="Next slide"
          className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-md hover:bg-white transition"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrent(index)}
              aria-label={`Go to slide ${index + 1}`}
