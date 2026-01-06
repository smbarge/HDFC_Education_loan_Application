/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'],
  theme: {
    screens: {
      'sm': '425px',
      'md': '768px',
      'lg': '1280px',
      'xl': '1440px',
      '2xl': '1536px',
    },

    fontFamily: {
      'roboto': ['Roboto', 'sans-serif', 'Inter'],
      'poppins': ['Poppins', 'sans-serif'],
      'inter': ['Inter-Regular', 'Inter-Bold', 'sans-serif'],
      'lato': ['Lato-Regular', 'sans-serif'],
      'Kanit': ['Kanit', 'sans-serif'],
      'robotoMono': ['Roboto Mono', 'monospace'],
      'nanum': ['Nanum Gothic', 'sans-serif'],
      'marvel': ['Marvel', 'sans-serif'],
      'josefin': ['Josefin Slab', 'serif'],
      'marathi1': ['Yatra One', 'system - ui'],
      'marathi2': ['Sahitya', 'serif'],
    },

    extend: {

      colors: {
        deepPurple: {
          50: "#ede7f6",
          100: "#d1c4e9",
          200: "#b39ddb",
          300: "#9575cd",
          400: "#7e57c2",
          500: "#673ab7",
          600: "#5e35b1",
          700: "#512da8",
          800: "#4527a0",
          900: "#311b92",

        },
        TealNew: {
          0: "#009688",
          50: "#e0f2f1",
          100: " #b2dfdb",
          200: " #80cbc4",
          300: " #4db6ac",
          400: " #26a69a",
          500: " #009688",
          600: " #00897b",
          700: " #00796b",
          800: " #00695c",
          900: " #004d40",
        },
        primary: {
          50: '#f1f9fa',
          100: '#dcf0f1',
          200: '#bde2e4',
          300: '#90cbd0',
          400: '#51a8b1',
          500: '#3f919b',
          600: '#377783',
          700: '#32616c',
          800: '#30525a',
          900: '#2b454e',
          950: '#192d33'
        },
        Calypso: {
          50: '#f2f9fd',
          100: '#e3f1fb',
          200: '#c1e4f6',
          300: '#8bceee',
          400: '#57b9e5',
          500: '#269cd1',
          600: '#177db2',
          700: '#146490',
          800: '#155577',
          900: '#174763',
          950: '#0f2e42',
        },
        morpankhi: '#0796a3',
        violet: '#efdbf3',
      }
    },
  },
  plugins: [],
}

