/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0a0808',
        bg2: '#120a0a',
        red: '#e6172c',
        'red-deep': '#7a0f16',
        'red-glow': '#ff2d3f',
        white: '#f5f3f2',
        grey: '#9c9694',
      },
      fontFamily: {
        sans: ['Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono: ['Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
}
