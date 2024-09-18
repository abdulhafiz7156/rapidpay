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
        lightBackgroundBlocks: "#F7F7F8",
        darkBackground: '#2C2C2C',
        darkBackgroundBlocks: "#353535",
        lightText: '#232323',
        darkText: '#FFFFFF',
        defaultBlue: '#4A86E0',
        defaultActiveBlue: '#3D6AAE'
      }
    },
  },
  plugins: [],
}