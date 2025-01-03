/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Habilitar modo oscuro manual
  content: ["./src/**/*.{html,ts,js}"],
  theme: {
    extend: {
      keyframes: {
        typing: {
          'from': { width: '0' },
          'to': { width: '12.2ch' }, // Cambia "12ch" según la longitud de tu texto
        },
        blink: {
          '50%': { borderColor: 'transparent' },
          '100%': { borderColor: 'inherit' },
        },
      },
      animation: {
        typing: 'typing 4s steps(12) infinite alternate, blink 0.5s step-end infinite',
      },
    },
  },
  plugins: [],
};
