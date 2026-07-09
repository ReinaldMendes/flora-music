import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        flora: {
          deep:    '#272B00',
          forest:  '#54582F',
          moss:    '#86895D',
          earth:   '#5D2417',
          copper:  '#8D4925',
          cream:   '#F5F2EC',
          offwhite:'#FAFAF7',
        },
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        body:    ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        lyrics:  ['var(--font-lora)', 'Georgia', 'serif'],
      },
      fontSize: {
        'hero':  ['clamp(3rem, 8vw, 7rem)',   { lineHeight: '0.95', letterSpacing: '-0.02em' }],
        'title': ['clamp(2rem, 5vw, 4rem)',    { lineHeight: '1.05', letterSpacing: '-0.01em' }],
        'h1':    ['clamp(1.75rem, 4vw, 3rem)', { lineHeight: '1.1' }],
        'h2':    ['clamp(1.5rem, 3vw, 2.25rem)', { lineHeight: '1.15' }],
        'h3':    ['clamp(1.25rem, 2vw, 1.75rem)', { lineHeight: '1.2' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        'section': 'clamp(4rem, 10vw, 8rem)',
      },
      animation: {
        'fade-up':     'fadeUp 0.9s ease forwards',
        'fade-in':     'fadeIn 1.2s ease forwards',
        'blur-in':     'blurIn 1s ease forwards',
        'leaf-float':  'leafFloat 6s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        blurIn: {
          from: { opacity: '0', filter: 'blur(8px)' },
          to:   { opacity: '1', filter: 'blur(0)' },
        },
        leafFloat: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%':      { transform: 'translateY(-12px) rotate(3deg)' },
        },
      },
      transitionTimingFunction: {
        'organic': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
    },
  },
  plugins: [],
}

export default config
