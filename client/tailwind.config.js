module.exports = {
  content: [
    "./src/**/*.js",
  ],
  theme: {
    colors: {
      gray: { 
        25: '#FCFCFD',
        50: '#F9FAFB',
        100: '#F2F4F7',
        200: '#EAECF0',
        300: '#D0D5DD',
        400: '#98A2B3',
        500: '#667085',
        600: '#475467',
        700: '#344054',
        800: '#1D2939',
        900: '#101828',
      },
      primary: {
        25: '#FCFAFF',
        50: '#F9F5FF',
        100: '#F4EBFF',
        200: '#E9D7FE',
        300: '#D6BBFB',
        600: '#7F56D9',
        700: '#6941C6',
      },
      success: {
        300: '#6CE9A6',
        500: '#6CE9A6',
      },
      error: {
        25: '#FFFBFA',
        50: '#FEF3F2',
        100: '#FEE4E2',
        300: '#FDA29B',
        500: '#F04438',
        700: '#B42318',
      },
      white: '#FFFFFF',
      black: '#000000',
    },
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  }
}
