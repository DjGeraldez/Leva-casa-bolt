/** @type {import('tailwindcss').Config} */
const colors = require("./tokens/colors").colors;
const spacing = require("./tokens/spacing").spacing;
const typography = require("./tokens/typography").typography;

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        // primary / secondary / neutral (names inside colors.ts)
        primary: colors.primary,
        secondary: colors.secondary,
        neutral: colors.neutral,
      },
      spacing: spacing,
      fontFamily: typography.fontFamily,
      fontSize: typography.fontSize,
    },
  },
  plugins: [],
};
