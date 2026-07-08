/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./blog.html"],
  theme: {
    extend: {
      colors: {
        'ink': { 950:'#07080a', 900:'#0a0e1a', 800:'#0e1320', 700:'#141b2d' },
        'amber-glow': '#ff8a42',
        'mist': '#8a95a3',
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
