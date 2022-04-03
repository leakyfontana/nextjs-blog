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
    colors: {
      'seafoam': '#def3f6',
      'shallow': '#7e5bef',
      'sky-blue': '#7fcdff',
      'swim-area': '#1da2d8',
      'deep-sea': '#064273',
      'sand': '#C2B280',
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
  },
  plugins: [],
}
