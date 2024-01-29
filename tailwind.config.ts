const plugin = require('tailwindcss/plugin')
import type {Config} from 'tailwindcss'

const config = {
  mode: 'jit',
  darkMode: ['class'],
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-opensans)', 'ui-sans-serif', 'system-ui', '-apple-system', 'Roboto', 'sans-serif'],
        bebas: ['var(--font-bebas)', 'ui-sans-serif', 'system-ui', '-apple-system', 'Roboto', 'sans-serif'],
      },
      fontWeight: {
        book: '450',
      },
      colors: {
        custom: {
          green: '#387A22',
          gray: '#454545',
          95: '#959595',
          e4: '#E4E4E4',
        },
      },
      keyframes: {
        'accordion-down': {
          from: {height: '0'},
          to: {height: 'var(--radix-accordion-content-height)'},
        },
        'accordion-up': {
          from: {height: 'var(--radix-accordion-content-height)'},
          to: {height: '0'},
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
    // screens: {
    //   xl: {max: '1536px'},
    //   lg: {max: '1024px'},
    //   sm: {max: '768px'},
    //   xs: {max: '350px'},
    // },
  },
  plugins: [
    require('tailwindcss-animate'),
    plugin(function sizePlugin(api) {
      api.matchUtilities({s: (value) => ({width: value, height: value})}, {values: api.theme('width')})
    }),
  ],
} satisfies Config

export default config
