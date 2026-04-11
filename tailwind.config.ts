import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'Helvetica Neue', 'sans-serif'],
        sans: ['var(--font-inter)', 'system-ui', 'Helvetica Neue', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SF Mono', 'Menlo', 'monospace'],
      },
      colors: {
        'th-bg':     'var(--bg)',
        'th-bg2':    'var(--bg-2)',
        'th-bg3':    'var(--bg-3)',
        'th-bg4':    'var(--bg-4)',
        'th-text':   'var(--text)',
        'th-text2':  'var(--text-2)',
        'th-text3':  'var(--text-3)',
        'th-text4':  'var(--text-4)',
        'th-border': 'var(--border)',
        'th-bsub':   'var(--border-sub)',
        'th-accent': 'var(--accent)',
        'th-chip':   'var(--chip)',
        'th-hover':  'var(--hover)',
      },
      borderRadius: {
        'pill': '999px',
        'card': '8px',
        'card-lg': '12px',
      },
      boxShadow: {
        'card': 'var(--shadow) 0px 4px 16px 0px',
        'float': 'rgba(0,0,0,0.16) 0px 2px 8px 0px',
      },
    },
  },
  plugins: [],
}

export default config
