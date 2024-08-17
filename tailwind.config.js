/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    colors: {
      orange: {
        base: '#F24D0D',
        dark: '#C43C08',
      },
      blue: {
        light: '#D7EFF9',
        base: '#5EC5FD',
        dark: '#009CF0',
      },
      white: '#FFFFFF',
      background: '#FBF4F4',
      shape: '#F5EAEA',
      gray: {
        100: '#ADADAD',
        200: '#949494',
        300: '#666666',
        400: '#3D3D3D',
        500: '#1D1D1D',
      },
      danger: '#DC3545',
      success: '#28A745',
    },
    extend: {
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
        bold: ['DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
