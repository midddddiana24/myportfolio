import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans:    ['Geist', 'system-ui', 'sans-serif'],
        mono:    ['"Geist Mono"', 'ui-monospace', 'monospace'],
        display: ['Geist', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Claude-exact warm palette
        cream: {
          50:  '#FAFAF8',
          100: '#F5F4F0',
          200: '#EDECEA',
          300: '#E0DEDB',
          400: '#C8C5C0',
          500: '#A09890',
          600: '#706860',
          700: '#403830',
          800: '#201A15',
          900: '#100C08',
        },
        // Claude accent — warm terracotta/clay
        clay: {
          DEFAULT: '#CF4500',
          50:  '#FEF3EE',
          100: '#FDE0CC',
          200: '#FAB88A',
          300: '#F78C4A',
          400: '#F5782A',
          500: '#CF4500',
          600: '#A03800',
          700: '#782A00',
          light: '#E8602A',
          dim:   'rgba(207,69,0,0.10)',
          glow:  'rgba(207,69,0,0.22)',
        },
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '1rem', letterSpacing: '0.08em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '100': '25rem',
        '112': '28rem',
        '128': '32rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      animation: {
        'fade-in':    'fadeIn 0.5s ease forwards',
        'slide-up':   'slideUp 0.6s cubic-bezier(0.22,1,0.36,1) forwards',
        'ticker':     'ticker 22s linear infinite',
        'spin-slow':  'spin 20s linear infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
      },
      keyframes: {
        fadeIn:  { from: { opacity: '0' },                          to: { opacity: '1' } },
        slideUp: { from: { opacity: '0', transform: 'translateY(28px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        ticker:  { from: { transform: 'translateX(0)' },           to: { transform: 'translateX(-50%)' } },
      },
      screens: { xs: '375px', '3xl': '1920px' },
    },
  },
  plugins: [],
}

export default config
