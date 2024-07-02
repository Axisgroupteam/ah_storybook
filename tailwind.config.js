import { cp } from 'fs'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}', './node_modules/flowbite/**/*.js'],
  darkMode: ['class'],
  theme: {
    extend: {
      colors: ({ colors }) => ({
        primary: colors.red,
        gray: colors.red
      })
    }
  },
  plugins: [require('flowbite/plugin')]
}
