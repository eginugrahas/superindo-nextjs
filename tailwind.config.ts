import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'black':'#353535',
        'red':'#DB2719',
        'purple': '#2A186C',
        'gray': '#9A9AB0',
        'p-white': '#FAFAFA'
      }
    },
  },
  plugins: [],
}
export default config
