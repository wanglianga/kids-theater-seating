/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
      },
    },
    extend: {
      colors: {
        brand: {
          50: '#FFF1F1',
          100: '#FFDEDE',
          200: '#FFC2C2',
          300: '#FF9A9A',
          400: '#FF6B6B',
          500: '#F55353',
          600: '#E03B3B',
          700: '#BB2D2D',
        },
        mint: {
          50: '#ECFFFC',
          100: '#C5F7EF',
          200: '#8EE9DB',
          300: '#4ECDC4',
          400: '#33B5AC',
          500: '#24968E',
        },
        sky2: {
          50: '#EFFAFF',
          100: '#D7F1FF',
          200: '#A6E1FF',
          300: '#45B7D1',
          400: '#2E99B0',
          500: '#1F7A8E',
        },
        cream: {
          50: '#FFFEF7',
          100: '#FDF9EB',
          200: '#F9F0D3',
          300: '#F1E3B0',
        },
      },
      fontFamily: {
        display: ['"ZCOOL KuaiLe"', '"Ma Shan Zheng"', 'system-ui', 'sans-serif'],
        body: ['"Noto Sans SC"', '"PingFang SC"', '"Microsoft YaHei"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 20px -4px rgba(0, 0, 0, 0.08), 0 2px 6px -2px rgba(0, 0, 0, 0.04)',
        card: '0 8px 30px -8px rgba(255, 107, 107, 0.15), 0 2px 10px -2px rgba(0, 0, 0, 0.05)',
        float: '0 16px 40px -12px rgba(0, 0, 0, 0.12)',
      },
      borderRadius: {
        'xl2': '1rem',
        '2xl2': '1.25rem',
        '3xl2': '1.5rem',
        '4xl': '2rem',
      },
      keyframes: {
        pulseRing: {
          '0%': { boxShadow: '0 0 0 0 rgba(255, 107, 107, 0.5)' },
          '70%': { boxShadow: '0 0 0 12px rgba(255, 107, 107, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(255, 107, 107, 0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        floatY: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        pulseRing: 'pulseRing 1.5s ease-out infinite',
        slideUp: 'slideUp 0.3s ease-out',
        fadeIn: 'fadeIn 0.25s ease-out both',
        floatY: 'floatY 3s ease-in-out infinite',
        bounceSoft: 'bounceSoft 2s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
      },
    },
  },
  plugins: [],
};
