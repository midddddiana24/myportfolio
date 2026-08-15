import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Dark theme tokens
        dark: {
          bg: '#080810',
          surface: '#0e0e1c',
          card: '#121224',
          border: '#1e1e38',
          hover: '#1a1a30',
        },
        // Light theme tokens
        light: {
          bg: '#fafafa',
          surface: '#ffffff',
          card: '#f4f4f8',
          border: '#e2e2ea',
          hover: '#ededf5',
        },
        // Accent — Electric Violet
        accent: {
          DEFAULT: '#7c3aed',
          light: '#a78bfa',
          dim: '#4c1d95',
          glow: 'rgba(124,58,237,0.25)',
        },
        // Text hierarchy
        text: {
          primary: '#f1f0ff',
          secondary: '#9b9bbf',
          muted: '#6b6b8f',
          inverted: '#0e0e1c',
        },
      },
      fontFamily: {
        display: ['Syne', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '1rem' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '88': '22rem',
        '100': '25rem',
        '112': '28rem',
        '128': '32rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'accent': '0 0 20px rgba(124,58,237,0.3)',
        'accent-lg': '0 0 40px rgba(124,58,237,0.4)',
        'card': '0 4px 24px rgba(0,0,0,0.4)',
        'card-hover': '0 8px 40px rgba(0,0,0,0.6)',
        'glow': '0 0 60px rgba(124,58,237,0.15)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'mesh-gradient': 'radial-gradient(at 40% 20%, rgba(124,58,237,0.15) 0, transparent 50%), radial-gradient(at 80% 80%, rgba(99,102,241,0.1) 0, transparent 50%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2s linear infinite',
        'gradient': 'gradient 8s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(124,58,237,0.2)' },
          '100%': { boxShadow: '0 0 40px rgba(124,58,237,0.5)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      screens: {
        'xs': '375px',
        '3xl': '1920px',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },
    },
  },
  plugins: [],
}

export default config
