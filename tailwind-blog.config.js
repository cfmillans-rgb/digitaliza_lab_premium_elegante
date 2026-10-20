/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./blog.html",
    "./blog/**/*.html",
    "./terminos.html",
    "./privacidad.html",
    "./entrega-y-reembolso.html",
    "./datos-empresa.html",
    "./assets/js/**/*.js",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ink': { 950:'#07080a', 900:'#0a0e1a', 800:'#0e1320', 700:'#141b2d' },
        'amber-glow': '#ff8a42',
        'brand': { DEFAULT: '#e07a3a', hover: '#c96a2c', glow: '#ff8a42' },
        'mist': '#8a95a3',
      },
      animation: {
        'shimmer': 'shimmer 3s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
      },
      fontFamily: {
        display: ['"Fraunces"','serif'],
        sans:    ['"DM Sans"','sans-serif'],
        mono:    ['"JetBrains Mono"','monospace'],
      },
    },
  },
  plugins: [],
}
