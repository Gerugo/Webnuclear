/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          950: '#010306',
          900: '#03070e',
          850: '#060e1b',
          800: '#0a1628',
          700: '#11223e',
          card: 'rgba(5, 12, 22, 0.72)',
          'card-hover': 'rgba(10, 24, 44, 0.85)',
          border: 'rgba(0, 240, 255, 0.15)',
          'border-active': 'rgba(0, 240, 255, 0.5)',
        },
        neon: {
          cyan: '#00f0ff',
          emerald: '#00ff9d',
          violet: '#9d4edd',
          amber: '#ffb703',
          red: '#ff2a5f',
        },
        clinical: {
          bg: '#02050a',
          text: '#ecf2f8',
          dim: '#8b9bb4',
          muted: '#4a5b78',
          grid: 'rgba(0, 240, 255, 0.04)',
        }
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Space Mono"', 'monospace'],
        display: ['"Rajdhani"', '"Orbitron"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scanline': 'scanline 8s linear infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite alternate',
      },
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
        glowPulse: {
          '0%': { opacity: '0.4', filter: 'drop-shadow(0 0 5px rgba(0,240,255,0.4))' },
          '100%': { opacity: '0.9', filter: 'drop-shadow(0 0 18px rgba(0,240,255,0.9))' },
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
