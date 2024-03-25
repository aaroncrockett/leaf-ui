import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

import { twPlugin, getTwColors } from 'leaf-css/'

const config: Config = {
  content: [
    './features/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ...getTwColors(),
      },
      gridTemplateColumns: {
        13: 'repeat(13, minmax(0, 1fr))',
        14: 'repeat(14, minmax(0, 1fr))',
      },
    },
  },
  plugins: [plugin(twPlugin)],
}
export default config
