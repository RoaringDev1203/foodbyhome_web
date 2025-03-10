import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'
import { createThemes } from 'tw-colors';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    'node_modules/preline/dist/*.js',
    './public/*.html',
    './index.html',
  ],
  safelist: [
    {
      pattern: /bg-(danger|success|secondary|warning|info)/,
      variants: ['hover']
    },
    {
      pattern: /border-(danger|success|secondary|warning|info)/,
    },
    {
      pattern: /bg-(primary|secondary|success|danger|warning|info)\/75/
    },
  ],
  darkMode: ['class'],

  theme: {

    container: {
      center: true,
      padding: '1rem'
    },

    fontFamily: {
      'poppins': ['Poppins', 'sans-serif'],
      'handrawn': ['Delicious Handrawn', 'cursive'],
    },

    extend: {
      colors: {
        primary: {
          ...colors.green,
          'DEFAULT': '#05e343',
        },
      },

      keyframes: {
        load: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        }
      },

      spacing: {
        15: '60px',
        18: '72px'
      },

      zIndex: {
        '60': '60',
        '70': '70',
      },
    },
  },

  plugins: [
    require('preline/plugin'),
    require('./custom.plugin'),
    createThemes({
      light: {
        default: colors.slate,
        primary: {
          ...colors.green,
          'DEFAULT': '#05e343',
        },
        'secondary': '#575757',
        'success': '#43d39e',
        'info': '#25c2e3',
        'warning': '#ffbe0b',
        'danger': '#ff5c75',
        'light': '#f8f9fa',
        'dark': '#343a40',
      },

      dark: {
        default: {
          '50': '#0AAF60',
          '100': '#0f172a',
          '200': '#1e293b',
          '300': '#334155',
          '400': '#475569',
          '500': '#64748b',
          '600': '#94a3b8',
          '700': '#cbd5e1',
          '800': '#e2e8f0',
          '900': '#f1f5f9',
          '950': '#f8fafc'
        },
        primary: {
          ...colors.green, 
          'DEFAULT': '#05e343',
        },
        'secondary': '#6c757d',
        'success': '#43d39e',
        'info': '#25c2e3',
        'warning': '#ffbe0b',
        'danger': '#ff5c75',
        'light': '#f8f9fa',
        'dark': '#343a40',
      },
    }, {
      defaultTheme: 'light'
    })
  ],
}
export default config
