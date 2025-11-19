import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Three high-quality images for the slideshow
const backgroundImages = [
  'https://v.imgi.no/eplj24ump5', // The cinematic banner
  'https://content.r9cdn.net/rimg/dimg/dd/30/25eecbb5-city-5989-174dc0226d1.jpg?crop=true&width=1366&height=768&xhint=1359&yhint=918', // Castle/Coast
  'https://www.adomonline.com/wp-content/uploads/2024/09/DSCF3019.jpg', // Festival/Crowd
];

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  
  // Typewriter State
  const [line1, setLine1] = useState('');
  const [line2, setLine2] = useState('');
  const [typingPhase, setTypingPhase] = useState<'idle' | 'line1' | 'line2' | 'done'>('idle');

  const fullLine1 = "Christmas is coming to";
  const fullLine2 = "Cape Coast";

  // Function to go to the next slide
  const nextSlide = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
  }, []);

  // Function to go to the previous slide
  const prevSlide = () => {
    setCurrentImageIndex((prev) => (prev - 1 + backgroundImages.length) % backgroundImages.length);
  };

  // Initialize animation on mount
  useEffect(() => {
    setIsVisible(true);
    
    // Start Typewriter Sequence
    const startTyping = setTimeout(() => {
      setTypingPhase('line1');
    }, 500); // Short delay before typing starts

    return () => clearTimeout(startTyping);
  }, []);

  // Handle Typing Logic
  useEffect(() => {
    if (typingPhase === 'line1') {
      if (line1.length < fullLine1.length) {
        const timeout = setTimeout(() => {
          setLine1(fullLine1.slice(0, line1.length + 1));
        }, 50); // Speed for Line 1
        return () => clearTimeout(timeout);
      } else {
        // Line 1 finished, move to Line 2
        const timeout = setTimeout(() => {
          setTypingPhase('line2');
        }, 300); // Pause before starting next line
        return () => clearTimeout(timeout);
      }
    } else if (typingPhase === 'line2') {
      if (line2.length < fullLine2.length) {
        const timeout = setTimeout(() => {
          setLine2(fullLine2.slice(0, line2.length + 1));
        }, 100); // Speed for Line 2 (Slower for impact)
        return () => clearTimeout(timeout);
      } else {
        setTypingPhase('done');
      }
    }
  }, [typingPhase, line1, line2]);

  // Auto-advance slides every 6 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section className="relative w-full min-h-[400px] md:h-[600px] flex items-end overflow-hidden font-sans bg-slate-900 group">
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
          
          {/* GRADIENT OVERLAYS */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent opacity-80" />
        </div>
      ))}

      {/* --- CONTENT CONTAINER --- */}
      <div className="relative z-10 w-full mx-auto px-6 md:px-12 pb-20 md:pb-12 pt-24 pointer-events-none">
        <div className="w-full">
          
          {/* Headline - TYPEWRITER EFFECT */}
          {/* Fixed height and space reservation to prevent jumping */}
          <h1 className="font-bold text-white mb-4 leading-[1.1] md:leading-[0.9] tracking-tight drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] pointer-events-auto">
            
            {/* Line 1: "Christmas is coming to" */}
            {/* Added min-h-[1.5em] to reserve space immediately */}
            <span className="block text-xl sm:text-2xl md:text-[4vw] font-medium tracking-normal mb-1 whitespace-nowrap min-h-[1.5em]">
              {line1}
              {/* Blinking Cursor for Line 1 */}
              {typingPhase === 'line1' && (
                <span className="inline-block w-[2px] h-[0.8em] bg-white ml-1 animate-pulse align-middle" />
              )}
            </span>

            {/* Line 2: "Cape Coast" (Golden Gradient) */}
            {/* APPLIED FONT: font-playwrite font-normal (Regular weight looks best) */}
            <span className="block font-playwrite font-normal text-5xl md:text-[9vw] text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-200 to-amber-500 drop-shadow-sm min-h-[1.4em]">
              {line2}
              {/* Blinking Cursor for Line 2 (Visible during typing or when done) */}
              {(typingPhase === 'line2' || typingPhase === 'done') && (
                <span className="inline-block w-[3px] md:w-[6px] h-[0.8em] bg-amber-400 ml-1 md:ml-2 animate-pulse align-baseline" />
              )}
            </span>
          </h1>

          {/* Subtitle - Fades Up After Typing */}
          <p 
            className={`text-sm md:text-[1.5vw] text-slate-100 font-light max-w-xl md:max-w-[50vw] leading-relaxed drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] border-l-4 border-amber-400 pl-3 md:pl-6 bg-gradient-to-r from-black/40 to-transparent py-2 rounded-r-lg backdrop-blur-sm pointer-events-auto transition-all duration-1000 ${
              typingPhase === 'done' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Find markets, food and concerts that will get you in the right Christmas spirit.
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
        {backgroundImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className="relative h-1 md:h-1.5 flex-1 rounded-full bg-white/20 overflow-hidden transition-all hover:bg-white/30"
            aria-label={`Go to slide ${index + 1}`}
          >
            <div 
              className={`absolute top-0 left-0 h-full bg-amber-400 rounded-full transition-all duration-300 ${
                index === currentImageIndex 
                  ? 'animate-[load_6s_linear_forwards] w-full' 
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