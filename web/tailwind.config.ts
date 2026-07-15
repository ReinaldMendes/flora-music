import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Paleta oficial Flora Eça
        forest: {
          deep:    '#272B00',   // Verde Floresta Profundo
          moss:    '#54582F',   // Verde Musgo
          sage:    '#86895D',   // Verde Sálvia
        },
        terra: {
          dark:    '#5D2417',   // Terracota Escuro
          natural: '#8D4925',   // Terracota Natural
        },
        neutral: {
          cream:   '#F8F6F1',   // Fundo principal
          dark:    '#2D2D2D',   // Texto principal
          mid:     '#5F5F5F',   // Texto secundário
          line:    'rgba(39,43,0,0.08)', // Linhas
        },
      },
      fontFamily: {
        display:  ['"Cormorant Garamond"', '"EB Garamond"', 'Georgia', 'serif'],
        body:     ['"DM Sans"', 'system-ui', 'sans-serif'],
        serif:    ['"EB Garamond"', '"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      fontSize: {
        // Tipografia editorial de grande escala
        'display-2xl': ['clamp(5rem,12vw,14rem)',  { lineHeight: '0.88', letterSpacing: '-0.04em' }],
        'display-xl':  ['clamp(3.5rem,8vw,10rem)', { lineHeight: '0.9',  letterSpacing: '-0.03em' }],
        'display-lg':  ['clamp(2.5rem,5vw,7rem)',  { lineHeight: '0.92', letterSpacing: '-0.025em' }],
        'display-md':  ['clamp(2rem,4vw,5rem)',    { lineHeight: '0.95', letterSpacing: '-0.02em' }],
        'display-sm':  ['clamp(1.5rem,3vw,3.5rem)',{ lineHeight: '1.0',  letterSpacing: '-0.015em' }],
        'body-lg':     ['1.125rem', { lineHeight: '1.75', letterSpacing: '0.005em' }],
        'body-md':     ['1rem',     { lineHeight: '1.7' }],
        'body-sm':     ['0.875rem', { lineHeight: '1.6' }],
        'caption':     ['0.75rem',  { lineHeight: '1.5', letterSpacing: '0.12em' }],
        'overline':    ['0.6875rem',{ lineHeight: '1',   letterSpacing: '0.2em' }],
      },
      spacing: {
        'section':  'clamp(6rem, 14vw, 12rem)',
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '100': '25rem',
        '120': '30rem',
        '160': '40rem',
      },
      animation: {
        'fade-in':       'fadeIn 1.2s ease forwards',
        'slide-up':      'slideUp 1s cubic-bezier(0.16,1,0.3,1) forwards',
        'text-reveal':   'textReveal 1.4s cubic-bezier(0.16,1,0.3,1) forwards',
        'leaf-drift':    'leafDrift 8s ease-in-out infinite',
        'particle-float':'particleFloat 6s ease-in-out infinite',
        'cursor-grow':   'cursorGrow 0.3s ease forwards',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(60px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        textReveal: {
          from: { opacity: '0', transform: 'translateY(100%) skewY(3deg)' },
          to:   { opacity: '1', transform: 'translateY(0) skewY(0deg)' },
        },
        leafDrift: {
          '0%,100%': { transform: 'translateY(0) rotate(-3deg) scale(1)' },
          '33%':     { transform: 'translateY(-20px) rotate(2deg) scale(1.02)' },
          '66%':     { transform: 'translateY(-8px) rotate(-1deg) scale(0.98)' },
        },
        particleFloat: {
          '0%,100%': { transform: 'translateY(0) translateX(0)', opacity: '0.4' },
          '50%':     { transform: 'translateY(-30px) translateX(10px)', opacity: '0.8' },
        },
        cursorGrow: {
          from: { transform: 'scale(1)' },
          to:   { transform: 'scale(2)' },
        },
      },
      transitionTimingFunction: {
        'expo':    'cubic-bezier(0.16, 1, 0.3, 1)',
        'organic': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'silk':    'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        '400':  '400ms',
        '600':  '600ms',
        '800':  '800ms',
        '1000': '1000ms',
        '1200': '1200ms',
        '1500': '1500ms',
        '2000': '2000ms',
      },
      backdropBlur: {
        'xs': '2px',
        'glass': '20px',
      },
      backgroundImage: {
        'gradient-forest': 'linear-gradient(180deg, #272B00 0%, #1a1e00 100%)',
        'gradient-reveal': 'linear-gradient(0deg, rgba(39,43,0,0.8) 0%, transparent 60%)',
        'gradient-noise':  'url("/images/noise.png")',
      },
      boxShadow: {
        'flora-sm': '0 2px 12px rgba(39,43,0,0.08)',
        'flora-md': '0 8px 40px rgba(39,43,0,0.12)',
        'flora-lg': '0 24px 80px rgba(39,43,0,0.18)',
        'flora-xl': '0 40px 120px rgba(39,43,0,0.25)',
      },
    },
  },
  plugins: [],
}

export default config
