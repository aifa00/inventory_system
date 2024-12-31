/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#22BCC8", // Original color
        secondary: "#1D9DA7", // Brighter version
        tertiary: "#2BEBFA", // Lighter version
        textPrimary: "#4B5563", // Dark gray text (main text)
        textSecondary: "#6B7280", // Light gray text (secondary text)
        bgLightGray: "#F3F4F6", // A light gray for backgrounds
      },
    },
  },
  plugins: [],
};
