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
        // Everything is monospace — carlesfaus.com style
        display: ['var(--font-mono)', 'ui-monospace', 'SF Mono', 'Menlo', 'monospace'],
        sans: ['var(--font-mono)', 'ui-monospace', 'SF Mono', 'Menlo', 'monospace'],
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
      },
      borderRadius: {
        'pill': '0px',
        'card': '0px',
        'card-lg': '0px',
      },
      boxShadow: {
        'card': 'none',
        'float': 'none',
      },
    },
  },
  plugins: [],
}

export default config
