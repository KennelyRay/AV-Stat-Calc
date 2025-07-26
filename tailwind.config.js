/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        anime: {
          primary: '#00D9FF',
          secondary: '#7C3AED',
          accent: '#F59E0B',
          dark: '#1A1A2E',
          darker: '#0F0F1A',
          gray: '#2A2A3E',
          'gray-light': '#3A3A4E',
          'gray-lighter': '#4A4A5E',
          light: '#F8FAFC',
          'light-gray': '#CBD5E0',
          blue: '#00D9FF',
          'blue-light': '#38BDF8',
          'blue-dark': '#0891B2',
          purple: '#7C3AED',
          'purple-light': '#A855F7',
          'purple-dark': '#5B21B6',
          neon: '#00F5FF',
          gold: '#FFD700',
          gradient: {
            primary: '#00D9FF',
            secondary: '#7C3AED',
            accent: '#F59E0B'
          }
        }
      },
      fontFamily: {
        'anime': ['Poppins', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'pulse-neon': 'pulseNeon 2s ease-in-out infinite',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-in-left': 'slideInLeft 0.8s ease-out',
        'slide-in-right': 'slideInRight 0.8s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
        'fade-in': 'fadeIn 1s ease-out',
        'bounce-subtle': 'bounceSubtle 2s ease-in-out infinite',
        'background-shift': 'backgroundShift 20s ease-in-out infinite',
        'grid-move': 'gridMove 30s linear infinite',
        'particle-float': 'particleFloat 15s ease-in-out infinite',
        'stars-twinkle': 'starsTwinkle 3s ease-in-out infinite',
        'bounce-arrow': 'bounceArrow 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(1deg)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 10px #00D9FF, 0 0 20px #00D9FF, 0 0 30px #00D9FF' },
          '100%': { boxShadow: '0 0 20px #00D9FF, 0 0 30px #00D9FF, 0 0 40px #00D9FF' },
        },
        pulseNeon: {
          '0%, 100%': { 
            boxShadow: '0 0 5px #00F5FF, 0 0 10px #00F5FF, 0 0 15px #00F5FF, 0 0 20px #00F5FF',
            transform: 'scale(1)'
          },
          '50%': { 
            boxShadow: '0 0 10px #00F5FF, 0 0 20px #00F5FF, 0 0 30px #00F5FF, 0 0 40px #00F5FF',
            transform: 'scale(1.05)'
          },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        bounceSubtle: {
          '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-5px)' },
          '60%': { transform: 'translateY(-3px)' },
        },
        backgroundShift: {
          '0%, 100%': { backgroundPosition: '0% 0%, 100% 100%, 50% 0%, 0% 0%' },
          '25%': { backgroundPosition: '100% 0%, 0% 100%, 25% 25%, 0% 0%' },
          '50%': { backgroundPosition: '100% 100%, 0% 0%, 75% 50%, 0% 0%' },
          '75%': { backgroundPosition: '0% 100%, 100% 0%, 25% 75%, 0% 0%' },
        },
        gridMove: {
          '0%': { transform: 'translate(0, 0)' },
          '100%': { transform: 'translate(80px, 80px)' },
        },
        particleFloat: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)', opacity: '0.3' },
          '33%': { transform: 'translate(30px, -30px) scale(1.1)', opacity: '0.6' },
          '66%': { transform: 'translate(-20px, -60px) scale(0.9)', opacity: '0.4' },
        },
        starsTwinkle: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        bounceArrow: {
          '0%': { 
            transform: 'translateX(-50%) translateY(0)',
            opacity: '0.8'
          },
          '50%': { 
            transform: 'translateX(-50%) translateY(12px)',
            opacity: '1'
          },
          '100%': { 
            transform: 'translateX(-50%) translateY(0)',
            opacity: '0.8'
          },
        }
      },
      backgroundImage: {
        'anime-gradient': 'linear-gradient(135deg, #00D9FF 0%, #7C3AED 50%, #F59E0B 100%)',
        'card-gradient': 'linear-gradient(145deg, rgba(42,42,62,0.9) 0%, rgba(58,58,78,0.7) 100%)',
        'hero-gradient': 'radial-gradient(ellipse at center, rgba(0,217,255,0.15) 0%, rgba(124,58,237,0.10) 50%, rgba(0,0,0,0.8) 100%)',
        'neon-gradient': 'linear-gradient(45deg, #00F5FF, #00D9FF, #7C3AED)',
        'gaming-grid': 'linear-gradient(rgba(0,217,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,217,255,0.1) 1px, transparent 1px)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
      },
    },
  },
  plugins: [],
} 