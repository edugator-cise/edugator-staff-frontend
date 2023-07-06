const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    "fill-nav-active-light",
    "fill-nav-active-dark",
    "fill-nav-inactive-light",
    "fill-nav-inactive-dark",
    "fill-nav-active-light-color",
    "fill-nav-active-dark-color",
    "group-hover:bg-amber-100",
    "group-hover:bg-emerald-100",
    "group-hover:bg-blue-100",
    "ring-amber-400",
    "ring-emerald-400",
    "ring-blue-400",
  ],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        mobile: "800px",
        tablet: "1024px",
        laptop: "1420px",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        public: ["Public Sans", "sans-serif"],
        dm: ["DM Sans", "sans-serif"],
        ambit: ["Ambit", "sans-serif"],
      },
      colors: {
        nav: {
          "active-light": "#FFFFFF",
          "active-dark": "#6e737d",
          "inactive-light": "#B7BCBD",
          "inactive-dark": "#434A55",
          "active-light-color": "#d1fae5",
          "active-dark-color": "#10b981",
          darkest: "#0c121c",
          darker: "#111825",
          dark: "#192231",
        },
        "ai-purple": "#7C3AED",
        mirage: {
          50: "#f4f6fb",
          100: "#e9edf5",
          200: "#cedae9",
          300: "#a3bbd6",
          400: "#7195bf",
          500: "#4f78a8",
          600: "#3d5f8c",
          700: "#324d72",
          800: "#2d435f",
          900: "#293951",
          950: "#192231",
        },
        blue: {
          50: "#f3f6fc",
          100: "#e5ecf9",
          200: "#c5d7f2",
          300: "#93b6e6",
          400: "#5990d7",
          500: "#3a79cb",
          600: "#2458a5",
          700: "#1e4686",
          800: "#1d3d6f",
          900: "#1d365d",
          950: "#13223e",
        },
      },
      keyframes: {
        slideDownAndFade: {
          from: { opacity: 0, transform: "translateY(-10px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        slideLeftAndFade: {
          from: { opacity: 0, transform: "translateX(10px)" },
          to: { opacity: 1, transform: "translateX(0)" },
        },
        slideUpAndFade: {
          from: { opacity: 0, transform: "translateY(4px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        slideRightAndFade: {
          from: { opacity: 0, transform: "translateX(10px)" },
          to: { opacity: 1, transform: "translateX(0)" },
        },
        slideDown: {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        slideUp: {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "skew-scroll": {
          "0%": {
            transform:
              "rotatex(20deg) rotateZ(-20deg) skewX(20deg) translateZ(0) translateY(0)",
          },
          "50%": {
            transform:
              "rotatex(20deg) rotateZ(-20deg) skewX(20deg) translateZ(0) translateY(-100%)",
          },
          "100%": {
            transform:
              "rotatex(20deg) rotateZ(-20deg) skewX(20deg) translateZ(0) translateY(0)",
          },
        },
      },
      animation: {
        "skew-scroll": "skew-scroll 30s ease-in-out infinite",
        slideDownAndFade:
          "slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideLeftAndFade:
          "slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideUpAndFade: "slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideRightAndFade:
          "slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideDown: "slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1)",
        slideUp: "slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1)",
      },
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("tailwindcss-radix")(),
    require("@tailwindcss/typography"),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "translate-z": (value) => ({
            "--tw-translate-z": value,
            transform: ` translate3d(var(--tw-translate-x), var(--tw-translate-y), var(--tw-translate-z)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))`,
          }), // this is actual CSS
        },
        { values: theme("translate"), supportsNegativeValues: true }
      );
    }),
    // ...
  ],
};
