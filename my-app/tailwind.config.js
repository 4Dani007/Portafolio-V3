
/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0066CC',
          dark: '#004499',
          light: '#3B82F6',
        },
        accent: {
          DEFAULT: '#00A8E8',
          light: '#00D4FF',
          soft: '#E6F4FF',
        },
      },
    },
  },
  plugins: [],
}

