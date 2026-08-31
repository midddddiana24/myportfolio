import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans:    ['"DM Sans"', 'system-ui', 'sans-serif'],
        display: ['Anton', '"DM Sans"', 'system-ui', 'sans-serif'],
        mono:    ['"DM Mono"', 'ui-monospace', 'monospace'],
      },
      // These mirror the :root tokens in index.css and must be kept in step
      // with them by hand. Note the asymmetry that matters: a utility like
      // `bg-base` compiles to a literal hex, so unlike `var(--bg-base)` it
      // does NOT invert inside `.ink-band`. Prefer the CSS variable for
      // anything that might sit on a dark band.
      colors: {
        base:    '#f8f8f8',
        surface: '#ffffff',
        border:  '#c8c8c8',
        accent:  '#0a0a0a',
        'text-primary': '#0a0a0a',
        'text-muted':   '#5a5a5a',
        'text-subtle':  '#6f6f6f',
      },
      // Tailwind's preflight paints every element's border-color with
      // gray-200 (#e5e7eb) by default, so any `border`/`border-t` utility
      // written without a colour renders a bright, faintly blue hairline.
      // On the old near-black ground that was glaring; on paper it is
      // subtler but still wrong — #e5e7eb is cool-tinted and this palette
      // has no hue at all. Pinning the default to the design system's
      // border step fixes those at the root and means a border added later
      // is correct without anyone having to remember.
      borderColor: {
        DEFAULT: '#c8c8c8',
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '1rem', letterSpacing: '0.1em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      animation: {
        'marquee':      'marquee 24s linear infinite',
        'marquee-rev':  'marqueeRev 24s linear infinite',
        'bounce-slow':  'bounceSlow 2s ease-in-out infinite',
        'spin-slow':    'spin 20s linear infinite',
        'blink':        'blink 1.2s step-end infinite',
        'ticker':       'ticker 22s linear infinite',
      },
      keyframes: {
        marquee:    { from: { transform:'translateX(0)' }, to: { transform:'translateX(-50%)' } },
        marqueeRev: { from: { transform:'translateX(-50%)' }, to: { transform:'translateX(0)' } },
        bounceSlow: { '0%,100%': { transform:'translateY(0)' }, '50%': { transform:'translateY(8px)' } },
        blink:      { '0%,100%': { opacity:'1' }, '50%': { opacity:'0' } },
        ticker:     { from: { transform:'translateX(0)' }, to: { transform:'translateX(-50%)' } },
      },
      screens: { xs: '375px', '3xl': '1920px' },
    },
  },
  plugins: [],
}
export default config
