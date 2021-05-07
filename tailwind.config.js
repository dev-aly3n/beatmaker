module.exports = {
  purge: ["build/index.html", "build/app.js"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        110: "28rem",
        120: "30rem",
        130: "35rem",
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["active"],
      boxShadow: ["active"],
      textColor: ["active"],
    },
  },
  plugins: [],
};
