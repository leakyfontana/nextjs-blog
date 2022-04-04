module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      colors: {
        'seafoam': '#def3f6',
        'shallow': '#76b6c4',
        'sky-blue': '#7fcdff',
        'swim-area': '#1da2d8',
        'deep-sea': '#064273',
        'sand': '#C2B280',
        'off-white': '#F2F2F2',
      },
      animation: {
        'record-spin': 'spin 10s linear infinite'
      },
    },
  },
  plugins: [],
}
