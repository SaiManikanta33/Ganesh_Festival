/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        hunt: {
          dark: '#2C2C2C',      // 2c2c2c
          magenta: '#853953',   // 853953
          plum: '#612D53',      // 612d53
          light: '#F3F4F4',     // f3f4f4
          yellow: '#FFEE00',    // Bright Yellow
          amber: '#FFC800',
        }
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
        'spin-slow': 'spin 14s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.85', filter: 'drop-shadow(0 0 15px rgba(255, 238, 0, 0.6))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 35px rgba(133, 57, 83, 0.8))' },
        }
      }
    },
  },
  plugins: [],
}
