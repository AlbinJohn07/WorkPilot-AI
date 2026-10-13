/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Design tokens: navy = primary, brand = intelligent blue accent, teal = positive status
        navy: { 950: '#07142A', 900: '#0B1F3A', 800: '#112B50', 700: '#1B3F73' },
        brand: { 50: '#EFF5FF', 100: '#DBE8FE', 200: '#BCD3FC', 500: '#2F6FED', 600: '#2159D6', 700: '#1B47AD' },
        surface: '#F4F6FA',
        ink: '#1F2937',
      },
      fontFamily: {
        sans: ['"Inter Variable"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(11,31,58,.05), 0 8px 24px -12px rgba(11,31,58,.12)',
        window: '0 30px 80px -30px rgba(11,31,58,.45), 0 8px 20px -8px rgba(11,31,58,.15)',
      },
      keyframes: {
        rise: {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'none' },
        },
      },
      animation: { rise: 'rise .8s cubic-bezier(.2,.7,.2,1) both' },
    },
  },
  plugins: [],
};
