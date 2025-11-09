/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'yekan': ['Yekan Bakh', 'sans-serif'],
        'sans': ['Yekan Bakh', 'sans-serif'],
      },
      colors: {
        'off-white': '#FDFDFD',
        'light-beige': '#FAF5EE',
        'accent-orange': '#FFA500',
        'rocket-orange': '#FFAA00',
        'button-brown': '#B89B7C',
        'text-dark': '#333333',
        'decorative-gray': '#DCDCDC',
        'border-blue': '#0066FF',
        'form-orange': '#FF8C42',
        'button-red': '#DC2626',
        'status-green': '#10B981',
        'status-red': '#EF4444',
        'link-blue': '#3B82F6',
        'footer-orange': '#F0963C',
        'light-orange-bg': '#FFF0E0',
      },
    },
  },
  plugins: [],
}

