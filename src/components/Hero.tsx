import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

// Three high-quality images for the slideshow
const backgroundImages = [
  'https://v.imgi.no/eplj24ump5', // The cinematic banner you liked
  'https://images.pexels.com/photos/3155726/pexels-photo-3155726.jpeg?auto=compress&cs=tinysrgb&w=1920', // Coastal/Castle vibe
  'https://images.pexels.com/photos/3889742/pexels-photo-3889742.jpeg?auto=compress&cs=tinysrgb&w=1920', // Tropical Beach vibe
];

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    // Auto-advance slides every 6 seconds
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full min-h-[400px] md:h-[550px] flex items-end overflow-hidden font-sans bg-slate-900">
      {/* Background Image Carousel */}
      {backgroundImages.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 w-full h-full transition-opacity duration-2000 ease-in-out ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className="absolute inset-0 w-full h-full transform scale-105 transition-transform duration-[20s] ease-out"
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />
          {/* Dark Overlay for Text Contrast (applied to each image) */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
        </div>
      ))}

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-16 md:pb-24 lg:pb-32 pt-24">
        <div 
          className={`max-w-4xl transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Luxury Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white mb-4 md:mb-8 shadow-lg hover:bg-white/20 transition-colors cursor-default">
            <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-amber-400" />
            <span className="text-xs md:text-sm font-medium tracking-wider uppercase">Discover Ghana's Coastal Treasure</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-4 md:mb-6 leading-[0.95] tracking-tight drop-shadow-2xl">
            Discover <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/90">
              Cape Coast
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl md:text-2xl text-slate-100 font-light max-w-2xl leading-relaxed drop-shadow-lg border-l-4 border-amber-400 pl-4 md:pl-6 bg-gradient-to-r from-black/40 to-transparent py-2 rounded-r-lg backdrop-blur-sm">
            Where heritage meets the ocean. Experience Ghana's coastal gem through authentic culture, pristine beaches, and unforgettable adventures.
          </p>
        </div>
      </div>

      {/* Slider Dots - Functional & Interactive */}
      <div className="absolute bottom-6 md:bottom-8 left-0 right-0 flex justify-center gap-3 z-20">
        {backgroundImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`h-1.5 rounded-full shadow-sm backdrop-blur-sm transition-all duration-500 ease-out ${
              index === currentImageIndex
                ? 'w-12 bg-white' 
                : 'w-2 bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`View slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}