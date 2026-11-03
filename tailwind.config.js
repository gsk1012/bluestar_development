/** @type {import('tailwindcss').Config} */
// Kleuren verwijzen naar de CSS-tokens in src/index.css, zodat Tailwind-klassen
// en de handgeschreven vormen (chevrons, banden) dezelfde bron delen.
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ground: "var(--color-ground)",
        bone: "var(--color-bone)",
        line: "var(--color-line)",
        "line-strong": "var(--color-line-strong)",
        ink: "var(--color-ink)",
        "ink-soft": "var(--color-ink-soft)",
        dark: "var(--color-dark)",
        brand: "var(--color-brand)",
        "brand-deep": "var(--color-brand-deep)",
        "on-dark-soft": "var(--color-on-dark-soft)",
        accent: "var(--color-accent)",
        "accent-strong": "var(--color-accent-strong)",
        "accent-text": "var(--color-accent-text)",
        "accent-soft": "var(--color-accent-soft)",
        "accent-tint": "var(--color-accent-tint)",
        "on-accent": "var(--color-on-accent)",
      },
      borderRadius: {
        inner: "12px",
        card: "24px",
        panel: "40px",
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
        lift: "var(--shadow-lift)",
        button: "var(--shadow-button)",
      },
      fontFamily: {
        sans: ['"Bricolage Grotesque Variable"', '"Segoe UI"', "system-ui", "sans-serif"],
      },
      maxWidth: {
        container: "76rem",
      },
    },
  },
  plugins: [],
};
