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
    <section
      className="
        relative w-full 
        min-h-[480px] 
        md:min-h-[80vh] 
        lg:min-h-[90vh] 
        flex 
        items-end md:items-center 
        overflow-hidden font-sans bg-slate-900 group
      "
    >
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

          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent opacity-70" />
        </div>
      ))}

      {/* --- CONTENT CONTAINER --- */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-8 lg:px-16 pb-16 md:pb-20 pt-24 md:pt-32 pointer-events-none">
        <div
          className={`w-full md:max-w-3xl lg:max-w-4xl transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Luxury Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white mb-4 shadow-lg transition-colors cursor-default pointer-events-auto">
            <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-amber-400" />
            <span className="text-[10px] md:text-sm font-medium tracking-wider uppercase">
              Discover Ghana&apos;s Coastal Treasure
            </span>
          </div>

          {/* Headline */}
          <h1
            className="
              text-3xl 
              sm:text-5xl 
              md:text-6xl 
              lg:text-7xl 
              font-bold text-white 
              mb-3 md:mb-5 
              leading-tight md:leading-[1.05] 
              tracking-tight drop-shadow-2xl 
              pointer-events-auto
            "
          >
            Discover <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/90">
              Cape Coast
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="
              text-sm 
              sm:text-lg 
              md:text-xl 
              text-slate-100 font-light 
              max-w-md md:max-w-xl 
              leading-relaxed drop-shadow-lg 
              border-l-4 border-amber-400 
              pl-3 md:pl-6 
              bg-gradient-to-r from-black/40 to-transparent 
              py-2 rounded-r-lg 
              backdrop-blur-sm pointer-events-auto
            "
          >
            Where heritage meets the ocean. Experience Ghana&apos;s coastal gem through authentic culture,
            pristine beaches, and unforgettable adventures.
          </p>
        </div>
      </div>

      {/* --- NAVIGATION ARROWS (Absolute Edges) --- */}
      <button
        onClick={prevSlide}
        className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-white/70 hover:bg-white/20 hover:text-white hover:scale-110 transition-all active:scale-95 hidden sm:flex pointer-events-auto"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-white/70 hover:bg-white/20 hover:text-white hover:scale-110 transition-all active:scale-95 hidden sm:flex pointer-events-auto"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* --- COMPACT STORY-STYLE LOADING BARS --- */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2 w-32 md:w-48 pointer-events-auto">
        {backgroundImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className="relative h-1 md:h-1.5 flex-1 rounded-full bg-white/20 overflow-hidden transition-all hover:bg-white/30"
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
