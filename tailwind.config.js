/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        sm: '0.625rem', // 10px
        md: '1.175rem', // 30px
        lg: '2.125rem', // 50px
        xl: '5rem',     // 80px
      },
      fontFamily: {
        sans: ['Poppins', 'Helvetica', 'Arial', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
      colors: {
        primary: 'F5F5F5',    // Custom primary color (blue)
        secondary: 'r#fed7aa',  // Custom secondary color (yellow)
        accent: '#38c172',     // Custom accent color (green)
        dark: '#2d3748',       // Darker shade (gray)
        light: '#edf2f7',      // Lighter shade (light gray)
        danger: 'rgba(102, 38, 113, 1)',     // Custom danger color (red)
      },
      spacing: {
        '1': '0.5rem',  
        '2': '0.75rem', 
        '3': '1rem',     
        '4': '1.5rem',   
        '5': '2rem',     
        '6': '3rem',     
      },
    },
    screens: {
      sx:"300px",
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [],
}
