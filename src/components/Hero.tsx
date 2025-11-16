import React from 'react';
// If you choose to use a carousel lib, import it here
// import Slider from 'react-slick';

const slides = [
  {
    image: 'url("/images/slide1.jpg")',
    heading: 'Discover Cape Coast',
    subtitle: 'Where heritage meets the ocean – Ghana’s coastal gem awaits.',
  },
  {
    image: 'url("/images/slide2.jpg")',
    heading: 'Explore the historic castles',
    subtitle: 'From Elmina to Kakum — journeys into time and culture.',
  },
  // Add more slides as needed
];

export default function Hero() {
  // If using state for slider index, etc.

  return (
    <section className="relative w-full">
      {/* Example single slide – replace with slider if desired */}
      <div className="relative h-[60vh] min-h-[380px] sm:h-[70vh] md:h-[80vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: slides[0].image }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="relative h-full flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            {slides[0].heading}
          </h1>
          <p className="mt-4 text-white/90 text-lg sm:text-xl md:text-2xl">
            {slides[0].subtitle}
          </p>
        </div>
      </div>

      {/* Search bar section below */}
      {/* ... keep your search bar code here ... */}
    </section>
  );
}
