/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "retro-black": "#121212",
        "retro-gray": "#1E1E1E",
        "retro-light-gray": "#2C2C2C",
        "retro-blue": "#58A6FF",
      },
    },
  },
  plugins: [],
};
