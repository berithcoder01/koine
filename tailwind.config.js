/** @type {import('tailwindcss').Config} */
import { heroui } from "@heroui/react";

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1A3A5C',
        secondary: '#C9973A',
        success: '#2D7A4F',
        error: '#C0392B',
        background: '#F5F0E8',
        surface: '#FFFFFF',
        textPrimary: '#1A1A1A',
        textSecondary: '#6B6B6B',
        greek: '#1A3A5C',
      },
      fontFamily: {
        greek: ['SBL Greek', 'Gentium Plus', 'serif'],
        ui: ['Montserrat', 'Inter', 'sans-serif'],
      },
      fontSize: {
        'greek-sm': ['18px', '1.6'],
        'greek-md': ['24px', '1.6'],
        'greek-lg': ['32px', '1.6'],
        'greek-xl': ['48px', '1.4'],
      },
    },
  },
  darkMode: 'class',
  plugins: [heroui()],
};
