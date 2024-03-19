import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

import { twPlugin, getTwColors } from 'leaf-css/'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ...getTwColors(),
      },
    },
  },
  plugins: [plugin(twPlugin)],
}
export default config
