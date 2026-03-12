/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyan: {
          400: '#00d4ff',
          300: '#33ddff',
          200: '#66e8ff',
          500: '#00b8d9',
          600: '#0099b3',
        }
      },
      animation: {
        spotlight: "spotlight 2s ease .75s 1 forwards",
        "breathing-glow": "breathing-glow 3s ease-in-out infinite",
      },
      keyframes: {
        spotlight: {
          "0%": {
            opacity: "0",
            transform: "translate(-72%, -62%) scale(0.5)",
          },
          "100%": {
            opacity: "1",
            transform: "translate(-50%,-40%) scale(1)",
          },
        },
        "breathing-glow": {
          "0%, 100%": {
            boxShadow: "0 0 10px rgba(0, 229, 255, 0.2), inset 0 0 5px rgba(0, 229, 255, 0.1)",
          },
          "50%": {
            boxShadow: "0 0 25px rgba(0, 229, 255, 0.5), inset 0 0 15px rgba(0, 229, 255, 0.3)",
          },
        }
      },
    },
  },
  plugins: [],
}
