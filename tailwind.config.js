/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'md:translate-x-0',
    '-translate-x-full',
    'translate-x-0',
    'md:ml-64',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}