import { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Define the content for each slide
const slides = [
  {
    image: 'https://v.imgi.no/eplj24ump5', // Cinematic Banner
    line1: 'Christmas is coming to',
    line2: 'Cape Coast',
    subtitle: 'Find markets, food and concerts that will get you in the right Christmas spirit.',
  },
  {
    image: 'https://content.r9cdn.net/rimg/dimg/dd/30/25eecbb5-city-5989-174dc0226d1.jpg?crop=true&width=1366&height=768&xhint=1359&yhint=918', // Castle
    line1: 'Walk through history at',
    line2: 'Cape Coast Castle',
    subtitle: 'Stand at the Door of No Return, where the silence of the walls speaks of a resilience that oceans could never extinguish.',
  },
  {
    image: 'https://www.adomonline.com/wp-content/uploads/2024/09/DSCF3019.jpg', // Festival
    line1: 'Feel the rhythm of',
    line2: 'Fetu Afahye',
    subtitle: 'Join the vibrant celebration of culture, drumming, and dance.',
  },
];

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Typewriter State
  const [line1, setLine1] = useState('');
  const [line2, setLine2] = useState('');
  const [typingPhase, setTypingPhase] = useState<'idle' | 'line1' | 'line2' | 'done'>('idle');

  // Refs to manage timeouts for cleanup
  const timeoutsRef = useRef<number[]>([]);

  const currentSlide = slides[currentImageIndex];

  // Function to safely add timeouts
  const addTimeout = (callback: () => void, delay: number) => {
    const id = setTimeout(callback, delay);
    timeoutsRef.current.push(id);
    return id;
  };

  // Function to clear all running timeouts
  const clearTimeouts = () => {
    timeoutsRef.current.forEach((id) => clearTimeout(id));
    timeoutsRef.current = [];
  };

  // Function to go to the next slide
  const nextSlide = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % slides.length);
  }, []);

  // Function to go to the previous slide
  const prevSlide = () => {
    setCurrentImageIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Handle Slide Changes & Reset Animations
  useEffect(() => {
    clearTimeouts();
    setLine1('');
    setLine2('');
    setTypingPhase('idle');
    addTimeout(() => setTypingPhase('line1'), 300);
    return () => clearTimeouts();
  }, [currentImageIndex]);

  // Handle Typing Logic
  useEffect(() => {
    if (typingPhase === 'line1') {
      if (line1.length < currentSlide.line1.length) {
        addTimeout(() => {
          setLine1(currentSlide.line1.slice(0, line1.length + 1));
        }, 40);
      } else {
        addTimeout(() => setTypingPhase('line2'), 200);
      }
    } else if (typingPhase === 'line2') {
      if (line2.length < currentSlide.line2.length) {
        addTimeout(() => {
          setLine2(currentSlide.line2.slice(0, line2.length + 1));
        }, 80);
      } else {
        setTypingPhase('done');
      }
    }
  }, [typingPhase, line1, line2, currentSlide]);

  // Auto-advance slides every 8 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 8000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section className="relative w-full min-h-[400px] md:h-[600px] flex items-end overflow-hidden font-sans bg-slate-900 group">
      {/* Background Image Carousel */}
      {slides.map((slide, index) => (
        <div
          key={slide.image}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className="absolute inset-0 w-full h-full transform scale-105 transition-transform duration-[20s] ease-out"
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat',
            }}
          />
          
          {/* GRADIENT OVERLAYS */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent opacity-80" />
        </div>
      ))}

      {/* --- CONTENT CONTAINER --- */}
      <div className="relative z-10 w-full mx-auto px-6 md:px-12 pb-20 md:pb-12 pt-24 pointer-events-none">
        <div className="w-full">
          
          {/* Headline - TYPEWRITER EFFECT */}
          {/* UPDATED: Removed mb-4, changed to mb-2. Tightened leading. */}
          <h1 key={currentImageIndex} className="font-bold text-white mb-2 leading-none tracking-tight drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] pointer-events-auto">
            
            {/* Line 1 */}
            {/* UPDATED: Removed min-h-[1.5em] (was creating gaps), added min-h-[1.2em]. Removed whitespace-nowrap so it's safer on tiny screens, but added md:whitespace-nowrap. */}
            <span className="block text-xl sm:text-2xl md:text-[4vw] font-medium tracking-normal mb-0 md:whitespace-nowrap min-h-[1.2em]">
              {line1}
              {typingPhase === 'line1' && (
                <span className="inline-block w-[2px] h-[0.8em] bg-white ml-1 animate-pulse align-middle" />
              )}
            </span>

            {/* Line 2 (Golden Gradient + Blur Animation) */}
            {/* UPDATED: Added `md:whitespace-nowrap`. This allows wrapping on mobile (so "Castle" goes to next line) but keeps one line on desktop. Tightened leading-tight to leading-none. */}
            <span className={`block font-outfit font-extrabold tracking-tight leading-none text-5xl md:text-[9vw] text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-300 to-yellow-500 drop-shadow-sm md:whitespace-nowrap min-h-[1.2em] ${
                typingPhase !== 'line1' ? 'animate-blur-in animate-text-shimmer' : ''
            }`}>
              {line2}
              
              {(typingPhase === 'line2' || typingPhase === 'done') && (
                <span className="inline-block w-[3px] md:w-[6px] h-[0.8em] bg-amber-400 ml-1 md:ml-2 animate-pulse align-baseline" />
              )}
            </span>
          </h1>

          {/* Subtitle - Fades Up */}
          <p 
            className={`text-sm md:text-[1.5vw] text-slate-100 font-light max-w-xl md:max-w-[50vw] leading-relaxed drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] border-l-4 border-amber-400 pl-3 md:pl-6 bg-gradient-to-r from-black/40 to-transparent py-2 rounded-r-lg backdrop-blur-sm pointer-events-auto transition-all duration-1000 ${
              typingPhase === 'done' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {currentSlide.subtitle}
          </p>
        </div>
      </div>

      {/* --- NAVIGATION ARROWS --- */}
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

      {/* --- COMPACT LOADING BARS --- */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2 w-32 md:w-48 pointer-events-auto">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className="relative h-1 md:h-1.5 flex-1 rounded-full bg-white/20 overflow-hidden transition-all hover:bg-white/30"
            aria-label={`Go to slide ${index + 1}`}
          >
            <div 
              className={`absolute top-0 left-0 h-full bg-amber-400 rounded-full transition-all duration-300 ${
                index === currentImageIndex 
                  ? 'animate-[load_8s_linear_forwards] w-full' 
                  : index < currentImageIndex 
                    ? 'w-full opacity-100' 
                    : 'w-0 opacity-0'
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