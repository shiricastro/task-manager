/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      colors: {    
        'light-text': '#24252C',
        'light-background': '#FFFFFF', 
        'dark-text': '#FFFFFF',
        'dark-background': '#0A013D',
        'dark-lightBackground': '#342F65',
        comment:'#EEEEEE',
        primary: '#5F33E1',
        'primary-hover':'#291DD8',
        accent: '#FFD332', 
        muted: '#EDE4FF', 
        success: '#00AB56',
        error: '#D30136'      
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      fontSize: {
        logo: ['20px', { fontWeight: '700', lineHeight: 'normal'}],
        heading: ['16px', { fontWeight: '600', lineHeight: 'normal'}],
        button: ['16px', { fontWeight: '500', lineHeight: 'normal'}],
        regular: ['14px', { fontWeight: '500', lineHeight: 'normal'}],
        small: ['12px', { fontWeight: '400', lineHeight: 'normal'}],
        'logo-desktop': ['24px', { fontWeight: '700', lineHeight: 'normal'}],
        'heading-desktop': ['18px', { fontWeight: '600', lineHeight: 'normal'}],
        'button-desktop': ['18px', { fontWeight: '500', lineHeight: 'normal'}],
        'regular-desktop': ['16px', { fontWeight: '500', lineHeight: 'normal'}],
        'small-desktop': ['14px', { fontWeight: '400', lineHeight: 'normal'}],
      },
      screens: {
        'mobile': '375px',
        'tablet': '768px',
        'desktop': '1024px',
      },
      boxShadow: {
        card: '0 1px 6px 0 rgba(0,0,0,0.12)',
        item: '0 1px 6px 0 rgba(0, 0, 0, 0.12)'
      },
      margin: {
        'mb-base':'28px',
        'mb-small':'20px',
        'mb-smaller':'12px',
        'mb-smaller2':'8px'
      },
      gap:{
        base:'8px',
        'base-desktop':'15px',
        big:'12px',
        'big-desktop':'12px',
      }
    },
  },
  darkMode: 'class',
  plugins: [],
}
