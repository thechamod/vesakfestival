/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--primary)',
          light: '#a855f7',
          dark: '#7e22ce',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          light: '#60a5fa',
          dark: '#2563eb',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          light: '#fcd34d',
          dark: '#d97706',
        },
        success: {
          DEFAULT: 'var(--success)',
          light: '#34d399',
          dark: '#059669',
        },
        warning: {
          DEFAULT: 'var(--warning)',
          light: '#fb923c',
          dark: '#ea580c',
        },
        error: {
          DEFAULT: 'var(--error)',
          light: '#f87171',
          dark: '#dc2626',
        },
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 4s linear infinite',
      },
      backgroundImage: {
        'vesak-pattern': "url('https://images.pexels.com/photos/6044224/pexels-photo-6044224.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
      },
    },
  },
  plugins: [],
};