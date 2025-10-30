import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#1E90FF',
          dark: '#1C75D8',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-headings': 'var(--foreground)',
            '--tw-prose-links': 'var(--brand)',
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
