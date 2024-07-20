/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "main-gray": "#444444",
        "lost-color": "#ED5656",
        "found-color": "5680ED",
      },
      fontFamily: {
        "source-sans3": ["Source Sans 3"],
        poppins: ["Poppins", "sans-serif"],
      },
      backgroundImage: {
        fikom: "url(./src/assets/Fikom.png)",
      },
      keyframes: {
        slideIn: {
          "0%": {
            transform: "translateX(100%)",
            opacity: "0",
          },
          "20%": { transform: "translateX(40%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        slideOut: {
          "0%": { transform: "translateX(0)", opacity: "1" },
          "20%": { transform: "translateX(6 0%)", opacity: "0" },
          "100%": { transform: "translateX(100%)", opacity: "0" },
        },
      },
      animation: {
        slideIn: "slideIn 0.5s forwards",
        slideOut: "slideOut 0.5s forwards",
      },
      dropShadow: {
        "text-shadow": "drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]",
      },
      aspectRatio: {
        "3/4": "4/3",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
