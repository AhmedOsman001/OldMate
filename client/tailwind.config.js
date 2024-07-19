/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "custom-gradient":
          "radial-gradient(133.49% 100% at 50% 0, rgba(7, 7, 32, 0.5) 0%, #070720 100%)",
      },
      colors: {
        customDark: '#070720',
      },
      transitionProperty: {
        'bg': 'background-image, background-color',
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
};
