/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        // TOP 1% ANIMATIONS
        'blur-in': 'blurIn 1s cubic-bezier(0.22, 1, 0.36, 1) forwards', // Cinematic focus
        'text-shimmer': 'textShimmer 3s ease-in-out infinite', // Living gold effect
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
        // The "Cinematic" Keyframes
        blurIn: {
          '0%': { 
            opacity: '0', 
            filter: 'blur(12px)', 
            transform: 'scale(1.05) translateY(10px)' 
          },
          '100%': { 
            opacity: '1', 
            filter: 'blur(0)', 
            transform: 'scale(1) translateY(0)' 
          },
        },
        textShimmer: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
      },
    },
  },
  plugins: [],
};