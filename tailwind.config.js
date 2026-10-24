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
        'accent-foreground': 'var(--accent-foreground)'
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
