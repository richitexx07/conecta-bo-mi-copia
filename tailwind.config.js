/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'conecta-blue': '#2563EB',
        'conecta-gray': '#4B5563',
        'conecta-light': '#F9FAFB',
      },
    },
  },
  plugins: [],
}

