const colors = require("tailwindcss/colors");
module.exports = {
  darkMode: "media",
  theme: {
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    container: {
      center: true,
      padding: "2rem",
    },
    textColor: {
      primary: colors.trueGray[900],
      secondary: colors.trueGray[600],
      danger: colors.red[900],
    },
    extend: {
      backgroundColor: {
        dark: colors.trueGray[400],
        light: colors.trueGray[200],
      },
      colors: {
        "blue-gray": colors.blueGray,
        "almost-black": "#121212",
        gray: colors.trueGray,
      },
      spacing: {
        112: "28rem",
        128: "32rem",
      },
    },
  },
};
