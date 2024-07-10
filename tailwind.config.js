/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}', './node_modules/flowbite/**/*.js'],
  darkMode: ['class'],
  theme: {
    extend: {
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1366px",
        xl: "1280px",
        "2xl": "1536px",      
      },
      colors: ({ colors }) => ({
      //primary: colors.red,
      gray: colors.neutral
      })
    }
  },
  plugins: [require('flowbite/plugin')]
}
