/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: { main: "#EF5A5A", sec: "#EBEAEA" },
      screens: {
        sm2: "480px",
      },
      boxShadow: {
        "3xl": " 0 4px 20px 4px #585858",
        "4xl": " 0 4px 20px 4px #58585852",
      },
      fontFamily: {
        ArabicFont: ["El Messiri", "sans-serif"], // Ensure fonts with spaces have " " surrounding it.
      },
    },
  },
  plugins: [],
};
