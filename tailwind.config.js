// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        jacquard: ['"Jacquard 24"', 'cursive'], // fallback도 지정해줌
        sixtyfour: ['"Sixtyfour"', 'cursive']
      }
    }
  },
  plugins: [],
}
