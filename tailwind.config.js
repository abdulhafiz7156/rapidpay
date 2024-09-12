/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        lightBackground: '#ffffff',
        darkBackground: '#2C2C2C',
        lightText: '#232323',
        darkText: '#FFFFFF',
      }
    },
  },
  plugins: [],
}