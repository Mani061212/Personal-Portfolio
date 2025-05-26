// tailwind.config.js (for ES Module projects)
export default { // Ensure this is 'export default' for ES modules
  content: [
    // These paths tell Tailwind CSS where to look for your utility classes
    // Make sure all files where you use Tailwind classes are included here.
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // This covers all JS, TS, JSX, TSX files in src/ and its subdirectories
  ],
  darkMode: 'class', // Enable dark mode based on the 'dark' class on the HTML element
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'], // Define Inter font for easy use
      },
      colors: {
        // You can define custom colors here if needed
        primary: '#3B82F6', // Example: a custom primary blue
        secondary: '#6B7280', // Example: a custom secondary gray
      }
    },
  },
  plugins: [], // Add any Tailwind plugins here (e.g., @tailwindcss/forms)
};