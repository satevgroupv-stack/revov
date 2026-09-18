export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0E1A40',
          tint: '#14235A',
        },
        orange: {
          DEFAULT: '#FF7101',
        },
        silver: {
          DEFAULT: '#D9D9D9',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Montserrat', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        micro: '0.22em',
      },
      borderRadius: {
        glass: '12px',
      },
      boxShadow: {
        glass: '0 8px 32px rgba(0,0,0,0.35)',
        'glass-orange': '0 8px 32px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,113,1,0.35)',
      },
      maxWidth: {
        shell: '1200px',
        tablet: '720px',
      },
    },
  },
  plugins: [],
}
