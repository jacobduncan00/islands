module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        g: "18%",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
