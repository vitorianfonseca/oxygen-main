import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'space': ['var(--font-space-grotesk)', 'sans-serif'],
        'inter': ['var(--font-inter)', 'sans-serif'],
      },
      colors: {
        cyan: {
          electric: '#009FDF',
          dim: 'var(--cyan-dim)',
        },
        black: {
          deep: 'rgb(var(--color-black-deep) / <alpha-value>)',
        },
        surface: {
          1: 'rgb(var(--color-surface-1) / <alpha-value>)',
          2: 'rgb(var(--color-surface-2) / <alpha-value>)',
          3: 'rgb(var(--color-surface-3) / <alpha-value>)',
        },
        white: {
          DEFAULT: 'rgb(var(--color-white) / <alpha-value>)',
          muted: 'var(--white-muted)',
          ghost: 'var(--white-ghost)',
        },
        accent: {
          glow: 'var(--accent-glow)',
        },
      },
      fontSize: {
        'display': ['clamp(4rem, 10vw, 7.5rem)', { lineHeight: '0.95', fontWeight: '900' }],
        'display-md': ['clamp(3rem, 8vw, 5.5rem)', { lineHeight: '0.95', fontWeight: '900' }],
        'display-sm': ['clamp(2rem, 5vw, 3.5rem)', { lineHeight: '1', fontWeight: '800' }],
        'manifesto': ['clamp(1.25rem, 2.5vw, 1.75rem)', { lineHeight: '1.3' }],
        'label': ['0.7rem', { lineHeight: '1', letterSpacing: '0.3em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '128': '32rem',
        '144': '36rem',
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      animation: {
        'scan': 'scan 4s linear infinite',
        'breathe': 'breathe 3s ease-in-out infinite',
        'slow-rotate': 'slow-rotate 60s linear infinite',
        'shimmer': 'shimmer 4s linear infinite',
        'marquee-left': 'marquee-left 30s linear infinite',
        'marquee-right': 'marquee-right 25s linear infinite',
        'float-up': 'float-up 0.6s ease forwards',
        'sonar-1': 'sonar 2.4s ease-out infinite',
        'sonar-2': 'sonar 2.4s ease-out 0.4s infinite',
        'sonar-3': 'sonar 2.4s ease-out 0.8s infinite',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-10%)' },
          '100%': { transform: 'translateY(110%)' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.06)', opacity: '0.7' },
        },
        'slow-rotate': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        shimmer: {
          from: { backgroundPosition: '200% center' },
          to: { backgroundPosition: '-200% center' },
        },
        'marquee-left': {
          from: { transform: 'translateX(0%)' },
          to: { transform: 'translateX(-50%)' },
        },
        'marquee-right': {
          from: { transform: 'translateX(-50%)' },
          to: { transform: 'translateX(0%)' },
        },
        'float-up': {
          from: { opacity: '0', transform: 'translateY(40px) blur(20px)' },
          to: { opacity: '1', transform: 'translateY(0) blur(0)' },
        },
        sonar: {
          '0%': { transform: 'scale(1)', opacity: '0.8' },
          '100%': { transform: 'scale(2.2)', opacity: '0' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}

export default config
