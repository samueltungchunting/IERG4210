/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "var(--primary-100)",
        "primary-2": "var(--primary-200)",
        "primary-3": "var(--primary-300)",
        "secondary": "var(--secondary-100)",
        "secondary-2": "var(--secondary-200)",
        "text": "var(--text-100)",
        "text-2": "var(--text-200)",
        "bgColour": "var(--bg-100)",
        "bgColour-2": "var(--bg-200)",
        "bgColour-3": "var(--bg-300)",
      },
    },
  },
  plugins: [],
}

