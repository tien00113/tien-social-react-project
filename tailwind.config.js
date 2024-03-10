/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      height: {
        '70': '17.5rem',
        '80': '20rem',
        '128': '40rem',
      }
    },
  },
  plugins: [],
}