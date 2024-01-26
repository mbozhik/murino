const plugin = require('tailwindcss/plugin')

import type {Config} from 'tailwindcss'

const config: Config = {
  mode: 'jit',
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-opensans)', 'ui-sans-serif', 'system-ui', '-apple-system', 'Roboto', 'sans-serif'],
        bebas: ['var(--font-bebas)', 'ui-sans-serif', 'system-ui', '-apple-system', 'Roboto', 'sans-serif'],
      },
      colors: {
        custom: {
          green: '#387A22',
          45: '#454545',
          95: '#959595',
          e4: '#E4E4E4',
        },
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
    plugin(function sizePlugin(api) {
      api.matchUtilities({s: (value) => ({width: value, height: value})}, {values: api.theme('width')})
    }),
  ],
}
export default config
