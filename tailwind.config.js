/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        canvas: {
          950: '#090A0D', // Obsidian background
          900: '#0E1015', // Base surface
          850: '#14171E', // Elevated panel
          800: '#1B1F28', // Interactive card
          700: '#252B37', // Border / separator
          600: '#343B4A',
        },
        slate: {
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
        accent: {
          amber: '#F59E0B',
          amberMuted: 'rgba(245, 158, 11, 0.12)',
          steel: '#38BDF8',
          steelMuted: 'rgba(56, 189, 248, 0.12)',
          emerald: '#10B981',
          emeraldMuted: 'rgba(16, 185, 129, 0.12)',
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.025em',
      }
    },
  },
  plugins: [],
}
