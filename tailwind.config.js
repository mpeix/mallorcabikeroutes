/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  purge: {
    enabled: false
  },
  theme: {
    extend: {
      colors: {
        /*Palette:https://coolors.co/palette/22577a-38a3a5-57cc99-80ed99-c7f9cc */
        themecolor1: {
          '50': '#f3f8fc',
          '100': '#e6f0f8',
          '200': '#c8e0ef',
          '300': '#97c7e2',
          '400': '#60a9d0',
          '500': '#3b8ebc',
          '600': '#2b729e',
          '700': '#22577a',
          '800': '#214e6b',
          '900': '#20425a'
        },
        themecolor2: {
          '50': '#f3fafa',
          '100': '#d5f2f0',
          '200': '#abe4e0',
          '300': '#79cfcc',
          '400': '#4db4b4',
          '500': '#38a3a5',
          '600': '#27767a',
          '700': '#235f62',
          '800': '#204c4f',
          '900': '#1e4143'
        },
        themecolor3: {
          '50': '#edfcf4',
          '100': '#d4f7e3',
          '200': '#adedca',
          '300': '#78ddae',
          '400': '#57cc99',
          '500': '#1eab72',
          '600': '#118a5b',
          '700': '#0e6e4c',
          '800': '#0e573e',
          '900': '#0c4834'
        },
        themecolor4: {
          '50': '#f0fdf2',
          '100': '#dcfce3',
          '200': '#bcf6c8',
          '300': '#80ed99',
          '400': '#4bdd6d',
          '500': '#24c349',
          '600': '#17a238',
          '700': '#167f2f',
          '800': '#17642a',
          '900': '#155225'
        },
        themecolor5: {
          '50': '#f0fdf1',
          '100': '#dcfcdf',
          '200': '#c7f9cc',
          '300': '#85f091',
          '400': '#48e05a',
          '500': '#20c734',
          '600': '#14a526',
          '700': '#148122',
          '800': '#156620',
          '900': '#13541d'
        }
      }
    },
  },
  safelist: [{
    pattern: /(bg|text|border)-themecolor(1|2|3|4|5)/
  }],
  plugins: [],
}
