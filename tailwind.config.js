/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ['Noto Sans Mayan Numerals', 'sans-serif'],
    },
    extend: {
      height: {
        screen: "100dvh",
      },
    },
  },
  plugins: [],
}
