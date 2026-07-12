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
          deep:     '#272B00',
          forest:   '#54582F',
          moss:     '#86895D',
          earth:    '#5D2417',
          copper:   '#8D4925',
          cream:    '#F5F2EC',
          offwhite: '#FAFAF7',
        },
      },
      animation: {
        'fade-up':    'fadeUp 0.9s ease forwards',
        'fade-in':    'fadeIn 1.2s ease forwards',
        'leaf-float': 'leafFloat 6s ease-in-out infinite',
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
        leafFloat: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%':      { transform: 'translateY(-12px) rotate(3deg)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
