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
        primary: "#00ADEF",
        darkBlue: "#1B3C88",
        success: "#28C76F",
        warning: "#FF9F43",
        error: "#EA5455",
        lightGray: "#F5F8FC"
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
