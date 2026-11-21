/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        surface: 'var(--surface)',
        card: 'var(--card)',
        wash: 'var(--wash)',
        text: 'var(--text)',
        'muted-text': 'var(--muted-text)',
        primary: 'var(--primary)',
        'primary-foreground': 'var(--primary-foreground)',
        border: 'var(--border)',
        accent: 'var(--accent)',
        'accent-foreground': 'var(--accent-foreground)',
        // Mobile menu overlay palette (RGB-channel vars → alpha modifiers work)
        'menu-bg': 'rgb(var(--menu-bg) / <alpha-value>)',
        'menu-text': 'rgb(var(--menu-text) / <alpha-value>)',
        'menu-accent': 'rgb(var(--menu-accent) / <alpha-value>)',
        'menu-hover': 'rgb(var(--menu-hover) / <alpha-value>)',
        'menu-close-hover': 'rgb(var(--menu-close-hover) / <alpha-value>)',
        'menu-border': 'rgb(var(--menu-border) / <alpha-value>)',
        'menu-offset': 'rgb(var(--menu-offset) / <alpha-value>)'
      },
      fontFamily: {
        script: ['Allura', 'cursive']
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)'
      }
    }
  },
  plugins: []
};
