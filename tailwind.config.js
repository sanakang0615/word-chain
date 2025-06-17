// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        jacquard: ['"Jacquard 24"', 'cursive'], // fallback도 지정해줌
        sixtyfour: ['"Sixtyfour"', 'cursive']
      },
      keyframes: {
        'pulse-shadow': {
          '0%': { boxShadow: '0 0 0 0 rgba(220, 38, 38, 0.2)' },
          '50%': { boxShadow: '0 0 20px 10px rgba(220, 38, 38, 0.1)' },
          '100%': { boxShadow: '0 0 0 0 rgba(220, 38, 38, 0.2)' },
        },
      },
      animation: {
        'pulse-shadow': 'pulse-shadow 3s infinite',
      },
    }
  },
  plugins: [],
}
