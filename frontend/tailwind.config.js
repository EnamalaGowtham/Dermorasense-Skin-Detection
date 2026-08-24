/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        clinical: {
          bg: '#0a0f1d',
          card: '#131c31',
          border: 'rgba(0, 242, 254, 0.1)',
          teal: '#00f2fe',
          blue: '#6366f1',
          slate: '#94a3b8',
          text: '#f1f5f9',
          accent: '#0d9488',
        }
      },
      fontFamily: {
        outfit: ['Outfit', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
