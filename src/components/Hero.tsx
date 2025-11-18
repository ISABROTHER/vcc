import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

// Background image as requested
const heroImage = 'https://v.imgi.no/eplj24ump5';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative w-full h-[350px] md:h-[550px] flex items-end overflow-hidden font-sans bg-slate-900">
      {/* Background Image Layer */}
      <div
        className="absolute inset-0 w-full h-full transform scale-105 transition-transform duration-[20s] ease-out"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Premium Dark Overlay for Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-20 md:pb-24 lg:pb-32">
        <div 
          className={`max-w-4xl transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Luxury Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white mb-8 shadow-lg hover:bg-white/20 transition-colors cursor-default">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-medium tracking-wider uppercase">Discover Ghana's Coastal Treasure</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-[0.95] tracking-tight drop-shadow-2xl">
            Discover <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/90">
              Cape Coast
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl md:text-2xl text-slate-100 font-light max-w-2xl leading-relaxed drop-shadow-lg border-l-4 border-amber-400 pl-6 bg-gradient-to-r from-black/40 to-transparent py-2 rounded-r-lg backdrop-blur-sm">
            Where heritage meets the ocean. Experience Ghana's coastal gem through authentic culture, pristine beaches, and unforgettable adventures.
          </p>
        </div>
      </div>

      {/* Slider Dots - Decorative */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-20">
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className={`h-1.5 rounded-full shadow-sm backdrop-blur-sm transition-all duration-300 ${
              index === 0 
                ? 'w-12 bg-white' 
                : 'w-2 bg-white/40'
            }`}
          />
        ))}
      </div>
    </section>
  );
}