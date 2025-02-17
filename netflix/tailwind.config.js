/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}", // Include all your React files
      "./public/index.html",        // Include the HTML entry point
    ],
    theme: {
      extend: {},
    },
    plugins: [

    'tailwindcss', // This is the Tailwind CSS plugin
    'autoprefixer', // This is used for vendor prefixing
    ],
  };
  