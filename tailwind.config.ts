import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';
import typography from '@tailwindcss/typography';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './content/**/*.{md,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        background: '#f8faf8',
        foreground: '#0f172a',
        accent: {
          DEFAULT: '#047857',
          foreground: '#f0fdf4'
        }
      },
      fontFamily: {
        sans: ['"Inter"', ...defaultTheme.fontFamily.sans]
      }
    }
  },
  plugins: [typography]
};

export default config;
