/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', 
            './src/**/*.{js,jsx,ts,tsx}'
           ],
  theme: {
	  
		screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1840px",
      },
	  
    fontFamily: {
      primary: ["ClashGrotesk", "sans-serif"], 
    },
	  extend: {
      colors:
      {
        'primary': '#000000',
        'secondary': '#FFFFFF',
        'accent_blue': '#2B59A4',
        'accent_red': '#FE5A4E',
        'pdfbg': '#EDF0F9',
    
      },
      
	  },
	},
  plugins: [],
};


