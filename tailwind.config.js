module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        travel: {
          "0%": { transform: "translateX(0)", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { transform: "translateX(430px)", opacity: "0" }, // match your form width
        },
      },
      animation: {
        travel: "travel 1.2s linear infinite",
      },
    },
  },
  plugins: [],
};
