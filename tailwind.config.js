/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#FFFFFF",
        surface: "#F4F8FD",
        ink: "#0B1B30",
        "ink-soft": "#3A4A60",
        accent: "#0B5FD8",
        "accent-bright": "#3B9EFF",
        line: "#E2E9F2",
        // Dark theme depths (cohesive futuristic look matching the hero)
        night: "#081325",
        panel: "#0F2236",
      },
      borderRadius: {
        rsm: "8px",
        rmd: "14px",
        rlg: "22px",
      },
      fontFamily: {
        heading: ['"Space Grotesk"', "system-ui", "sans-serif"],
        body: ['"Inter"', "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
