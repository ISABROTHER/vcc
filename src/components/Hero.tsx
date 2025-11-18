import { useState, useEffect, useCallback } from 'react';
import { Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

// Three high-quality images for the slideshow
const backgroundImages = [
  'https://v.imgi.no/eplj24ump5', // The cinematic banner
  'https://content.r9cdn.net/rimg/dimg/dd/30/25eecbb5-city-5989-174dc0226d1.jpg?crop=true&width=1366&height=768&xhint=1359&yhint=918', // Castle/Coast
  'https://www.adomonline.com/wp-content/uploads/2024/09/DSCF3019.jpg', // Festival/Crowd
];

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Function to go to the next slide
  const nextSlide = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
  }, []);

  // Function to go to the previous slide
  const prevSlide = () => {
    setCurrentImageIndex((prev) => (prev - 1 + backgroundImages.length) % backgroundImages.length);
  };

  // Initialize animation
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Auto-advance slides every 6 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section className="relative w-full min-h-[400px] md:h-[600px] lg:h-[700px] flex items-end overflow-hidden font-sans bg-slate-900 group">
      {/* Background Image Carousel */}
      {backgroundImages.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className="absolute inset-0 w-full h-full transform scale-105 transition-transform duration-[20s] ease-out"
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat',
            }}
          />
          
          {/* Gradient Overlays - Adjusted for Desktop Grandeur */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/10 to-transparent opacity-70" />
        </div>
      ))}

      {/* --- CONTENT CONTAINER --- */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-16 pb-24 md:pb-32 lg:pb-40 pt-24 pointer-events-none">
        <div 
          className={`max-w-5xl transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Luxury Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-5 md:py-2.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white mb-4 md:mb-8 shadow-lg transition-colors cursor-default pointer-events-auto hover:bg-white/20">
            <Sparkles className="w-3 h-3 md:w-5 md:h-5 text-amber-400" />
            <span className="text-[10px] md:text-base font-medium tracking-widest uppercase">Discover Ghana's Coastal Treasure</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-3 md:mb-8 leading-[1.1] md:leading-[0.95] tracking-tight drop-shadow-2xl pointer-events-auto">
            Discover <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/90">
              Cape Coast
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-xl md:text-2xl lg:text-3xl text-slate-100 font-light max-w-xl md:max-w-3xl leading-relaxed drop-shadow-lg border-l-4 border-amber-400 pl-3 md:pl-8 bg-gradient-to-r from-black/40 to-transparent py-2 md:py-4 rounded-r-lg backdrop-blur-sm pointer-events-auto">
            Where heritage meets the ocean. Experience Ghana's coastal gem through authentic culture, pristine beaches, and unforgettable adventures.
          </p>
        </div>
      </div>

      {/* --- NAVIGATION ARROWS (Hidden on Mobile, Big on Desktop) --- */}
      <button 
        onClick={prevSlide}
        className="absolute left-8 lg:left-12 top-1/2 -translate-y-1/2 z-30 p-4 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white/80 hover:bg-white/20 hover:text-white hover:scale-110 transition-all duration-300 active:scale-95 hidden md:flex group/nav pointer-events-auto"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-8 h-8 lg:w-10 lg:h-10 group-hover/nav:-translate-x-1 transition-transform" />
      </button>

      <button 
        onClick={nextSlide}
        className="absolute right-8 lg:right-12 top-1/2 -translate-y-1/2 z-30 p-4 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white/80 hover:bg-white/20 hover:text-white hover:scale-110 transition-all duration-300 active:scale-95 hidden md:flex group/nav pointer-events-auto"
        aria-label="Next slide"
      >
        <ChevronRight className="w-8 h-8 lg:w-10 lg:h-10 group-hover/nav:translate-x-1 transition-transform" />
      </button>

      {/* --- ADAPTIVE STORY BARS (Small on Mobile, Wide on Desktop) --- */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2 md:gap-4 w-32 md:w-[500px] lg:w-[600px] pointer-events-auto transition-all duration-500">
        {backgroundImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className="relative h-1 md:h-1.5 flex-1 rounded-full bg-white/20 overflow-hidden transition-all hover:bg-white/30 hover:h-1.5 md:hover:h-2"
            aria-label={`Go to slide ${index + 1}`}
          >
            {/* The Loading Fill Animation */}
            <div 
              className={`absolute top-0 left-0 h-full bg-amber-400 rounded-full transition-all duration-300 ${
                index === currentImageIndex 
                  ? 'animate-[load_6s_linear_forwards] w-full' // Active: Fills up
                  : index < currentImageIndex 
                    ? 'w-full opacity-100' // Passed: Full
                    : 'w-0 opacity-0' // Future: Empty
              }`}
            />
          </button>
        ))}
      </div>

      {/* Animation Keyframes */}
      <style>{`
        @keyframes load {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </section>
  );
}