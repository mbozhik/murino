const plugin = require('tailwindcss/plugin')

import type {Config} from 'tailwindcss'

const config: Config = {
  mode: 'jit',
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  prefix: '',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-opensans)', 'ui-sans-serif', 'system-ui', '-apple-system', 'Roboto', 'sans-serif'],
        bebas: ['BebasNeue', 'ui-sans-serif', 'system-ui', '-apple-system', 'Roboto', 'sans-serif'],
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
      borderRadius: {
        large: '35px',
        medium: '30px',
        small: '20px',
        smallest: '15px',
      },
      boxShadow: {
        base: '0px 0px 10px rgba(0, 0, 0, 0.25)',
        card: '0px 4px 20px rgba(0, 0, 0, 0.25)',
      },
    },
    screens: {
      xl: {max: '1536px'},
      lg: {max: '1024px'},
      sm: {max: '768px'},
      xs: {max: '350px'},
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    plugin(function sizePlugin(api) {
      api.matchUtilities({s: (value) => ({width: value, height: value})}, {values: api.theme('width')})
    }),
  ],
}

export default config
