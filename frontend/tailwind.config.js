/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        'primary-dark': '#1e40af',
        'primary-light': '#60a5fa',
        secondary: '#f9fafb',
        accent: '#10b981',
        'accent-dark': '#059669',
        'accent-light': '#6ee7b7',
        danger: '#ef4444',
        'danger-dark': '#b91c1c',
      }
    },
  },
  plugins: [],
}