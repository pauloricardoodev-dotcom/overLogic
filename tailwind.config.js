/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
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
        // Light mode colors
        'light-bg': '#ffffff',
        'light-bg2': '#f8f8f8',
        'light-text': '#1a1a1a',
        'light-grey': '#666666',
      },
      fontFamily: {
        sans: ['Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono: ['Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
}
