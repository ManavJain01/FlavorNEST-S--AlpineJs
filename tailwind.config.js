/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html", // Directly include the index.html file
    "./components/**/*.{html,js}", // Include all HTML and JS files in the components folder
  ],
  theme: {
    extend: {
      colors: {
        default: "var(--theme-default)",
        topheader: "var(--top-header-color)",
        dashboard: "var(--dashboard-theme-color)",
      },
    },
  },
};
