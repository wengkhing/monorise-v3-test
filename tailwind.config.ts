import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: ['./components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}'],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      screens: { sm: '450px' },
      fontFamily: {
        montserrat: ['var(--font-montserrat-alternates)', 'sans-serif'],
        lato: ['var(--font-lato)', 'sans-serif'],
        quicksand: ['var(--font-quicksand)', 'sans-serif'],
        nunito: ['var(--font-nunito)', 'sans-serif'],
        cormorant: ['var(--font-cormorant-garamond)', 'sans-serif'],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        warning: {
          DEFAULT: '#FFB700',
          foreground: 'black',
        },
        success: {
          DEFAULT: '#52C41A',
          foreground: 'white',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        'primary-blue': '#1890ff',
        'primary-blue-light': '#40a9ff',
        'primary-purple': '#574dd3',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'title-fade-in': {
          from: {
            transform: 'translateY(-25px)',
            opacity: '0',
          },
          to: {
            transform: 'translateX(0)',
            opacity: '1',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      boxShadow: {
        'card-shadow': '0px 4px 15px 2px rgba(0, 0, 0, 0.23)',
        'card-shadow-sm':
          '0 2px 6px rgba(0, 0, 0, 0.16), 0 1px 2px rgba(0, 0, 0, 0.23)',
        'card-shadow-lg':
          '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
        'layout-shadow': '0px -10px 28px 6px rgba(0,0,0,0.3)',
      },
      backgroundImage: {
        'purple-gradient': 'linear-gradient(135deg, #647dee 0%, #7f53ac 100%)',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    ({ addUtilities }: any) => {
      const newUtilities = {
        '.trans-200-cubic-25': {
          transition: '200ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        },
        '.trans-100-cubic-215': {
          transition: '100ms cubic-bezier(0.215, 0.61, 0.355, 1)',
        },
        '.trans-200-cubic-215': {
          transition: '200ms cubic-bezier(0.215, 0.61, 0.355, 1)',
        },
        '.trans-all-300-cubic-25': {
          transition: 'all 0.3s cubic-bezier(.25, .8, .25, 1)',
        },
      };

      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
} satisfies Config;

export default config;
