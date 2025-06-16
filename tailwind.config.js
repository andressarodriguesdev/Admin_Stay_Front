/** @type {import('tailwindcss').Config} */
export const content = [
  "./index.html",
  "./src/**/*.{js,jsx}"
];
export const theme = {
  extend: {
    keyframes: {
      fadeInUp: {
        "0%": { opacity: 0, transform: "translateY(20px)" },
        "100%": { opacity: 1, transform: "translateY(0)" },
      },
    },
    animation: {
      fadeInUp: "fadeInUp 0.6s ease-out",
    },
    fontFamily: {
      poppins: ['Poppins', 'sans-serif'],
    },
    colors: {
      fundo: '#FAF8F5',
      input: '#E5E2F5',
      texto: '#1E1E1E',
      placeholder: '#888888',

      primario: '#FFB3D1',
      primarioHover: '#ff9cc4',

      secundario: '#C8BFE7',
      secundarioHover: '#b5a8db',

      atencao: '#F7C8D9',
      atencaoHover: '#eab0c5',
    },
    backgroundImage: {
      texture: "url('/texture.png')",
    },
    screens: {
      sm: '640px',
      md: '768px',
      md2: '849px',
      lg: '1024px',
      xl: '1280px',
    },
  },
};
export const plugins = [];
