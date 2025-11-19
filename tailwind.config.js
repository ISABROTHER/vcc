/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
        playwrite: ['"Playwrite CZ"', 'cursive'],
        // NEW: Best for luxury headings
        playfair: ['"Playfair Display"', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'blur-in': 'blurIn 1s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'text-shimmer': 'textShimmer 3s ease-in-out infinite',
        // NEW: Animation that pauses at 30%
        'reveal-stop': 'revealStop 4s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        blurIn: {
          '0%': { opacity: '0', filter: 'blur(12px)', transform: 'scale(1.05) translateY(10px)' },
          '100%': { opacity: '1', filter: 'blur(0)', transform: 'scale(1) translateY(0)' },
        },
        textShimmer: {
          '0%, 100%': { 'background-size': '200% 200%', 'background-position': 'left center' },
          '50%': { 'background-size': '200% 200%', 'background-position': 'right center' },
        },
        // LOGIC: Open (100%) -> Close to 30% -> Stop/Wait -> Reset
        revealStop: {
          '0%': { width: '0%', opacity: '0' },
          '20%': { width: '100%', opacity: '1' }, // Opens fully
          '40%': { width: '30%', opacity: '1' },  // Closes to 30%
          '80%': { width: '30%', opacity: '1' },  // PAUSES at 30%
          '100%': { width: '0%', opacity: '0' },  // Fades out to restart
        },
      },
    },
  },
  plugins: [],
};