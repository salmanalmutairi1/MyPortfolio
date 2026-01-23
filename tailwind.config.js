/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './index.tsx',
    './App.tsx',
    './components/**/*.{ts,tsx}',
    './services/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      colors: {
        brand: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          950: '#2e1065'
        },
        accent: {
          DEFAULT: '#6366f1',
          glow: '#818cf8'
        }
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        cursor: 'cursor .75s step-end infinite',
        aurora: 'aurora 10s linear infinite alternate'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        cursor: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' }
        },
        aurora: {
          '0%': { backgroundPosition: '50% 50%', filter: 'hue-rotate(0deg)' },
          '100%': { backgroundPosition: '100% 50%', filter: 'hue-rotate(20deg)' }
        }
      }
    }
  },
  plugins: []
};
