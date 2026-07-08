/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#000000',
          900: '#050505',
          800: '#111111',
          700: '#1a1a1a',
          600: '#2a2a2a',
        },
        amber: {
          glow: '#ff8a42',
          deep: '#e07a3a',
          ember: '#c96a2c',
        },
        brand: {
          DEFAULT: '#e07a3a',
          hover: '#c96a2c',
          glow: '#ff8a42',
        },
        mist: '#9ca3af',
      },
      fontFamily: {
        display: ['Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glow-amber': '0 0 80px -10px rgba(224,122,58,0.4)',
        'glow-cyan': '0 0 80px -10px rgba(6,182,212,0.25)',
        'premium': '0 30px 80px -20px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04) inset',
      },
      animation: {
        'float-slow': 'float 18s ease-in-out infinite',
        'float-slower': 'float 24s ease-in-out infinite reverse',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'scale-pulse': 'scalePulse 6s ease-in-out infinite',
        'marquee': 'marquee 40s linear infinite',
        'gradient-x': 'gradientX 8s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(30px, -40px) scale(1.05)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.98)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
        scalePulse: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.3' },
          '50%': { transform: 'scale(1.1)', opacity: '0.5' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        gradientX: {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
      },
    },
  },
  plugins: [],
}
