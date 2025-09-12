/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Define tus colores personalizados aquí
        // Ejemplo: 'primary': '#FF0000',
      },
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        'open-sans': ['Open Sans', 'sans-serif'],
        'poppins-bold': ['Poppins', 'sans-serif'], // Asumiendo que Poppins bold es una variante de Poppins
      },
    },
  },
  plugins: [],
};