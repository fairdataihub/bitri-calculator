/** @type {import('tailwindcss').Config} */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
  ],

  corePlugins: {
    backgroundOpacity: false,
    borderOpacity: false,
    divideOpacity: false,
    placeholderOpacity: false,
    ringOpacity: false,
    textOpacity: false,
  },

  plugins: [require("tailwindcss-debug-screens")],

  theme: {
    extend: {
      animation: {
        appear: "appear 300ms ease-out 150ms both",
        flicker: "flicker 3s linear infinite",
        shimmer: "shimmer 1.3s linear infinite",
        zoomIn: "appear 300ms ease-out 150ms both",
      },

      container: {
        center: true,
        screens: {
          "2xl": "1124px",
          lg: "1124px",
          xl: "1124px",
        },
      },

      fontFamily: {
        primary: ["Inter", ...fontFamily.sans],
      },

      keyframes: {
        appear: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },

        flicker: {
          "0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%": {
            filter:
              "drop-shadow(0 0 1px rgba(252, 211, 77)) drop-shadow(0 0 15px rgba(245, 158, 11)) drop-shadow(0 0 1px rgba(252, 211, 77))",
            opacity: 0.99,
          },
          "20%, 21.999%, 63%, 63.999%, 65%, 69.999%": {
            filter: "none",
            opacity: 0.4,
          },
        },

        shimmer: {
          "0%": {
            backgroundPosition: "-700px 0",
          },
          "100%": {
            backgroundPosition: "700px 0",
          },
        },

        zoomIn: {
          "0%": { opacity: 0, transform: "scale(.5)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
      },
    },
  },
};
