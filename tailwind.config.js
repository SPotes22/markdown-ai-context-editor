
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}" 
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Helvetica', 'Arial', 'sans-serif'],
        'mono': ['Courier', 'monospace'],
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: .5 },
        }
      },
      animation: {
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.800'),
            'h1,h2,h3,h4,h5,h6': {
              color: theme('colors.gray.900'),
            },
            a: {
              color: theme('colors.blue.600'),
              '&:hover': {
                color: theme('colors.blue.800'),
              },
            },
            code: {
                backgroundColor: theme('colors.gray.200'),
                padding: '2px 4px',
                borderRadius: '4px',
                color: theme('colors.gray.800'),
            },
            pre: {
                backgroundColor: theme('colors.gray.200'),
                padding: theme('spacing.4'),
                borderRadius: theme('borderRadius.md'),
                color: theme('colors.gray.900'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
