import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)', ...defaultTheme.fontFamily.sans],
        mono: ['var(--font-geist-mono)', ...defaultTheme.fontFamily.mono],
      },
      colors: {
        neural: {
          50: '#f5f7fb',
          100: '#e6eaf2',
          200: '#d1d7e3',
          300: '#a5b3c6',
          400: '#7a8899',
          500: '#4d5a73',
          600: '#3a4659',
          700: '#252d47',
          800: '#1a1f3a',
          900: '#0f1729',
          950: '#0a0e27',
        },
        cyan: {
          glow: '#00d9ff',
          dark: '#0099bb',
        },
        electric: '#00f5ff',
        pulse: '#0088ff',
        accent: {
          warm: '#ff6b35',
          cool: '#4ecdc4',
        },
      },
      boxShadow: {
        glow: '0 0 20px rgba(0, 217, 255, 0.3)',
        'glow-lg': '0 0 40px rgba(0, 217, 255, 0.5)',
        'glow-sm': '0 0 10px rgba(0, 217, 255, 0.2)',
      },
      keyframes: {
        'neural-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 217, 255, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 217, 255, 0.6)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-100%' },
          '100%': { backgroundPosition: '100%' },
        },
      },
      animation: {
        'neural-pulse': 'neural-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 4s ease infinite',
        shimmer: 'shimmer 2s infinite',
      },
      backgroundSize: {
        shimmer: '200% 100%',
      },
      backgroundPosition: {
        shimmer: '-100% 0',
      },
      transitionProperty: {
        DEFAULT: 'all',
      },
      transitionDuration: {
        DEFAULT: '300ms',
      },
      transitionTimingFunction: {
        DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      gridTemplateColumns: {
        bento: 'repeat(auto-fit, minmax(300px, 1fr))',
      },
    },
  },
  plugins: [],
}

export default config
