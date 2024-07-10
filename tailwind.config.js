/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './node_modules/flowbite/**/*.js',
    '/stories/**/*.{vue,js,jsx,ts,tsx}'
  ],
  darkMode: ['class'],
  theme: {
    extend: {
      colors: ({ colors }) => ({
        //primary: colors.red,
        gray: colors.neutral
      })
    }
  },
  plugins: [require('flowbite/plugin')]
}
