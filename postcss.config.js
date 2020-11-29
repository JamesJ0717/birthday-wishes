module.exports = {
  plugins: {
    tailwindcss: {},

    "postcss-preset-env": {
      browsers: "last 2 versions",
      stage: 0,
      features: {
        "focus-within-pseudo-class": false, // Attempt at fixing build error
      },
    },
  },
};
