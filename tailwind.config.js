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
        sans: ['"Inter Tight Variable"', '"Inter Tight Fallback"', 'system-ui', 'sans-serif'],
        display: ['"Fraunces Variable"', '"Fraunces Fallback"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono Variable"', '"JetBrains Mono Fallback"', 'monospace'],
        arabic: ['"IBM Plex Sans Arabic"', '"IBM Plex Sans Arabic Fallback"', 'sans-serif'],
      },
      colors: {
        bg: '#0A0A0A',
        bgElevated: '#131313',
        ink: '#F5F2EC',
        muted: '#A8A39A',
        soft: '#5C5852',
        accent: {
          DEFAULT: '#FF4D1F',
          soft: 'rgba(255,77,31,0.14)'
        },
        // legacy aliases preserved so existing utility classes don't break
        brand: {
          50:  '#fff1ec',
          100: '#ffded1',
          200: '#ffb89d',
          300: '#ff8e64',
          400: '#ff6a3a',
          500: '#FF4D1F',
          600: '#e23a10',
          700: '#b82a08',
          800: '#7a1c05',
          900: '#3d0e02',
          950: '#1f0701'
        }
      },
      borderRadius: {
        DEFAULT: '2px',
        sm: '2px',
        md: '2px',
        lg: '2px',
        xl: '2px',
        '2xl': '2px',
        '3xl': '2px',
      },
      boxShadow: {
        none: 'none',
      },
      animation: {
        cursor: 'cursor 0.85s steps(2) infinite',
      },
      keyframes: {
        cursor: {
          '0%, 49%':   { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        }
      }
    }
  },
  plugins: []
};
